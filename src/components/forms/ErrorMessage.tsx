import type { PropsWithChildren } from 'react'

type ErrorMessageProps = PropsWithChildren<{
  id?: string
}>

export const ErrorMessage = ({ children, id }: ErrorMessageProps) => {
  return (
    <span id={id} role="alert" className="block text-red-800">
      {children}
    </span>
  )
}
