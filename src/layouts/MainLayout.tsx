import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Skip link for accessibility */}
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-orbiwork-primary-500 focus:text-white focus:px-3 focus:py-2 rounded-md">
        Pular para o conteúdo
      </a>

      <Navbar />

      <main id="main-content" className="flex-1 container">
        <Outlet />
      </main>

      <Footer />
    </div>
  )
}
