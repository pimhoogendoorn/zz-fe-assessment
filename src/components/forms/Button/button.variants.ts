import { cx } from 'class-variance-authority'

export const subNavigationVariant = cx([
  'rounded-lg border border-gray-200 text-black hover:bg-gray-100',
])

export const callToActionVariant = cx(['bg-blue-500 p-3 font-semibold text-white'])
export const disabledActionVariant = cx(['bg-gray-300 text-black p-3 font-semibold'])
