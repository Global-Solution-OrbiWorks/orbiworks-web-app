import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Card from '../components/Card'
import Button from '../components/Button'

export default function Home() {
  useEffect(() => {
    document.title = 'OrbiWorks — Aprendizado contínuo'
  }, [])

  const features = [
    {
      icon: '🎯',
      title: 'IA de Trilhas',
      desc: 'Planos de estudo personalizados baseados em gaps de skills identificados por inteligência artificial.'
    },
    {
      icon: '💼',
      title: 'Projetos Reais',
      desc: 'Market de projetos com empresas para experiência prática e construção de portfólio profissional.'
    },
    {
      icon: '🤖',
      title: 'Chatbot de Carreira',
      desc: 'Coaching e orientação profissional 24/7 via assistente de carreira inteligente.'
    },
    {
      icon: '🧘',
      title: 'Bem-estar',
      desc: 'Check-ins de humor, Pomodoro timer e alertas de burnout para cuidar da sua saúde mental.'
    },
    {
      icon: '🏆',
      title: 'Gamificação',
      desc: 'Sistema de badges, ranking, squads e desafios para tornar o aprendizado mais engajador.'
    },
    {
      icon: '🏢',
      title: 'Gestão Corporativa',
      desc: 'Solução completa para empresas que querem requalificar suas equipes de forma eficiente.'
    }
  ]

  const stats = [
    { numero: '500+', label: 'Profissionais requalificados' },
    { numero: '50+', label: 'Empresas parceiras' },
    { numero: '200+', label: 'Projetos concluídos' },
    { numero: '95%', label: 'Taxa de satisfação' }
  ]

  return (
    <main className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <section className="text-center mb-16">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6 text-gray-900 dark:text-gray-100">
          OrbiWorks
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-4 max-w-3xl mx-auto">
          Aprendizado contínuo. Carreira com propósito.
        </p>
        <p className="text-lg text-gray-500 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
          Requalificação acessível, com projetos reais, coaching e cuidado com o bem-estar.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/solucao">
            <Button className="px-8 py-3 text-lg">Conhecer a solução</Button>
          </Link>
          <Link to="/planos">
            <Button variant="outline" className="px-8 py-3 text-lg">
              Ver planos
            </Button>
          </Link>
        </div>
      </section>

      {/* Estatísticas */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
        {stats.map((stat, idx) => (
          <Card key={idx} className="p-6 text-center">
            <div className="text-3xl font-bold text-orbiwork-primary-500 dark:text-orbiwork-primary-400 mb-2">
              {stat.numero}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
          </Card>
        ))}
      </section>

      {/* Features */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-4 text-gray-900 dark:text-gray-100">
          Por que escolher a OrbiWorks?
        </h2>
        <p className="text-center text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
          Uma plataforma completa que une aprendizado, projetos práticos e bem-estar
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, idx) => (
            <Card key={idx} className="p-6 hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">{feature.desc}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-orbiwork-primary-50 dark:bg-orbiwork-primary-900/20 rounded-lg p-8 md:p-12 text-center">
        <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-gray-100">
          Pronto para começar sua jornada?
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
          Junte-se a centenas de profissionais que estão transformando suas carreiras com a OrbiWorks
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/cadastro">
            <Button className="px-8 py-3">Começar agora</Button>
          </Link>
          <Link to="/solucao">
            <Button variant="outline" className="px-8 py-3">
              Conhecer a solução
            </Button>
          </Link>
        </div>
      </section>
    </main>
  )
}
