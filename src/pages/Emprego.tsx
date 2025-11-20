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
    habilidadeDesc: '',
    nivelIngles: '',
    objetivoProfissional: '',
    areaDesejada: '',
    pretencaoSalarial: '',
    disponibilidadeHoras: '',
    localidadeDesejada: '',
    modalidadeDesejada: '',
    descricaoSobreMim: '',
    contatoWhatsapp: '',
    // Campos legados para compatibilidade
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

    setLoading(true)
    try {
      const payload: Partial<Habilidade> = {
        codCliente: user.codigo,
        habilidadeDesc: formData.habilidadeDesc || undefined,
        nivelIngles: formData.nivelIngles || undefined,
        objetivoProfissional: formData.objetivoProfissional || undefined,
        areaDesejada: formData.areaDesejada || undefined,
        pretencaoSalarial: formData.pretencaoSalarial ? parseFloat(formData.pretencaoSalarial) : undefined,
        disponibilidadeHoras: formData.disponibilidadeHoras || undefined,
        localidadeDesejada: formData.localidadeDesejada || undefined,
        modalidadeDesejada: formData.modalidadeDesejada || undefined,
        descricaoSobreMim: formData.descricaoSobreMim || undefined,
        contatoWhatsapp: formData.contatoWhatsapp || undefined,
        // Campos legados para compatibilidade
        nome: formData.habilidadeDesc || formData.nome || undefined,
        descricao: formData.descricaoSobreMim || formData.descricao || undefined
      }

      if (editingHabilidade?.codigo) {
        // Atualizar habilidade existente
        await updateHabilidade(editingHabilidade.codigo, payload)
        setSuccess('Perfil profissional atualizado com sucesso!')
      } else {
        // Criar nova habilidade
        await saveHabilidade(payload)
        setSuccess('Perfil profissional criado com sucesso!')
      }

      // Limpar formulário e recarregar lista
      setFormData({
        habilidadeDesc: '',
        nivelIngles: '',
        objetivoProfissional: '',
        areaDesejada: '',
        pretencaoSalarial: '',
        disponibilidadeHoras: '',
        localidadeDesejada: '',
        modalidadeDesejada: '',
        descricaoSobreMim: '',
        contatoWhatsapp: '',
        nome: '',
        nivel: 'Intermediate',
        descricao: ''
      })
      setEditingHabilidade(null)
      setShowForm(false)
      await loadHabilidades()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao salvar perfil profissional')
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (habilidade: Habilidade) => {
    setEditingHabilidade(habilidade)
    setFormData({
      habilidadeDesc: habilidade.habilidadeDesc || habilidade.nome || '',
      nivelIngles: habilidade.nivelIngles || '',
      objetivoProfissional: habilidade.objetivoProfissional || '',
      areaDesejada: habilidade.areaDesejada || '',
      pretencaoSalarial: habilidade.pretencaoSalarial?.toString() || '',
      disponibilidadeHoras: habilidade.disponibilidadeHoras || '',
      localidadeDesejada: habilidade.localidadeDesejada || '',
      modalidadeDesejada: habilidade.modalidadeDesejada || '',
      descricaoSobreMim: habilidade.descricaoSobreMim || habilidade.descricao || '',
      contatoWhatsapp: habilidade.contatoWhatsapp || '',
      // Campos legados
      nome: habilidade.nome || habilidade.habilidadeDesc || '',
      nivel: habilidade.nivel || 'Intermediate',
      descricao: habilidade.descricao || habilidade.descricaoSobreMim || ''
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
    setFormData({
      habilidadeDesc: '',
      nivelIngles: '',
      objetivoProfissional: '',
      areaDesejada: '',
      pretencaoSalarial: '',
      disponibilidadeHoras: '',
      localidadeDesejada: '',
      modalidadeDesejada: '',
      descricaoSobreMim: '',
      contatoWhatsapp: '',
      nome: '',
      nivel: 'Intermediate',
      descricao: ''
    })
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
              Meu Perfil Profissional ({habilidades.length})
            </h3>
            {!showForm && (
              <Button onClick={() => setShowForm(true)}>
                {habilidades.length === 0 ? '+ Criar Perfil' : '+ Adicionar Perfil'}
              </Button>
            )}
          </div>

          {/* Formulário de Adicionar/Editar Perfil Profissional */}
          {showForm && (
            <Card className="mb-6 p-6">
              <h4 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
                {editingHabilidade ? 'Editar Perfil Profissional' : 'Novo Perfil Profissional'}
              </h4>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Habilidades/Descrição"
                    type="text"
                    name="habilidadeDesc"
                    value={formData.habilidadeDesc}
                    onChange={handleChange}
                    placeholder="Ex: React, Python, Node.js"
                  />

                  <div>
                    <label htmlFor="nivelIngles" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Nível de Inglês
                    </label>
                    <select
                      id="nivelIngles"
                      name="nivelIngles"
                      value={formData.nivelIngles}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-orbiwork-primary-500"
                    >
                      <option value="">Selecione...</option>
                      <option value="Básico">Básico</option>
                      <option value="Intermediário">Intermediário</option>
                      <option value="Avançado">Avançado</option>
                      <option value="Fluente">Fluente</option>
                      <option value="Nativo">Nativo</option>
                    </select>
                  </div>

                  <div className="md:col-span-2">
                    <label htmlFor="objetivoProfissional" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Objetivo Profissional
                    </label>
                    <textarea
                      id="objetivoProfissional"
                      name="objetivoProfissional"
                      value={formData.objetivoProfissional}
                      onChange={handleChange}
                      rows={3}
                      maxLength={300}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-orbiwork-primary-500"
                      placeholder="Descreva seus objetivos profissionais..."
                    />
                  </div>

                  <div>
                    <label htmlFor="areaDesejada" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Área Desejada
                    </label>
                    <select
                      id="areaDesejada"
                      name="areaDesejada"
                      value={formData.areaDesejada}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-orbiwork-primary-500"
                    >
                      <option value="">Selecione uma área...</option>
                      <optgroup label="Tecnologia da Informação">
                        <option value="Desenvolvedor Full Stack">Desenvolvedor Full Stack</option>
                        <option value="Desenvolvedor Frontend">Desenvolvedor Frontend</option>
                        <option value="Desenvolvedor Backend">Desenvolvedor Backend</option>
                        <option value="Desenvolvedor Mobile">Desenvolvedor Mobile</option>
                        <option value="Cientista de Dados">Cientista de Dados</option>
                        <option value="Analista de Dados">Analista de Dados</option>
                        <option value="Especialista em IA/Machine Learning">Especialista em IA/Machine Learning</option>
                        <option value="Designer UX/UI">Designer UX/UI</option>
                        <option value="Analista de QA/Testes">Analista de QA/Testes</option>
                        <option value="Gerente de Projetos TI">Gerente de Projetos TI</option>
                        <option value="Administrador de Sistemas">Administrador de Sistemas</option>
                        <option value="Especialista em Segurança da Informação">Especialista em Segurança da Informação</option>
                      </optgroup>
                      <optgroup label="Administração e Gestão">
                        <option value="Administrador">Administrador</option>
                        <option value="Gerente Geral">Gerente Geral</option>
                        <option value="Gerente de Operações">Gerente de Operações</option>
                        <option value="Gerente de Projetos">Gerente de Projetos</option>
                        <option value="Coordenador Administrativo">Coordenador Administrativo</option>
                        <option value="Assistente Administrativo">Assistente Administrativo</option>
                        <option value="Analista Administrativo">Analista Administrativo</option>
                        <option value="Diretor Administrativo">Diretor Administrativo</option>
                      </optgroup>
                      <optgroup label="Recursos Humanos">
                        <option value="Analista de RH">Analista de RH</option>
                        <option value="Coordenador de RH">Coordenador de RH</option>
                        <option value="Gerente de RH">Gerente de RH</option>
                        <option value="Recrutador">Recrutador</option>
                        <option value="Especialista em Treinamento">Especialista em Treinamento</option>
                        <option value="Analista de Folha de Pagamento">Analista de Folha de Pagamento</option>
                        <option value="Psicólogo Organizacional">Psicólogo Organizacional</option>
                      </optgroup>
                      <optgroup label="Vendas e Comercial">
                        <option value="Vendedor">Vendedor</option>
                        <option value="Representante Comercial">Representante Comercial</option>
                        <option value="Consultor de Vendas">Consultor de Vendas</option>
                        <option value="Gerente de Vendas">Gerente de Vendas</option>
                        <option value="Coordenador de Vendas">Coordenador de Vendas</option>
                        <option value="Analista de Vendas">Analista de Vendas</option>
                        <option value="Executivo de Contas">Executivo de Contas</option>
                        <option value="Especialista em E-commerce">Especialista em E-commerce</option>
                      </optgroup>
                      <optgroup label="Marketing e Comunicação">
                        <option value="Analista de Marketing">Analista de Marketing</option>
                        <option value="Gerente de Marketing">Gerente de Marketing</option>
                        <option value="Especialista em Marketing Digital">Especialista em Marketing Digital</option>
                        <option value="Social Media">Social Media</option>
                        <option value="Publicitário">Publicitário</option>
                        <option value="Jornalista">Jornalista</option>
                        <option value="Assessor de Imprensa">Assessor de Imprensa</option>
                        <option value="Designer Gráfico">Designer Gráfico</option>
                        <option value="Redator">Redator</option>
                        <option value="Copywriter">Copywriter</option>
                      </optgroup>
                      <optgroup label="Finanças e Contabilidade">
                        <option value="Contador">Contador</option>
                        <option value="Analista Contábil">Analista Contábil</option>
                        <option value="Analista Financeiro">Analista Financeiro</option>
                        <option value="Gerente Financeiro">Gerente Financeiro</option>
                        <option value="Controller">Controller</option>
                        <option value="Assistente Contábil">Assistente Contábil</option>
                        <option value="Auxiliar de Contabilidade">Auxiliar de Contabilidade</option>
                        <option value="Especialista em Investimentos">Especialista em Investimentos</option>
                        <option value="Analista de Crédito">Analista de Crédito</option>
                      </optgroup>
                      <optgroup label="Engenharia">
                        <option value="Engenheiro Civil">Engenheiro Civil</option>
                        <option value="Engenheiro Mecânico">Engenheiro Mecânico</option>
                        <option value="Engenheiro Elétrico">Engenheiro Elétrico</option>
                        <option value="Engenheiro de Produção">Engenheiro de Produção</option>
                        <option value="Engenheiro Químico">Engenheiro Químico</option>
                        <option value="Engenheiro Ambiental">Engenheiro Ambiental</option>
                        <option value="Engenheiro de Segurança do Trabalho">Engenheiro de Segurança do Trabalho</option>
                        <option value="Engenheiro de Automação">Engenheiro de Automação</option>
                        <option value="Técnico em Engenharia">Técnico em Engenharia</option>
                      </optgroup>
                      <optgroup label="Saúde">
                        <option value="Médico">Médico</option>
                        <option value="Enfermeiro">Enfermeiro</option>
                        <option value="Fisioterapeuta">Fisioterapeuta</option>
                        <option value="Nutricionista">Nutricionista</option>
                        <option value="Psicólogo">Psicólogo</option>
                        <option value="Farmacêutico">Farmacêutico</option>
                        <option value="Dentista">Dentista</option>
                        <option value="Técnico em Enfermagem">Técnico em Enfermagem</option>
                        <option value="Auxiliar de Enfermagem">Auxiliar de Enfermagem</option>
                        <option value="Técnico em Farmácia">Técnico em Farmácia</option>
                        <option value="Recepcionista de Clínica">Recepcionista de Clínica</option>
                      </optgroup>
                      <optgroup label="Educação">
                        <option value="Professor">Professor</option>
                        <option value="Coordenador Pedagógico">Coordenador Pedagógico</option>
                        <option value="Diretor de Escola">Diretor de Escola</option>
                        <option value="Pedagogo">Pedagogo</option>
                        <option value="Instrutor">Instrutor</option>
                        <option value="Tutor">Tutor</option>
                        <option value="Orientador Educacional">Orientador Educacional</option>
                        <option value="Bibliotecário">Bibliotecário</option>
                      </optgroup>
                      <optgroup label="Direito">
                        <option value="Advogado">Advogado</option>
                        <option value="Assessor Jurídico">Assessor Jurídico</option>
                        <option value="Consultor Jurídico">Consultor Jurídico</option>
                        <option value="Analista Jurídico">Analista Jurídico</option>
                        <option value="Estagiário de Direito">Estagiário de Direito</option>
                      </optgroup>
                      <optgroup label="Atendimento e Suporte">
                        <option value="Atendente">Atendente</option>
                        <option value="Operador de Telemarketing">Operador de Telemarketing</option>
                        <option value="Recepcionista">Recepcionista</option>
                        <option value="Atendente de Call Center">Atendente de Call Center</option>
                        <option value="Analista de Suporte">Analista de Suporte</option>
                        <option value="Especialista em Customer Success">Especialista em Customer Success</option>
                      </optgroup>
                      <optgroup label="Logística e Operações">
                        <option value="Analista de Logística">Analista de Logística</option>
                        <option value="Coordenador de Logística">Coordenador de Logística</option>
                        <option value="Gerente de Logística">Gerente de Logística</option>
                        <option value="Operador de Logística">Operador de Logística</option>
                        <option value="Almoxarife">Almoxarife</option>
                        <option value="Estoquista">Estoquista</option>
                        <option value="Motorista">Motorista</option>
                        <option value="Auxiliar de Logística">Auxiliar de Logística</option>
                      </optgroup>
                      <optgroup label="Comércio e Varejo">
                        <option value="Vendedor de Loja">Vendedor de Loja</option>
                        <option value="Caixa">Caixa</option>
                        <option value="Gerente de Loja">Gerente de Loja</option>
                        <option value="Supervisor de Vendas">Supervisor de Vendas</option>
                        <option value="Repositor">Repositor</option>
                        <option value="Auxiliar de Vendas">Auxiliar de Vendas</option>
                      </optgroup>
                      <optgroup label="Gastronomia e Alimentação">
                        <option value="Cozinheiro">Cozinheiro</option>
                        <option value="Chef de Cozinha">Chef de Cozinha</option>
                        <option value="Garçom">Garçom</option>
                        <option value="Auxiliar de Cozinha">Auxiliar de Cozinha</option>
                        <option value="Barista">Barista</option>
                        <option value="Gerente de Restaurante">Gerente de Restaurante</option>
                      </optgroup>
                      <optgroup label="Arquitetura e Construção">
                        <option value="Arquiteto">Arquiteto</option>
                        <option value="Arquiteto de Interiores">Arquiteto de Interiores</option>
                        <option value="Desenhista Técnico">Desenhista Técnico</option>
                        <option value="Mestre de Obras">Mestre de Obras</option>
                        <option value="Pedreiro">Pedreiro</option>
                        <option value="Eletricista">Eletricista</option>
                        <option value="Encanador">Encanador</option>
                      </optgroup>
                      <optgroup label="Outras Áreas">
                        <option value="Consultor">Consultor</option>
                        <option value="Assistente Social">Assistente Social</option>
                        <option value="Tradutor">Tradutor</option>
                        <option value="Intérprete">Intérprete</option>
                        <option value="Fotógrafo">Fotógrafo</option>
                        <option value="Videomaker">Videomaker</option>
                        <option value="Personal Trainer">Personal Trainer</option>
                        <option value="Esteticista">Esteticista</option>
                        <option value="Outra">Outra</option>
                      </optgroup>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="pretencaoSalarial" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Pretensão Salarial
                    </label>
                    <div className="relative">
                      <div className="mb-3 text-center">
                        <span className="text-2xl font-bold text-orbiwork-primary-600 dark:text-orbiwork-primary-400">
                          R$ {formData.pretencaoSalarial ? parseFloat(formData.pretencaoSalarial).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : '0,00'}
                        </span>
                      </div>
                      <input
                        type="range"
                        id="pretencaoSalarial"
                        name="pretencaoSalarial"
                        min="0"
                        max="50000"
                        step="500"
                        value={formData.pretencaoSalarial || '0'}
                        onChange={handleChange}
                        className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer range-slider"
                        style={{
                          background: formData.pretencaoSalarial 
                            ? `linear-gradient(to right, #1f7fff 0%, #1f7fff ${((parseFloat(formData.pretencaoSalarial || '0') / 50000) * 100)}%, #e5e7eb ${((parseFloat(formData.pretencaoSalarial || '0') / 50000) * 100)}%, #e5e7eb 100%)`
                            : '#e5e7eb'
                        }}
                      />
                      <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-2">
                        <span>R$ 0</span>
                        <span>R$ 50.000</span>
                      </div>
                    </div>
                    <style>{`
                      .range-slider::-webkit-slider-thumb {
                        appearance: none;
                        width: 24px;
                        height: 24px;
                        border-radius: 50%;
                        background: #1f7fff;
                        cursor: pointer;
                        border: 3px solid white;
                        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
                        transition: all 0.2s ease;
                      }
                      .range-slider::-webkit-slider-thumb:hover {
                        transform: scale(1.1);
                        box-shadow: 0 3px 8px rgba(31, 127, 255, 0.5);
                      }
                      .range-slider::-moz-range-thumb {
                        width: 24px;
                        height: 24px;
                        border-radius: 50%;
                        background: #1f7fff;
                        cursor: pointer;
                        border: 3px solid white;
                        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
                        transition: all 0.2s ease;
                      }
                      .range-slider::-moz-range-thumb:hover {
                        transform: scale(1.1);
                        box-shadow: 0 3px 8px rgba(31, 127, 255, 0.5);
                      }
                      .range-slider::-webkit-slider-runnable-track {
                        height: 8px;
                        border-radius: 4px;
                      }
                      .range-slider::-moz-range-track {
                        height: 8px;
                        border-radius: 4px;
                        background: transparent;
                      }
                    `}</style>
                  </div>

                  <Input
                    label="Disponibilidade de Horas"
                    type="text"
                    name="disponibilidadeHoras"
                    value={formData.disponibilidadeHoras}
                    onChange={handleChange}
                    placeholder="Ex: 40 horas/semana"
                    maxLength={50}
                  />

                  <Input
                    label="Localidade Desejada"
                    type="text"
                    name="localidadeDesejada"
                    value={formData.localidadeDesejada}
                    onChange={handleChange}
                    placeholder="Ex: São Paulo, SP"
                    maxLength={120}
                  />

                  <div>
                    <label htmlFor="modalidadeDesejada" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Modalidade Desejada
                    </label>
                    <select
                      id="modalidadeDesejada"
                      name="modalidadeDesejada"
                      value={formData.modalidadeDesejada}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-orbiwork-primary-500"
                    >
                      <option value="">Selecione...</option>
                      <option value="Presencial">Presencial</option>
                      <option value="Remoto">Remoto</option>
                      <option value="Híbrido">Híbrido</option>
                    </select>
                  </div>

                  <div className="md:col-span-2">
                    <label htmlFor="descricaoSobreMim" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Descrição Sobre Mim
                    </label>
                    <textarea
                      id="descricaoSobreMim"
                      name="descricaoSobreMim"
                      value={formData.descricaoSobreMim}
                      onChange={handleChange}
                      rows={4}
                      maxLength={600}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-orbiwork-primary-500"
                      placeholder="Conte um pouco sobre você, suas experiências e qualificações..."
                    />
                  </div>

                  <Input
                    label="Contato WhatsApp"
                    type="text"
                    name="contatoWhatsapp"
                    value={formData.contatoWhatsapp}
                    onChange={handleChange}
                    placeholder="Ex: (11) 99999-9999"
                    maxLength={30}
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <Button type="submit" disabled={loading}>
                    {loading ? 'Salvando...' : editingHabilidade ? 'Atualizar' : 'Salvar'}
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
                Você ainda não possui um perfil profissional cadastrado.
              </p>
              {!showForm && (
                <Button onClick={() => setShowForm(true)}>
                  Criar Perfil Profissional
                </Button>
              )}
            </Card>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {habilidades.map((habilidade) => (
                <Card key={habilidade.codigo} className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h4 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">
                        Perfil Profissional
                      </h4>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    {habilidade.habilidadeDesc && (
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Habilidades</p>
                        <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                          {habilidade.habilidadeDesc}
                        </p>
                      </div>
                    )}

                    {habilidade.nivelIngles && (
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Nível de Inglês</p>
                        <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                          {habilidade.nivelIngles}
                        </p>
                      </div>
                    )}

                    {habilidade.objetivoProfissional && (
                      <div className="md:col-span-2">
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Objetivo Profissional</p>
                        <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                          {habilidade.objetivoProfissional}
                        </p>
                      </div>
                    )}

                    {habilidade.areaDesejada && (
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Área Desejada</p>
                        <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                          {habilidade.areaDesejada}
                        </p>
                      </div>
                    )}

                    {habilidade.pretencaoSalarial && (
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Pretensão Salarial</p>
                        <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                          R$ {habilidade.pretencaoSalarial.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </p>
                      </div>
                    )}

                    {habilidade.disponibilidadeHoras && (
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Disponibilidade</p>
                        <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                          {habilidade.disponibilidadeHoras}
                        </p>
                      </div>
                    )}

                    {habilidade.localidadeDesejada && (
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Localidade Desejada</p>
                        <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                          {habilidade.localidadeDesejada}
                        </p>
                      </div>
                    )}

                    {habilidade.modalidadeDesejada && (
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Modalidade</p>
                        <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                          {habilidade.modalidadeDesejada}
                        </p>
                      </div>
                    )}

                    {habilidade.descricaoSobreMim && (
                      <div className="md:col-span-2">
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Sobre Mim</p>
                        <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                          {habilidade.descricaoSobreMim}
                        </p>
                      </div>
                    )}

                    {habilidade.contatoWhatsapp && (
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">WhatsApp</p>
                        <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                          {habilidade.contatoWhatsapp}
                        </p>
                      </div>
                    )}

                    {/* Campos legados para compatibilidade */}
                    {!habilidade.habilidadeDesc && habilidade.nome && (
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Habilidades</p>
                        <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                          {habilidade.nome}
                        </p>
                      </div>
                    )}

                    {!habilidade.descricaoSobreMim && habilidade.descricao && (
                      <div className="md:col-span-2">
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Descrição</p>
                        <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                          {habilidade.descricao}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="flex gap-2 mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
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

