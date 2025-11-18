import React from 'react'

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'outline' | 'ghost'
}

export default function Button({ variant = 'primary', className = '', ...props }: ButtonProps) {
  const base = 'inline-flex items-center justify-center px-4 py-2 rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-offset-2'
  const variants: Record<string, string> = {
    primary: 'bg-orbiwork-primary-500 text-white hover:bg-orbiwork-primary-600 focus:ring-orbiwork-primary-300',
    outline: 'border border-orbiwork-primary-300 text-orbiwork-primary-700 bg-transparent hover:bg-orbiwork-primary-50',
    ghost: 'bg-transparent text-orbiwork-primary-600 hover:bg-orbiwork-primary-50'
  }
  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props} />
  )
}
