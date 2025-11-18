import React, { useEffect, useState, useRef } from 'react'
import Card from '../components/Card'
import Button from '../components/Button'
import Input from '../components/Input'

interface Message {
  id: string
  text: string
  sender: 'user' | 'bot'
  timestamp: Date
}

export default function Chatbot() {
  useEffect(() => {
    document.title = 'Chatbot — OrbiWorks'
  }, [])

  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Olá! Sou o assistente de carreira da OrbiWorks. Como posso ajudar você hoje?',
      sender: 'bot',
      timestamp: new Date()
    }
  ])
  const [input, setInput] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const respostasBot: Record<string, string> = {
    carreira: 'Para construir uma carreira sólida, é importante: 1) Identificar seus interesses e habilidades, 2) Criar um plano de desenvolvimento, 3) Buscar projetos práticos, 4) Construir um portfólio, 5) Manter-se atualizado com as tendências do mercado.',
    entrevista: 'Para se preparar para entrevistas: 1) Pesquise sobre a empresa, 2) Prepare exemplos de projetos e conquistas, 3) Pratique respostas para perguntas comuns, 4) Prepare perguntas para o entrevistador, 5) Seja autêntico e mostre interesse genuíno.',
    portfolio: 'Um bom portfólio deve incluir: 1) Projetos reais e funcionais, 2) Código no GitHub, 3) Documentação clara, 4) Demonstrações visuais, 5) Explicação do seu processo de pensamento e desafios enfrentados.',
    skills: 'Para desenvolver novas habilidades: 1) Identifique gaps através de nossa IA de Trilhas, 2) Pratique com projetos reais, 3) Participe de comunidades, 4) Busque feedback, 5) Mantenha consistência no aprendizado.',
    default: 'Entendo sua dúvida! Posso ajudar com questões sobre carreira, entrevistas, portfólio, desenvolvimento de skills e muito mais. Tente perguntar sobre: "carreira", "entrevista", "portfólio" ou "skills".'
  }

  const handleSend = () => {
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: new Date()
    }

    setMessages((prev) => [...prev, userMessage])

    // Simular resposta do bot
    setTimeout(() => {
      const lowerInput = input.toLowerCase()
      let resposta = respostasBot.default

      if (lowerInput.includes('carreira') || lowerInput.includes('desenvolver')) {
        resposta = respostasBot.carreira
      } else if (lowerInput.includes('entrevista') || lowerInput.includes('entrevista')) {
        resposta = respostasBot.entrevista
      } else if (lowerInput.includes('portfólio') || lowerInput.includes('portfolio')) {
        resposta = respostasBot.portfolio
      } else if (lowerInput.includes('skill') || lowerInput.includes('habilidade') || lowerInput.includes('aprender')) {
        resposta = respostasBot.skills
      }

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: resposta,
        sender: 'bot',
        timestamp: new Date()
      }

      setMessages((prev) => [...prev, botMessage])
    }, 1000)

    setInput('')
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <section className="max-w-4xl mx-auto px-4 py-12">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100">Chatbot de Carreira</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Receba orientação profissional personalizada 24/7
        </p>
      </header>

      <Card className="p-0 flex flex-col" style={{ height: '600px' }}>
        {/* Área de mensagens */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`max-w-[80%] rounded-lg px-4 py-2 ${
                  msg.sender === 'user'
                    ? 'bg-orbiwork-primary-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100'
                }`}>
                <p className="text-sm">{msg.text}</p>
                <p
                  className={`text-xs mt-1 ${
                    msg.sender === 'user' ? 'text-orbiwork-primary-100' : 'text-gray-500 dark:text-gray-400'
                  }`}>
                  {msg.timestamp.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input area */}
        <div className="border-t border-gray-200 dark:border-gray-700 p-4">
          <div className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Digite sua mensagem..."
              className="flex-1"
            />
            <Button onClick={handleSend} disabled={!input.trim()}>
              Enviar
            </Button>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
            💡 Dica: Pergunte sobre "carreira", "entrevista", "portfólio" ou "skills"
          </p>
        </div>
      </Card>
    </section>
  )
}
