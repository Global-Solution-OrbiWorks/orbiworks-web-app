import React, { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { getProjetoById } from '../services/api'
import type { ProjetoEmpresa } from '../types/projeto'
import projects from '../mocks/projects'
import Card from '../components/Card'
import Badge from '../components/Badge'

export default function ProjetoDetalhe() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [projeto, setProjeto] = useState<ProjetoEmpresa | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    document.title = 'Detalhes do Projeto — OrbiWorks'
    
    if (!id) {
      setError('ID do projeto não fornecido')
      setLoading(false)
      return
    }

    const loadProjeto = async () => {
      setLoading(true)
      setError(null)

      try {
        // Tentar buscar da API primeiro
        const apiProjeto = await getProjetoById(id)
        if (apiProjeto) {
          setProjeto(apiProjeto)
          setLoading(false)
          return
        }
      } catch (err) {
        // Se falhar, usar mock como fallback
        console.warn('API indisponível, usando mock:', err)
      }

      // Fallback para mock local
      const mockProjeto = projects.find((p) => p.id === id)
      if (mockProjeto) {
        // Converter mock para ProjetoEmpresa
        const projetoConvertido: ProjetoEmpresa = {
          id: mockProjeto.id,
          titulo: mockProjeto.title,
          area: mockProjeto.tags?.includes('frontend') ? 'frontend' : mockProjeto.tags?.includes('backend') ? 'backend' : 'fullstack',
          empresa: mockProjeto.company || 'Não especificada',
          nivel: 'Intermediate',
          descricao: mockProjeto.description
        }
        setProjeto(projetoConvertido)
      } else {
        setError('Projeto não encontrado')
      }
      setLoading(false)
    }

    loadProjeto()
  }, [id])

  if (loading) {
    return (
      <section className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center">
          <p className="text-gray-600 dark:text-gray-300">Carregando projeto...</p>
        </div>
      </section>
    )
  }

  if (error || !projeto) {
    return (
      <section className="max-w-4xl mx-auto px-4 py-12">
        <Card className="p-6 text-center">
          <h1 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">Projeto não encontrado</h1>
          <p className="text-gray-600 dark:text-gray-300 mb-6">{error || 'O projeto solicitado não existe.'}</p>
          <div className="flex gap-4 justify-center">
            <Link
              to="/projetos"
              className="px-4 py-2 rounded-md bg-orbiwork-primary-500 text-white hover:bg-orbiwork-primary-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-orbiwork-primary-300">
              Voltar para Projetos
            </Link>
            <button
              onClick={() => navigate(-1)}
              className="px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-orbiwork-primary-300">
              Voltar
            </button>
          </div>
        </Card>
      </section>
    )
  }

  return (
    <section className="max-w-4xl mx-auto px-4 py-12">
      <div className="mb-6">
        <Link
          to="/projetos"
          className="inline-flex items-center text-sm text-orbiwork-primary-600 dark:text-orbiwork-primary-400 hover:underline mb-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-orbiwork-primary-300 rounded">
          <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Voltar para Projetos
        </Link>
      </div>

      <Card className="p-6">
        <header className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">{projeto.titulo}</h1>
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <Badge className="bg-orbiwork-primary-100 text-orbiwork-primary-700 dark:bg-orbiwork-primary-800/20 dark:text-orbiwork-primary-200">
              {projeto.area}
            </Badge>
            {projeto.nivel && (
              <Badge className="bg-orbiwork-accent-500/10 text-orbiwork-accent-600 dark:text-orbiwork-accent-400">
                {projeto.nivel}
              </Badge>
            )}
          </div>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            <span className="font-semibold">Empresa:</span> {projeto.empresa}
          </p>
        </header>

        {projeto.descricao && (
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">Descrição</h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{projeto.descricao}</p>
          </div>
        )}

        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
          <Link
            to="/projetos"
            className="inline-block px-6 py-2 rounded-md bg-orbiwork-primary-500 text-white hover:bg-orbiwork-primary-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-orbiwork-primary-300 transition-colors">
            Ver todos os projetos
          </Link>
        </div>
      </Card>
    </section>
  )
}

