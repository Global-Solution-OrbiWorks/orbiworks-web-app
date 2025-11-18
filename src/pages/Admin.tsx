import React, { useEffect, useState } from 'react'
import Card from '../components/Card'
import Button from '../components/Button'
import Input from '../components/Input'
import Badge from '../components/Badge'

export default function Admin() {
  useEffect(() => {
    document.title = 'Admin — OrbiWorks'
  }, [])

  const [trilhas, setTrilhas] = useState([
    { id: 't1', nome: 'Trilha Frontend React', membros: 15, progresso: 68 },
    { id: 't2', nome: 'Trilha Data Science', membros: 8, progresso: 45 },
    { id: 't3', nome: 'Trilha Backend Java', membros: 12, progresso: 82 }
  ])

  const [novaTrilha, setNovaTrilha] = useState({ nome: '', area: '' })

  const handleCriarTrilha = () => {
    if (novaTrilha.nome && novaTrilha.area) {
      setTrilhas([
        ...trilhas,
        {
          id: `t${trilhas.length + 1}`,
          nome: novaTrilha.nome,
          membros: 0,
          progresso: 0
        }
      ])
      setNovaTrilha({ nome: '', area: '' })
    }
  }

  return (
    <section className="max-w-6xl mx-auto px-4 py-12">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100">Área Administrativa</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Gerencie trilhas corporativas, equipes e acompanhe o progresso da requalificação
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Estatísticas */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">Total de Trilhas</h3>
          <p className="text-3xl font-bold text-orbiwork-primary-500">{trilhas.length}</p>
        </Card>
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">Total de Membros</h3>
          <p className="text-3xl font-bold text-orbiwork-accent-500">
            {trilhas.reduce((acc, t) => acc + t.membros, 0)}
          </p>
        </Card>
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">Progresso Médio</h3>
          <p className="text-3xl font-bold text-orbiwork-state-info">
            {Math.round(trilhas.reduce((acc, t) => acc + t.progresso, 0) / trilhas.length)}%
          </p>
        </Card>
      </div>

      {/* Criar Nova Trilha */}
      <Card className="p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">Criar Nova Trilha Corporativa</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
            value={novaTrilha.nome}
            onChange={(e) => setNovaTrilha({ ...novaTrilha, nome: e.target.value })}
            placeholder="Nome da trilha"
            className="md:col-span-2"
          />
          <select
            value={novaTrilha.area}
            onChange={(e) => setNovaTrilha({ ...novaTrilha, area: e.target.value })}
            className="px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-orbiwork-primary-300">
            <option value="">Selecione a área</option>
            <option value="frontend">Frontend</option>
            <option value="backend">Backend</option>
            <option value="fullstack">Full Stack</option>
            <option value="data-science">Data Science</option>
            <option value="ml">Machine Learning</option>
          </select>
        </div>
        <Button onClick={handleCriarTrilha} className="mt-4" disabled={!novaTrilha.nome || !novaTrilha.area}>
          Criar Trilha
        </Button>
      </Card>

      {/* Lista de Trilhas */}
      <Card className="p-6">
        <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-gray-100">Trilhas Ativas</h2>
        <div className="space-y-4">
          {trilhas.map((trilha) => (
            <div
              key={trilha.id}
              className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-orbiwork-primary-300 transition-colors">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{trilha.nome}</h3>
                  <div className="flex items-center gap-3 mt-1">
                    <Badge className="bg-orbiwork-primary-100 text-orbiwork-primary-700 dark:bg-orbiwork-primary-800/20 dark:text-orbiwork-primary-200">
                      {trilha.membros} membros
                    </Badge>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {trilha.progresso}% completo
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" className="text-sm">
                    Editar
                  </Button>
                  <Button variant="outline" className="text-sm">
                    Relatório
                  </Button>
                </div>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  className="bg-orbiwork-primary-500 h-2 rounded-full transition-all"
                  style={{ width: `${trilha.progresso}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Relatórios e Métricas */}
      <Card className="p-6 mt-6">
        <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">Relatórios e Métricas</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
            <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2">Membros Mais Engajados</h4>
            <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
              <li>1. João Silva — 95% de conclusão</li>
              <li>2. Maria Santos — 87% de conclusão</li>
              <li>3. Pedro Costa — 82% de conclusão</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
            <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2">Áreas Mais Procuradas</h4>
            <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
              <li>1. Frontend — 35% dos membros</li>
              <li>2. Full Stack — 28% dos membros</li>
              <li>3. Data Science — 22% dos membros</li>
            </ul>
          </div>
        </div>
        <Button variant="outline" className="mt-4">
          Exportar Relatório Completo
        </Button>
      </Card>
    </section>
  )
}
