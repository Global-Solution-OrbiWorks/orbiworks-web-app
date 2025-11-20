# OrbiWorks — Plataforma de Aprendizado Contínuo

## Descrição

A OrbiWorks é uma plataforma de aprendizagem contínua e carreira com propósito. Unimos inteligência artificial para trilhas personalizadas, mercado de projetos reais com empresas, coaching de carreira via chatbot, bem-estar e produtividade, além de comunidade e gamificação.

**Público-alvo:** Pessoas em transição de carreira (B2C) e empresas que requalificam times (B2B).  
**Alinhamento ODS:** 4, 8, 9 e 10.

## Status do Projeto

✅ **Em desenvolvimento ativo** — Versão 0.1.0

Funcionalidades implementadas:
- ✅ Tema escuro/claro com Context API e persistência
- ✅ Rotas estáticas e dinâmicas (`/projetos/:id`)
- ✅ Página de Equipe completa com RM, Turma e links
- ✅ Integração com API Java remota (com fallback para mocks)
- ✅ Formulário de Contato com validação
- ✅ Página 404 (NotFound)
- ✅ Responsividade e acessibilidade básica

## Sumário

- [Sobre o Projeto](#sobre-o-projeto)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Instalação](#instalação)
- [Como Usar](#como-usar)
- [Variáveis de Ambiente](#variáveis-de-ambiente)
- [Estrutura de Pastas](#estrutura-de-pastas)
- [Endpoints ou Rotas Principais](#endpoints-ou-rotas-principais)
- [Autores e Créditos](#autores-e-créditos)
- [Screenshots / Demonstração](#screenshots--demonstração)
- [Deploy Vercel](#deploy-vercel)
- [Contato](#contato)

## Sobre o Projeto

A OrbiWorks oferece:

- **Trilhas de Aprendizado com IA:** Identificação de skills gap e criação de planos de estudo personalizados
- **Projetos Reais:** Conexão entre profissionais e empresas através de projetos práticos
- **Coaching de Carreira:** Chatbot inteligente para orientação profissional
- **Bem-estar e Produtividade:** Check-ins de humor, Pomodoro, alertas de burnout
- **Comunidade e Gamificação:** XP, badges, desafios e ranking

## Tecnologias Utilizadas

- **React 18.2.0** — Biblioteca JavaScript para interfaces
- **TypeScript 5.1.6** — Superset JavaScript com tipagem estática
- **Vite 5.1.0** — Build tool e dev server
- **Tailwind CSS 3.4.7** — Framework CSS utility-first
- **React Router DOM 6.14.1** — Roteamento para React
- **Node.js >= 18** — Runtime JavaScript
- **npm >= 9** — Gerenciador de pacotes

## Instalação

### Pré-requisitos

- Node.js 18 ou superior
- npm 9 ou superior

### Passos

1. Clone o repositório:
```bash
git clone <https://github.com/Global-Solution-OrbiWorks/orbiworks-web-app.git>
cd global_solution_orbi_works
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente (veja seção [Variáveis de Ambiente](#variáveis-de-ambiente)):
```bash
cp .env.example .env
# Edite o arquivo .env e configure VITE_API_URL
```

4. Execute o servidor de desenvolvimento:
```bash
npm run dev
```

5. Acesse `http://localhost:5173` no navegador.

## Como Usar

### Scripts Disponíveis

- `npm run dev` — Inicia o servidor de desenvolvimento (Vite)
- `npm run build` — Compila TypeScript e gera build de produção (`dist/`)
- `npm run preview` — Pré-visualiza a build otimizada localmente
- `npm run type-check` — Verifica erros de tipo TypeScript sem gerar arquivos

### URL Pública (Vercel)

🔗 **Aplicação em produção:** [https://orbiworks.vercel.app](https://orbiworks.vercel.app) *(atualize com a URL real após deploy)*

## Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto com:

```env
# URL da API OrbiWorks (ex.: ambiente de staging/prod)
VITE_API_URL=https://rm564969orbiworksgs.onrender.com
```

**Importante:**
- No ambiente local, configure `VITE_API_URL` no arquivo `.env`
- Na Vercel, adicione a variável `VITE_API_URL` nas configurações do projeto (Settings → Environment Variables)
- Se a API não estiver disponível, a aplicação usa mocks locais como fallback

## Estrutura de Pastas

```
global_solution_orbi_works/
├── src/
│   ├── components/          # Componentes reutilizáveis
│   │   ├── Badge.tsx
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Footer.tsx
│   │   ├── Input.tsx
│   │   ├── MemberCard.tsx
│   │   ├── Navbar.tsx
│   │   └── ThemeToggle.tsx
│   ├── context/             # Context API
│   │   └── ThemeContext.tsx
│   ├── layouts/             # Layouts
│   │   └── MainLayout.tsx
│   ├── mocks/                # Dados mock
│   │   ├── badges.ts
│   │   ├── persons.ts
│   │   ├── projects.ts
│   │   └── skills.ts
│   ├── pages/                # Páginas da aplicação
│   │   ├── Admin.tsx
│   │   ├── BemEstar.tsx
│   │   ├── Chatbot.tsx
│   │   ├── Comunidade.tsx
│   │   ├── Contato.tsx
│   │   ├── Equipe.tsx
│   │   ├── Home.tsx
│   │   ├── NotFound.tsx
│   │   ├── Planos.tsx
│   │   ├── ProjetoDetalhe.tsx
│   │   ├── Projetos.tsx
│   │   ├── Solucao.tsx
│   │   └── Trilhas.tsx
│   ├── services/             # Serviços de API
│   │   └── api.ts
│   ├── types/                 # Tipagens TypeScript
│   │   ├── member.ts
│   │   └── projeto.ts
│   ├── utils/                 # Utilitários
│   │   └── avatar.ts
│   ├── App.tsx
│   ├── AppRouter.tsx
│   ├── index.css
│   └── main.tsx
├── .env.example              # Exemplo de variáveis de ambiente
├── index.html
├── package.json
├── tailwind.config.cjs
├── tsconfig.json
└── vite.config.ts
```

## Endpoints ou Rotas Principais

### Rotas da Aplicação

| Rota | Descrição |
|------|-----------|
| `/` | Página inicial (Home) |
| `/solucao` | Visão geral da solução |
| `/trilhas` | Trilhas de aprendizado |
| `/projetos` | Lista de projetos e vagas |
| `/projetos/:id` | Detalhes de um projeto específico (rota dinâmica) |
| `/bem-estar` | Bem-estar e produtividade |
| `/chatbot` | Chatbot de carreira |
| `/comunidade` | Comunidade e gamificação |
| `/equipe` | Página da equipe (integrantes) |
| `/contato` | Formulário de contato |
| `/admin` | Área administrativa |
| `*` | Página 404 (NotFound) |

### Endpoints da API (Java)

A aplicação consome os seguintes endpoints (configurados via `VITE_API_URL`):

- `GET /orbiworks` — Lista todos os registros OrbiWorks (usado como fonte de projetos no front-end)
- `GET /orbiworks/:codigo` — Busca um registro por ID (compatibilidade com `/:id` de projetos)
- `GET /habilidades/cliente/{codCliente}` — Busca habilidades por cliente
- `GET /habilidades` — Lista de habilidades
- `POST /habilidades` — Cria habilidade
- `POST /contato` — Envia mensagem de contato
- `POST /contato` — Envia mensagem de contato

**Exemplo de uso:**
```typescript
import { getProjetos, getProjetoById, postContato } from './services/api'

// Listar projetos
const projetos = await getProjetos()

// Buscar projeto específico
const projeto = await getProjetoById('pr1')

// Enviar contato
await postContato({
  nome: 'João Silva',
  email: 'joao@example.com',
  mensagem: 'Mensagem de contato'
})
```

## Autores e Créditos

### Integrantes da Equipe

| Nome | RM | Turma | Role | GitHub |
|------|----|----|------|----------|--------|
| João Vitor Lacerda Consorte | 565565 | 1TDSPH | Front-end, Design de Telas e Homologação | *[https://github.com/joaolacerdaconsorte]* |
| Pedro de Matos Previtali | 564184 | 1TDSPH | Front-end Bug-Fix | *[https://github.com/PedroPrevitali]* |
| Murillo Fernandes Carapia | 564969 | 1TDSPH | Back-end e API |  *[https://github.com/MurilloFernandesCarapia]* |

## Screenshots / Demonstração

### Home
![Home](https://via.placeholder.com/800x400?text=Home+OrbiWorks) *(substitua por screenshot real)*

### Trilhas
![Trilhas](https://via.placeholder.com/800x400?text=Trilhas) *(substitua por screenshot real)*

### Projetos
![Projetos](https://via.placeholder.com/800x400?text=Projetos) *(substitua por screenshot real)*

### Equipe
![Equipe](https://via.placeholder.com/800x400?text=Equipe) *(substitua por screenshot real)*

### Tema Escuro
![Tema Escuro](https://via.placeholder.com/800x400?text=Dark+Mode) *(substitua por screenshot real)*

## Deploy Vercel

### Configuração

1. **Conecte o repositório** no Vercel (via GitHub/GitLab/Bitbucket)

2. **Configure o projeto:**
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Install Command:** `npm install`

3. **Adicione variáveis de ambiente:**
   - Vá em **Settings → Environment Variables**
   - Adicione `VITE_API_URL` com a URL da sua API Java remota
   - Exemplo: `VITE_API_URL=https://api.orbiworks.example.com`

4. **Deploy:**
   - O Vercel fará deploy automático a cada push na branch `main`
   - Ou faça deploy manual via CLI: `vercel --prod`

### Comandos Úteis

```bash
# Build local para testar
npm run build

# Preview da build
npm run preview

# Deploy via Vercel CLI (se instalado)
vercel
```

## Contato

Para dúvidas, sugestões ou problemas:

- **Email:** contato@orbiworks.example *(atualize com email real)*
- **Formulário:** Acesse `/contato` na aplicação
- **GitHub:** [Link do repositório] *(atualize com link real)*

---

**OrbiWorks** — Aprendizado contínuo. Carreira com propósito.

© 2025 OrbiWorks — Todos os direitos reservados.
