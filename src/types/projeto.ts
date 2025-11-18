export type Nivel = 'Beginner' | 'Intermediate' | 'Advanced'

export type Area = 'frontend' | 'backend' | 'ml' | 'fullstack'

export interface ProjetoBase {
  id: string
  titulo: string
  area: Area
}

export interface ProjetoEmpresa extends ProjetoBase {
  empresa: string
  nivel?: Nivel
  descricao?: string
}

export type Projeto = ProjetoBase & {
  tags?: string[]
}

// Tipos para API de Match de Vagas
export interface Skill {
  nome: string
  nivel: Nivel
}

export interface PerfilUsuario {
  id?: string
  nome: string
  email: string
  skills: Skill[]
  areaInteresse?: Area
  experienciaAnos?: number
}

export interface Vaga {
  id: string
  titulo: string
  empresa: string
  area: Area
  nivel: Nivel
  descricao: string
  skillsRequeridas: Skill[]
  localizacao?: string
  tipo?: 'remoto' | 'presencial' | 'hibrido'
  salario?: string
}

export interface MatchResult {
  vaga: Vaga
  score: number
  compatibilidade: number
  skillsMatch: Skill[]
  skillsFaltantes: Skill[]
  recomendacao: string
}

export interface MatchRequest {
  perfil: PerfilUsuario
  filtros?: {
    area?: Area
    nivel?: Nivel
    localizacao?: string
    tipo?: 'remoto' | 'presencial' | 'hibrido'
  }
}

