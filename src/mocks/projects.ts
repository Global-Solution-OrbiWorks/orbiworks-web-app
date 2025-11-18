export type Project = {
  id: string
  title: string
  description: string
  company?: string
  tags?: string[]
}

const projects: Project[] = [
  {
    id: 'pr1',
    title: 'Portal de Portfólio',
    description: 'Construir um portal para que profissionais mostrem projetos reais para empresas parceiras.',
    company: 'Empresa A',
    tags: ['frontend', 'portfólio']
  },
  {
    id: 'pr2',
    title: 'API de Match de Vagas',
    description: 'Microserviço para casar habilidades de perfis com vagas e projetos reais.',
    company: 'Empresa B',
    tags: ['backend', 'ml']
  }
]

export default projects
