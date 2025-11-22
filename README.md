# OrbiWorks — Plataforma de Aprendizado Contínuo

![Status do Projeto](https://img.shields.io/badge/STATUS-CONCLUÍDO-brightgreen?style=for-the-badge)

## 📋 Sumário

1. [Sobre o Projeto](#-sobre-o-projeto)
2. [Status do Projeto](#-status-do-projeto)
3. [Tecnologias Utilizadas](#-tecnologias-utilizadas)
4. [Instalação](#-instalação-e-execução)
5. [Como Usar](#-como-usar)
6. [Estrutura de Pastas](#-estrutura-de-pastas)
7. [Endpoints e Rotas Principais](#-endpoints-e-rotas-principais)
8. [Integração e Arquitetura](#-integração-e-arquitetura)
9. [Screenshots / Demonstração](#-screenshots--demonstração)
10. [Autores e Contato](#-autores-e-contato)
11. [Agradecimentos](#-agradecimentos)
12. [Links e Recursos](#-links-e-recursos)

---

## 📖 Sobre o Projeto

A **OrbiWorks** é uma plataforma completa de aprendizagem contínua e desenvolvimento de carreira com propósito. Unimos inteligência artificial para trilhas personalizadas, mercado de projetos reais com empresas, coaching de carreira via chatbot, bem-estar e produtividade, além de comunidade e gamificação.

**Público-alvo:** Pessoas em transição de carreira (B2C) e empresas que requalificam times (B2B).  
**Alinhamento ODS:** 4 (Educação de Qualidade), 8 (Trabalho Decente), 9 (Indústria e Inovação) e 10 (Redução das Desigualdades).

---

## ✅ Status do Projeto

> **Projeto Concluído** (Versão 1.0 - Entrega Global Solution)

---

## 🛠️ Tecnologias Utilizadas

* **Front-end:** React 18.2.0, TypeScript 5.1.6, Vite 5.1.0
* **Estilização:** Tailwind CSS 3.4.7
* **Roteamento:** React Router DOM 6.14.1
* **Testes:** Vitest 0.34.1
* **Runtime:** Node.js (v18+)
* **Gerenciador de Pacotes:** npm ou yarn

---

## 🚀 Instalação e Execução

### Pré-requisitos

* Node.js 18+ (recomendado: Node.js 22.14.0)
* npm ou yarn

### Passos

1.  **Clone o repositório**
    ```bash
    git clone https://github.com/Global-Solution-OrbiWorks/orbiworks-web-app.git
    cd global_solution_orbi_works
    ```

2.  **Instale as dependências**
    ```bash
    npm install
    ```

3.  **Configure as variáveis de ambiente**
    Crie um arquivo `.env` na raiz do projeto (opcional, pois a API já está configurada):
    ```env
    VITE_API_URL=https://rm564969orbiworksgs.onrender.com
    ```

4.  **Execute o projeto em desenvolvimento**
    ```bash
    npm run dev
    ```

---

## 💻 Como Usar



Você pode acessar a aplicação rodando localmente (passos acima) ou através do deploy oficial hospedado.

### 🌐 Acesso Online (Deploy)
**URL da Aplicação:** [https://orbiworks-web-app.vercel.app/](https://orbiworks-web-app.vercel.app/)

### Scripts Disponíveis
```bash
npm run dev         # Inicia servidor de desenvolvimento (http://localhost:5173)
npm run build       # Gera build de produção
npm run preview     # Preview do build de produção
npm run type-check  # Verifica erros de tipo TypeScript
npm test            # Executa testes (Vitest)
```

---

## 📁 Estrutura de Pastas

```
global_solution_orbi_works/
├── public/                 # Arquivos estáticos (Imagens, Screenshots)
├── src/
│   ├── components/         # Componentes reutilizáveis (Badge, Button, Card...)
│   ├── context/            # Context API (AuthContext, ThemeContext)
│   ├── layouts/            # Layouts de página
│   ├── mocks/              # Dados mockados para fallback
│   ├── pages/              # Páginas da aplicação (Home, Login, Perfil...)
│   ├── services/           # Serviços de API (fetch nativo)
│   ├── types/              # Tipos TypeScript
│   └── utils/              # Funções utilitárias
├── .env                    # Variáveis de ambiente
├── tailwind.config.cjs     # Configuração TailwindCSS
└── README.md               # Documentação
```

---

## 🛣️ Endpoints e Rotas Principais

### Rotas do Front-end (React Router)

| Rota | Descrição |
|------|-----------|
| `/` | Página inicial (Home) |
| `/equipe` | Página da equipe |
| `/login` | Página de login |
| `/cadastro` | Página de cadastro |
| `/perfil` | Perfil do usuário (Protegida) |
| `/chatbot` | Chatbot de carreira (Protegida) |

### Endpoints da API (Java Backend)
**Base URL:** `https://rm564969orbiworksgs.onrender.com`

* `GET /orbiworks` - Lista usuários
* `POST /orbiworks` - Cria usuário
* `PUT /orbiworks/:codigo` - Atualiza usuário
* `DELETE /orbiworks/:codigo` - Remove usuário
* `POST /contato` - Envia mensagem

---

## 🔌 Integração e Arquitetura

A comunicação segue o fluxo: `Páginas (UI) → Context API → Services → API Java`.

> [!WARNING]
> **Nota sobre Segurança (Login/Cadastro)**
>
> Este projeto optou por não utilizar **Hashing** para criptografia de senhas na API de Cadastro e Login.
>
> Reconhecemos que esta prática não é adequada para ambientes de produção e fere princípios de Proteção de Dados. No entanto, como este é um MVP acadêmico para a **Global Solution (FIAP)** e o foco atual do aprendizado está na integração entre Front-end e Back-end, mantivemos os dados em texto plano para viabilizar a entrega dentro do prazo e escopo técnico atuais.

---

## 📸 Screenshots / Demonstração

### Página Inicial
![Página Inicial da OrbiWorks](public/screenshots/home.png)

### Página da Equipe
![Integrantes](public/screenshots/equipe.png)

### ChatBot de Carreira
![Chat Bot](public/screenshots/chatbot.png)

### Login e Autenticação
![Login](public/screenshots/apilogin.png)

### Página Sobre
![Sobre Nós](public/screenshots/sobre.png)

---

## 👥 Autores e Contato

| Foto | Nome | RM | Turma | Links |
| :---: | :--- | :--- | :--- | :--- |
| <img src="public/membros/membro1.png" width="50" style="border-radius:50%"> | **João Vitor Lacerda** | 565565 | 1TDSPH | [![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=flat&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/joaolacerdaconsorte/) [![GitHub](https://img.shields.io/badge/GitHub-100000?style=flat&logo=github&logoColor=white)](https://github.com/joaolacerdaconsorte) |
| <img src="public/membros/membro3.png" width="50" style="border-radius:50%"> | **Pedro de Matos** | 564184 | 1TDSPH | [![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=flat&logo=linkedin&logoColor=white)](https://www.linkedin.com/) [![GitHub](https://img.shields.io/badge/GitHub-100000?style=flat&logo=github&logoColor=white)](https://github.com/PedroPrevitali) |
| <img src="public/membros/membro2.png" width="50" style="border-radius:50%"> | **Murillo Fernandes** | 564969 | 1TDSPH | [![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=flat&logo=linkedin&logoColor=white)](https://www.linkedin.com/) [![GitHub](https://img.shields.io/badge/GitHub-100000?style=flat&logo=github&logoColor=white)](https://github.com/MurilloFernandesCarapia) |


---

## 🙏 Agradecimentos

* **FIAP** - Faculdade de Informática e Administração Paulista
* **Professor:** Alexandre Carlos de Jesus [@alecarlosjesus](https://github.com/alecarlosjesus)

---

**Desenvolvido com ❤️ pela equipe OrbiWorks**

🎓 **OrbiWorks** - Aprendizado contínuo. Carreira com propósito.

© 2025 OrbiWorks — Todos os direitos reservados.

---

### 🔗 Links e Recursos
Aqui estão os links diretos para acessar e avaliar o projeto:

* 🌐 **Deploy (Acesso Online):** [https://orbiworks-web-app.vercel.app/](https://orbiworks-web-app.vercel.app/)
* 🔗 **Repositório GitHub:** [https://github.com/Global-Solution-OrbiWorks/orbiworks-web-app](https://github.com/Global-Solution-OrbiWorks/orbiworks-web-app)
* 🔌 **API URL:** `https://rm564969orbiworksgs.onrender.com`

### 🎥 Vídeo de Apresentação
Clique na imagem abaixo para assistir à demonstração completa no YouTube:

[![Vídeo de Apresentação OrbiWorks](https://img.youtube.com/vi/Mgpxrv49_cU/0.jpg)](https://www.youtube.com/watch?v=Mgpxrv49_cU)
