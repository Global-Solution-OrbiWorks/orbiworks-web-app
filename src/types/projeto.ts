// Tipos legados mantidos para compatibilidade com páginas antigas
// TODO: Migrar para usar tipos de orbiworks.ts
export type Nivel = 'Beginner' | 'Intermediate' | 'Advanced'
export type Area = 'frontend' | 'backend' | 'ml' | 'fullstack'

export interface ProjetoBase {
  id: string
  titulo: string
  area: Area
}

export interface ProjetoEmpresa extends ProjetoBase {
  empresa: string
  nivel?: Nivel
  descricao?: string
}

export type Projeto = ProjetoBase & {
  tags?: string[]
}

