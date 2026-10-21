import { PropsWithChildren } from 'react'

import { twMerge } from 'tailwind-merge'

type FieldProps = PropsWithChildren<{
    className?: string
}>

export const Field = ({ className, children }: FieldProps) => {
    return <div className={twMerge('space-y-1', className)}>{children}</div>
}
