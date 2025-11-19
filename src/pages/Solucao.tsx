import React, { useEffect, useState } from 'react'
import { findAllOrbiworks, findHabilidadesByCliente } from '../services/api'
import type { PerfilUsuario, ClienteComHabilidades, MatchLocalResult, Skill, Nivel } from '../types/orbiworks'
import Card from '../components/Card'
import Button from '../components/Button'
import Badge from '../components/Badge'
import Input from '../components/Input'

export default function Solucao() {
  const [perfil, setPerfil] = useState<PerfilUsuario>({
    nome: '',
    email: '',
    skills: [],
    areaInteresse: 'fullstack',
    experienciaAnos: 0
  })
  const [clientes, setClientes] = useState<ClienteComHabilidades[]>([])
  const [matches, setMatches] = useState<MatchLocalResult[]>([])
  const [loading, setLoading] = useState(false)
  const [loadingClientes, setLoadingClientes] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<'docs' | 'demo' | 'api'>('docs')
  const [novaSkill, setNovaSkill] = useState<{ nome: string; nivel: Nivel }>({ nome: '', nivel: 'Intermediate' })

  useEffect(() => {
    document.title = 'OrbiWorks — Clientes e Habilidades'
    loadClientes()
  }, [])

  const loadClientes = async () => {
    setLoadingClientes(true)
    setError(null)

    try {
      const orbiworksData = await findAllOrbiworks()
      
      // Enriquecer cada cliente com suas habilidades
      const clientesComHabilidades = await Promise.all(
        orbiworksData.map(async (item) => {
          let habilidades: Skill[] = []
          
          if (item.codigo) {
            try {
              const habilidadesData = await findHabilidadesByCliente(item.codigo)
              habilidades = habilidadesData.map((hab) => ({
                nome: hab.nome,
                nivel: (hab.nivel as Nivel) || 'Intermediate'
              }))
            } catch (err) {
              console.warn('Erro ao buscar habilidades do cliente:', err)
            }
          }

          const nomeCompleto = [item.nome, item.sobrenome].filter(Boolean).join(' ') || 'Cliente sem nome'

          return {
            id: item.codigo?.toString() || '',
            nome: nomeCompleto,
            email: item.email || '',
            habilidades,
            codigo: item.codigo,
            sobrenome: item.sobrenome,
            tipoCliente: item.tipoCliente,
            areaInteresse: item.areaInteresse,
            disponibilidadeHoras: item.disponibilidadeHoras,
            dataContaCriada: item.dataContaCriada
          }
        })
      )

      setClientes(clientesComHabilidades)
    } catch (err) {
      console.error('Erro ao carregar clientes:', err)
      setError('Erro ao carregar clientes. Tente novamente mais tarde.')
      setClientes([])
    } finally {
      setLoadingClientes(false)
    }
  }

  const adicionarSkill = () => {
    if (novaSkill.nome.trim()) {
      setPerfil({
        ...perfil,
        skills: [...perfil.skills, { nome: novaSkill.nome, nivel: novaSkill.nivel }]
      })
      setNovaSkill({ nome: '', nivel: 'Intermediate' })
    }
  }

  const removerSkill = (index: number) => {
    setPerfil({
      ...perfil,
      skills: perfil.skills.filter((_, i) => i !== index)
    })
  }

  // Função auxiliar para verificar equivalência de níveis
  const nivelCompativel = (nivelPerfil: Nivel, nivelCliente: Nivel): boolean => {
    if (nivelPerfil === nivelCliente) return true
    if (nivelPerfil === 'Advanced') {
      return nivelCliente === 'Intermediate' || nivelCliente === 'Beginner'
    }
    if (nivelPerfil === 'Intermediate') {
      return nivelCliente === 'Beginner'
    }
    return false
  }

  const calcularMatchLocal = () => {
    if (!perfil.nome || !perfil.email || perfil.skills.length === 0) {
      setError('Preencha nome, email e adicione pelo menos uma skill')
      return
    }

    setLoading(true)
    setError(null)

    try {
      // Calcular match local entre perfil.skills e cliente.habilidades
      const resultados: MatchLocalResult[] = clientes.map((cliente) => {
        const skillsMatch = cliente.habilidades.filter((habCliente) =>
          perfil.skills.some((skillPerfil) => 
            skillPerfil.nome.toLowerCase() === habCliente.nome.toLowerCase() &&
            nivelCompativel(skillPerfil.nivel, habCliente.nivel)
          )
        )

        const skillsFaltantes = cliente.habilidades.filter(
          (habCliente) => !skillsMatch.some((skill) => skill.nome === habCliente.nome)
        )

        const totalSkills = cliente.habilidades.length || 1
        const compatibilidade = (skillsMatch.length / totalSkills) * 100
        const score = Math.round(compatibilidade * 0.8 + perfil.experienciaAnos * 5)
        const scoreClamped = Math.min(100, Math.max(0, score))

        return {
          cliente,
          score: scoreClamped,
          compatibilidade: Math.round(compatibilidade),
          skillsMatch,
          skillsFaltantes,
          recomendacao: compatibilidade >= 70
            ? 'Excelente match! Você possui a maioria das skills necessárias.'
            : compatibilidade >= 50
            ? 'Bom match. Considere desenvolver as skills faltantes.'
            : compatibilidade > 0
            ? 'Match parcial. Recomendamos focar no desenvolvimento das skills requeridas.'
            : 'Nenhuma skill compatível encontrada. Considere desenvolver as habilidades requeridas.'
        }
      })

      setMatches(resultados.sort((a, b) => b.score - a.score))
      setActiveTab('demo')
    } catch (err) {
      console.error('Erro ao calcular match:', err)
      setError('Erro ao calcular match. Tente novamente mais tarde.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100">
          OrbiWorks — Clientes e Habilidades
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Sistema de gerenciamento de clientes e habilidades. 
          Encontre clientes com habilidades compatíveis com seu perfil profissional.
        </p>
      </header>

      {/* Tabs */}
      <div className="flex gap-2 mb-8 border-b border-gray-200 dark:border-gray-700">
        <button
          onClick={() => setActiveTab('docs')}
          className={`px-6 py-3 font-medium transition-colors ${
            activeTab === 'docs'
              ? 'text-orbiwork-primary-600 dark:text-orbiwork-primary-400 border-b-2 border-orbiwork-primary-500'
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
          }`}
        >
          Documentação
        </button>
        <button
          onClick={() => setActiveTab('demo')}
          className={`px-6 py-3 font-medium transition-colors ${
            activeTab === 'demo'
              ? 'text-orbiwork-primary-600 dark:text-orbiwork-primary-400 border-b-2 border-orbiwork-primary-500'
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
          }`}
        >
          Match Local
        </button>
        <button
          onClick={() => setActiveTab('api')}
          className={`px-6 py-3 font-medium transition-colors ${
            activeTab === 'api'
              ? 'text-orbiwork-primary-600 dark:text-orbiwork-primary-400 border-b-2 border-orbiwork-primary-500'
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
          }`}
        >
          Integração
        </button>
      </div>

      {/* Conteúdo das Tabs */}
      {activeTab === 'docs' && (
        <div className="space-y-8">
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
              Sobre a API
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              A API OrbiWorks fornece endpoints para gerenciamento de clientes e suas habilidades.
              Todos os dados são reais e vêm diretamente do backend.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="p-4 bg-orbiwork-primary-50 dark:bg-orbiwork-primary-900/20 rounded-lg">
                <h3 className="font-semibold mb-2 text-gray-900 dark:text-gray-100">👥 Clientes</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  CRUD completo para gerenciar clientes OrbiWorks
                </p>
              </div>
              <div className="p-4 bg-orbiwork-primary-50 dark:bg-orbiwork-primary-900/20 rounded-lg">
                <h3 className="font-semibold mb-2 text-gray-900 dark:text-gray-100">🎯 Habilidades</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Gerencie habilidades vinculadas a cada cliente
                </p>
              </div>
              <div className="p-4 bg-orbiwork-primary-50 dark:bg-orbiwork-primary-900/20 rounded-lg">
                <h3 className="font-semibold mb-2 text-gray-900 dark:text-gray-100">🔍 Match Local</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Cálculo local de compatibilidade entre perfil e habilidades dos clientes
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
              Endpoints Disponíveis
            </h2>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-gray-100">Endpoints Orbiworks</h3>
              
              <div className="border-l-4 border-orbiwork-primary-500 pl-4">
                <div className="flex items-center gap-2 mb-2">
                  <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                    GET
                  </Badge>
                  <code className="text-sm font-mono text-gray-900 dark:text-gray-100">
                    /orbiworks
                  </code>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Retorna todos os registros Orbiworks
                </p>
              </div>

              <div className="border-l-4 border-orbiwork-primary-500 pl-4">
                <div className="flex items-center gap-2 mb-2">
                  <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                    POST
                  </Badge>
                  <code className="text-sm font-mono text-gray-900 dark:text-gray-100">
                    /orbiworks
                  </code>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Cria um novo registro Orbiworks
                </p>
              </div>

              <div className="border-l-4 border-orbiwork-primary-500 pl-4">
                <div className="flex items-center gap-2 mb-2">
                  <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                    GET
                  </Badge>
                  <code className="text-sm font-mono text-gray-900 dark:text-gray-100">
                    /orbiworks/{'{codigo}'}
                  </code>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Busca registro por código
                </p>
              </div>

              <div className="border-l-4 border-orbiwork-primary-500 pl-4">
                <div className="flex items-center gap-2 mb-2">
                  <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400">
                    PUT
                  </Badge>
                  <code className="text-sm font-mono text-gray-900 dark:text-gray-100">
                    /orbiworks/{'{codigo}'}
                  </code>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Atualiza um registro
                </p>
              </div>

              <div className="border-l-4 border-orbiwork-primary-500 pl-4">
                <div className="flex items-center gap-2 mb-2">
                  <Badge className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400">
                    DELETE
                  </Badge>
                  <code className="text-sm font-mono text-gray-900 dark:text-gray-100">
                    /orbiworks/{'{codigo}'}
                  </code>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Deleta um registro
                </p>
              </div>

              <h3 className="text-lg font-semibold mt-6 mb-3 text-gray-900 dark:text-gray-100">Endpoints Habilidades</h3>
              
              <div className="border-l-4 border-orbiwork-primary-500 pl-4">
                <div className="flex items-center gap-2 mb-2">
                  <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                    POST
                  </Badge>
                  <code className="text-sm font-mono text-gray-900 dark:text-gray-100">
                    /habilidades
                  </code>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Cria uma nova habilidade
                </p>
              </div>

              <div className="border-l-4 border-orbiwork-primary-500 pl-4">
                <div className="flex items-center gap-2 mb-2">
                  <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                    GET
                  </Badge>
                  <code className="text-sm font-mono text-gray-900 dark:text-gray-100">
                    /habilidades/cliente/{'{codCliente}'}
                  </code>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Retorna habilidades por cliente
                </p>
              </div>

              <div className="border-l-4 border-orbiwork-primary-500 pl-4">
                <div className="flex items-center gap-2 mb-2">
                  <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400">
                    PUT
                  </Badge>
                  <code className="text-sm font-mono text-gray-900 dark:text-gray-100">
                    /habilidades/cliente/{'{codigo}'}
                  </code>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Atualiza uma habilidade
                </p>
              </div>

              <div className="border-l-4 border-orbiwork-primary-500 pl-4">
                <div className="flex items-center gap-2 mb-2">
                  <Badge className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400">
                    DELETE
                  </Badge>
                  <code className="text-sm font-mono text-gray-900 dark:text-gray-100">
                    /habilidades/cliente/{'{codigo}'}
                  </code>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Deleta uma habilidade
                </p>
              </div>
            </div>
          </Card>
        </div>
      )}

      {activeTab === 'demo' && (
        <div className="space-y-8">
          <Card className="p-6">
            <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-md border border-blue-200 dark:border-blue-800">
              <p className="text-sm text-blue-800 dark:text-blue-300">
                <strong>ℹ️ Match Local:</strong> O cálculo de match é realizado localmente no front-end, 
                comparando suas skills com as habilidades reais dos clientes cadastrados na API.
              </p>
            </div>

            <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-gray-100">
              Teste o Match Local
            </h2>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Nome"
                  value={perfil.nome}
                  onChange={(e) => setPerfil({ ...perfil, nome: e.target.value })}
                  placeholder="Seu nome"
                />
                <Input
                  label="Email"
                  type="email"
                  value={perfil.email}
                  onChange={(e) => setPerfil({ ...perfil, email: e.target.value })}
                  placeholder="seu@email.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                  Área de Interesse
                </label>
                <select
                  value={perfil.areaInteresse}
                  onChange={(e) => setPerfil({ ...perfil, areaInteresse: e.target.value as any })}
                  className="w-full px-3 py-2 rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900"
                >
                  <option value="frontend">Frontend</option>
                  <option value="backend">Backend</option>
                  <option value="fullstack">Full Stack</option>
                  <option value="ml">Machine Learning</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                  Experiência (anos)
                </label>
                <input
                  type="number"
                  min="0"
                  value={perfil.experienciaAnos}
                  onChange={(e) => setPerfil({ ...perfil, experienciaAnos: parseInt(e.target.value) || 0 })}
                  className="w-full px-3 py-2 rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                  Skills
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={novaSkill.nome}
                    onChange={(e) => setNovaSkill({ ...novaSkill, nome: e.target.value })}
                    placeholder="Ex: React, Node.js, Python..."
                    className="flex-1 px-3 py-2 rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900"
                    onKeyPress={(e) => e.key === 'Enter' && adicionarSkill()}
                  />
                  <select
                    value={novaSkill.nivel}
                    onChange={(e) => setNovaSkill({ ...novaSkill, nivel: e.target.value as Nivel })}
                    className="px-3 py-2 rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900"
                  >
                    <option value="Beginner">Iniciante</option>
                    <option value="Intermediate">Intermediário</option>
                    <option value="Advanced">Avançado</option>
                  </select>
                  <Button onClick={adicionarSkill}>Adicionar</Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {perfil.skills.map((skill, index) => (
                    <Badge
                      key={index}
                      className="bg-orbiwork-primary-100 text-orbiwork-primary-800 dark:bg-orbiwork-primary-900/30 dark:text-orbiwork-primary-200 flex items-center gap-2"
                    >
                      {skill.nome} ({skill.nivel})
                      <button
                        onClick={() => removerSkill(index)}
                        className="ml-1 hover:text-red-600"
                        aria-label="Remover skill"
                      >
                        ×
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>

              {error && (
                <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md text-red-700 dark:text-red-400">
                  {error}
                </div>
              )}

              <Button onClick={calcularMatchLocal} disabled={loading || loadingClientes} className="w-full">
                {loading ? 'Calculando...' : 'Calcular Match Local'}
              </Button>
            </div>
          </Card>

          {loadingClientes && (
            <div className="text-center py-8">
              <p className="text-gray-600 dark:text-gray-300">Carregando clientes...</p>
            </div>
          )}

          {!loadingClientes && clientes.length === 0 && (
            <Card className="p-6 text-center">
              <p className="text-gray-600 dark:text-gray-300 mb-4">Nenhum cliente encontrado.</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Os clientes serão exibidos aqui quando disponíveis na API.
              </p>
            </Card>
          )}

          {matches.length > 0 && (
            <div>
              <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
                Resultados do Match Local
              </h2>
              <div className="space-y-4">
                {matches.map((match, index) => (
                  <Card key={match.cliente.id || index} className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                          {match.cliente.nome}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 mb-2">{match.cliente.email}</p>
                        {match.cliente.areaInteresse && (
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Área: {match.cliente.areaInteresse}
                          </p>
                        )}
                      </div>
                      <div className="text-right ml-4">
                        <div className="text-3xl font-bold text-orbiwork-primary-600 dark:text-orbiwork-primary-400">
                          {match.score}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Score</div>
                        <div className="mt-2 text-sm font-medium text-green-600 dark:text-green-400">
                          {match.compatibilidade}% compatível
                        </div>
                      </div>
                    </div>

                    <div className="mb-3 p-2 bg-blue-50 dark:bg-blue-900/20 rounded-md">
                      <p className="text-xs text-blue-700 dark:text-blue-300">
                        ⚠️ Match Local (calculado no front) — sem endpoint de back
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2">
                          Skills que você possui:
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {match.skillsMatch.length > 0 ? (
                            match.skillsMatch.map((skill, i) => (
                              <Badge
                                key={i}
                                tone="success"
                                className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                              >
                                {skill.nome}
                              </Badge>
                            ))
                          ) : (
                            <span className="text-sm text-gray-500">Nenhuma</span>
                          )}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2">
                          Skills a desenvolver:
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {match.skillsFaltantes.length > 0 ? (
                            match.skillsFaltantes.map((skill, i) => (
                              <Badge
                                key={i}
                                tone="warning"
                                className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                              >
                                {skill.nome}
                              </Badge>
                            ))
                          ) : (
                            <span className="text-sm text-green-600 dark:text-green-400">Todas as skills atendidas!</span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-md">
                      <p className="text-sm text-blue-800 dark:text-blue-300">
                        <strong>💡 Recomendação:</strong> {match.recomendacao}
                      </p>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {activeTab === 'api' && (
        <div className="space-y-8">
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
              Como Integrar
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Integre a API OrbiWorks em sua aplicação usando os exemplos abaixo.
            </p>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">
                  1. Base URL
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-2 text-sm">
                  Configure a variável de ambiente <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">VITE_API_URL</code> ou use a URL padrão.
                </p>
                <pre className="bg-gray-900 dark:bg-gray-800 text-gray-100 p-4 rounded-lg overflow-x-auto">
                  <code>{`const BASE_URL = import.meta.env.VITE_API_URL || 'https://rm564969orbiworksgs.onrender.com'`}</code>
                </pre>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">
                  2. Exemplo: Listar Clientes
                </h3>
                <pre className="bg-gray-900 dark:bg-gray-800 text-gray-100 p-4 rounded-lg overflow-x-auto">
                  <code>{`const response = await fetch(\`\${BASE_URL}/orbiworks\`, {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
  }
})

const clientes = await response.json()`}</code>
                </pre>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">
                  3. Exemplo: Criar Cliente
                </h3>
                <pre className="bg-gray-900 dark:bg-gray-800 text-gray-100 p-4 rounded-lg overflow-x-auto">
                  <code>{`const novoCliente = await fetch(\`\${BASE_URL}/orbiworks\`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    nome: 'João',
    sobrenome: 'Silva',
    email: 'joao@example.com',
    telefone: '(11) 99999-9999',
    tipoCliente: 'B2C',
    areaInteresse: 'fullstack'
  })
})

const resultado = await novoCliente.json()`}</code>
                </pre>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">
                  4. Exemplo: Buscar Habilidades de um Cliente
                </h3>
                <pre className="bg-gray-900 dark:bg-gray-800 text-gray-100 p-4 rounded-lg overflow-x-auto">
                  <code>{`const habilidades = await fetch(
  \`\${BASE_URL}/habilidades/cliente/1\`,
  {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  }
)

const data = await habilidades.json()`}</code>
                </pre>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">
                  5. Exemplo: Criar Habilidade
                </h3>
                <pre className="bg-gray-900 dark:bg-gray-800 text-gray-100 p-4 rounded-lg overflow-x-auto">
                  <code>{`const novaHabilidade = await fetch(\`\${BASE_URL}/habilidades\`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    codCliente: 1,
    nome: 'React',
    nivel: 'Intermediate',
    descricao: 'Framework JavaScript para interfaces'
  })
})

const resultado = await novaHabilidade.json()`}</code>
                </pre>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
              Base URL Configurada
            </h2>
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
              <code className="text-sm">
                {import.meta.env.VITE_API_URL || 'https://rm564969orbiworksgs.onrender.com'}
              </code>
            </div>
          </Card>
        </div>
      )}
    </section>
  )
}
