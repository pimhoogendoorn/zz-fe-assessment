import { PropsWithChildren } from 'react'

export const ErrorMessage = ({ children }: PropsWithChildren) => {
  return <span className="block text-red-800">{children}</span>
}
