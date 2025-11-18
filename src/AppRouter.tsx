import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import Home from './pages/Home'
import Solucao from './pages/Solucao'
import Planos from './pages/Planos'
import Equipe from './pages/Equipe'
import Contato from './pages/Contato'
import Trilhas from './pages/Trilhas'
import Projetos from './pages/Projetos'
import BemEstar from './pages/BemEstar'
import Chatbot from './pages/Chatbot'
import Comunidade from './pages/Comunidade'
import Admin from './pages/Admin'

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="solucao" element={<Solucao />} />
          <Route path="planos" element={<Planos />} />
          <Route path="equipe" element={<Equipe />} />
          <Route path="contato" element={<Contato />} />
          <Route path="trilhas" element={<Trilhas />} />
          <Route path="projetos" element={<Projetos />} />
          <Route path="bem-estar" element={<BemEstar />} />
          <Route path="chatbot" element={<Chatbot />} />
          <Route path="comunidade" element={<Comunidade />} />
          <Route path="admin" element={<Admin />} />
          <Route path="*" element={<Navigate to={'/'} replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
