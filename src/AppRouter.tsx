import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import Home from './pages/Home'
import Solucao from './pages/Solucao'
import Planos from './pages/Planos'
import Equipe from './pages/Equipe'
import Contato from './pages/Contato'
import Trilhas from './pages/Trilhas'
import Projetos from './pages/Projetos'
import ProjetoDetalhe from './pages/ProjetoDetalhe'
import BemEstar from './pages/BemEstar'
import Chatbot from './pages/Chatbot'
import Comunidade from './pages/Comunidade'
import Admin from './pages/Admin'
import Login from './pages/Login'
import Cadastro from './pages/Cadastro'
import Perfil from './pages/Perfil'
import NotFound from './pages/NotFound'

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
          <Route path="projetos/:id" element={<ProjetoDetalhe />} />
          <Route path="bem-estar" element={<BemEstar />} />
          <Route path="chatbot" element={<Chatbot />} />
          <Route path="comunidade" element={<Comunidade />} />
          <Route path="admin" element={<Admin />} />
          <Route path="login" element={<Login />} />
          <Route path="cadastro" element={<Cadastro />} />
          <Route path="perfil" element={<Perfil />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
