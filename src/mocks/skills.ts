export type Skill = {
  id: string
  title: string
  description: string
  level: 'Beginner' | 'Intermediate' | 'Advanced'
}

const skills: Skill[] = [
  { id: 's1', title: 'Frontend Moderno', description: 'HTML, CSS moderno, React e arquiteturas SPA.', level: 'Intermediate' },
  { id: 's2', title: 'Data Science Básico', description: 'Processamento de dados, visualização e modelos simples.', level: 'Beginner' },
  { id: 's3', title: 'Machine Learning Aplicado', description: 'Modelos supervisionados para problemas de negócio.', level: 'Advanced' }
]

export default skills
