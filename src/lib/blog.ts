// Blog data management with localStorage

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
  category: string;
  published: boolean;
  createdAt: number;
  updatedAt: number;
}

const STORAGE_KEY = 'lab_blog_posts';

// Sample posts for initial data
const samplePosts: BlogPost[] = [
  {
    id: '1',
    title: 'A Importância do Check-up Anual',
    slug: 'importancia-checkup-anual',
    excerpt: 'Saiba por que realizar exames de rotina regularmente pode salvar sua vida e prevenir doenças graves.',
    content: `O check-up anual é uma das ferramentas mais importantes para manter a saúde em dia. Muitas doenças, quando detectadas precocemente, têm chances muito maiores de tratamento eficaz.

## Por que fazer o check-up?

- Detecção precoce de doenças
- Monitoramento de condições crônicas
- Avaliação geral da saúde
- Prevenção de complicações

## Exames essenciais

Entre os exames mais importantes estão o hemograma completo, glicemia, colesterol, função renal e hepática. Para mulheres, o papanicolau e mamografia são fundamentais. Para homens acima de 50 anos, o PSA é recomendado.

Agende seu check-up conosco e cuide da sua saúde!`,
    image: '/gallery/lab-1.jpeg',
    author: 'Dr. Paulo Albuquerque',
    category: 'Saúde Preventiva',
    published: true,
    createdAt: Date.now() - 86400000 * 7,
    updatedAt: Date.now() - 86400000 * 7,
  },
  {
    id: '2',
    title: 'Novo Equipamento de Análise Genética',
    slug: 'novo-equipamento-analise-genetica',
    excerpt: 'Laboratório investe em tecnologia de ponta para exames genéticos com resultados mais rápidos e precisos.',
    content: `Temos o prazer de anunciar a chegada de nosso novo equipamento de análise genética, o que representa um grande avanço para nossos pacientes.

## Benefícios do novo equipamento

- Resultados em até 48 horas
- Maior precisão nos diagnósticos
- Análise de mais de 500 marcadores genéticos
- Tecnologia de última geração

## Exames disponíveis

Com este novo equipamento, ampliamos nossa capacidade de realizar testes de paternidade, análises de predisposição genética e diversos outros exames especializados.

Entre em contato para saber mais sobre nossos novos serviços!`,
    image: '/gallery/lab-4.jpeg',
    author: 'Equipe Técnica',
    category: 'Novidades',
    published: true,
    createdAt: Date.now() - 86400000 * 3,
    updatedAt: Date.now() - 86400000 * 3,
  },
  {
    id: '3',
    title: 'Dicas de Preparo para Exames de Sangue',
    slug: 'dicas-preparo-exames-sangue',
    excerpt: 'Confira as orientações essenciais para garantir resultados precisos nos seus exames laboratoriais.',
    content: `O preparo adequado para exames de sangue é fundamental para garantir resultados precisos. Confira nossas dicas:

## Jejum

A maioria dos exames requer jejum de 8 a 12 horas. Durante o jejum, você pode beber água normalmente.

## Medicamentos

Informe ao laboratório todos os medicamentos que você está tomando. Alguns podem interferir nos resultados.

## Dia anterior ao exame

- Evite alimentos gordurosos
- Não consuma bebidas alcoólicas
- Evite exercícios físicos intensos
- Durma bem

## No dia do exame

- Chegue com antecedência
- Traga documento com foto
- Informe se está em jejum
- Relaxe e mantenha a calma

Seguindo estas orientações, seus resultados serão mais precisos!`,
    image: '/gallery/lab-3.jpeg',
    author: 'Equipe de Enfermagem',
    category: 'Orientações',
    published: true,
    createdAt: Date.now() - 86400000,
    updatedAt: Date.now() - 86400000,
  },
];

export function getBlogPosts(): BlogPost[] {
  if (typeof window === 'undefined') return samplePosts;

  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(samplePosts));
    return samplePosts;
  }
  return JSON.parse(stored);
}

export function getPublishedPosts(): BlogPost[] {
  return getBlogPosts().filter(post => post.published).sort((a, b) => b.createdAt - a.createdAt);
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return getBlogPosts().find(post => post.slug === slug && post.published);
}

export function getPostById(id: string): BlogPost | undefined {
  return getBlogPosts().find(post => post.id === id);
}

export function savePost(post: Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt'> & { id?: string }): BlogPost {
  const posts = getBlogPosts();
  const now = Date.now();

  if (post.id) {
    // Update existing
    const index = posts.findIndex(p => p.id === post.id);
    if (index !== -1) {
      posts[index] = { ...posts[index], ...post, updatedAt: now };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
      return posts[index];
    }
  }

  // Create new
  const newPost: BlogPost = {
    ...post,
    id: Date.now().toString(),
    createdAt: now,
    updatedAt: now,
  };
  posts.push(newPost);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
  return newPost;
}

export function deletePost(id: string): void {
  const posts = getBlogPosts().filter(p => p.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
}

export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}
