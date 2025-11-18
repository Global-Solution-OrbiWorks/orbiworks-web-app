import React, { useEffect } from 'react'
import persons from '../mocks/persons'
import Card from '../components/Card'

export default function Equipe() {
  useEffect(() => { document.title = 'Equipe — OrbiWorks' }, [])
  return (
    <section className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-2xl font-semibold mb-6">Equipe</h1>
      <p className="text-gray-600 dark:text-gray-300 mb-6">Conheça o time por trás da OrbiWorks.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {persons.map((p) => (
          <Card key={p.id} className="focus-within:ring-2 focus-within:ring-orbiwork-primary-200">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-xl font-semibold text-gray-700 dark:text-gray-100" aria-hidden>
                {p.name.split(' ').map((n) => n[0]).slice(0,2).join('')}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-medium">{p.name}</h3>
                  <span className="text-sm text-gray-500">{p.role}</span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">{p.bio}</p>
                <div className="mt-3 flex items-center gap-3">
                  {p.github && (
                    <a href={p.github} target="_blank" rel="noreferrer" className="text-sm text-orbiwork-primary-600 hover:underline" aria-label={`GitHub ${p.name}`}>GitHub</a>
                  )}
                  {p.linkedin && (
                    <a href={p.linkedin} target="_blank" rel="noreferrer" className="text-sm text-orbiwork-primary-600 hover:underline" aria-label={`LinkedIn ${p.name}`}>LinkedIn</a>
                  )}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  )
}
