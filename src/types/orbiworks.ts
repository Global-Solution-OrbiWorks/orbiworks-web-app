// Tipos para a API Orbiworks - Contrato Real
export type Nivel = 'Beginner' | 'Intermediate' | 'Advanced'

// Áreas de interesse podem variar conforme o cadastro no backend.
// Mantemos como string para permitir valores flexíveis.
export type Area = string

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
  nome?: string // HABILIDADE_DESC - mantido para compatibilidade
  nivel?: Nivel // Mantido para compatibilidade
  descricao?: string // HABILIDADE_DESC - mantido para compatibilidade
  habilidadeDesc?: string // HABILIDADE_DESC
  nivelIngles?: string // NIVEL_INGLES
  objetivoProfissional?: string // OBJETIVO_PROFISSIONAL
  areaDesejada?: string // AREA_DESEJADA
  pretencaoSalarial?: number // PRETENSAO_SALARIAL
  disponibilidadeHoras?: string // DISPONIBILIDADE_HORAS
  localidadeDesejada?: string // LOCALIDADE_DESEJADA
  modalidadeDesejada?: string // MODALIDADE_DESEJADA
  descricaoSobreMim?: string // DESCRICAO_SOBRE_MIM
  contatoWhatsapp?: string // CONTATO_WHATSAPP
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
