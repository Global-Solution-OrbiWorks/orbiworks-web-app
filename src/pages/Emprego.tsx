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

  // Calcular estatísticas para o dashboard
  const stats = {
    total: habilidades.length,
    beginner: habilidades.filter(h => h.nivel === 'Beginner').length,
    intermediate: habilidades.filter(h => h.nivel === 'Intermediate').length,
    advanced: habilidades.filter(h => h.nivel === 'Advanced').length,
    comDescricao: habilidades.filter(h => h.descricao && h.descricao.trim()).length
  }

  const nivelMedio = habilidades.length > 0
    ? Math.round(
        (stats.beginner * 1 + stats.intermediate * 2 + stats.advanced * 3) / habilidades.length
      )
    : 0

  const getNivelMedioLabel = () => {
    if (nivelMedio <= 1) return 'Iniciante'
    if (nivelMedio <= 2) return 'Intermediário'
    return 'Avançado'
  }

  if (!isAuthenticated || !user) {
    return null
  }

  return (
    <div className="min-h-[calc(100vh-200px)] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-gray-100">
            Perfil Profissional
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Gerencie suas habilidades e informações para busca de emprego
          </p>
        </div>

        {/* Dashboard de Estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Total de Habilidades</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">{stats.total}</p>
              </div>
              <div className="w-12 h-12 bg-orbiwork-primary-100 dark:bg-orbiwork-primary-900/30 rounded-full flex items-center justify-center">
                <span className="text-2xl">📊</span>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Nível Médio</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">{getNivelMedioLabel()}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                <span className="text-2xl">⭐</span>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Habilidades Avançadas</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">{stats.advanced}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                <span className="text-2xl">🚀</span>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Com Descrição</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">{stats.comDescricao}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                <span className="text-2xl">📝</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Gráfico de Distribuição de Níveis */}
        {habilidades.length > 0 && (
          <Card className="mb-6 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Distribuição por Nível
            </h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-700 dark:text-gray-300">Iniciante</span>
                  <span className="font-medium text-gray-900 dark:text-gray-100">{stats.beginner}</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                  <div
                    className="bg-blue-500 h-3 rounded-full transition-all duration-300"
                    style={{ width: `${(stats.beginner / stats.total) * 100}%` }}
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-700 dark:text-gray-300">Intermediário</span>
                  <span className="font-medium text-gray-900 dark:text-gray-100">{stats.intermediate}</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                  <div
                    className="bg-yellow-500 h-3 rounded-full transition-all duration-300"
                    style={{ width: `${(stats.intermediate / stats.total) * 100}%` }}
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-700 dark:text-gray-300">Avançado</span>
                  <span className="font-medium text-gray-900 dark:text-gray-100">{stats.advanced}</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                  <div
                    className="bg-green-500 h-3 rounded-full transition-all duration-300"
                    style={{ width: `${(stats.advanced / stats.total) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </Card>
        )}

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

        {/* Recomendações e Insights */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <Card className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-200 dark:border-blue-800">
            <h4 className="font-semibold text-blue-900 dark:text-blue-300 mb-3 flex items-center gap-2">
              <span className="text-xl">💡</span> Recomendações
            </h4>
            <ul className="space-y-2 text-sm text-blue-800 dark:text-blue-400">
              {stats.total === 0 && (
                <li>• Adicione pelo menos 3-5 habilidades principais para melhorar seu perfil</li>
              )}
              {stats.total > 0 && stats.total < 5 && (
                <li>• Considere adicionar mais habilidades para destacar seu perfil</li>
              )}
              {stats.comDescricao < stats.total && (
                <li>• Adicione descrições às suas habilidades para fornecer mais contexto</li>
              )}
              {stats.advanced === 0 && stats.total > 0 && (
                <li>• Foque em desenvolver pelo menos uma habilidade ao nível avançado</li>
              )}
              {stats.total >= 5 && stats.advanced >= 2 && (
                <li>• Seu perfil está bem desenvolvido! Continue atualizando suas habilidades</li>
              )}
            </ul>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-green-200 dark:border-green-800">
            <h4 className="font-semibold text-green-900 dark:text-green-300 mb-3 flex items-center gap-2">
              <span className="text-xl">📈</span> Insights do Perfil
            </h4>
            <div className="space-y-3 text-sm">
              <div>
                <p className="text-green-800 dark:text-green-400 font-medium mb-1">Completude do Perfil</p>
                <div className="w-full bg-green-200 dark:bg-green-900/30 rounded-full h-2">
                  <div
                    className="bg-green-600 dark:bg-green-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${Math.min((stats.total / 10) * 100, 100)}%` }}
                  />
                </div>
                <p className="text-xs text-green-700 dark:text-green-500 mt-1">
                  {Math.min(Math.round((stats.total / 10) * 100), 100)}% completo
                </p>
              </div>
              <div>
                <p className="text-green-800 dark:text-green-400 font-medium mb-1">Qualidade das Habilidades</p>
                <div className="w-full bg-green-200 dark:bg-green-900/30 rounded-full h-2">
                  <div
                    className="bg-green-600 dark:bg-green-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(stats.comDescricao / Math.max(stats.total, 1)) * 100}%` }}
                  />
                </div>
                <p className="text-xs text-green-700 dark:text-green-500 mt-1">
                  {stats.total > 0 ? Math.round((stats.comDescricao / stats.total) * 100) : 0}% com descrição
                </p>
              </div>
            </div>
          </Card>
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

