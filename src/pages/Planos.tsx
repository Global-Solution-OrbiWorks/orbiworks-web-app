import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Card from '../components/Card'
import Button from '../components/Button'
import Badge from '../components/Badge'

export default function Planos() {
  useEffect(() => {
    document.title = 'Planos — OrbiWorks'
  }, [])

  const planos = [
    {
      id: 'free',
      nome: 'Gratuito',
      preco: 'R$ 0',
      periodo: 'Sempre grátis',
      descricao: 'Perfeito para começar sua jornada de aprendizado',
      features: [
        'Acesso a trilhas básicas',
        'Projetos da comunidade',
        'Chatbot de carreira',
        'Check-ins de bem-estar',
        'Comunidade e badges'
      ],
      popular: false,
      cta: 'Começar grátis'
    },
    {
      id: 'pro',
      nome: 'Profissional',
      preco: 'R$ 49',
      periodo: 'por mês',
      descricao: 'Para quem quer acelerar a carreira',
      features: [
        'Todas as trilhas disponíveis',
        'Projetos reais com empresas',
        'Coaching personalizado',
        'Relatórios de progresso',
        'Suporte prioritário',
        'Certificados de conclusão'
      ],
      popular: true,
      cta: 'Assinar agora'
    },
    {
      id: 'enterprise',
      nome: 'Empresarial',
      preco: 'Sob consulta',
      periodo: 'personalizado',
      descricao: 'Solução completa para requalificação de equipes',
      features: [
        'Gestão de múltiplas equipes',
        'Trilhas corporativas personalizadas',
        'Relatórios e métricas avançadas',
        'Suporte dedicado',
        'Integração com sistemas internos',
        'Treinamento e onboarding'
      ],
      popular: false,
      cta: 'Falar com vendas'
    }
  ]

  return (
    <section className="max-w-6xl mx-auto px-4 py-12">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100">Planos e Preços</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Escolha o plano ideal para sua jornada de aprendizado e requalificação profissional
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {planos.map((plano) => (
          <Card
            key={plano.id}
            className={`p-6 flex flex-col relative ${
              plano.popular ? 'border-2 border-orbiwork-primary-500 shadow-lg' : ''
            }`}>
            {plano.popular && (
              <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-orbiwork-primary-500 text-white">
                Mais Popular
              </Badge>
            )}

            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">{plano.nome}</h2>
              <div className="mb-2">
                <span className="text-4xl font-bold text-gray-900 dark:text-gray-100">{plano.preco}</span>
                {plano.periodo !== 'Sempre grátis' && (
                  <span className="text-gray-600 dark:text-gray-400">/{plano.periodo}</span>
                )}
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">{plano.descricao}</p>
            </div>

            <ul className="space-y-3 mb-6 flex-grow">
              {plano.features.map((feature, idx) => (
                <li key={idx} className="flex items-start text-sm text-gray-600 dark:text-gray-300">
                  <span className="text-orbiwork-primary-500 mr-2 mt-0.5">✓</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <Link
              to={plano.id === 'enterprise' ? '/contato' : '/trilhas'}
              className="mt-auto">
              <Button
                className={`w-full ${
                  plano.popular
                    ? 'bg-orbiwork-primary-500 hover:bg-orbiwork-primary-600'
                    : 'bg-gray-700 hover:bg-gray-800 dark:bg-gray-600 dark:hover:bg-gray-700'
                }`}
                variant={plano.popular ? 'primary' : undefined}>
                {plano.cta}
              </Button>
            </Link>
          </Card>
        ))}
      </div>

      <Card className="p-6 bg-orbiwork-primary-50 dark:bg-orbiwork-primary-900/20 border border-orbiwork-primary-200 dark:border-orbiwork-primary-800">
        <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">
          💡 Todos os planos incluem:
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-gray-700 dark:text-gray-300">
          <div className="flex items-center">
            <span className="text-orbiwork-primary-500 mr-2">✓</span>
            Acesso à comunidade OrbiWorks
          </div>
          <div className="flex items-center">
            <span className="text-orbiwork-primary-500 mr-2">✓</span>
            Suporte via chatbot 24/7
          </div>
          <div className="flex items-center">
            <span className="text-orbiwork-primary-500 mr-2">✓</span>
            Ferramentas de bem-estar
          </div>
          <div className="flex items-center">
            <span className="text-orbiwork-primary-500 mr-2">✓</span>
            Atualizações regulares de conteúdo
          </div>
        </div>
      </Card>

      <div className="mt-8 text-center">
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          Dúvidas sobre qual plano escolher?
        </p>
        <Link to="/contato">
          <Button variant="outline">Falar com nosso time</Button>
        </Link>
      </div>
    </section>
  )
}
