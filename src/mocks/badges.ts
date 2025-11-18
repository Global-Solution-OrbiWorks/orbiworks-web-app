export type Badge = {
  id: string
  label: string
  description?: string
}

const badges: Badge[] = [
  { id: 'b1', label: 'Collaborator', description: 'Participou de 3 projetos com empresas.' },
  { id: 'b2', label: 'Mentor', description: 'Contribuiu com orientação em squads.' }
]

export default badges
