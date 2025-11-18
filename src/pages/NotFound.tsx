import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Card from '../components/Card'

export default function NotFound() {
  useEffect(() => {
    document.title = 'Página não encontrada — OrbiWorks'
  }, [])

  return (
    <section className="max-w-2xl mx-auto px-4 py-12">
      <Card className="p-8 text-center">
        <div className="mb-6">
          <h1 className="text-6xl font-bold text-gray-900 dark:text-gray-100 mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-2">Página não encontrada</h2>
          <p className="text-gray-600 dark:text-gray-300">
            A página que você está procurando não existe ou foi movida.
          </p>
        </div>

        <div className="mt-8">
          <Link
            to="/"
            className="inline-block px-6 py-3 rounded-md bg-orbiwork-primary-500 text-white hover:bg-orbiwork-primary-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-orbiwork-primary-300 transition-colors">
            Voltar para Home
          </Link>
        </div>

        <nav className="mt-6 text-sm">
          <p className="text-gray-500 dark:text-gray-400 mb-3">Ou navegue para:</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link to="/solucao" className="text-orbiwork-primary-600 dark:text-orbiwork-primary-400 hover:underline">
              Solução
            </Link>
            <Link to="/trilhas" className="text-orbiwork-primary-600 dark:text-orbiwork-primary-400 hover:underline">
              Trilhas
            </Link>
            <Link to="/projetos" className="text-orbiwork-primary-600 dark:text-orbiwork-primary-400 hover:underline">
              Projetos
            </Link>
            <Link to="/equipe" className="text-orbiwork-primary-600 dark:text-orbiwork-primary-400 hover:underline">
              Equipe
            </Link>
          </div>
        </nav>
      </Card>
    </section>
  )
}


