import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import ThemeToggle from './ThemeToggle'

const links = [
  ['Home', '/'],
  ['Solução', '/solucao'],
  ['Trilhas', '/trilhas'],
  ['Projetos', '/projetos'],
  ['Bem-estar', '/bem-estar'],
  ['Chatbot', '/chatbot'],
  ['Comunidade', '/comunidade'],
  ['Equipe', '/equipe'],
  ['Contato', '/contato'],
  ['Admin', '/admin']
] as const

export default function Navbar() {
  const [open, setOpen] = useState(false)
  return (
    <header className="w-full bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800">
      <nav className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link to="/" className="flex items-center gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-orbiwork-primary-300 rounded">
            <div className="w-10 h-10 bg-orbiwork-primary-500 rounded-md flex items-center justify-center text-white font-bold">OW</div>
            <div>
              <div className="text-lg font-semibold">OrbiWorks</div>
              <div className="text-xs text-gray-500">Aprendizado contínuo. Carreira com propósito.</div>
            </div>
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              aria-label="Abrir menu"
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-orbiwork-primary-300">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                {open ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        <ul className="hidden md:flex items-center gap-4 text-sm text-gray-700 dark:text-gray-200">
          {links.map(([label, href]) => (
            <li key={String(href)}>
              <Link to={String(href)} className="hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-orbiwork-primary-300 rounded">
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Mobile panel */}
      <div className={`${open ? 'block' : 'hidden'} md:hidden border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900`}>
        <div className="px-4 py-3 space-y-2">
          {links.map(([label, href]) => (
            <div key={String(href)}>
              <Link
                to={String(href)}
                onClick={() => setOpen(false)}
                className="block py-2 text-gray-700 dark:text-gray-200 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-orbiwork-primary-300">
                {label}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </header>
  )
}
