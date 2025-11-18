import React, { useEffect } from 'react'

export default function Solucao() {
  useEffect(() => { document.title = 'Solução — OrbiWorks' }, [])
  return (
    <section className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-2xl font-semibold mb-4">Solução</h1>
      <p className="text-gray-600 dark:text-gray-300">Visão geral dos módulos: IA de Trilhas, Market de Projetos, Chatbot de Carreira, Bem-estar e Gamificação.</p>
    </section>
  )
}
