// Todo o conteudo textual transcrito FIELMENTE dos prints do Figma.
// Imagens otimizadas vivem em /assets (ver scripts/optimize-images.mjs).

export const hero = {
  headingLead: 'Seja o primeiro da sua região',
  headingAccent: 'a levar a tecnologia Somno',
  sub: 'Condição exclusiva Formóbile para transformar seu produto em uma experiência completa de conforto e bem-estar.',
  cta: 'QUERO GARANTIR EXCLUSIVIDADE',
  image: 'hero',
} as const

export const stats = {
  brand: 'Rainoah',
  headingAccent: '39 anos no mercado.',
  headingRest: 'E o maior ainda está por vir.',
  paragraph:
    'A Rainoah é referência consolidada em massageadores. O lançamento do Somno chega num momento único: o mercado de bem-estar e o setor moveleiro crescendo juntos.',
  cards: [
    { icon: 'icon-positive', value: '39+', label: 'Anos de expertise em massageadores' },
    { icon: 'icon-revenue', value: 'R$1,5bi', label: 'Mercado de massagem no Brasil em 2023 (ABRAMAS)' },
    { icon: 'icon-money', value: 'R$127,7bi', label: 'Varejo moveleiro em 2024 — crescimento de 10,6% (IEMI)' },
    { icon: 'icon-health', value: '16,5%', label: 'Crescimento do setor de saúde e bem-estar em 2024' },
    { icon: 'icon-network', value: '22,3mil', label: 'Empresas ativas no setor moveleiro brasileiro (Abimóvel)' },
    { icon: 'icon-massage', value: '100mil+', label: 'Profissionais de massagem no Brasil e crescendo' },
  ],
} as const

export const comparison = {
  headingLead: 'Não é só mais um sistema de massagem.',
  headingAccent: 'Compare e veja a diferença.',
  sub: 'O mercado tem opções. Mas nenhuma reúne tudo que o Somno entrega.',
  colCommon: 'Mercado Comum',
  colCommonSub: '(Sistemas convencionais)',
  colSomno: 'Somno',
  rows: [
    { f: 'Programas de massagem', common: '2 a 8 programas', somno: '20 Programas', neg: false },
    { f: 'Zonas de massagem', common: '1 a 2 zonas', somno: '4 zonas', neg: false },
    { f: 'Níveis de intensidade', common: '2 níveis', somno: '10 níveis', neg: false },
    { f: 'Cromoterapia integrada', common: 'Não possui', somno: '3 opções', neg: true },
    { f: 'Terapia BioQuântica', common: 'Não possui', somno: 'Incluída', neg: true },
    { f: 'Despertador vibratório', common: 'Não possui', somno: 'Incluído', neg: true },
    { f: 'Tela touchscreen colorida', common: 'Controle simples', somno: 'Touchscreen HD', neg: true },
    { f: 'Massagem bilateral (casal)', common: 'Alguns modelos', somno: 'Padrão', neg: false },
    { f: 'Inclinação automática', common: 'Controle separado', somno: '1 Controle Spring', neg: true },
    { f: 'Plug and play', common: 'Parcialmente', somno: '100%', neg: false },
    { f: 'Suporte direto do fabricante', common: 'Via distribuidor', somno: 'Whatsapp - 24h', neg: true },
    { f: 'Experiência no segmento', common: 'Variável', somno: '39 anos', neg: false },
  ],
  cta: 'QUERO GARANTIR EXCLUSIVIDADE',
} as const

export type Product = {
  id: string
  name: string
  sub: string
  desc: string
  features: string[]
  image: string
  variant: 'navy' | 'charcoal'
  imageSide: 'left' | 'right'
}

export const products: Product[] = [
  {
    id: 'colchoes',
    name: 'Somno',
    sub: 'Para colchões',
    desc: '16 combinações de pontos, 3 níveis de\nintensidade e inclinação automática, tudo\nplug and play em um único controle.',
    features: ['20 programas', 'Cromoterapia', 'BioQuântica', '10 níveis', 'Despertador vibratório', 'Touchscreen'],
    image: 'colchoes',
    variant: 'navy',
    imageSide: 'left',
  },
  {
    id: 'spring',
    name: 'Somno Spring',
    sub: 'Para poltronas',
    desc: '16 combinações de pontos, 3 níveis de\nintensidade e inclinação automática, tudo\nplug and play em um único controle.',
    features: ['Plug and play', 'Inclinação automática', '16 combinações', '3 níveis', '1 controle para tudo'],
    image: 'spring',
    variant: 'charcoal',
    imageSide: 'right',
  },
]

export const applications = {
  heading: 'Aplicações',
  items: [
    { label: 'Colchões', image: 'app-colchoes' },
    { label: 'Poltronas', image: 'app-poltronas' },
    { label: 'Sofás', image: 'app-sofas' },
    { label: 'Cadeiras de barbeiro', image: 'app-barbeiro' },
    { label: 'Equipos odontológicos', image: 'app-odonto' },
  ],
  cta: 'QUERO INTEGRAR AO MEU PRODUTO',
} as const

export const video = {
  headingLead: 'Veja\nfuncionando\nvocê entende em\nsegundos por',
  headingAccent: 'que esse produto\nvende sozinho.',
  sub: 'Imagine essa demonstração\nno seu showroom.',
} as const

export const benefits = {
  headingAccent: 'Mais valor pro seu produto.',
  headingRest: 'Mais motivo pro cliente escolher você.',
  items: [
    { icon: 'icon-growth', title: 'Aumenta seu ticket médio', text: 'Tecnologia embarcada justifica preço maior e melhora a sua margem.' },
    { icon: 'icon-plug', title: 'Integração simples, sem redesenho', text: 'Plug and play. Adapta ao que você já fabrica.' },
    { icon: 'icon-badge', title: 'A experiência vende', text: 'Quem senta e experimenta dificilmente sai sem comprar.' },
    { icon: 'icon-support', title: 'Assistência rápida, contato direto', text: 'Suporte ágil via WhatsApp. Sem fila, sem demora.' },
    { icon: 'icon-location', title: 'Exclusividade regional disponível', text: 'Seja o primeiro da sua região. Quem entra agora leva vantagem.' },
  ],
} as const

export const leadForm = {
  headingLead: 'Garanta agora sua',
  headingAccent: 'condição exclusiva',
  headingTail: 'de lançamento.',
  sub: 'Nossa equipe entra em contato direto com uma proposta para o seu produto. Vagas limitadas.',
  note: 'Seus dados estão seguros. Retorno em até 24h.',
  fields: [
    { name: 'nome', label: 'Nome completo', type: 'text', autoComplete: 'name' },
    { name: 'whatsapp', label: 'WhatsApp', type: 'tel', autoComplete: 'tel' },
    { name: 'email', label: 'E-mail', type: 'email', autoComplete: 'email' },
    { name: 'empresa', label: 'Empresa / fábrica', type: 'text', autoComplete: 'organization' },
    { name: 'segmento', label: 'Segmento', type: 'text', autoComplete: 'off' },
    { name: 'cidade', label: 'Cidade', type: 'text', autoComplete: 'address-level2' },
  ],
  submit: 'Quero garantir minha condição exclusiva',
} as const
