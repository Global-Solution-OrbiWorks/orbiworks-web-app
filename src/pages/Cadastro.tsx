import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Input from '../components/Input'
import Button from '../components/Button'
import type { Area } from '../types/orbiworks'
import { AREA_INTERESSE_OPTIONS } from '../constants/areas'

export default function Cadastro() {
  const [formData, setFormData] = useState({
    nome: '',
    sobrenome: '',
    email: '',
    senha: '',
    telefone: '',
    tipoCliente: '',
    areaInteresse: '' as Area | '',
    disponibilidadeHoras: ''
  })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const { register, loading } = useAuth()
  const navigate = useNavigate()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess(false)

    if (!formData.nome || !formData.email || !formData.senha) {
      setError('Por favor, preencha os campos obrigatórios (Nome, Email e Senha)')
      return
    }

    try {
      const disponibilidade = formData.disponibilidadeHoras
        ? parseInt(formData.disponibilidadeHoras, 10)
        : undefined
      const disponibilidadeValida =
        disponibilidade && disponibilidade >= 4 && disponibilidade <= 16
          ? disponibilidade
          : undefined

      const payload: any = {
        nome: formData.nome,
        sobrenome: formData.sobrenome || undefined,
        email: formData.email,
        senha: formData.senha,
        telefone: formData.telefone || undefined,
        tipoCliente: formData.tipoCliente || undefined,
        areaInteresse: formData.areaInteresse || undefined,
        disponibilidadeHoras: disponibilidadeValida
      }

      // Campos snake_case para compatibilidade com o backend
      if (payload.tipoCliente) payload.tipo_cliente = payload.tipoCliente
      if (payload.areaInteresse) payload.area_interesse = payload.areaInteresse
      if (payload.disponibilidadeHoras !== undefined) {
        payload.disponibilidade_horas = payload.disponibilidadeHoras
      }

      // Remove campos undefined
      Object.keys(payload).forEach((key) => payload[key] === undefined && delete payload[key])

      await register(payload)
      setSuccess(true)
      setTimeout(() => {
        navigate('/')
      }, 2000)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao criar conta')
    }
  }

  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-gray-100">
            Criar nova conta
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            Ou{' '}
            <Link
              to="/login"
              className="font-medium text-orbiwork-primary-600 hover:text-orbiwork-primary-500"
            >
              faça login na sua conta existente
            </Link>
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 px-4 py-3 rounded-md">
              {error}
            </div>
          )}
          {success && (
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-300 px-4 py-3 rounded-md">
              Conta criada com sucesso! Redirecionando...
            </div>
          )}
          <div className="space-y-4">
            <Input
              label="Nome *"
              type="text"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              required
              placeholder="Seu nome"
            />
            <Input
              label="Sobrenome"
              type="text"
              name="sobrenome"
              value={formData.sobrenome}
              onChange={handleChange}
              placeholder="Seu sobrenome"
            />
            <Input
              label="Email *"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="seu@email.com"
            />
            <Input
              label="Senha *"
              type="password"
              name="senha"
              value={formData.senha}
              onChange={handleChange}
              required
              placeholder="••••••••"
            />
            <Input
              label="Telefone"
              type="tel"
              name="telefone"
              value={formData.telefone}
              onChange={handleChange}
              placeholder="(00) 00000-0000"
            />
            <div>
              <label htmlFor="tipoCliente" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Tipo de Cliente
              </label>
              <select
                id="tipoCliente"
                name="tipoCliente"
                value={formData.tipoCliente}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-orbiwork-primary-500"
              >
                <option value="">Selecione...</option>
                <option value="Estudante">Estudante</option>
                <option value="Profissional">Profissional</option>
                <option value="Empresa">Empresa</option>
              </select>
            </div>
            <div>
              <label htmlFor="areaInteresse" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Área de Interesse
              </label>
              <select
                id="areaInteresse"
                name="areaInteresse"
                value={formData.areaInteresse}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-orbiwork-primary-500"
              >
                <option value="">Selecione...</option>
                {AREA_INTERESSE_OPTIONS.map((group) => (
                  <optgroup key={group.label} label={group.label}>
                    {group.options.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>
            </div>
            <Input
              label="Disponibilidade diária (horas/dia)"
              type="number"
              name="disponibilidadeHoras"
              value={formData.disponibilidadeHoras}
              onChange={handleChange}
              placeholder="Ex: 8"
              min="4"
              max="16"
              step="1"
            />
          </div>

          <div>
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? 'Criando conta...' : 'Criar conta'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

