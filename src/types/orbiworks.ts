// Tipos para a API Orbiworks - Contrato Real
export type Nivel = 'Beginner' | 'Intermediate' | 'Advanced'

export type Area = 'frontend' | 'backend' | 'fullstack' | 'ml'

export interface Orbiworks {
  codigo?: number
  nome?: string
  sobrenome?: string
  email?: string
  senha?: string
  telefone?: string
  tipoCliente?: string
  areaInteresse?: Area
  disponibilidadeHoras?: number
  dataContaCriada?: string
  [key: string]: any // Permite campos adicionais da API
}

export interface Habilidade {
  codigo?: number
  codCliente: number
  nome: string
  nivel: Nivel
  descricao?: string
  [key: string]: any // Permite campos adicionais da API
}

export interface Skill {
  nome: string
  nivel: Nivel
}

export interface PerfilUsuario {
  nome: string
  email: string
  skills: Skill[]
  areaInteresse: Area
  experienciaAnos: number
}

// Tipos para match local (calculado no front)
export interface ClienteComHabilidades {
  id: string
  nome: string
  email: string
  habilidades: Skill[]
  codigo?: number
  sobrenome?: string
  tipoCliente?: string
  areaInteresse?: Area
  disponibilidadeHoras?: number
  dataContaCriada?: string
}

export interface MatchLocalResult {
  cliente: ClienteComHabilidades
  score: number
  compatibilidade: number
  skillsMatch: Skill[]
  skillsFaltantes: Skill[]
  recomendacao: string
}
