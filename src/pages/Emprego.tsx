import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { 
  findHabilidadesByCliente, 
  saveHabilidade, 
  updateHabilidade, 
  deleteHabilidade 
} from '../services/api'
import type { Habilidade, Nivel } from '../types/orbiworks'
import Input from '../components/Input'
import Button from '../components/Button'
import Badge from '../components/Badge'
import Card from '../components/Card'

export default function Emprego() {
  const { user, isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const [habilidades, setHabilidades] = useState<Habilidade[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [editingHabilidade, setEditingHabilidade] = useState<Habilidade | null>(null)
  const [formData, setFormData] = useState({
    nome: '',
    nivel: 'Intermediate' as Nivel,
    descricao: ''
  })

  useEffect(() => {
    if (!isAuthenticated || !user) {
      navigate('/login')
      return
    }
    loadHabilidades()
  }, [user, isAuthenticated, navigate])

  const loadHabilidades = async () => {
    if (!user?.codigo) return

    setLoading(true)
    setError('')
    try {
      const data = await findHabilidadesByCliente(user.codigo)
      setHabilidades(data)
    } catch (err) {
      setError('Erro ao carregar habilidades. Tente novamente.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user?.codigo) return

    setError('')
    setSuccess('')

    if (!formData.nome.trim()) {
      setError('Por favor, preencha o nome da habilidade')
      return
    }

    setLoading(true)
    try {
      if (editingHabilidade?.codigo) {
        // Atualizar habilidade existente
        await updateHabilidade(editingHabilidade.codigo, {
          nome: formData.nome,
          nivel: formData.nivel,
          descricao: formData.descricao || undefined
        })
        setSuccess('Habilidade atualizada com sucesso!')
      } else {
        // Criar nova habilidade
        await saveHabilidade({
          codCliente: user.codigo,
          nome: formData.nome,
          nivel: formData.nivel,
          descricao: formData.descricao || undefined
        })
        setSuccess('Habilidade adicionada com sucesso!')
      }

      // Limpar formulário e recarregar lista
      setFormData({ nome: '', nivel: 'Intermediate', descricao: '' })
      setEditingHabilidade(null)
      setShowForm(false)
      await loadHabilidades()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao salvar habilidade')
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (habilidade: Habilidade) => {
    setEditingHabilidade(habilidade)
    setFormData({
      nome: habilidade.nome || '',
      nivel: habilidade.nivel || 'Intermediate',
      descricao: habilidade.descricao || ''
    })
    setShowForm(true)
    setError('')
    setSuccess('')
  }

  const handleDelete = async (codigo: number) => {
    if (!confirm('Tem certeza que deseja excluir esta habilidade?')) {
      return
    }

    setLoading(true)
    setError('')
    try {
      await deleteHabilidade(codigo)
      setSuccess('Habilidade excluída com sucesso!')
      await loadHabilidades()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao excluir habilidade')
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = () => {
    setFormData({ nome: '', nivel: 'Intermediate', descricao: '' })
    setEditingHabilidade(null)
    setShowForm(false)
    setError('')
    setSuccess('')
  }

  const getNivelColor = (nivel: Nivel) => {
    switch (nivel) {
      case 'Beginner':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
      case 'Intermediate':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
      case 'Advanced':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400'
    }
  }

  const getNivelLabel = (nivel: Nivel) => {
    switch (nivel) {
      case 'Beginner':
        return 'Iniciante'
      case 'Intermediate':
        return 'Intermediário'
      case 'Advanced':
        return 'Avançado'
      default:
        return nivel
    }
  }

  if (!isAuthenticated || !user) {
    return null
  }

  return (
    <div className="min-h-[calc(100vh-200px)] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-gray-100">
            Perfil Profissional
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Gerencie suas habilidades e informações para busca de emprego
          </p>
        </div>

        {/* Informações do Perfil */}
        <Card className="mb-6 p-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
            Informações do Perfil
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Nome</p>
              <p className="font-medium text-gray-900 dark:text-gray-100">
                {user.nome} {user.sobrenome}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
              <p className="font-medium text-gray-900 dark:text-gray-100">{user.email}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Área de Interesse</p>
              <p className="font-medium text-gray-900 dark:text-gray-100">
                {user.areaInteresse || 'Não informado'}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Disponibilidade</p>
              <p className="font-medium text-gray-900 dark:text-gray-100">
                {user.disponibilidadeHoras ? `${user.disponibilidadeHoras} horas/semana` : 'Não informado'}
              </p>
            </div>
          </div>
        </Card>

        {/* Mensagens de Erro/Sucesso */}
        {error && (
          <div className="mb-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 px-4 py-3 rounded-md">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-300 px-4 py-3 rounded-md">
            {success}
          </div>
        )}

        {/* Seção de Habilidades */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              Minhas Habilidades ({habilidades.length})
            </h3>
            {!showForm && (
              <Button onClick={() => setShowForm(true)}>
                + Adicionar Habilidade
              </Button>
            )}
          </div>

          {/* Formulário de Adicionar/Editar Habilidade */}
          {showForm && (
            <Card className="mb-6 p-6">
              <h4 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
                {editingHabilidade ? 'Editar Habilidade' : 'Nova Habilidade'}
              </h4>
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  label="Nome da Habilidade *"
                  type="text"
                  name="nome"
                  value={formData.nome}
                  onChange={handleChange}
                  required
                  placeholder="Ex: React, Python, Node.js"
                />

                <div>
                  <label htmlFor="nivel" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Nível *
                  </label>
                  <select
                    id="nivel"
                    name="nivel"
                    value={formData.nivel}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-orbiwork-primary-500"
                  >
                    <option value="Beginner">Iniciante</option>
                    <option value="Intermediate">Intermediário</option>
                    <option value="Advanced">Avançado</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="descricao" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Descrição (opcional)
                  </label>
                  <textarea
                    id="descricao"
                    name="descricao"
                    value={formData.descricao}
                    onChange={handleChange}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-orbiwork-primary-500"
                    placeholder="Descreva sua experiência com esta habilidade..."
                  />
                </div>

                <div className="flex gap-3">
                  <Button type="submit" disabled={loading}>
                    {loading ? 'Salvando...' : editingHabilidade ? 'Atualizar' : 'Adicionar'}
                  </Button>
                  <Button type="button" variant="outline" onClick={handleCancel} disabled={loading}>
                    Cancelar
                  </Button>
                </div>
              </form>
            </Card>
          )}

          {/* Lista de Habilidades */}
          {loading && habilidades.length === 0 ? (
            <Card className="p-6 text-center">
              <p className="text-gray-500 dark:text-gray-400">Carregando habilidades...</p>
            </Card>
          ) : habilidades.length === 0 ? (
            <Card className="p-6 text-center">
              <p className="text-gray-500 dark:text-gray-400 mb-4">
                Você ainda não possui habilidades cadastradas.
              </p>
              {!showForm && (
                <Button onClick={() => setShowForm(true)}>
                  Adicionar Primeira Habilidade
                </Button>
              )}
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {habilidades.map((habilidade) => (
                <Card key={habilidade.codigo} className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                        {habilidade.nome}
                      </h4>
                      <Badge className={getNivelColor(habilidade.nivel || 'Intermediate')}>
                        {getNivelLabel(habilidade.nivel || 'Intermediate')}
                      </Badge>
                    </div>
                  </div>
                  
                  {habilidade.descricao && (
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                      {habilidade.descricao}
                    </p>
                  )}

                  <div className="flex gap-2 mt-4">
                    <Button
                      variant="outline"
                      onClick={() => handleEdit(habilidade)}
                      disabled={loading}
                      className="flex-1"
                    >
                      Editar
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => habilidade.codigo && handleDelete(habilidade.codigo)}
                      disabled={loading}
                      className="flex-1 border-red-300 dark:border-red-700 text-red-700 dark:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/30"
                    >
                      Excluir
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Dica */}
        <Card className="p-6 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
          <h4 className="font-medium text-blue-900 dark:text-blue-300 mb-2">
            💡 Dica
          </h4>
          <p className="text-sm text-blue-700 dark:text-blue-400">
            Adicione suas habilidades técnicas e profissionais para aumentar suas chances de encontrar oportunidades de emprego. 
            Seja específico e honesto sobre seu nível de conhecimento em cada habilidade.
          </p>
        </Card>
      </div>
    </div>
  )
}

