import React, { useEffect } from 'react'

export default function Planos() {
  useEffect(() => { document.title = 'Planos — OrbiWorks' }, [])
  return (
    <section className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-2xl font-semibold mb-4">Planos</h1>
      <p className="text-gray-600 dark:text-gray-300">Tiers e preços — conteúdo placeholder.</p>
    </section>
  )
}
