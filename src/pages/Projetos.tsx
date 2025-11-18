import React, { useEffect } from 'react'
import projects from '../mocks/projects'
import Card from '../components/Card'
import Badge from '../components/Badge'

export default function Projetos() {
  useEffect(() => { document.title = 'Projetos — OrbiWorks' }, [])
  return (
    <section className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-2xl font-semibold mb-6">Projetos e Vagas</h1>
      <p className="text-gray-600 dark:text-gray-300 mb-6">Lista neutra de projetos e vagas (mock).</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {projects.map((proj) => (
          <Card key={proj.id} className="p-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">{proj.title}</h3>
              {proj.tags?.map((t) => (
                <Badge key={t} className="ml-2">{t}</Badge>
              ))}
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">{proj.description}</p>
            {proj.company && <div className="mt-3 text-xs text-gray-500">Empresa: {proj.company}</div>}
          </Card>
        ))}
      </div>
    </section>
  )
}
