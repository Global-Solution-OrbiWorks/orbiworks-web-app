import React, { useEffect } from 'react'
import badges from '../mocks/badges'
import persons from '../mocks/persons'
import Card from '../components/Card'

export default function Comunidade() {
  useEffect(() => {
    document.title = 'Comunidade — OrbiWorks'
  }, [])

  // Mock de ranking
  const ranking = [
    { nome: 'Mariana Silva', xp: 1250, posicao: 1 },
    { nome: 'Lucas Pereira', xp: 980, posicao: 2 },
    { nome: 'Ana Costa', xp: 850, posicao: 3 },
    { nome: 'João Silva', xp: 720, posicao: 4 },
    { nome: 'Maria Santos', xp: 650, posicao: 5 }
  ]

  // Mock de squads
  const squads = [
    { id: 's1', nome: 'Frontend Squad', membros: 12, projetos: 5 },
    { id: 's2', nome: 'Data Science Squad', membros: 8, projetos: 3 },
    { id: 's3', nome: 'Full Stack Squad', membros: 15, projetos: 7 }
  ]

  return (
    <section className="max-w-6xl mx-auto px-4 py-12">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100">Comunidade e Gamificação</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Participe de squads, ganhe badges, complete desafios e suba no ranking
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Ranking */}
        <Card className="p-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">🏆 Ranking</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Top membros da comunidade por XP acumulado
          </p>
          <div className="space-y-3">
            {ranking.map((user) => (
              <div
                key={user.posicao}
                className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white ${
                      user.posicao === 1
                        ? 'bg-yellow-500'
                        : user.posicao === 2
                        ? 'bg-gray-400'
                        : user.posicao === 3
                        ? 'bg-orange-600'
                        : 'bg-orbiwork-primary-500'
                    }`}>
                    {user.posicao}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-gray-100">{user.nome}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{user.xp} XP</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Badges */}
        <Card className="p-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">🎖️ Badges Disponíveis</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Conquiste badges completando desafios e projetos
          </p>
          <div className="space-y-3">
            {badges.map((badge) => (
              <div
                key={badge.id}
                className="flex items-start gap-3 p-3 rounded-lg border border-gray-200 dark:border-gray-700">
                <div className="text-2xl">🏅</div>
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900 dark:text-gray-100">{badge.label}</h3>
                  {badge.description && (
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{badge.description}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Squads */}
      <Card className="p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">👥 Squads</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Junte-se a um squad e colabore em projetos com outros membros da comunidade
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {squads.map((squad) => (
            <div
              key={squad.id}
              className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-orbiwork-primary-300 transition-colors">
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">{squad.nome}</h3>
              <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <p>👥 {squad.membros} membros</p>
                <p>💼 {squad.projetos} projetos ativos</p>
              </div>
              <button className="mt-3 text-sm text-orbiwork-primary-600 dark:text-orbiwork-primary-400 hover:underline">
                Entrar no squad →
              </button>
            </div>
          ))}
        </div>
      </Card>

      {/* Membros da Comunidade */}
      <Card className="p-6">
        <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">🌟 Membros Destaque</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Conheça alguns membros ativos da nossa comunidade
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {persons.map((person) => (
            <div
              key={person.id}
              className="text-center p-4 rounded-lg border border-gray-200 dark:border-gray-700">
              <div className="w-20 h-20 mx-auto mb-3 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-2xl font-semibold text-gray-500">
                {person.avatar ? (
                  <img src={person.avatar} alt={person.name} className="w-full h-full rounded-full object-cover" />
                ) : (
                  <span>{person.name.charAt(0)}</span>
                )}
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-gray-100">{person.name}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{person.role}</p>
              <p className="text-xs text-gray-500 dark:text-gray-500 mb-3">{person.bio}</p>
              <div className="flex gap-2 justify-center">
                {person.github && (
                  <a
                    href={person.github}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-orbiwork-primary-600 dark:hover:text-orbiwork-primary-400"
                    aria-label={`GitHub de ${person.name}`}>
                    GitHub
                  </a>
                )}
                {person.linkedin && (
                  <a
                    href={person.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-orbiwork-primary-600 dark:hover:text-orbiwork-primary-400"
                    aria-label={`LinkedIn de ${person.name}`}>
                    LinkedIn
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </section>
  )
}
