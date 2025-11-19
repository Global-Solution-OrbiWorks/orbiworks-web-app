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

            <div className="flex items-center gap-3" aria-hidden={!(member.github || member.linkedin)}>
              {/* LinkedIn */}
              {member.linkedin ? (
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded px-2 py-1 text-sm text-orbiwork-primary-600 hover:bg-orbiwork-primary-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-orbiwork-primary-300"
                  aria-label={`LinkedIn de ${member.name}`}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path d="M4.98 3.5C4.98 4.704 4.01 5.67 2.81 5.67C1.61 5.67 0.64 4.704 0.64 3.5C0.64 2.296 1.61 1.33 2.81 1.33C4.01 1.33 4.98 2.296 4.98 3.5ZM0.87 8.98H4.74V24H0.87V8.98ZM8.93 8.98H12.64V11.01H12.7C13.25 9.92 14.77 8.78 16.95 8.78C21.19 8.78 22 11.72 22 15.59V24H18.12V16.8C18.12 14.92 18.09 12.52 15.45 12.52C12.78 12.52 12.33 14.56 12.33 16.63V24H8.45V8.98H8.93Z" fill="currentColor" />
                  </svg>
                  <span className="sr-only">LinkedIn</span>
                </a>
              ) : (
                <span className="inline-flex items-center gap-2 rounded px-2 py-1 text-sm text-gray-400 dark:text-gray-600" aria-hidden="true">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path d="M4.98 3.5C4.98 4.704 4.01 5.67 2.81 5.67C1.61 5.67 0.64 4.704 0.64 3.5C0.64 2.296 1.61 1.33 2.81 1.33C4.01 1.33 4.98 2.296 4.98 3.5ZM0.87 8.98H4.74V24H0.87V8.98ZM8.93 8.98H12.64V11.01H12.7C13.25 9.92 14.77 8.78 16.95 8.78C21.19 8.78 22 11.72 22 15.59V24H18.12V16.8C18.12 14.92 18.09 12.52 15.45 12.52C12.78 12.52 12.33 14.56 12.33 16.63V24H8.45V8.98H8.93Z" fill="currentColor" />
                  </svg>
                </span>
              )}

              {/* GitHub */}
              {member.github ? (
                <a
                  href={member.github}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded px-2 py-1 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-orbiwork-primary-300"
                  aria-label={`GitHub de ${member.name}`}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path d="M12 0.5C5.37 0.5 0 5.87 0 12.5C0 17.78 3.438 22.24 8.207 23.85C8.805 23.95 9.025 23.58 9.025 23.26C9.025 22.98 9.015 22.18 9.01 21.16C5.672 21.91 4.968 19.69 4.968 19.69C4.422 18.34 3.633 17.98 3.633 17.98C2.546 17.24 3.714 17.26 3.714 17.26C4.922 17.34 5.56 18.5 5.56 18.5C6.626 20.24 8.344 19.78 9.02 19.48C9.12 18.71 9.438 18.18 9.792 17.86C7.125 17.55 4.343 16.47 4.343 11.69C4.343 10.34 4.82 9.24 5.59 8.4C5.47 8.09 5.06 6.84 5.7 5.14C5.7 5.14 6.73 4.81 9.01 6.36C9.99 6.07 11.04 5.93 12.09 5.93C13.14 5.93 14.19 6.07 15.17 6.36C17.44 4.81 18.47 5.14 18.47 5.14C19.11 6.84 18.7 8.09 18.58 8.4C19.35 9.24 19.82 10.34 19.82 11.69C19.82 16.48 17.04 17.54 14.36 17.85C14.79 18.23 15.17 19.03 15.17 20.19C15.17 21.82 15.16 22.94 15.16 23.26C15.16 23.58 15.38 23.95 15.98 23.85C20.75 22.24 24.19 17.78 24.19 12.5C24.19 5.87 18.82 0.5 12 0.5Z" fill="currentColor" />
                  </svg>
                  <span className="sr-only">GitHub</span>
                </a>
              ) : (
                <span className="inline-flex items-center gap-2 rounded px-2 py-1 text-sm text-gray-400 dark:text-gray-600" aria-hidden="true">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path d="M12 0.5C5.37 0.5 0 5.87 0 12.5C0 17.78 3.438 22.24 8.207 23.85C8.805 23.95 9.025 23.58 9.025 23.26C9.025 22.98 9.015 22.18 9.01 21.16C5.672 21.91 4.968 19.69 4.968 19.69C4.422 18.34 3.633 17.98 3.633 17.98C2.546 17.24 3.714 17.26 3.714 17.26C4.922 17.34 5.56 18.5 5.56 18.5C6.626 20.24 8.344 19.78 9.02 19.48C9.12 18.71 9.438 18.18 9.792 17.86C7.125 17.55 4.343 16.47 4.343 11.69C4.343 10.34 4.82 9.24 5.59 8.4C5.47 8.09 5.06 6.84 5.7 5.14C5.7 5.14 6.73 4.81 9.01 6.36C9.99 6.07 11.04 5.93 12.09 5.93C13.14 5.93 14.19 6.07 15.17 6.36C17.44 4.81 18.47 5.14 18.47 5.14C19.11 6.84 18.7 8.09 18.58 8.4C19.35 9.24 19.82 10.34 19.82 11.69C19.82 16.48 17.04 17.54 14.36 17.85C14.79 18.23 15.17 19.03 15.17 20.19C15.17 21.82 15.16 22.94 15.16 23.26C15.16 23.58 15.38 23.95 15.98 23.85C20.75 22.24 24.19 17.78 24.19 12.5C24.19 5.87 18.82 0.5 12 0.5Z" fill="currentColor" />
                  </svg>
                </span>
              )}
            </div>
        </div>
      </div>
    </article>
  )
}

export default MemberCard
