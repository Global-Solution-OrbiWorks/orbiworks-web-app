import React, { useEffect } from 'react'

export default function Home() {
  useEffect(() => { document.title = 'Home — OrbiWorks' }, [])
  return (
    <section className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-4">OrbiWorks — Aprendizado contínuo</h1>
      <p className="text-gray-600 dark:text-gray-300">IA de trilhas personalizadas, projetos reais com empresas, coaching de carreira e bem-estar para transição e requalificação.</p>
    </section>
  )
}
