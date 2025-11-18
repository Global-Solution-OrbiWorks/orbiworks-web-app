import React, { useEffect } from 'react'

export default function Admin() {
  useEffect(() => { document.title = 'Admin — OrbiWorks' }, [])
  return (
    <section className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-2xl font-semibold mb-4">Admin / Empresa</h1>
      <p className="text-gray-600 dark:text-gray-300">Área administrativa — criação de trilhas corporativas (placeholder).</p>
    </section>
  )
}
