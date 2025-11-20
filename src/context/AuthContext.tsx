import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import type { Orbiworks } from '../types/orbiworks'

interface AuthContextType {
  user: Orbiworks | null
  isAuthenticated: boolean
  login: (email: string, senha: string) => Promise<void>
  register: (userData: Partial<Orbiworks>) => Promise<void>
  updateProfile: (userData: Partial<Orbiworks>) => Promise<void>
  deleteProfile: () => Promise<void>
  logout: () => void
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<Orbiworks | null>(() => {
    const stored = localStorage.getItem('user')
    if (stored) {
      try {
        return JSON.parse(stored)
      } catch {
        return null
      }
    }
    return null
  })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user))
    } else {
      localStorage.removeItem('user')
    }
  }, [user])

  const login = async (email: string, senha: string) => {
    setLoading(true)
    try {
      const response = await fetch('https://rm564969orbiworksgs.onrender.com/orbiworks', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if (!response.ok) {
        throw new Error('Erro ao buscar usuários')
      }

      const data = await response.json()
      const users = Array.isArray(data) ? data : (data.data || [])
      
      // Buscar usuário por email e senha
      const foundUser = users.find((u: Orbiworks) => 
        u.email === email && u.senha === senha
      )

      if (!foundUser) {
        throw new Error('Email ou senha incorretos')
      }

      setUser(foundUser)
    } catch (error) {
      console.error('Erro ao fazer login:', error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const register = async (userData: Partial<Orbiworks>) => {
    setLoading(true)
    try {
      const response = await fetch('https://rm564969orbiworksgs.onrender.com/orbiworks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.message || 'Erro ao criar conta')
      }

      const result = await response.json()
      const newUser = result.data || result
      setUser(newUser)
    } catch (error) {
      console.error('Erro ao criar conta:', error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const updateProfile = async (userData: Partial<Orbiworks>) => {
    if (!user?.codigo) {
      throw new Error('Usuário não encontrado')
    }

    setLoading(true)
    try {
      const response = await fetch(`https://rm564969orbiworksgs.onrender.com/orbiworks/${user.codigo}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.message || 'Erro ao atualizar perfil')
      }

      const result = await response.json()
      const updatedUser = result.data || result
      setUser(updatedUser)
    } catch (error) {
      console.error('Erro ao atualizar perfil:', error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const deleteProfile = async () => {
    if (!user?.codigo) {
      throw new Error('Usuário não encontrado')
    }

    setLoading(true)
    try {
      const response = await fetch(`https://rm564969orbiworksgs.onrender.com/orbiworks/${user.codigo}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.message || 'Erro ao deletar conta')
      }

      setUser(null)
      localStorage.removeItem('user')
    } catch (error) {
      console.error('Erro ao deletar conta:', error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        register,
        updateProfile,
        deleteProfile,
        logout,
        loading
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

