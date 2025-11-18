import React, { useEffect } from 'react'

export default function BemEstar() {
  useEffect(() => { document.title = 'Bem-estar — OrbiWorks' }, [])
  return (
    <section className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-2xl font-semibold mb-4">Bem-estar e Foco</h1>
      <p className="text-gray-600 dark:text-gray-300">Check-ins mock, Pomodoro placeholder e alertas de burnout.</p>
    </section>
  )
}
