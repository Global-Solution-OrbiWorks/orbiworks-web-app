import React, { useEffect } from 'react'
import Card from '../components/Card'
import Badge from '../components/Badge'

export default function Solucao() {
  useEffect(() => {
    document.title = 'OrbiWorks - Api de Vagas'
  }, [])

  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100">
          OrbiWorks — Api de Vagas
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Explore os Endpoints e como funciona nossa api.
        </p>
      </header>

      <div className="space-y-8">
        <Card className="p-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
            Endpoints Disponíveis
          </h2>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-gray-100">Orbiworks</h3>
            <div className="border-l-4 border-orbiwork-primary-500 pl-4">
              <div className="flex items-center gap-2 mb-2">
                <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">GET</Badge>
                <code className="text-sm font-mono text-gray-900 dark:text-gray-100">/orbiworks</code>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300">Lista todos os clientes.</p>
            </div>
            <div className="border-l-4 border-orbiwork-primary-500 pl-4">
              <div className="flex items-center gap-2 mb-2">
                <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">POST</Badge>
                <code className="text-sm font-mono text-gray-900 dark:text-gray-100">/orbiworks</code>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300">Cria um cliente.</p>
            </div>
            <div className="border-l-4 border-orbiwork-primary-500 pl-4">
              <div className="flex items-center gap-2 mb-2">
                <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">GET</Badge>
                <code className="text-sm font-mono text-gray-900 dark:text-gray-100">/orbiworks/{'{codigo}'}</code>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300">Busca por ID.</p>
            </div>
            <div className="border-l-4 border-orbiwork-primary-500 pl-4">
              <div className="flex items-center gap-2 mb-2">
                <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400">PUT</Badge>
                <code className="text-sm font-mono text-gray-900 dark:text-gray-100">/orbiworks/{'{codigo}'}</code>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300">Atualiza um cliente.</p>
            </div>
            <div className="border-l-4 border-orbiwork-primary-500 pl-4">
              <div className="flex items-center gap-2 mb-2">
                <Badge className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400">DELETE</Badge>
                <code className="text-sm font-mono text-gray-900 dark:text-gray-100">/orbiworks/{'{codigo}'}</code>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300">Remove um cliente.</p>
            </div>

            <h3 className="text-lg font-semibold mt-6 mb-3 text-gray-900 dark:text-gray-100">Habilidades</h3>
            <div className="border-l-4 border-orbiwork-primary-500 pl-4">
              <div className="flex items-center gap-2 mb-2">
                <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">POST</Badge>
                <code className="text-sm font-mono text-gray-900 dark:text-gray-100">/habilidades</code>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300">Cria uma habilidade vinculada a um cliente.</p>
            </div>
            <div className="border-l-4 border-orbiwork-primary-500 pl-4">
              <div className="flex items-center gap-2 mb-2">
                <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">GET</Badge>
                <code className="text-sm font-mono text-gray-900 dark:text-gray-100">/habilidades/cliente/{'{codCliente}'}</code>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300">Lista habilidades por cliente.</p>
            </div>
            <div className="border-l-4 border-orbiwork-primary-500 pl-4">
              <div className="flex items-center gap-2 mb-2">
                <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400">PUT</Badge>
                <code className="text-sm font-mono text-gray-900 dark:text-gray-100">/habilidades/cliente/{'{codigo}'}</code>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300">Atualiza uma habilidade.</p>
            </div>
            <div className="border-l-4 border-orbiwork-primary-500 pl-4">
              <div className="flex items-center gap-2 mb-2">
                <Badge className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400">DELETE</Badge>
                <code className="text-sm font-mono text-gray-900 dark:text-gray-100">/habilidades/cliente/{'{codigo}'}</code>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300">Remove uma habilidade.</p>
            </div>
          </div>
        </Card>
      </div>
    </section>
  )
}