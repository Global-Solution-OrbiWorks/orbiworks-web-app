import React from 'react'

type CardProps = React.HTMLAttributes<HTMLDivElement> & {
  children?: React.ReactNode
}

export default function Card({ className = '', children, ...props }: CardProps) {
  return (
    <div
      {...props}
      className={`bg-white dark:bg-gray-800 rounded-lg shadow-smsoft p-6 border border-transparent hover:border-orbiwork-primary-100 transition-shadow transition-transform hover:-translate-y-0.5 ${className}`}
    >
      {children}
    </div>
  )
}
