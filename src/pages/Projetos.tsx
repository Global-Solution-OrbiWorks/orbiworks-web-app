import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getProjetos, findAllOrbiworks } from '../services/api'
import type { ProjetoEmpresa } from '../types/projeto'
import Card from '../components/Card'
import Badge from '../components/Badge'

export default function Projetos() {
  const [projetos, setProjetos] = useState<ProjetoEmpresa[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    document.title = 'Projetos — OrbiWorks'

    const loadProjetos = async () => {
      setLoading(true)
      setError(null)

      try {
        // Usar API real
        const apiProjetos = await getProjetos()
        if (apiProjetos && apiProjetos.length > 0) {
          setProjetos(apiProjetos)
        } else {
          setProjetos([])
        }
      } catch (err) {
        console.error('Erro ao carregar projetos:', err)
        setError('Erro ao carregar projetos. Tente novamente mais tarde.')
        setProjetos([])
      } finally {
        setLoading(false)
      }
    }

    loadProjetos()
  }, [])

  if (loading) {
    return (
      <section className="max-w-6xl mx-auto px-4 py-12">
        <h1 className="text-2xl font-semibold mb-6">Projetos e Vagas</h1>
        <p className="text-gray-600 dark:text-gray-300">Carregando projetos...</p>
      </section>
    )
  }

  if (error) {
    return (
      <section className="max-w-6xl mx-auto px-4 py-12">
        <h1 className="text-2xl font-semibold mb-6">Projetos e Vagas</h1>
        <p className="text-red-600 dark:text-red-400">{error}</p>
      </section>
    )
  }

  return (
    <section className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-gray-100">Projetos e Vagas</h1>
      <p className="text-gray-600 dark:text-gray-300 mb-6">Explore os projetos disponíveis e encontre oportunidades.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {projetos.map((proj) => (
          <Card key={proj.id} className="p-4 flex flex-col">
            <div className="flex items-start justify-between mb-2">
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">{proj.titulo}</h3>
              <div className="flex flex-wrap gap-1">
                <Badge className="bg-orbiwork-primary-100 text-orbiwork-primary-700 dark:bg-orbiwork-primary-800/20 dark:text-orbiwork-primary-200">
                  {proj.area}
                </Badge>
                {proj.nivel && (
                  <Badge className="bg-orbiwork-accent-500/10 text-orbiwork-accent-600 dark:text-orbiwork-accent-400">
                    {proj.nivel}
                  </Badge>
                )}
              </div>
            </div>
            {proj.descricao && (
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-2 flex-grow">{proj.descricao}</p>
            )}
            <div className="mt-3 flex items-center justify-between">
              {proj.empresa && <div className="text-xs text-gray-500 dark:text-gray-400">Empresa: {proj.empresa}</div>}
              <Link
                to={`/projetos/${proj.id}`}
                className="text-sm text-orbiwork-primary-600 dark:text-orbiwork-primary-400 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-orbiwork-primary-300 rounded">
                Ver detalhes →
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </section>
  )
}
