import React, { useEffect } from 'react'
import Card from '../components/Card'

export default function Sobre() {
  useEffect(() => {
    document.title = 'Sobre — OrbiWorks'
  }, [])

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100 mb-4">
          Sobre o OrbiWorks
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
          Uma plataforma completa de aprendizagem contínua e desenvolvimento de carreira com propósito.
        </p>
      </header>

      <section className="space-y-8 mb-12">
        <Card className="p-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
            Nossa Missão
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            O OrbiWorks nasceu da necessidade de democratizar o acesso à requalificação profissional, 
            oferecendo uma solução completa que une inteligência artificial, projetos reais e cuidado 
            com o bem-estar dos profissionais em transição de carreira.
          </p>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            Acreditamos que cada pessoa merece uma oportunidade de construir uma carreira com propósito, 
            independentemente de sua situação atual. Por isso, desenvolvemos uma plataforma que não apenas 
            ensina, mas também conecta profissionais a oportunidades reais e cuida da saúde mental durante 
            todo o processo de aprendizado.
          </p>
        </Card>

        <Card className="p-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
            O Que Oferecemos
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">
                🎯 IA de Trilhas Personalizadas
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Identificamos gaps de habilidades e criamos planos de estudo personalizados usando 
                inteligência artificial, garantindo que você aprenda exatamente o que precisa para 
                alcançar seus objetivos profissionais.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">
                💼 Projetos Reais com Empresas
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Conectamos você a projetos reais de empresas parceiras, permitindo que você ganhe 
                experiência prática enquanto constrói um portfólio profissional sólido.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">
                🤖 Chatbot de Carreira
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Coaching e orientação profissional 24/7 através de nosso assistente inteligente, 
                sempre disponível para responder suas dúvidas e guiar sua jornada.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">
                🧘 Bem-estar e Produtividade
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Check-ins de humor, Pomodoro timer e alertas de burnout para garantir que você 
                mantenha o equilíbrio entre aprendizado e saúde mental.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">
                🏆 Gamificação e Comunidade
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Sistema de badges, ranking, squads e desafios para tornar o aprendizado mais 
                engajador, além de uma comunidade ativa de profissionais em crescimento.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">
                🏢 Solução Corporativa
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Para empresas que desejam requalificar suas equipes, oferecemos trilhas corporativas 
                personalizadas, relatórios avançados e suporte dedicado.
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
            Nossos Valores
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-4xl mb-3">🎓</div>
              <h3 className="font-semibold mb-2 text-gray-900 dark:text-gray-100">Aprendizado Contínuo</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Acreditamos que o aprendizado nunca termina e que todos têm potencial para crescer.
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-3">🤝</div>
              <h3 className="font-semibold mb-2 text-gray-900 dark:text-gray-100">Acessibilidade</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Democratizamos o acesso à requalificação profissional, tornando-a acessível a todos.
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-3">❤️</div>
              <h3 className="font-semibold mb-2 text-gray-900 dark:text-gray-100">Bem-estar</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Cuidamos da saúde mental e do bem-estar dos nossos usuários durante toda a jornada.
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-8 bg-orbiwork-primary-50 dark:bg-orbiwork-primary-900/20 border border-orbiwork-primary-200 dark:border-orbiwork-primary-800">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
            Alinhamento com os ODS
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            O OrbiWorks está alinhado com os Objetivos de Desenvolvimento Sustentável (ODS) da ONU:
          </p>
          <ul className="space-y-2 text-gray-700 dark:text-gray-300">
            <li className="flex items-start">
              <span className="text-orbiwork-primary-500 mr-2 mt-1">✓</span>
              <span><strong>ODS 4 - Educação de Qualidade:</strong> Garantir educação inclusiva, equitativa e de qualidade, promovendo oportunidades de aprendizagem ao longo da vida para todos.</span>
            </li>
            <li className="flex items-start">
              <span className="text-orbiwork-primary-500 mr-2 mt-1">✓</span>
              <span><strong>ODS 8 - Trabalho Decente e Crescimento Econômico:</strong> Promover o crescimento econômico sustentado, inclusivo e sustentável, emprego pleno e produtivo e trabalho decente para todos.</span>
            </li>
            <li className="flex items-start">
              <span className="text-orbiwork-primary-500 mr-2 mt-1">✓</span>
              <span><strong>ODS 9 - Indústria, Inovação e Infraestrutura:</strong> Construir infraestruturas resilientes, promover a industrialização inclusiva e sustentável e fomentar a inovação.</span>
            </li>
            <li className="flex items-start">
              <span className="text-orbiwork-primary-500 mr-2 mt-1">✓</span>
              <span><strong>ODS 10 - Redução das Desigualdades:</strong> Reduzir a desigualdade dentro dos países e entre eles.</span>
            </li>
          </ul>
        </Card>
      </section>
    </main>
  )
}

