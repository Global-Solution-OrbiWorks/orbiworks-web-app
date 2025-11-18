import React, { useEffect } from 'react'
import skills from '../mocks/skills'
import Card from '../components/Card'

export default function Trilhas() {
  useEffect(() => { document.title = 'Trilhas — OrbiWorks' }, [])
  return (
    <section className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-2xl font-semibold mb-6">IA de Trilhas</h1>
      <p className="text-gray-600 dark:text-gray-300 mb-6">IA sugere trilhas personalizadas com base em gaps de skills. Exemplos:</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {skills.map((s) => (
          <Card key={s.id} className="p-4">
            <h3 className="text-lg font-medium">{s.title}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">{s.description}</p>
            <div className="mt-3 text-xs text-gray-500">Nível: {s.level}</div>
          </Card>
        ))}
      </div>
    </section>
  )
}
