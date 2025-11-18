export type Person = {
  id: string
  name: string
  role: string
  bio: string
  avatar?: string // url or data
  github?: string
  linkedin?: string
}

const persons: Person[] = [
  {
    id: 'p1',
    name: 'Mariana Silva',
    role: 'Head de Produto',
    bio: 'Foca em projetos que conectam formação e oportunidades reais. Coordena trilhas e parcerias.',
    avatar: '',
    github: 'https://github.com/mariana-silva',
    linkedin: 'https://linkedin.com/in/mariana-silva'
  },
  {
    id: 'p2',
    name: 'Lucas Pereira',
    role: 'Engenheiro de Machine Learning',
    bio: 'Desenvolve os modelos de recomendação de trilhas e identificação de gaps de skills.',
    avatar: '',
    github: 'https://github.com/lucaspereira',
    linkedin: 'https://linkedin.com/in/lucaspereira'
  },
  {
    id: 'p3',
    name: 'Ana Costa',
    role: 'Designer de Interação',
    bio: 'Cuida da experiência de aprendizagem, acessibilidade e bem-estar nas jornadas.',
    avatar: '',
    github: '',
    linkedin: 'https://linkedin.com/in/anacosta'
  }
]

export default persons
