import React, { useEffect, useState, FormEvent } from 'react'
import { postContato } from '../services/api'
import Card from '../components/Card'
import Input from '../components/Input'
import Button from '../components/Button'

export default function Contato() {
  useEffect(() => {
    document.title = 'Contato — OrbiWorks'
  }, [])

  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    mensagem: ''
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const validate = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.nome.trim()) {
      newErrors.nome = 'Nome é obrigatório'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email é obrigatório'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email inválido'
    }

    if (!formData.mensagem.trim()) {
      newErrors.mensagem = 'Mensagem é obrigatória'
    } else if (formData.mensagem.trim().length < 10) {
      newErrors.mensagem = 'Mensagem deve ter pelo menos 10 caracteres'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setErrorMessage(null)
    setSuccess(false)

    if (!validate()) {
      return
    }

    setLoading(true)

    try {
      await postContato({
        nome: formData.nome.trim(),
        email: formData.email.trim(),
        mensagem: formData.mensagem.trim()
      })

      setSuccess(true)
      setFormData({ nome: '', email: '', mensagem: '' })
      setErrors({})
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : 'Erro ao enviar mensagem. Tente novamente mais tarde.'
      )
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (field: keyof typeof formData) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }))
    // Limpar erro do campo quando o usuário começar a digitar
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[field]
        return newErrors
      })
    }
  }

  return (
    <section className="max-w-2xl mx-auto px-4 py-12">
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100 mb-2">Entre em Contato</h1>
        <p className="text-gray-600 dark:text-gray-400">Envie sua mensagem e entraremos em contato em breve.</p>
      </header>

      <Card className="p-6">
        {success && (
          <div className="mb-6 p-4 rounded-md bg-orbiwork-state-success/10 border border-orbiwork-state-success/20 text-orbiwork-state-success dark:text-green-400">
            <p className="font-medium">Mensagem enviada com sucesso!</p>
            <p className="text-sm mt-1">Entraremos em contato em breve.</p>
          </div>
        )}

        {errorMessage && (
          <div className="mb-6 p-4 rounded-md bg-orbiwork-state-danger/10 border border-orbiwork-state-danger/20 text-orbiwork-state-danger dark:text-red-400">
            <p className="font-medium">Erro ao enviar mensagem</p>
            <p className="text-sm mt-1">{errorMessage}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <div className="space-y-4">
            <div>
              <label htmlFor="nome" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Nome <span className="text-red-500">*</span>
              </label>
              <Input
                id="nome"
                type="text"
                value={formData.nome}
                onChange={handleChange('nome')}
                placeholder="Seu nome completo"
                required
                aria-invalid={errors.nome ? 'true' : 'false'}
                aria-describedby={errors.nome ? 'nome-error' : undefined}
                className={errors.nome ? 'border-red-500 focus:ring-red-500' : ''}
              />
              {errors.nome && (
                <p id="nome-error" className="mt-1 text-sm text-red-600 dark:text-red-400" role="alert">
                  {errors.nome}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Email <span className="text-red-500">*</span>
              </label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={handleChange('email')}
                placeholder="seu@email.com"
                required
                aria-invalid={errors.email ? 'true' : 'false'}
                aria-describedby={errors.email ? 'email-error' : undefined}
                className={errors.email ? 'border-red-500 focus:ring-red-500' : ''}
              />
              {errors.email && (
                <p id="email-error" className="mt-1 text-sm text-red-600 dark:text-red-400" role="alert">
                  {errors.email}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="mensagem" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Mensagem <span className="text-red-500">*</span>
              </label>
              <textarea
                id="mensagem"
                value={formData.mensagem}
                onChange={handleChange('mensagem')}
                placeholder="Sua mensagem aqui..."
                required
                rows={6}
                aria-invalid={errors.mensagem ? 'true' : 'false'}
                aria-describedby={errors.mensagem ? 'mensagem-error' : undefined}
                className={`w-full px-3 py-2 border rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orbiwork-primary-300 focus:border-transparent ${
                  errors.mensagem ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 dark:border-gray-700'
                }`}
              />
              {errors.mensagem && (
                <p id="mensagem-error" className="mt-1 text-sm text-red-600 dark:text-red-400" role="alert">
                  {errors.mensagem}
                </p>
              )}
            </div>
          </div>

          <div className="mt-6">
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? 'Enviando...' : 'Enviar Mensagem'}
            </Button>
          </div>
        </form>
      </Card>
    </section>
  )
}
