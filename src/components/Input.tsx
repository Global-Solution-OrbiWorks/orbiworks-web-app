import React from 'react'

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string
}

export default function Input({ label, className = '', ...props }: InputProps) {
  return (
    <label className={`block text-sm text-gray-700 dark:text-gray-200 ${className}`}>
      {label && <span className="block mb-1">{label}</span>}
      <input className="w-full px-3 py-2 rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-orbiwork-primary-200" {...props} />
    </label>
  )
}
