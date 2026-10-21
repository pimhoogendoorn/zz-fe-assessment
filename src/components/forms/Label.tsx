import { DetailedHTMLProps, forwardRef, LabelHTMLAttributes } from 'react'

import { cx } from 'class-variance-authority'
import { twMerge } from 'tailwind-merge'

export const Label = forwardRef<
    HTMLLabelElement,
    DetailedHTMLProps<LabelHTMLAttributes<HTMLLabelElement>, HTMLLabelElement>
>(({ children, className, ...rest }, ref) => {
    return (
        <label
            ref={ref}
            {...rest}
            className={cx(twMerge('block text-base font-medium', className))}
        >
            {children}
        </label>
    )
})

Label.displayName = 'Label'
