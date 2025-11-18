import React from 'react'

type CardProps = React.HTMLAttributes<HTMLDivElement>

export default function Card({ className = '', children, ...props }: CardProps) {
  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-smsoft p-4 ${className}`} {...props}>
      {children}
    </div>
  )
}
