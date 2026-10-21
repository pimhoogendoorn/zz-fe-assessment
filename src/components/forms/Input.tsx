import { DetailedHTMLProps, forwardRef, InputHTMLAttributes } from 'react'

import { cx } from 'class-variance-authority'
import { twMerge } from 'tailwind-merge'
import { ErrorMessage } from './ErrorMessage'

export type InputProps = {
  isValid?: boolean
  errorMessage?: string
  errorId?: string
}

export const Input = forwardRef<
  HTMLInputElement,
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & InputProps
>(({ className, isValid, errorMessage, errorId, ...rest }, ref) => {
  return (
    <>
      <input
        ref={ref}
        autoCorrect="off"
        data-1p-ignore
        {...rest}
        className={cx(twMerge('border bg-gray-300 p-2 focus:border-blue-950', className), {
          'border-transparent': isValid ?? true,
          'border-red-800': isValid === false,
        })}
      />
      {isValid || errorMessage === '' ? null : (
        <ErrorMessage id={errorId}>{errorMessage || 'Ongeldig'}</ErrorMessage>
      )}
    </>
  )
})

Input.displayName = 'Input'
