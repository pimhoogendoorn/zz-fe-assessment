import { zodResolver } from '@hookform/resolvers/zod'
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'
import { FormProvider, useForm } from 'react-hook-form'
import { describe, expect, it, vi } from 'vitest'
import { personalInfoSchema, type PersonalInfoData } from '@/schemas/personal'
import { PersonalInfo } from '../PersonalInfo'

const TestForm = ({ onSubmit }: { onSubmit: (data: PersonalInfoData) => void }) => {
  const methods = useForm<PersonalInfoData>({
    defaultValues: { firstname: '' },
    resolver: zodResolver(personalInfoSchema),
  })

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <PersonalInfo />
      </form>
    </FormProvider>
  )
}

describe('PersonalInfo form integration', () => {
  it('submits firstname through the parent form context', async () => {
    const onSubmit = vi.fn()
    render(<TestForm onSubmit={onSubmit} />)

    await act(async () => {
      const firstname = screen.getByLabelText('Uw voornaam')
      fireEvent.change(firstname, { target: { value: 'Jan' } })
      fireEvent.blur(firstname)
    })

    const nextButton = screen.getByRole('button', { name: /volgende/i })
    await waitFor(() => expect(nextButton).toBeEnabled())
    fireEvent.click(nextButton)

    await waitFor(() => {
      expect(onSubmit.mock.calls[0]?.[0]).toEqual({ firstname: 'Jan' })
    })
  })
})
