import React from 'react'

interface TextareaProps {
  id: string
  name: string
  value: string
  onChange: React.ChangeEventHandler<HTMLTextAreaElement>
  placeholder?: string
  rows?: number
  required?: boolean
  className?: string
}

export const Textarea: React.FC<TextareaProps> = ({
  id,
  name,
  value,
  onChange,
  placeholder,
  rows = 4,
  required = false,
  className = ''
}) => {
  return (
    <textarea
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows={rows}
      required={required}
      className={`w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-airline-red-500 resize-none ${className}`}
    />
  )
}

export default Textarea
