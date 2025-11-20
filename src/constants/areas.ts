export interface AreaOption {
  value: string
  label: string
}

export interface AreaGroup {
  label: string
  options: AreaOption[]
}

export const AREA_INTERESSE_OPTIONS: AreaGroup[] = [
  {
    label: 'Tecnologia da Informação',
    options: [
      { value: 'Desenvolvedor Full Stack', label: 'Desenvolvedor Full Stack' },
      { value: 'Desenvolvedor Frontend', label: 'Desenvolvedor Frontend' },
      { value: 'Desenvolvedor Backend', label: 'Desenvolvedor Backend' },
      { value: 'Desenvolvedor Mobile', label: 'Desenvolvedor Mobile' },
      { value: 'Cientista de Dados', label: 'Cientista de Dados' },
      { value: 'Analista de Dados', label: 'Analista de Dados' },
      { value: 'Especialista em IA / Machine Learning', label: 'Especialista em IA / Machine Learning' },
      { value: 'Designer UX/UI', label: 'Designer UX/UI' },
      { value: 'Analista de QA/Testes', label: 'Analista de QA/Testes' },
      { value: 'Gerente de Projetos de TI', label: 'Gerente de Projetos de TI' }
    ]
  },
  {
    label: 'Administração e Gestão',
    options: [
      { value: 'Administrador', label: 'Administrador' },
      { value: 'Gerente Geral', label: 'Gerente Geral' },
      { value: 'Gerente de Operações', label: 'Gerente de Operações' },
      { value: 'Coordenador Administrativo', label: 'Coordenador Administrativo' },
      { value: 'Assistente Administrativo', label: 'Assistente Administrativo' }
    ]
  },
  {
    label: 'Finanças e Contabilidade',
    options: [
      { value: 'Contador', label: 'Contador' },
      { value: 'Analista Financeiro', label: 'Analista Financeiro' },
      { value: 'Controller', label: 'Controller' },
      { value: 'Especialista em Investimentos', label: 'Especialista em Investimentos' },
      { value: 'Analista de Crédito', label: 'Analista de Crédito' }
    ]
  },
  {
    label: 'Vendas e Marketing',
    options: [
      { value: 'Vendedor', label: 'Vendedor' },
      { value: 'Representante Comercial', label: 'Representante Comercial' },
      { value: 'Executivo de Contas', label: 'Executivo de Contas' },
      { value: 'Especialista em Marketing Digital', label: 'Especialista em Marketing Digital' },
      { value: 'Social Media', label: 'Social Media' },
      { value: 'Copywriter', label: 'Copywriter' }
    ]
  },
  {
    label: 'Operações e Logística',
    options: [
      { value: 'Analista de Logística', label: 'Analista de Logística' },
      { value: 'Gerente de Logística', label: 'Gerente de Logística' },
      { value: 'Coordenador de Logística', label: 'Coordenador de Logística' },
      { value: 'Motorista', label: 'Motorista' },
      { value: 'Operador de Armazém', label: 'Operador de Armazém' }
    ]
  },
  {
    label: 'Saúde',
    options: [
      { value: 'Médico', label: 'Médico' },
      { value: 'Enfermeiro', label: 'Enfermeiro' },
      { value: 'Fisioterapeuta', label: 'Fisioterapeuta' },
      { value: 'Nutricionista', label: 'Nutricionista' },
      { value: 'Psicólogo', label: 'Psicólogo' },
      { value: 'Farmacêutico', label: 'Farmacêutico' }
    ]
  },
  {
    label: 'Educação',
    options: [
      { value: 'Professor', label: 'Professor' },
      { value: 'Coordenador Pedagógico', label: 'Coordenador Pedagógico' },
      { value: 'Pedagogo', label: 'Pedagogo' },
      { value: 'Instrutor', label: 'Instrutor' },
      { value: 'Tutor', label: 'Tutor' }
    ]
  },
  {
    label: 'Engenharia e Construção',
    options: [
      { value: 'Engenheiro Civil', label: 'Engenheiro Civil' },
      { value: 'Engenheiro de Produção', label: 'Engenheiro de Produção' },
      { value: 'Engenheiro Mecânico', label: 'Engenheiro Mecânico' },
      { value: 'Engenheiro Elétrico', label: 'Engenheiro Elétrico' },
      { value: 'Arquiteto', label: 'Arquiteto' },
      { value: 'Técnico em Edificações', label: 'Técnico em Edificações' }
    ]
  },
  {
    label: 'Atendimento e Suporte',
    options: [
      { value: 'Atendente', label: 'Atendente' },
      { value: 'Recepcionista', label: 'Recepcionista' },
      { value: 'Operador de Telemarketing', label: 'Operador de Telemarketing' },
      { value: 'Analista de Suporte', label: 'Analista de Suporte' },
      { value: 'Customer Success', label: 'Customer Success' }
    ]
  },
  {
    label: 'Outras Áreas',
    options: [
      { value: 'Profissional Autônomo', label: 'Profissional Autônomo' },
      { value: 'Empreendedor', label: 'Empreendedor' },
      { value: 'Consultor', label: 'Consultor' },
      { value: 'Assistente Social', label: 'Assistente Social' },
      { value: 'Artista / Criativo', label: 'Artista / Criativo' },
      { value: 'Outra', label: 'Outra' }
    ]
  },
  {
    label: 'Opções Legadas (Tecnologia)',
    options: [
      { value: 'frontend', label: 'Frontend (legado)' },
      { value: 'backend', label: 'Backend (legado)' },
      { value: 'fullstack', label: 'Fullstack (legado)' },
      { value: 'ml', label: 'Machine Learning (legado)' }
    ]
  }
]

