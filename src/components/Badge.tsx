import React from 'react'

type BadgeProps = React.HTMLAttributes<HTMLSpanElement> & {
  tone?: 'default' | 'success' | 'warning' | 'danger'
}

export default function Badge({ tone = 'default', className = '', children, ...props }: BadgeProps) {
  const toneMap: Record<string, string> = {
    default: 'bg-orbiwork-primary-100 text-orbiwork-primary-800',
    success: 'bg-orbiwork-state-success text-white',
    warning: 'bg-orbiwork-state-warning text-white',
    danger: 'bg-orbiwork-state-danger text-white'
  }
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${toneMap[tone]} ${className}`} {...props}>
      {children}
    </span>
  )
}
