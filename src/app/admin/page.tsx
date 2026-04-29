'use client';

import { useState, useEffect, FormEvent } from 'react';
import Link from 'next/link';
import { getAnalytics, clearAnalytics, type PageView, type ScrollData, type ClickData, type Lead } from '@/lib/analytics';
import { getBlogPosts, savePost, deletePost, generateSlug, type BlogPost } from '@/lib/blog';

interface AnalyticsData {
  pageviews: PageView[];
  scrolls: ScrollData[];
  clicks: ClickData[];
  leads: Lead[];
}

type DateFilter = 'today' | 'yesterday' | '7days' | '30days' | 'all';

export default function AdminPage() {
  const [analytics, setAnalytics] = useState<AnalyticsData>({
    pageviews: [],
    scrolls: [],
    clicks: [],
    leads: [],
  });
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [activeTab, setActiveTab] = useState<'overview' | 'leads' | 'clicks' | 'blog'>('overview');
  const [dateFilter, setDateFilter] = useState<DateFilter>('7days');
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [showPostForm, setShowPostForm] = useState(false);

  const [postForm, setPostForm] = useState({
    title: '',
    excerpt: '',
    content: '',
    image: '',
    author: '',
    category: '',
    published: true,
  });

  useEffect(() => {
    setAnalytics(getAnalytics());
    setPosts(getBlogPosts());
  }, []);

  // Date filtering logic
  const getFilteredData = <T extends { timestamp: number }>(data: T[]): T[] => {
    const now = Date.now();
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayStart = today.getTime();

    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStart = yesterday.getTime();

    switch (dateFilter) {
      case 'today':
        return data.filter(item => item.timestamp >= todayStart);
      case 'yesterday':
        return data.filter(item => item.timestamp >= yesterdayStart && item.timestamp < todayStart);
      case '7days':
        return data.filter(item => item.timestamp >= now - 7 * 24 * 60 * 60 * 1000);
      case '30days':
        return data.filter(item => item.timestamp >= now - 30 * 24 * 60 * 60 * 1000);
      default:
        return data;
    }
  };

  const filteredPageviews = getFilteredData(analytics.pageviews);
  const filteredLeads = getFilteredData(analytics.leads);
  const filteredClicks = getFilteredData(analytics.clicks);
  const filteredScrolls = getFilteredData(analytics.scrolls);

  const handleClearData = () => {
    if (confirm('Tem certeza que deseja limpar todos os dados de analytics?')) {
      clearAnalytics();
      setAnalytics({ pageviews: [], scrolls: [], clicks: [], leads: [] });
    }
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleString('pt-BR');
  };

  const formatShortDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Calculate stats
  const totalVisits = filteredPageviews.length;
  const uniqueSessions = new Set(filteredPageviews.map(pv => pv.sessionId)).size;
  const totalLeads = filteredLeads.length;
  const avgScroll = filteredScrolls.length > 0
    ? Math.round(filteredScrolls.reduce((acc, s) => acc + s.maxScroll, 0) / filteredScrolls.length)
    : 0;

  // Calculate conversion rate
  const conversionRate = totalVisits > 0 ? ((totalLeads / uniqueSessions) * 100).toFixed(1) : '0';

  // Get top clicked elements
  const clickCounts = filteredClicks.reduce((acc, click) => {
    acc[click.element] = (acc[click.element] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  const topClicks = Object.entries(clickCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10);

  // Get page views by page
  const pageViewsByPage = filteredPageviews.reduce((acc, pv) => {
    acc[pv.page] = (acc[pv.page] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  const topPages = Object.entries(pageViewsByPage)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  // Blog functions
  const handleEditPost = (post: BlogPost) => {
    setEditingPost(post);
    setPostForm({
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      image: post.image,
      author: post.author,
      category: post.category,
      published: post.published,
    });
    setShowPostForm(true);
  };

  const handleNewPost = () => {
    setEditingPost(null);
    setPostForm({
      title: '',
      excerpt: '',
      content: '',
      image: '/gallery/lab-1.jpeg',
      author: 'Equipe Lab Paulo Albuquerque',
      category: 'Notícias',
      published: true,
    });
    setShowPostForm(true);
  };

  const handleSavePost = (e: FormEvent) => {
    e.preventDefault();
    const slug = editingPost?.slug || generateSlug(postForm.title);
    savePost({
      ...postForm,
      id: editingPost?.id,
      slug,
    });
    setPosts(getBlogPosts());
    setShowPostForm(false);
    setEditingPost(null);
  };

  const handleDeletePost = (id: string) => {
    if (confirm('Tem certeza que deseja excluir esta notícia?')) {
      deletePost(id);
      setPosts(getBlogPosts());
    }
  };

  const dateFilterLabels: Record<DateFilter, string> = {
    today: 'Hoje',
    yesterday: 'Ontem',
    '7days': 'Últimos 7 dias',
    '30days': 'Últimos 30 dias',
    all: 'Todo período',
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/" className="text-gray-400 hover:text-gray-600 transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
                </svg>
              </Link>
              <div>
                <h1 className="text-xl font-bold text-navy-900">Painel Administrativo</h1>
                <p className="text-sm text-gray-500">Lab Dr. Paulo Albuquerque</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              {/* Date Filter */}
              <select
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value as DateFilter)}
                className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {Object.entries(dateFilterLabels).map(([value, label]) => (
                  <option key={value} value={value}>{label}</option>
                ))}
              </select>
              <button
                onClick={handleClearData}
                className="text-sm text-red-500 hover:text-red-600 font-medium transition-colors"
              >
                Limpar Dados
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                </svg>
              </div>
              <span className="text-xs text-gray-400 font-medium">{dateFilterLabels[dateFilter]}</span>
            </div>
            <p className="text-3xl font-bold text-navy-900">{totalVisits}</p>
            <p className="text-sm text-gray-500 mt-1">Visualizações</p>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center">
                <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/>
                </svg>
              </div>
              <span className="text-xs text-gray-400 font-medium">{dateFilterLabels[dateFilter]}</span>
            </div>
            <p className="text-3xl font-bold text-navy-900">{uniqueSessions}</p>
            <p className="text-sm text-gray-500 mt-1">Visitantes</p>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                </svg>
              </div>
              <span className="text-xs text-gray-400 font-medium">{dateFilterLabels[dateFilter]}</span>
            </div>
            <p className="text-3xl font-bold text-navy-900">{totalLeads}</p>
            <p className="text-sm text-gray-500 mt-1">Leads</p>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center">
                <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>
                </svg>
              </div>
            </div>
            <p className="text-3xl font-bold text-navy-900">{conversionRate}%</p>
            <p className="text-sm text-gray-500 mt-1">Conversão</p>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"/>
                </svg>
              </div>
            </div>
            <p className="text-3xl font-bold text-navy-900">{avgScroll}%</p>
            <p className="text-sm text-gray-500 mt-1">Scroll Médio</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content - 2 columns */}
          <div className="lg:col-span-2 space-y-6">
            {/* Tabs Card */}
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100">
              <div className="border-b border-gray-100">
                <nav className="flex">
                  <button
                    onClick={() => setActiveTab('overview')}
                    className={`flex-1 px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                      activeTab === 'overview'
                        ? 'border-blue-500 text-blue-600 bg-blue-50/50'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    Visão Geral
                  </button>
                  <button
                    onClick={() => setActiveTab('leads')}
                    className={`flex-1 px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                      activeTab === 'leads'
                        ? 'border-blue-500 text-blue-600 bg-blue-50/50'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    Leads ({totalLeads})
                  </button>
                  <button
                    onClick={() => setActiveTab('clicks')}
                    className={`flex-1 px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                      activeTab === 'clicks'
                        ? 'border-blue-500 text-blue-600 bg-blue-50/50'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    Cliques
                  </button>
                  <button
                    onClick={() => setActiveTab('blog')}
                    className={`flex-1 px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                      activeTab === 'blog'
                        ? 'border-blue-500 text-blue-600 bg-blue-50/50'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    Blog
                  </button>
                </nav>
              </div>

              <div className="p-6">
                {activeTab === 'overview' && (
                  <div className="space-y-6">
                    {/* Top Pages */}
                    <div>
                      <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Páginas Mais Visitadas</h3>
                      {topPages.length === 0 ? (
                        <p className="text-gray-500 text-sm">Nenhuma visita registrada.</p>
                      ) : (
                        <div className="space-y-3">
                          {topPages.map(([page, count], i) => (
                            <div key={i} className="flex items-center gap-4">
                              <span className="text-sm text-gray-400 w-6">{i + 1}.</span>
                              <div className="flex-1">
                                <div className="flex items-center justify-between mb-1">
                                  <p className="text-sm font-medium text-navy-900">{page || '/'}</p>
                                  <span className="text-sm text-gray-500">{count} visitas</span>
                                </div>
                                <div className="w-full bg-gray-100 rounded-full h-1.5">
                                  <div
                                    className="bg-blue-500 h-1.5 rounded-full"
                                    style={{ width: `${(count / topPages[0][1]) * 100}%` }}
                                  />
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Recent Visits */}
                    <div>
                      <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Últimas Visitas</h3>
                      {filteredPageviews.length === 0 ? (
                        <p className="text-gray-500 text-sm">Nenhuma visita no período.</p>
                      ) : (
                        <div className="overflow-x-auto">
                          <table className="w-full">
                            <thead>
                              <tr className="text-left text-xs text-gray-400 border-b border-gray-100">
                                <th className="pb-3 font-medium">Data</th>
                                <th className="pb-3 font-medium">Página</th>
                                <th className="pb-3 font-medium">Dispositivo</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                              {filteredPageviews.slice(-8).reverse().map((pv, i) => (
                                <tr key={i} className="text-sm">
                                  <td className="py-3 text-gray-600">{formatShortDate(pv.timestamp)}</td>
                                  <td className="py-3 text-navy-900 font-medium">{pv.page || '/'}</td>
                                  <td className="py-3 text-gray-500">{pv.screenSize}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {activeTab === 'leads' && (
                  <div>
                    {filteredLeads.length === 0 ? (
                      <div className="text-center py-12">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                          </svg>
                        </div>
                        <p className="text-gray-500">Nenhum lead no período selecionado.</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {filteredLeads.slice().reverse().map((lead, i) => (
                          <div key={i} className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                            <div className="flex items-start justify-between mb-3">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                  <span className="text-blue-600 font-semibold">{lead.name.charAt(0).toUpperCase()}</span>
                                </div>
                                <div>
                                  <p className="font-semibold text-navy-900">{lead.name}</p>
                                  <p className="text-xs text-gray-400">{formatShortDate(lead.timestamp)}</p>
                                </div>
                              </div>
                              <a
                                href={`https://wa.me/55${lead.phone.replace(/\D/g, '')}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
                              >
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                                </svg>
                                WhatsApp
                              </a>
                            </div>
                            <div className="grid sm:grid-cols-2 gap-2 text-sm">
                              <div className="flex items-center gap-2">
                                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                                </svg>
                                <span className="text-gray-600">{lead.phone}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                                </svg>
                                <span className="text-gray-600">{lead.email || 'Não informado'}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {activeTab === 'clicks' && (
                  <div>
                    <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Elementos Mais Clicados</h3>
                    {topClicks.length === 0 ? (
                      <p className="text-gray-500 text-sm">Nenhum clique registrado no período.</p>
                    ) : (
                      <div className="space-y-3">
                        {topClicks.map(([element, count], i) => (
                          <div key={i} className="flex items-center gap-4">
                            <span className="text-sm text-gray-400 w-6">{i + 1}.</span>
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-1">
                                <p className="text-sm font-medium text-navy-900 truncate max-w-[250px]">
                                  {element}
                                </p>
                                <span className="text-sm text-gray-500">{count} cliques</span>
                              </div>
                              <div className="w-full bg-gray-100 rounded-full h-1.5">
                                <div
                                  className="bg-amber-500 h-1.5 rounded-full"
                                  style={{ width: `${(count / topClicks[0][1]) * 100}%` }}
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {activeTab === 'blog' && (
                  <div>
                    {!showPostForm ? (
                      <>
                        <div className="flex items-center justify-between mb-6">
                          <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Gerenciar Notícias</h3>
                          <button
                            onClick={handleNewPost}
                            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4"/>
                            </svg>
                            Nova
                          </button>
                        </div>

                        {posts.length === 0 ? (
                          <p className="text-gray-500 text-sm">Nenhuma notícia cadastrada.</p>
                        ) : (
                          <div className="space-y-3">
                            {posts.map((post) => (
                              <div key={post.id} className="bg-gray-50 rounded-xl p-4 border border-gray-100 flex items-center gap-4">
                                <img
                                  src={post.image || '/gallery/lab-1.jpeg'}
                                  alt={post.title}
                                  className="w-16 h-16 object-cover rounded-lg shrink-0"
                                />
                                <div className="flex-1 min-w-0">
                                  <h4 className="font-semibold text-navy-900 truncate">{post.title}</h4>
                                  <p className="text-xs text-gray-400">{formatShortDate(post.createdAt)}</p>
                                </div>
                                <div className="flex items-center gap-1 shrink-0">
                                  <button
                                    onClick={() => handleEditPost(post)}
                                    className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg"
                                  >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                                    </svg>
                                  </button>
                                  <button
                                    onClick={() => handleDeletePost(post.id)}
                                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                                  >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                                    </svg>
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </>
                    ) : (
                      <form onSubmit={handleSavePost} className="space-y-4">
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold text-navy-900">
                            {editingPost ? 'Editar Notícia' : 'Nova Notícia'}
                          </h3>
                          <button
                            type="button"
                            onClick={() => setShowPostForm(false)}
                            className="text-gray-400 hover:text-gray-600"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
                            </svg>
                          </button>
                        </div>

                        <input
                          type="text"
                          required
                          value={postForm.title}
                          onChange={(e) => setPostForm({ ...postForm, title: e.target.value })}
                          placeholder="Título"
                          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />

                        <div className="grid grid-cols-2 gap-4">
                          <select
                            value={postForm.category}
                            onChange={(e) => setPostForm({ ...postForm, category: e.target.value })}
                            className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                            <option value="Notícias">Notícias</option>
                            <option value="Saúde Preventiva">Saúde Preventiva</option>
                            <option value="Orientações">Orientações</option>
                            <option value="Novidades">Novidades</option>
                          </select>
                          <input
                            type="text"
                            value={postForm.author}
                            onChange={(e) => setPostForm({ ...postForm, author: e.target.value })}
                            placeholder="Autor"
                            className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>

                        <textarea
                          rows={2}
                          required
                          value={postForm.excerpt}
                          onChange={(e) => setPostForm({ ...postForm, excerpt: e.target.value })}
                          placeholder="Resumo"
                          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                        />

                        <textarea
                          rows={6}
                          required
                          value={postForm.content}
                          onChange={(e) => setPostForm({ ...postForm, content: e.target.value })}
                          placeholder="Conteúdo (use ## para títulos)"
                          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none font-mono text-sm"
                        />

                        <div className="flex gap-3">
                          <button
                            type="button"
                            onClick={() => setShowPostForm(false)}
                            className="flex-1 py-2 border border-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-50"
                          >
                            Cancelar
                          </button>
                          <button
                            type="submit"
                            className="flex-1 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium"
                          >
                            Salvar
                          </button>
                        </div>
                      </form>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar - Recent Leads Quick View */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="bg-gradient-to-br from-navy-900 to-navy-800 rounded-2xl p-6 text-white">
              <h3 className="font-semibold mb-4">Resumo do Período</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-white/70">Total de Leads</span>
                  <span className="font-bold text-xl">{analytics.leads.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/70">Total de Visitas</span>
                  <span className="font-bold text-xl">{analytics.pageviews.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/70">Notícias Publicadas</span>
                  <span className="font-bold text-xl">{posts.filter(p => p.published).length}</span>
                </div>
              </div>
            </div>

            {/* Recent Leads */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-navy-900">Leads Recentes</h3>
                <button
                  onClick={() => setActiveTab('leads')}
                  className="text-sm text-blue-500 hover:text-blue-600 font-medium"
                >
                  Ver todos
                </button>
              </div>
              {analytics.leads.length === 0 ? (
                <p className="text-gray-500 text-sm text-center py-4">Nenhum lead ainda</p>
              ) : (
                <div className="space-y-3">
                  {analytics.leads.slice(-5).reverse().map((lead, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center shrink-0">
                        <span className="text-blue-600 font-semibold text-sm">{lead.name.charAt(0).toUpperCase()}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-navy-900 text-sm truncate">{lead.name}</p>
                        <p className="text-xs text-gray-400">{formatShortDate(lead.timestamp)}</p>
                      </div>
                      <a
                        href={`https://wa.me/55${lead.phone.replace(/\D/g, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 text-green-500 hover:bg-green-50 rounded-lg"
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                        </svg>
                      </a>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Quick Links */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="font-semibold text-navy-900 mb-4">Ações Rápidas</h3>
              <div className="grid grid-cols-2 gap-3">
                <Link
                  href="/blog"
                  target="_blank"
                  className="flex flex-col items-center gap-2 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                >
                  <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"/>
                  </svg>
                  <span className="text-xs text-gray-600">Ver Blog</span>
                </Link>
                <Link
                  href="/"
                  target="_blank"
                  className="flex flex-col items-center gap-2 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                >
                  <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
                  </svg>
                  <span className="text-xs text-gray-600">Ver Site</span>
                </Link>
                <Link
                  href="/trabalhe-conosco"
                  target="_blank"
                  className="flex flex-col items-center gap-2 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                >
                  <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                  </svg>
                  <span className="text-xs text-gray-600">Carreiras</span>
                </Link>
                <a
                  href="https://wa.me/5596981055224"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center gap-2 p-4 bg-green-50 rounded-xl hover:bg-green-100 transition-colors"
                >
                  <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                  </svg>
                  <span className="text-xs text-green-600">WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
