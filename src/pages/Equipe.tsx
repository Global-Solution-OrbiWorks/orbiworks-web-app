import React from 'react'
import MemberCard from '../components/MemberCard'
import type { Member } from '../types/member'
import { generateAvatarDataUrl } from '../utils/avatar'

const members: Member[] = [
  {
    id: 'joao-consorte',
    name: 'João Vitor Lacerda Consorte',
    rm: '565565',
    turma: '1TDSPH',
    role: 'Front-end',
    imageUrl: '/membros/membro1.png',
    linkedin: 'https://linkedin.com/in/joao-consorte',
    github: 'https://github.com/joaoconsorte'
  },
  {
    id: 'pedro-previtali',
    name: 'Pedro de Matos Previtali',
    rm: '564184',
    turma: '1TDSPH',
    role: 'Front-end',
    imageUrl: '/membros/membro3.png',
    linkedin: 'https://linkedin.com/in/pedro-previtali',
    github: 'https://github.com/pedroprevitali'
  },
  {
    id: 'murillo-carapia',
    name: 'Murillo Fernandes Carapia',
    rm: '564969',
    turma: '1TDSPH',
    role: 'Front-end',
    imageUrl: '/membros/membro2.png',
    linkedin: 'https://linkedin.com/in/murillo-carapia',
    github: 'https://github.com/murillocarapia'
  }
]

export default function Equipe() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">Nossa Equipe</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">Conheça os integrantes do projeto OrbiWorks.</p>
      </header>

      <section aria-labelledby="grid-integrantes" className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <h2 id="grid-integrantes" className="sr-only">Integrantes</h2>

        {members.map((m) => (
          <MemberCard key={m.id} member={m} />
        ))}
      </section>
    </main>
  )
}
