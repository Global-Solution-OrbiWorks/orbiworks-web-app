import React from 'react'

export default function Footer() {
  return (
    <footer className="w-full mt-12 border-t border-gray-100 dark:border-gray-800 bg-transparent">
      <div className="max-w-6xl mx-auto px-4 py-6 text-sm text-gray-600 dark:text-gray-300 flex items-center justify-between">
        <div>
          <strong>OrbiWorks</strong>
          <div className="text-xs">Aprendizado contínuo. Carreira com propósito.</div>
        </div>
        <div className="text-xs text-gray-500">© {new Date().getFullYear()} OrbiWorks — Todos os direitos reservados</div>
      </div>
    </footer>
  )
}
