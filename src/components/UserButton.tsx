import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function UserButton() {
  const { user, isAuthenticated, logout } = useAuth()
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    setOpen(false)
    navigate('/')
  }

  const initials = user?.nome 
    ? `${user.nome.charAt(0).toUpperCase()}${user.sobrenome?.charAt(0).toUpperCase() || ''}`
    : '?'

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="w-10 h-10 rounded-full bg-orbiwork-primary-500 text-white flex items-center justify-center font-semibold hover:bg-orbiwork-primary-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-orbiwork-primary-300 transition-colors"
        aria-label="Menu do usuário"
        aria-expanded={open}
      >
        {initials}
      </button>

      {open && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 z-20">
            {isAuthenticated ? (
              <div className="py-1">
                <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    {user?.nome} {user?.sobrenome}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                    {user?.email}
                  </p>
                </div>
                <Link
                  to="/perfil"
                  onClick={() => setOpen(false)}
                  className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Editar Perfil
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Sair
                </button>
              </div>
            ) : (
              <div className="py-1">
                <Link
                  to="/login"
                  onClick={() => setOpen(false)}
                  className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Entrar
                </Link>
                <Link
                  to="/cadastro"
                  onClick={() => setOpen(false)}
                  className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Cadastrar
                </Link>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  )
}

