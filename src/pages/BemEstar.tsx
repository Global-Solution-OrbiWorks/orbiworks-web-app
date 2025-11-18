import React, { useEffect, useState } from 'react'
import Card from '../components/Card'
import Button from '../components/Button'

export default function BemEstar() {
  useEffect(() => {
    document.title = 'Bem-estar — OrbiWorks'
  }, [])

  const [humor, setHumor] = useState<string>('')
  const [pomodoroTime, setPomodoroTime] = useState(25 * 60) // 25 minutos em segundos
  const [isRunning, setIsRunning] = useState(false)
  const [checkInSalvo, setCheckInSalvo] = useState(false)

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null
    if (isRunning && pomodoroTime > 0) {
      interval = setInterval(() => {
        setPomodoroTime((time) => time - 1)
      }, 1000)
    } else if (pomodoroTime === 0) {
      setIsRunning(false)
      alert('⏰ Tempo do Pomodoro finalizado! Faça uma pausa.')
    }
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isRunning, pomodoroTime])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const handleCheckIn = () => {
    if (humor) {
      setCheckInSalvo(true)
      setTimeout(() => setCheckInSalvo(false), 3000)
    }
  }

  const resetPomodoro = () => {
    setPomodoroTime(25 * 60)
    setIsRunning(false)
  }

  const humores = [
    { emoji: '😊', label: 'Ótimo', value: 'otimo' },
    { emoji: '🙂', label: 'Bom', value: 'bom' },
    { emoji: '😐', label: 'Neutro', value: 'neutro' },
    { emoji: '😔', label: 'Baixo', value: 'baixo' },
    { emoji: '😢', label: 'Muito baixo', value: 'muito-baixo' }
  ]

  return (
    <section className="max-w-6xl mx-auto px-4 py-12">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100">Bem-estar e Produtividade</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Cuide da sua saúde mental e mantenha o foco durante o aprendizado.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Check-in de Humor */}
        <Card className="p-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">Check-in de Humor</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Como você está se sentindo hoje? Registre seu humor para acompanhar seu bem-estar.
          </p>

          <div className="grid grid-cols-5 gap-3 mb-6">
            {humores.map((h) => (
              <button
                key={h.value}
                onClick={() => setHumor(h.value)}
                className={`p-4 rounded-lg border-2 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-orbiwork-primary-300 ${
                  humor === h.value
                    ? 'border-orbiwork-primary-500 bg-orbiwork-primary-50 dark:bg-orbiwork-primary-800/20'
                    : 'border-gray-200 dark:border-gray-700 hover:border-orbiwork-primary-300'
                }`}
                aria-label={h.label}
                title={h.label}>
                <div className="text-3xl mb-1">{h.emoji}</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">{h.label}</div>
              </button>
            ))}
          </div>

          {checkInSalvo && (
            <div className="mb-4 p-3 rounded-md bg-orbiwork-state-success/10 border border-orbiwork-state-success/20 text-orbiwork-state-success dark:text-green-400">
              ✓ Check-in registrado com sucesso!
            </div>
          )}

          <Button onClick={handleCheckIn} disabled={!humor} className="w-full">
            Salvar Check-in
          </Button>
        </Card>

        {/* Pomodoro Timer */}
        <Card className="p-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">Pomodoro Timer</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Técnica Pomodoro: 25 minutos de foco, seguidos de uma pausa curta.
          </p>

          <div className="text-center mb-6">
            <div className="text-6xl font-bold text-orbiwork-primary-500 dark:text-orbiwork-primary-400 mb-4">
              {formatTime(pomodoroTime)}
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {isRunning ? 'Em andamento...' : 'Pronto para começar'}
            </p>
          </div>

          <div className="flex gap-3 justify-center">
            <Button
              onClick={() => setIsRunning(!isRunning)}
              className="px-6"
              disabled={pomodoroTime === 0}>
              {isRunning ? 'Pausar' : 'Iniciar'}
            </Button>
            <Button
              onClick={resetPomodoro}
              variant="outline"
              className="px-6">
              Resetar
            </Button>
          </div>

          <div className="mt-6 p-4 rounded-md bg-orbiwork-accent-500/10 border border-orbiwork-accent-500/20">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              <strong>💡 Dica:</strong> Após completar um Pomodoro, faça uma pausa de 5 minutos. A cada 4 ciclos, faça uma pausa maior de 15-30 minutos.
            </p>
          </div>
        </Card>
      </div>

      {/* Alertas de Burnout */}
      <Card className="mt-6 p-6">
        <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">Sinais de Burnout</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          Fique atento aos seguintes sinais e procure ajuda se necessário:
        </p>
        <ul className="space-y-2 text-gray-600 dark:text-gray-300">
          <li className="flex items-start">
            <span className="text-orbiwork-state-warning mr-2">⚠️</span>
            <span>Exaustão física e mental constante</span>
          </li>
          <li className="flex items-start">
            <span className="text-orbiwork-state-warning mr-2">⚠️</span>
            <span>Dificuldade de concentração e memória</span>
          </li>
          <li className="flex items-start">
            <span className="text-orbiwork-state-warning mr-2">⚠️</span>
            <span>Irritabilidade e mudanças de humor</span>
          </li>
          <li className="flex items-start">
            <span className="text-orbiwork-state-warning mr-2">⚠️</span>
            <span>Perda de interesse nas atividades</span>
          </li>
        </ul>
        <div className="mt-4 p-3 rounded-md bg-orbiwork-state-info/10 border border-orbiwork-state-info/20">
          <p className="text-sm text-gray-700 dark:text-gray-300">
            <strong>💙 Lembre-se:</strong> É importante equilibrar aprendizado e descanso. Se sentir que precisa de ajuda, não hesite em procurar um profissional de saúde mental.
          </p>
        </div>
      </Card>
    </section>
  )
}
