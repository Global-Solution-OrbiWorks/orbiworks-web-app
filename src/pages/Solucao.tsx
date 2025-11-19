import React, { useEffect, useState } from 'react'
import { findAllOrbiworks, findHabilidadesByCliente } from '../services/api'
import Card from '../components/Card'
import Button from '../components/Button'
import Badge from '../components/Badge'
import Input from '../components/Input'

type Skill = { nome: string; nivel: 'Beginner' | 'Intermediate' | 'Advanced' }

type ClienteComHabilidades = { id: string; nome: string; email: string; habilidades: Skill[] }

type PerfilUsuario = {
  nome: string
  email: string
  skills: Skill[]
  areaInteresse: 'frontend' | 'backend' | 'fullstack' | 'ml'
  experienciaAnos: number
}

type MatchLocalResult = {
  cliente: ClienteComHabilidades
  score: number
  compatibilidade: number
  skillsMatch: Skill[]
  skillsFaltantes: Skill[]
  recomendacao: string
}

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
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<'docs' | 'demo' | 'api'>('docs')
  const [novaSkill, setNovaSkill] = useState<Skill>({ nome: '', nivel: 'Intermediate' })

  useEffect(() => {
    document.title = 'OrbiWorks — Clientes e Habilidades'
    loadClientes()
  }, [])

  const loadClientes = async () => {
    setError(null)
    try {
      const orbiworksData = await findAllOrbiworks()
      const enriched = await Promise.all(
        orbiworksData.map(async (item) => {
          let habilidades: Skill[] = []
          if (item?.codigo != null) {
            try {
              const habs = await findHabilidadesByCliente(item.codigo)
              habilidades = (habs || []).map((h) => ({
                nome: h?.nome || 'Habilidade',
                nivel: (h?.nivel as Skill['nivel']) || 'Intermediate'
              }))
            } catch (e) {
              console.warn('Erro ao buscar habilidades:', e)
            }
          }
          const nomeCompleto = [item?.nome, item?.sobrenome].filter(Boolean).join(' ') || item?.nome || 'Sem nome'
          return {
            id: item?.codigo?.toString() || '',
            nome: nomeCompleto,
            email: item?.email || '—',
            habilidades
          } as ClienteComHabilidades
        })
      )
      setClientes(enriched)
    } catch (e) {
      console.error('Erro ao carregar clientes:', e)
      setClientes([])
      setError('Não foi possível carregar os clientes. Tente novamente mais tarde.')
    }
  }

  const adicionarSkill = () => {
    if (!novaSkill.nome.trim()) return
    setPerfil((prev) => ({
      ...prev,
      skills: [...prev.skills, { nome: novaSkill.nome.trim(), nivel: novaSkill.nivel }]
    }))
    setNovaSkill({ nome: '', nivel: 'Intermediate' })
  }

  const removerSkill = (index: number) => {
    setPerfil((prev) => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index)
    }))
  }

  const nivelCobre = (a: Skill['nivel'], b: Skill['nivel']) => {
    if (a === b) return true
    if (a === 'Advanced') return true
    if (a === 'Intermediate' && b === 'Beginner') return true
    return false
  }

  const calcularMatchLocal = async () => {
    if (!perfil.nome || !perfil.email || perfil.skills.length === 0) {
      setError('Preencha nome, email e adicione pelo menos uma skill')
      return
    }
    setLoading(true)
    setError(null)
    try {
      const resultados: MatchLocalResult[] = clientes.map((c) => {
        const skillsMatch = c.habilidades.filter((skillC) =>
          perfil.skills.some(
            (s) =>
              s.nome.trim().toLowerCase() === (skillC.nome || '').trim().toLowerCase() &&
              nivelCobre(s.nivel, skillC.nivel)
          )
        )
        const skillsFaltantes = c.habilidades.filter(
          (skillC) =>
            !skillsMatch.some(
              (sm) => sm.nome.trim().toLowerCase() === (skillC.nome || '').trim().toLowerCase()
            )
        )
        const totalSkills = c.habilidades.length || 1
        const compatibilidade = (skillsMatch.length / totalSkills) * 100
        const scoreRaw = Math.round(compatibilidade * 0.8 + (perfil.experienciaAnos || 0) * 5)
        const score = Math.max(0, Math.min(100, scoreRaw))
        const recomendacao =
          compatibilidade >= 70
            ? 'Excelente! Alto alinhamento de habilidades.'
            : compatibilidade >= 50
            ? 'Bom alinhamento. Há pontos a evoluir.'
            : compatibilidade > 0
            ? 'Match parcial. Desenvolva as skills requeridas.'
            : 'Nenhuma skill compatível encontrada.'

        return {
          cliente: c,
          score,
          compatibilidade: Math.round(compatibilidade),
          skillsMatch,
          skillsFaltantes,
          recomendacao
        }
      })
      setMatches(resultados.sort((a, b) => b.score - a.score))
      setActiveTab('demo')
    } catch (e) {
      console.error('Erro ao calcular match local:', e)
      setError('Erro ao calcular match local. Tente novamente.')
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
          Explore clientes cadastrados e suas habilidades. Opcionalmente, calcule um match local
          entre seu perfil e as habilidades reais dos clientes.
        </p>
      </header>

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
          Demonstração
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

      {activeTab === 'docs' && (
        <div className="space-y-8">
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
              Endpoints Disponíveis
            </h2>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-gray-100">Orbiworks</h3>
              <div className="border-l-4 border-orbiwork-primary-500 pl-4">
                <div className="flex items-center gap-2 mb-2">
                  <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">GET</Badge>
                  <code className="text-sm font-mono text-gray-900 dark:text-gray-100">/orbiworks</code>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300">Lista todos os clientes.</p>
              </div>
              <div className="border-l-4 border-orbiwork-primary-500 pl-4">
                <div className="flex items-center gap-2 mb-2">
                  <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">POST</Badge>
                  <code className="text-sm font-mono text-gray-900 dark:text-gray-100">/orbiworks</code>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300">Cria um cliente.</p>
              </div>
              <div className="border-l-4 border-orbiwork-primary-500 pl-4">
                <div className="flex items-center gap-2 mb-2">
                  <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">GET</Badge>
                  <code className="text-sm font-mono text-gray-900 dark:text-gray-100">/orbiworks/{'{codigo}'}</code>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300">Busca por ID.</p>
              </div>
              <div className="border-l-4 border-orbiwork-primary-500 pl-4">
                <div className="flex items-center gap-2 mb-2">
                  <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400">PUT</Badge>
                  <code className="text-sm font-mono text-gray-900 dark:text-gray-100">/orbiworks/{'{codigo}'}</code>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300">Atualiza um cliente.</p>
              </div>
              <div className="border-l-4 border-orbiwork-primary-500 pl-4">
                <div className="flex items-center gap-2 mb-2">
                  <Badge className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400">DELETE</Badge>
                  <code className="text-sm font-mono text-gray-900 dark:text-gray-100">/orbiworks/{'{codigo}'}</code>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300">Remove um cliente.</p>
              </div>

              <h3 className="text-lg font-semibold mt-6 mb-3 text-gray-900 dark:text-gray-100">Habilidades</h3>
              <div className="border-l-4 border-orbiwork-primary-500 pl-4">
                <div className="flex items-center gap-2 mb-2">
                  <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">POST</Badge>
                  <code className="text-sm font-mono text-gray-900 dark:text-gray-100">/habilidades</code>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300">Cria uma habilidade vinculada a um cliente.</p>
              </div>
              <div className="border-l-4 border-orbiwork-primary-500 pl-4">
                <div className="flex items-center gap-2 mb-2">
                  <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">GET</Badge>
                  <code className="text-sm font-mono text-gray-900 dark:text-gray-100">/habilidades/cliente/{'{codCliente}'}</code>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300">Lista habilidades por cliente.</p>
              </div>
              <div className="border-l-4 border-orbiwork-primary-500 pl-4">
                <div className="flex items-center gap-2 mb-2">
                  <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400">PUT</Badge>
                  <code className="text-sm font-mono text-gray-900 dark:text-gray-100">/habilidades/cliente/{'{codigo}'}</code>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300">Atualiza uma habilidade.</p>
              </div>
              <div className="border-l-4 border-orbiwork-primary-500 pl-4">
                <div className="flex items-center gap-2 mb-2">
                  <Badge className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400">DELETE</Badge>
                  <code className="text-sm font-mono text-gray-900 dark:text-gray-100">/habilidades/cliente/{'{codigo}'}</code>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300">Remove uma habilidade.</p>
              </div>
            </div>
          </Card>
        </div>
      )}

      {activeTab === 'demo' && (
        <div className="space-y-8">
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-gray-100">
              Demonstração — Match local (calculado no front)
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
                  onChange={(e) => setPerfil({ ...perfil, areaInteresse: e.target.value as PerfilUsuario['areaInteresse'] })}
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
                  min={0}
                  value={perfil.experienciaAnos || 0}
                  onChange={(e) => setPerfil({ ...perfil, experienciaAnos: parseInt(e.target.value || '0', 10) || 0 })}
                  className="w-full px-3 py-2 rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">Skills</label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={novaSkill.nome}
                    onChange={(e) => setNovaSkill({ ...novaSkill, nome: e.target.value })}
                    placeholder="Ex: React, Node.js, Python..."
                    className="flex-1 px-3 py-2 rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900"
                    onKeyDown={(e) => e.key === 'Enter' && adicionarSkill()}
                  />
                  <select
                    value={novaSkill.nivel}
                    onChange={(e) => setNovaSkill({ ...novaSkill, nivel: e.target.value as Skill['nivel'] })}
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
                      key={`${skill.nome}-${index}`}
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

              <Button onClick={calcularMatchLocal} disabled={loading || clientes.length === 0} className="w-full">
                {loading ? 'Processando...' : 'Calcular Match Local'}
              </Button>

              {clientes.length === 0 && !error && (
                <p className="text-sm text-gray-500 mt-2">Nenhum cliente encontrado no momento.</p>
              )}
            </div>
          </Card>

          {matches.length > 0 && (
            <div>
              <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">Resultados</h2>
              <div className="space-y-4">
                {matches.map((match) => (
                  <Card key={match.cliente.id} className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-1">
                          {match.cliente.nome}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300">{match.cliente.email}</p>
                        <div className="text-xs text-gray-500 mt-1">Match local (calculado no front)</div>
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

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2">Skills em comum</h4>
                        <div className="flex flex-wrap gap-2">
                          {match.skillsMatch.length > 0 ? (
                            match.skillsMatch.map((skill, i) => (
                              <Badge
                                key={`m-${match.cliente.id}-${skill.nome}-${i}`}
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
                        <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2">Skills faltantes</h4>
                        <div className="flex flex-wrap gap-2">
                          {match.skillsFaltantes.length > 0 ? (
                            match.skillsFaltantes.map((skill, i) => (
                              <Badge
                                key={`f-${match.cliente.id}-${skill.nome}-${i}`}
                                className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                              >
                                {skill.nome}
                              </Badge>
                            ))
                          ) : (
                            <span className="text-sm text-green-600 dark:text-green-400">Todas atendidas!</span>
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
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">Base URL</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              A API usa: <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">{import.meta.env.VITE_API_URL || 'https://rm564969orbiworksgs.onrender.com'}</code>
            </p>
          </Card>

          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">Exemplos</h2>
            <div className="space-y-6">
              <pre className="bg-gray-900 dark:bg-gray-800 text-gray-100 p-4 rounded-lg overflow-x-auto">
                <code>{`// Listar clientes
const res = await fetch(\`\${import.meta.env.VITE_API_URL || 'https://rm564969orbiworksgs.onrender.com'}/orbiworks\`)
const clientes = await res.json()

// Habilidades de um cliente
const habsRes = await fetch(\`\${import.meta.env.VITE_API_URL || 'https://rm564969orbiworksgs.onrender.com'}/habilidades/cliente/1\`)
const habilidades = await habsRes.json()`}</code>
              </pre>
            </div>
          </Card>
        </div>
      )}
    </section>
  )
}
