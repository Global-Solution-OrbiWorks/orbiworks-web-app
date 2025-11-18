import React from 'react'
import type { Member } from '../types/member'

function getInitials(name: string) {
  const parts = name.trim().split(/\s+/)
  const first = parts[0]?.[0] ?? ''
  const last = parts[parts.length - 1]?.[0] ?? ''
  return (first + last).toUpperCase()
}

const MemberCard: React.FC<{ member: Member }> = ({ member }) => {
  const initials = getInitials(member.name)

  return (
    <article
      tabIndex={0}
      className="group relative rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-transform hover:-translate-y-1 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-orbiwork-primary-300 focus-visible:ring-offset-2 dark:border-gray-800 dark:bg-gray-900"
      aria-label={`Integrante ${member.name}`}>
      <div className="flex flex-col items-center gap-4">
        <div className="relative h-32 w-32 overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-3xl font-semibold text-gray-500">
          {member.imageUrl ? (
            // eslint-disable-next-line jsx-a11y/alt-text
            <img src={member.imageUrl} alt={`Foto de ${member.name}`} className="h-full w-full object-cover" />
          ) : (
            <span aria-hidden="true">{initials}</span>
          )}
        </div>

        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{member.name}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">{member.role ?? 'Front-end'}</p>
        </div>

        <div className="flex flex-col items-center gap-2">
          <div className="flex items-center gap-2 flex-wrap justify-center">
            <span className="rounded-full bg-orbiwork-primary-50 px-2.5 py-1 text-xs font-medium text-orbiwork-primary-700 ring-1 ring-inset ring-orbiwork-primary-200 dark:bg-orbiwork-primary-800/20 dark:text-orbiwork-primary-200">
              RM {member.rm}
            </span>
            {member.turma && (
              <span className="rounded-full bg-orbiwork-accent-500/10 px-2.5 py-1 text-xs font-medium text-orbiwork-accent-600 dark:text-orbiwork-accent-400">
                Turma {member.turma}
              </span>
            )}
          </div>

          <div className="flex items-center gap-3">
            {member.linkedin && (
              <a
                href={member.linkedin}
                target="_blank"
                rel="noreferrer"
                className="text-sm text-orbiwork-primary-600 hover:underline dark:text-orbiwork-primary-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-orbiwork-primary-300 rounded"
                aria-label={`LinkedIn de ${member.name}`}>
                LinkedIn
              </a>
            )}

            {member.github && (
              <a
                href={member.github}
                target="_blank"
                rel="noreferrer"
                className="text-sm text-gray-700 hover:underline dark:text-gray-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-orbiwork-primary-300 rounded"
                aria-label={`GitHub de ${member.name}`}>
                GitHub
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  )
}

export default MemberCard
