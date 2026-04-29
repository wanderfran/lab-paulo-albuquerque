// Analytics Tracking System
export interface PageView {
  id: string;
  page: string;
  timestamp: number;
  referrer: string;
  userAgent: string;
  screenSize: string;
  sessionId: string;
}

export interface ScrollData {
  sessionId: string;
  page: string;
  maxScroll: number;
  timestamp: number;
}

export interface ClickData {
  sessionId: string;
  page: string;
  element: string;
  timestamp: number;
}

export interface Lead {
  id: string;
  name: string;
  phone: string;
  email: string;
  message?: string;
  source: string;
  timestamp: number;
  page: string;
}

// Generate unique IDs
function generateId(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

// Get or create session ID
function getSessionId(): string {
  if (typeof window === 'undefined') return '';

  let sessionId = sessionStorage.getItem('lab_session_id');
  if (!sessionId) {
    sessionId = generateId();
    sessionStorage.setItem('lab_session_id', sessionId);
  }
  return sessionId;
}

// Save to localStorage (in production, send to backend)
function saveToStorage(key: string, data: unknown) {
  if (typeof window === 'undefined') return;

  const existing = JSON.parse(localStorage.getItem(key) || '[]');
  existing.push(data);
  // Keep only last 1000 entries
  if (existing.length > 1000) {
    existing.shift();
  }
  localStorage.setItem(key, JSON.stringify(existing));
}

// Track page view
export function trackPageView() {
  if (typeof window === 'undefined') return;

  const pageView: PageView = {
    id: generateId(),
    page: window.location.pathname,
    timestamp: Date.now(),
    referrer: document.referrer || 'direct',
    userAgent: navigator.userAgent,
    screenSize: `${window.innerWidth}x${window.innerHeight}`,
    sessionId: getSessionId(),
  };
  saveToStorage('lab_pageviews', pageView);
}

// Track scroll depth
export function trackScroll() {
  if (typeof window === 'undefined') return;

  let maxScroll = 0;
  let ticking = false;

  function updateScroll() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = Math.round((scrollTop / docHeight) * 100);

    if (scrollPercent > maxScroll) {
      maxScroll = scrollPercent;
    }
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(updateScroll);
      ticking = true;
    }
  });

  // Save on page leave
  window.addEventListener('beforeunload', () => {
    const scrollData: ScrollData = {
      sessionId: getSessionId(),
      page: window.location.pathname,
      maxScroll,
      timestamp: Date.now(),
    };
    saveToStorage('lab_scrolls', scrollData);
  });
}

// Track clicks on important elements
export function trackClicks() {
  if (typeof window === 'undefined') return;

  document.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;
    const trackable = target.closest('[data-track], a, button');

    if (trackable) {
      const clickData: ClickData = {
        sessionId: getSessionId(),
        page: window.location.pathname,
        element: trackable.getAttribute('data-track') ||
                 trackable.textContent?.slice(0, 50) ||
                 trackable.tagName,
        timestamp: Date.now(),
      };
      saveToStorage('lab_clicks', clickData);
    }
  });
}

// Save lead
export function saveLead(lead: Omit<Lead, 'id' | 'timestamp' | 'page' | 'source'>) {
  if (typeof window === 'undefined') return null;

  const fullLead: Lead = {
    ...lead,
    id: generateId(),
    timestamp: Date.now(),
    page: window.location.pathname,
    source: document.referrer || 'direct',
  };
  saveToStorage('lab_leads', fullLead);
  return fullLead;
}

// Get analytics data
export function getAnalytics() {
  if (typeof window === 'undefined') {
    return { pageviews: [], scrolls: [], clicks: [], leads: [] };
  }

  return {
    pageviews: JSON.parse(localStorage.getItem('lab_pageviews') || '[]') as PageView[],
    scrolls: JSON.parse(localStorage.getItem('lab_scrolls') || '[]') as ScrollData[],
    clicks: JSON.parse(localStorage.getItem('lab_clicks') || '[]') as ClickData[],
    leads: JSON.parse(localStorage.getItem('lab_leads') || '[]') as Lead[],
  };
}

// Clear analytics (for testing)
export function clearAnalytics() {
  if (typeof window === 'undefined') return;

  localStorage.removeItem('lab_pageviews');
  localStorage.removeItem('lab_scrolls');
  localStorage.removeItem('lab_clicks');
  localStorage.removeItem('lab_leads');
}

// Initialize tracking
export function initTracking() {
  trackPageView();
  trackScroll();
  trackClicks();
}
