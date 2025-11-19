import type { ProjetoEmpresa, MatchRequest, MatchResult, Vaga, PerfilUsuario } from '../types/projeto'
import type { Orbiworks, Habilidade } from '../types/orbiworks'

const BASE_URL = import.meta.env.VITE_API_URL || 'https://rm564969orbiworksgs.onrender.com'

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
 * Busca todos os registros Orbiworks da API
 */
export async function findAllOrbiworks(): Promise<Orbiworks[]> {
  try {
    const response = await fetch(`${BASE_URL}/orbiworks`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (!response.ok) {
      throw new Error(`Erro ao buscar registros: ${response.statusText}`)
    }

    const data = await response.json()
    // A API pode retornar um array diretamente ou dentro de um objeto
    if (Array.isArray(data)) {
      return data
    }
    if (data.data && Array.isArray(data.data)) {
      return data.data
    }
    return []
  } catch (error) {
    console.error('Erro ao buscar registros Orbiworks:', error)
    throw error
  }
}

/**
 * Busca todos os projetos da API (compatibilidade)
 */
export async function getProjetos(): Promise<ProjetoEmpresa[]> {
  try {
    const orbiworks = await findAllOrbiworks()
    // Converter Orbiworks para ProjetoEmpresa
    return orbiworks.map((item, index) => ({
      id: item.codigo?.toString() || `pr${index + 1}`,
      titulo: item.nome || 'Projeto sem título',
      area: 'fullstack' as const,
      empresa: item.email || 'Não especificada',
      nivel: 'Intermediate' as const,
      descricao: item.telefone || 'Sem descrição disponível'
    }))
  } catch (error) {
    console.error('Erro ao buscar projetos:', error)
    throw error
  }
}

/**
 * Busca um registro Orbiworks por ID
 */
export async function findOrbiworksById(codigo: number): Promise<Orbiworks | null> {
  try {
    const response = await fetch(`${BASE_URL}/orbiworks/${codigo}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (!response.ok) {
      if (response.status === 404) {
        return null
      }
      throw new Error(`Erro ao buscar registro: ${response.statusText}`)
    }

    const data = await response.json()
    return data.data || data
  } catch (error) {
    console.error('Erro ao buscar registro Orbiworks:', error)
    throw error
  }
}

/**
 * Busca um projeto específico por ID (compatibilidade)
 */
export async function getProjetoById(id: string): Promise<ProjetoEmpresa | null> {
  try {
    const codigo = parseInt(id)
    if (isNaN(codigo)) {
      return null
    }

    const orbiworks = await findOrbiworksById(codigo)
    if (!orbiworks) {
      return null
    }

    return {
      id: orbiworks.codigo?.toString() || id,
      titulo: orbiworks.nome || 'Projeto sem título',
      area: 'fullstack' as const,
      empresa: orbiworks.email || 'Não especificada',
      nivel: 'Intermediate' as const,
      descricao: orbiworks.telefone || 'Sem descrição disponível'
    }
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
  try {
    const codigo = parseInt(id)
    if (isNaN(codigo)) {
      return null
    }

    const orbiworks = await findOrbiworksById(codigo)
    if (!orbiworks) {
      return null
    }

    // Converter para Vaga (estrutura simplificada)
    return {
      id: orbiworks.codigo?.toString() || id,
      titulo: orbiworks.nome || 'Vaga sem título',
      empresa: orbiworks.email || 'Não especificada',
      area: 'fullstack' as const,
      nivel: 'Intermediate' as const,
      descricao: orbiworks.telefone || 'Sem descrição disponível',
      skillsRequeridas: []
    }
  } catch (error) {
    console.error('Erro ao buscar vaga:', error)
    throw error
  }
}

// ==================== CRUD Orbiworks ====================

/**
 * Cria um novo registro Orbiworks
 */
export async function saveOrbiworks(data: Orbiworks): Promise<Orbiworks> {
  try {
    const response = await fetch(`${BASE_URL}/orbiworks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })

    if (!response.ok) {
      throw new Error(`Erro ao criar registro: ${response.statusText}`)
    }

    const result = await response.json()
    return result.data || result
  } catch (error) {
    console.error('Erro ao criar registro Orbiworks:', error)
    throw error
  }
}

/**
 * Atualiza um registro Orbiworks
 */
export async function updateOrbiworks(codigo: number, data: Orbiworks): Promise<Orbiworks> {
  try {
    const response = await fetch(`${BASE_URL}/orbiworks/${codigo}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })

    if (!response.ok) {
      throw new Error(`Erro ao atualizar registro: ${response.statusText}`)
    }

    const result = await response.json()
    return result.data || result
  } catch (error) {
    console.error('Erro ao atualizar registro Orbiworks:', error)
    throw error
  }
}

/**
 * Deleta um registro Orbiworks
 */
export async function deleteOrbiworks(codigo: number): Promise<boolean> {
  try {
    const response = await fetch(`${BASE_URL}/orbiworks/${codigo}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (!response.ok) {
      throw new Error(`Erro ao deletar registro: ${response.statusText}`)
    }

    return true
  } catch (error) {
    console.error('Erro ao deletar registro Orbiworks:', error)
    throw error
  }
}

// ==================== CRUD Habilidades ====================

/**
 * Busca habilidades por código do cliente
 */
export async function findHabilidadesByCliente(codCliente: number): Promise<Habilidade[]> {
  try {
    const response = await fetch(`${BASE_URL}/habilidades/cliente/${codCliente}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (!response.ok) {
      throw new Error(`Erro ao buscar habilidades: ${response.statusText}`)
    }

    const data = await response.json()
    if (Array.isArray(data)) {
      return data
    }
    if (data.data && Array.isArray(data.data)) {
      return data.data
    }
    return []
  } catch (error) {
    console.error('Erro ao buscar habilidades:', error)
    throw error
  }
}

/**
 * Cria uma nova habilidade
 */
export async function saveHabilidade(data: Habilidade): Promise<Habilidade> {
  try {
    const response = await fetch(`${BASE_URL}/habilidades`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })

    if (!response.ok) {
      throw new Error(`Erro ao criar habilidade: ${response.statusText}`)
    }

    const result = await response.json()
    return result.data || result
  } catch (error) {
    console.error('Erro ao criar habilidade:', error)
    throw error
  }
}

/**
 * Atualiza uma habilidade
 */
export async function updateHabilidade(codigo: number, data: Habilidade): Promise<Habilidade> {
  try {
    const response = await fetch(`${BASE_URL}/habilidades/cliente/${codigo}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })

    if (!response.ok) {
      throw new Error(`Erro ao atualizar habilidade: ${response.statusText}`)
    }

    const result = await response.json()
    return result.data || result
  } catch (error) {
    console.error('Erro ao atualizar habilidade:', error)
    throw error
  }
}

/**
 * Deleta uma habilidade
 */
export async function deleteHabilidade(codigo: number): Promise<boolean> {
  try {
    const response = await fetch(`${BASE_URL}/habilidades/cliente/${codigo}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (!response.ok) {
      throw new Error(`Erro ao deletar habilidade: ${response.statusText}`)
    }

    return true
  } catch (error) {
    console.error('Erro ao deletar habilidade:', error)
    throw error
  }
}

