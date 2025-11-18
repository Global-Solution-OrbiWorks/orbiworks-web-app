import React from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <Navbar />
      <main className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-semibold mb-4">Tailwind OK — OrbiWorks</h1>
          <p className="text-gray-600 dark:text-gray-300">Aprendizado contínuo. Carreira com propósito.</p>
          <div className="mt-6">
            <a href="/solucao" className="inline-block px-6 py-2 rounded-md bg-orbiwork-primary-500 text-white hover:bg-orbiwork-primary-600">Explorar solução</a>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
