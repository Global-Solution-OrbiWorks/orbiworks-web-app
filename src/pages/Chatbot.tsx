import React, { useEffect } from 'react'

export default function Chatbot() {
  useEffect(() => { document.title = 'Chatbot — OrbiWorks' }, [])
  return (
    <section className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-2xl font-semibold mb-4">Chatbot de Carreira</h1>
      <p className="text-gray-600 dark:text-gray-300">UI mínima de chat (placeholder) — coaching de carreira via chatbot.</p>
    </section>
  )
}
