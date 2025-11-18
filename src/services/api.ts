import type { ProjetoEmpresa, MatchRequest, MatchResult, Vaga, PerfilUsuario } from '../types/projeto'

const BASE_URL = import.meta.env.VITE_API_URL || ''

export interface ContatoPayload {
  nome: string
  email: string
  mensagem: string
}

export interface ContatoResponse {
  ok: boolean
  message?: string
}

/**
 * Busca todos os projetos da API
 */
export async function getProjetos(): Promise<ProjetoEmpresa[]> {
  if (!BASE_URL) {
    throw new Error('VITE_API_URL não configurada. Configure a variável de ambiente.')
  }

  try {
    const response = await fetch(`${BASE_URL}/projetos`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (!response.ok) {
      throw new Error(`Erro ao buscar projetos: ${response.statusText}`)
    }

    const data = await response.json()
    return Array.isArray(data) ? data : []
  } catch (error) {
    console.error('Erro ao buscar projetos:', error)
    throw error
  }
}

/**
 * Busca um projeto específico por ID
 */
export async function getProjetoById(id: string): Promise<ProjetoEmpresa | null> {
  if (!BASE_URL) {
    throw new Error('VITE_API_URL não configurada. Configure a variável de ambiente.')
  }

  try {
    const response = await fetch(`${BASE_URL}/projetos/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (!response.ok) {
      if (response.status === 404) {
        return null
      }
      throw new Error(`Erro ao buscar projeto: ${response.statusText}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Erro ao buscar projeto:', error)
    throw error
  }
}

/**
 * Envia mensagem de contato
 */
export async function postContato(payload: ContatoPayload): Promise<ContatoResponse> {
  if (!BASE_URL) {
    throw new Error('VITE_API_URL não configurada. Configure a variável de ambiente.')
  }

  try {
    const response = await fetch(`${BASE_URL}/contato`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })

    if (!response.ok) {
      throw new Error(`Erro ao enviar contato: ${response.statusText}`)
    }

    const data = await response.json()
    return { ok: true, ...data }
  } catch (error) {
    console.error('Erro ao enviar contato:', error)
    throw error
  }
}

/**
 * Busca todas as vagas disponíveis
 */
export async function getVagas(): Promise<Vaga[]> {
  if (!BASE_URL) {
    throw new Error('VITE_API_URL não configurada. Configure a variável de ambiente.')
  }

  try {
    const response = await fetch(`${BASE_URL}/vagas`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (!response.ok) {
      throw new Error(`Erro ao buscar vagas: ${response.statusText}`)
    }

    const data = await response.json()
    return Array.isArray(data) ? data : []
  } catch (error) {
    console.error('Erro ao buscar vagas:', error)
    throw error
  }
}

/**
 * Realiza match de vagas com base no perfil do usuário
 */
export async function matchVagas(request: MatchRequest): Promise<MatchResult[]> {
  if (!BASE_URL) {
    throw new Error('VITE_API_URL não configurada. Configure a variável de ambiente.')
  }

  try {
    const response = await fetch(`${BASE_URL}/vagas/match`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(request)
    })

    if (!response.ok) {
      throw new Error(`Erro ao realizar match: ${response.statusText}`)
    }

    const data = await response.json()
    return Array.isArray(data) ? data : []
  } catch (error) {
    console.error('Erro ao realizar match:', error)
    throw error
  }
}

/**
 * Busca uma vaga específica por ID
 */
export async function getVagaById(id: string): Promise<Vaga | null> {
  if (!BASE_URL) {
    throw new Error('VITE_API_URL não configurada. Configure a variável de ambiente.')
  }

  try {
    const response = await fetch(`${BASE_URL}/vagas/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (!response.ok) {
      if (response.status === 404) {
        return null
      }
      throw new Error(`Erro ao buscar vaga: ${response.statusText}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Erro ao buscar vaga:', error)
    throw error
  }
}

