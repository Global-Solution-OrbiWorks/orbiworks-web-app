import React from 'react'
import { Link } from 'react-router-dom'

const links = [
  ['Home', '/'],
  ['Solução', '/solucao'],
  ['Trilhas', '/trilhas'],
  ['Projetos', '/projetos'],
  ['Bem-estar', '/bem-estar'],
  ['Chatbot', '/chatbot'],
  ['Comunidade', '/comunidade'],
  ['Equipe', '/equipe'],
  ['Admin', '/admin']
] as const

export default function Navbar() {
  return (
    <header className="w-full bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800">
      <nav className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-orbiwork-primary-500 rounded-md flex items-center justify-center text-white font-bold">OW</div>
          <div>
            <div className="text-lg font-semibold">OrbiWorks</div>
            <div className="text-xs text-gray-500">Aprendizado contínuo. Carreira com propósito.</div>
          </div>
        </div>
        <ul className="hidden md:flex items-center gap-4 text-sm text-gray-700 dark:text-gray-200">
          {links.map(([label, href]) => (
            <li key={String(href)}>
              <Link to={String(href)} className="hover:underline">{label}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
