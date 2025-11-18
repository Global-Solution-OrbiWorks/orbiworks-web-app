# OrbiWorks — Front-end

Plataforma OrbiWorks — Front-end em Vite + React + TypeScript + Tailwind. Trilhas de aprendizado com IA, projetos reais com empresas, coaching de carreira, bem-estar e gamificação. Pronto para Git Flow e deploy na Vercel.

## Visão Geral

A OrbiWorks é uma plataforma de aprendizagem contínua e carreira com propósito. Unimos:
- IA para trilhas personalizadas (skills gap → plano de estudo + projetos práticos)
- Mercado de projetos reais e vagas com empresas
- Coaching de carreira via chatbot
- Bem-estar e produtividade (check-ins de humor, Pomodoro, alertas de burnout)
- Comunidade e gamificação (XP, badges, desafios)

Público-alvo: pessoas em transição de carreira (B2C) e empresas que requalificam times (B2B).  
Alinhamento ODS: 4, 8, 9 e 10.

## Integrantes

- João Vitor Lacerda Consorte — RM: 565565
- Pedro de Matos Previtali — RM: 564184
- Murillo Fernandes Carapia — RM: 564969

## Stack

- Vite + React + TypeScript
- Tailwind CSS (com @tailwindcss/postcss e autoprefixer)
- Node >= 18, NPM >= 9
- Opcional: ESLint/Prettier

## Começando

Pré-requisitos:
- Node 18+ e npm 9+

Instalação e execução:
- npm install
- npm run dev
- Acesse http://localhost:5173

Build e preview:
- npm run build
- npm run preview

Scripts (package.json):
- dev: inicia o Vite em modo desenvolvimento
- build: tsc -b && vite build
- preview: pré-visualiza a build

## Estrutura de Pastas (sugerida)

- src/
  - assets/
  - components/ (Button, Card, Navbar, Footer, etc.)
  - pages/ (Home, Solucao, Planos, Equipe, Contato, Trilhas, Projetos, BemEstar, Chatbot, Comunidade, Admin)
  - routes/ (AppRoutes.tsx)
  - data/ (mocks: skills, badges, persons, projects)
  - styles/ (tokens adicionais se necessário)
  - main.tsx
  - index.css (apenas diretivas Tailwind)
- public/ (favicon e metadados)
- README.md

## Tema e Identidade (resumo)

- Nome: OrbiWorks
- Slogan: Aprendizado contínuo. Carreira com propósito.
- Paleta base (sugestão):
  - primary: azul-orbi (ex.: 500 #1f7fff)
  - accent: verde (ex.: 500 #22c55e)
  - state: success #16a34a, warning #f59e0b, danger #ef4444, info #0ea5e9
- Tipografia: Inter, system-ui

## Rotas previstas

- / (Home): proposta de valor, CTAs principais
- /solucao: visão dos módulos
- /planos: tiers/valores (placeholder)
- /equipe: integrantes com foto, papel e links
- /contato: formulário/links
- /trilhas: IA de Trilhas (placeholder com cards)
- /projetos: projetos/vagas (lista mock)
- /bem-estar: check-ins de humor e Pomodoro (placeholder)
- /chatbot: chatbot de carreira (UI mínima)
- /comunidade: squads, badges, ranking (mock)
- /admin: gestão corporativa (placeholder)

## Dados Mock (a implementar)

- skills: lista de habilidades, níveis, tags
- badges: conquistas com ícone, descrição e critérios
- persons: perfis/personas da comunidade
- projects: projetos/vagas com empresa, stack e status

## Git Flow

- main: produção
- develop: integração
- features: feature/slug (partem de develop, PR → develop)
- releases: release/x.y.z (partem de develop, merge → main e → develop)
- hotfixes: hotfix/slug (partem de main, merge → main e → develop)

Comandos úteis:
- git branch -M main
- git checkout -b develop
- git push -u origin main
- git push -u origin develop
- git checkout -b feature/nome
- git push -u origin feature/nome

## Convenções

- Commits: Conventional Commits (ex.: feat:, fix:, chore:, docs:, refactor:)
- Código: respeitar ESLint/Prettier se configurados
- Acessibilidade: foco visível, aria-labels, contraste
- Responsividade: breakpoints padrão do Tailwind

## Deploy (Vercel)

- Conecte o repositório
- Framework: Vite
- Build Command: vite build
- Output Directory: dist
- Branch de produção: main

## Roadmap (resumo)

1) Scaffold Vite + TS + Tailwind e saneamento
2) Tokens de tema e componentes base (Button, Card, Input, Navbar, Footer)
3) Rotas e páginas iniciais
4) Mocks (skills, badges, persons, projects)
5) Acessibilidade e responsividade
6) Página de Equipe completa
7) Documentação e automações
8) Deploy e verificação (Lighthouse)

## Licença

Defina aqui a licença do projeto (ex.: MIT). Caso indefinida, mantenha “All rights reserved” temporariamente.

---
Dúvidas ou sugestões? Abra uma issue ou envie um PR.
