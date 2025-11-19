// Tipos para a API Orbiworks
export interface Orbiworks {
  codigo?: number
  nome?: string
  email?: string
  telefone?: string
  [key: string]: any // Permite campos adicionais da API
}

export interface Habilidade {
  codigo?: number
  codCliente?: number
  nome?: string
  nivel?: string
  descricao?: string
  [key: string]: any // Permite campos adicionais da API
}

export interface OrbiworksResponse {
  data?: Orbiworks[]
  message?: string
  success?: boolean
}

export interface HabilidadeResponse {
  data?: Habilidade[]
  message?: string
  success?: boolean
}

