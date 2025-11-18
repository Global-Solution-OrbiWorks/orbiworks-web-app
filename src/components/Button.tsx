import React from 'react'

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'outline' | 'ghost'
}

export default function Button({ variant = 'primary', className = '', ...props }: ButtonProps) {
  const base = 'inline-flex items-center justify-center px-4 py-2 rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-offset-2'
  const variants: Record<string, string> = {
    primary: 'bg-orbiwork-primary-500 text-white hover:bg-orbiwork-primary-600 focus:ring-orbiwork-primary-300',
    outline: 'border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 bg-transparent hover:bg-gray-50 dark:hover:bg-gray-800 focus:ring-orbiwork-primary-300',
    ghost: 'bg-transparent text-orbiwork-primary-600 dark:text-orbiwork-primary-400 hover:bg-orbiwork-primary-50 dark:hover:bg-orbiwork-primary-900/20'
  }
  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props} />
  )
}
