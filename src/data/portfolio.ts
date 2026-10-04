import type { PortfolioData } from '@/types/portfolio'

export const portfolio: PortfolioData = {
  name: 'Heitor Carvalho',
  localName: '',
  years: '2025–2026',
  role: 'Desenvolvedor de Software',
  disciplines: ['Criação de sites', 'Lojas online', 'Sistemas web'],
  word: 'Portfolio',
  tag: '#HEITOR',
  subtitle: ['Sites que ', 'vendem'],
  notes: ['Conversar', 'Criar', 'Publicar'],
  blurb:
    'Crio sites rápidos, bonitos e fáceis de usar para o seu negócio ser encontrado e conquistar mais clientes, da ideia até o site no ar.',
  greeting: 'Olá, eu sou',
  timeZone: 'America/Sao_Paulo',
  timeZoneLabel: 'São Paulo',
  email: 'heitormanoel05@gmail.com',
  colors: {
    blue: '#5b5bf0',
    green: '#14b8a6',
    orange: '#f43f5e',
    yellow: '#fde68a',
  },
  categories: [
    { id: 'brand', label: 'Front-end', tone: 'blue', kind: 'brand' },
    // Back-end: sem projetos por enquanto. Descomente junto com um projeto 'pack'.
    // { id: 'pack', label: 'Back-end', tone: 'orange', kind: 'render' },
    { id: 'motion', label: 'Full Stack', tone: 'green', kind: 'poster' },
  ],
  projects: [
    {
      title: 'Falaê',
      category: 'brand',
      year: '2026',
      summary:
        'Página institucional de uma escola de idiomas, com turmas ao vivo e teste de nível grátis.',
      body: [
        'Landing page responsiva para uma escola que ensina inglês, espanhol, francês, italiano, alemão e japonês em turmas de até 8 alunos.',
      ],
      role: 'Desenvolvimento front-end',
      tools: ['React', 'TypeScript', 'Tailwind CSS', 'Vercel'],
      mark: 'FALAE',
      href: 'https://falae-page.vercel.app/',
    },
    {
      title: 'Chapa Quente',
      category: 'brand',
      year: '2026',
      summary:
        'Site de uma hamburgueria com cardápio interativo e pedidos enviados direto pelo WhatsApp.',
      body: [
        'Conceito de site para um burger bar em São Paulo. O hambúrguer é montado camada por camada conforme a página rola, e o cliente monta a sacola no cardápio e envia o pedido pronto pelo WhatsApp, com entrega ou retirada e forma de pagamento.',
      ],
      role: 'Desenvolvimento front-end',
      tools: ['React', 'TypeScript', 'Tailwind CSS', 'Vercel'],
      mark: 'CHAPA',
      href: 'https://chapa-quente-six.vercel.app/',
    },
    {
      title: 'ClipDown',
      category: 'motion',
      year: '2026',
      summary:
        'Ferramenta web para baixar vídeos por link e converter vídeos e imagens, sem anúncios nem pop-ups.',
      body: [
        'Baixa vídeos por URL, converte MP4 em MP3 ou GIF e troca imagens entre PNG, JPG, WebP, GIF e BMP. Tudo roda localmente, em uma tela única e minimalista.',
      ],
      role: 'Desenvolvimento full stack',
      tools: ['Angular', '.NET 9', 'Tailwind CSS', 'FFmpeg', 'yt-dlp'],
      mark: 'CLIP',
      href: 'https://github.com/lonelykkj/ClipDown',
    },
    // Back-end: adicione aqui quando houver projetos.
    // {
    //   title: '',
    //   category: 'pack',
    //   year: '',
    //   summary: '',
    //   tools: [],
    //   mark: '',
    // },
  ],
  highlights: [
    {
      label: 'Seu site completo',
      tone: 'blue',
      lines: ['Da ideia ao site no ar', 'Visual moderno e profissional'],
    },
    {
      label: 'Funciona em tudo',
      tone: 'green',
      lines: ['Celular, tablet e computador', 'Rápido e fácil de usar'],
    },
    {
      label: 'Experiência',
      tone: 'orange',
      lines: ['Desenvolvedor completo', 'Front-end, Back-end e Full Stack'],
    },
  ],
  timeline: [
    { from: '2025', to: 'Agora', title: 'Desenvolvedor de Software', place: 'DM' },
    { from: '2025', to: 'Agora', title: 'Ciência da Computação', place: 'UNINTER' },
  ],
  chapters: [
    { title: 'Quem sou eu', points: ['Trajetória', 'Habilidades'], target: 'about' },
    { title: 'Projetos', points: ['Front-end', 'Back-end', 'Full Stack'], target: 'work' },
    { title: 'Vamos conversar', target: 'contact' },
  ],
  steps: [
    {
      title: 'Conversar',
      body: 'Uma conversa rápida para entender o seu negócio, seus objetivos e o que você precisa.',
      outputs: ['Proposta'],
    },
    {
      title: 'Criar',
      body: 'Você acompanha o site ganhando forma e aprova cada etapa antes de seguir.',
      outputs: ['Layout', 'Site pronto'],
    },
    {
      title: 'Publicar',
      body: 'O site vai ao ar, funcionando bem em qualquer aparelho, com suporte depois da entrega.',
      outputs: ['Site no ar'],
    },
  ],
  words: [],
  contacts: [
    {
      label: 'WhatsApp',
      value: '(12) 98299-8077',
      href: 'https://wa.me/5512982998077',
    },
    {
      label: 'GitHub',
      value: 'Heitor Carvalho',
      href: 'https://github.com/lonelykkj',
    },
    {
      label: 'LinkedIn',
      value: 'linkedin.com/in/heitor-manoel',
      href: 'https://www.linkedin.com/in/heitor-manoel-465413250/',
    },
  ],
}
