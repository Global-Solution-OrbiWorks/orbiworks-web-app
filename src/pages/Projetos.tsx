import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { findAllOrbiworks } from '../services/api'
import type { Orbiworks } from '../types/orbiworks'
import Card from '../components/Card'
import Badge from '../components/Badge'

export default function Projetos() {
  const [clientes, setClientes] = useState<Orbiworks[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    document.title = 'Clientes — OrbiWorks'

    const loadClientes = async () => {
      setLoading(true)
      setError(null)

      try {
        const clientesData = await findAllOrbiworks()
        setClientes(clientesData)
      } catch (err) {
        console.error('Erro ao carregar clientes:', err)
        setError('Erro ao carregar clientes. Tente novamente mais tarde.')
        setClientes([])
      } finally {
        setLoading(false)
      }
    }

    loadClientes()
  }, [])

  if (loading) {
    return (
      <section className="max-w-6xl mx-auto px-4 py-12">
        <h1 className="text-2xl font-semibold mb-6">Clientes OrbiWorks</h1>
        <p className="text-gray-600 dark:text-gray-300">Carregando clientes...</p>
      </section>
    )
  }

  if (error) {
    return (
      <section className="max-w-6xl mx-auto px-4 py-12">
        <h1 className="text-2xl font-semibold mb-6">Clientes OrbiWorks</h1>
        <p className="text-red-600 dark:text-red-400">{error}</p>
      </section>
    )
  }

  return (
    <section className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-gray-100">Clientes OrbiWorks</h1>
      <p className="text-gray-600 dark:text-gray-300 mb-6">Explore os clientes cadastrados na plataforma.</p>
      {clientes.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 dark:text-gray-300 mb-4">Nenhum cliente encontrado.</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">Os clientes serão exibidos aqui quando disponíveis na API.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {clientes.map((cliente) => {
            const nomeCompleto = [cliente.nome, cliente.sobrenome].filter(Boolean).join(' ') || 'Cliente sem nome'
            return (
              <Card key={cliente.codigo || Math.random()} className="p-4 flex flex-col">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                    {nomeCompleto}
                  </h3>
                  {cliente.areaInteresse && (
                    <Badge className="bg-orbiwork-primary-100 text-orbiwork-primary-700 dark:bg-orbiwork-primary-800/20 dark:text-orbiwork-primary-200">
                      {cliente.areaInteresse}
                    </Badge>
                  )}
                </div>
                {cliente.email && (
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-2 flex-grow">
                    <strong>Email:</strong> {cliente.email}
                  </p>
                )}
                {cliente.telefone && (
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                    <strong>Telefone:</strong> {cliente.telefone}
                  </p>
                )}
                {cliente.tipoCliente && (
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    Tipo: {cliente.tipoCliente}
                  </p>
                )}
                {cliente.codigo && (
                  <div className="mt-3 flex items-center justify-end">
                    <Link
                      to={`/projetos/${cliente.codigo}`}
                      className="text-sm text-orbiwork-primary-600 dark:text-orbiwork-primary-400 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-orbiwork-primary-300 rounded">
                      Ver detalhes →
                    </Link>
                  </div>
                )}
              </Card>
            )
          })}
        </div>
      )}
    </section>
  )
}
