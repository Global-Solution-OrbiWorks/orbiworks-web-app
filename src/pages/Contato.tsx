import React, { useEffect } from 'react'

export default function Contato() {
  useEffect(() => { document.title = 'Contato — OrbiWorks' }, [])
  return (
    <section className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-2xl font-semibold mb-4">Contato</h1>
      <p className="text-gray-600 dark:text-gray-300">Entre em contato conosco: contato@orbiworks.example (placeholder)</p>
    </section>
  )
}
