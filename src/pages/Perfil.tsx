import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Input from '../components/Input'
import Button from '../components/Button'
import type { Area } from '../types/orbiworks'

export default function Perfil() {
  const { user, updateProfile, deleteProfile, loading } = useAuth()
  const navigate = useNavigate()
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
  const [success, setSuccess] = useState('')
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  useEffect(() => {
    if (!user) {
      navigate('/login')
      return
    }

    setFormData({
      nome: user.nome || '',
      sobrenome: user.sobrenome || '',
      email: user.email || '',
      senha: '',
      telefone: user.telefone || '',
      tipoCliente: user.tipoCliente || '',
      areaInteresse: user.areaInteresse || '',
      disponibilidadeHoras: user.disponibilidadeHoras?.toString() || ''
    })
  }, [user, navigate])

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
    setSuccess('')

    if (!formData.nome || !formData.email) {
      setError('Por favor, preencha os campos obrigatórios (Nome e Email)')
      return
    }

    try {
      const payload: any = {
        nome: formData.nome,
        sobrenome: formData.sobrenome || undefined,
        email: formData.email,
        telefone: formData.telefone || undefined,
        tipoCliente: formData.tipoCliente || undefined,
        areaInteresse: formData.areaInteresse || undefined,
        disponibilidadeHoras: formData.disponibilidadeHoras ? parseInt(formData.disponibilidadeHoras) : undefined
      }

      // Só inclui senha se foi preenchida
      if (formData.senha) {
        payload.senha = formData.senha
      }

      // Remove campos undefined
      Object.keys(payload).forEach(key => payload[key] === undefined && delete payload[key])

      await updateProfile(payload)
      setSuccess('Perfil atualizado com sucesso!')
      // Limpa o campo de senha após atualização
      setFormData(prev => ({ ...prev, senha: '' }))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao atualizar perfil')
    }
  }

  const handleDelete = async () => {
    try {
      await deleteProfile()
      navigate('/')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao deletar conta')
      setShowDeleteConfirm(false)
    }
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-[calc(100vh-200px)] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-gray-100">
            Meu Perfil
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Gerencie suas informações pessoais
          </p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 px-4 py-3 rounded-md">
              {error}
            </div>
          )}
          {success && (
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-300 px-4 py-3 rounded-md">
              {success}
            </div>
          )}

          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 space-y-4">
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
              Informações Pessoais
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            </div>

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
              label="Nova Senha (deixe em branco para manter a atual)"
              type="password"
              name="senha"
              value={formData.senha}
              onChange={handleChange}
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
                <option value="frontend">Frontend</option>
                <option value="backend">Backend</option>
                <option value="fullstack">Fullstack</option>
                <option value="ml">Machine Learning</option>
              </select>
            </div>

            <Input
              label="Disponibilidade (horas/semana)"
              type="number"
              name="disponibilidadeHoras"
              value={formData.disponibilidadeHoras}
              onChange={handleChange}
              placeholder="Ex: 20"
              min="0"
            />
          </div>

          <div className="flex gap-4">
            <Button type="submit" disabled={loading} className="flex-1">
              {loading ? 'Salvando...' : 'Salvar Alterações'}
            </Button>
          </div>
        </form>

        <div className="mt-8 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6">
          <h3 className="text-lg font-medium text-red-900 dark:text-red-300 mb-2">
            Zona de Perigo
          </h3>
          <p className="text-sm text-red-700 dark:text-red-400 mb-4">
            Ao excluir sua conta, todos os seus dados serão permanentemente removidos. Esta ação não pode ser desfeita.
          </p>
          
          {!showDeleteConfirm ? (
            <Button
              variant="outline"
              onClick={() => setShowDeleteConfirm(true)}
              className="border-red-300 dark:border-red-700 text-red-700 dark:text-red-300 hover:bg-red-100 dark:hover:bg-red-900/30"
            >
              Excluir Conta
            </Button>
          ) : (
            <div className="space-y-3">
              <p className="text-sm font-medium text-red-900 dark:text-red-300">
                Tem certeza que deseja excluir sua conta?
              </p>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={handleDelete}
                  disabled={loading}
                  className="border-red-500 text-red-700 dark:text-red-300 hover:bg-red-100 dark:hover:bg-red-900/30"
                >
                  {loading ? 'Excluindo...' : 'Sim, excluir conta'}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setShowDeleteConfirm(false)}
                  disabled={loading}
                >
                  Cancelar
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

