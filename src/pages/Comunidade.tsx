import React, { useEffect } from 'react'

export default function Comunidade() {
  useEffect(() => { document.title = 'Comunidade — OrbiWorks' }, [])
  return (
    <section className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-2xl font-semibold mb-4">Comunidade e Gamificação</h1>
      <p className="text-gray-600 dark:text-gray-300">Squads, badges e ranking — conteúdo mock.</p>
    </section>
  )
}
