import { ButtonHTMLAttributes, DetailedHTMLProps, forwardRef } from 'react'

import { cx } from 'class-variance-authority'
import { callToActionVariant, disabledActionVariant } from './button.variants'

export const Button = forwardRef<
  HTMLButtonElement,
  DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
>(({ children, className, ...rest }, ref) => {
  return (
    <>
      <button
        ref={ref}
        {...rest}
        className={cx(rest.disabled ? disabledActionVariant : callToActionVariant, className)}
      >
        {children}
      </button>
    </>
  )
})

Button.displayName = 'Button'
