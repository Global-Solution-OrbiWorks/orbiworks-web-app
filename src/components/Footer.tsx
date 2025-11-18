import React from 'react'

export default function Footer() {
  return (
    <footer className="w-full mt-12 border-t border-gray-100 dark:border-gray-800 bg-transparent">
      <div className="container mx-auto px-4 py-8 text-sm text-gray-600 dark:text-gray-300">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="text-base font-semibold text-gray-900 dark:text-gray-100">OrbiWorks</div>
            <div className="text-xs text-gray-500">Aprendizado contínuo. Carreira com propósito.</div>
          </div>

          <nav aria-label="Footer" className="flex items-center gap-4">
            <a href="/solucao" className="text-gray-600 hover:underline dark:text-gray-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-orbiwork-primary-300 rounded">
              Solução
            </a>
            <a href="/trilhas" className="text-gray-600 hover:underline dark:text-gray-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-orbiwork-primary-300 rounded">
              Trilhas
            </a>
            <a href="/projetos" className="text-gray-600 hover:underline dark:text-gray-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-orbiwork-primary-300 rounded">
              Projetos
            </a>
            <a href="/equipe" className="text-gray-600 hover:underline dark:text-gray-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-orbiwork-primary-300 rounded">
              Equipe
            </a>
            <a href="/contato" className="text-gray-600 hover:underline dark:text-gray-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-orbiwork-primary-300 rounded">
              Contato
            </a>
          </nav>
        </div>

        <div className="mt-6 text-xs text-gray-500">© {new Date().getFullYear()} OrbiWorks — Todos os direitos reservados</div>
      </div>
    </footer>
  )
}
