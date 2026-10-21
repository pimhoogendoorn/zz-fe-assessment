import { zodResolver } from '@hookform/resolvers/zod'
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'
import { FormProvider, useForm } from 'react-hook-form'
import { describe, expect, it, vi } from 'vitest'
import { personalInfoSchema, type PersonalInfoData } from '@/schemas/personal'
import { PersonalInfo } from '../PersonalInfo'

const TestForm = ({ onSubmit }: { onSubmit: (data: PersonalInfoData) => void }) => {
  const methods = useForm<PersonalInfoData>({
    defaultValues: {
      firstname: '',
      lastname: '',
      dateOfBirth: '',
      email: '',
      address: '',
    },
    mode: 'onChange',
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
  it('keeps next disabled until every field is valid', async () => {
    render(<TestForm onSubmit={vi.fn()} />)

    const nextButton = screen.getByRole('button', { name: /volgende/i })
    expect(nextButton).toBeDisabled()

    fireEvent.change(screen.getByLabelText('Uw voornaam'), { target: { value: 'Jan' } })
    fireEvent.change(screen.getByLabelText('Uw achternaam'), { target: { value: 'Jansen' } })
    fireEvent.change(screen.getByLabelText('Uw geboortedatum'), { target: { value: '1990-01-01' } })
    fireEvent.change(screen.getByLabelText('Uw e-mailadres'), {
      target: { value: 'jan@example.com' },
    })
    fireEvent.change(screen.getByLabelText('Uw adres'), { target: { value: 'Straat 1' } })

    await waitFor(() => expect(nextButton).toBeEnabled())
  })

  it('submits the complete personal information payload', async () => {
    const onSubmit = vi.fn()
    render(<TestForm onSubmit={onSubmit} />)

    await act(async () => {
      fireEvent.change(screen.getByLabelText('Uw voornaam'), { target: { value: 'Jan' } })
      fireEvent.change(screen.getByLabelText('Uw achternaam'), { target: { value: 'Jansen' } })
      fireEvent.change(screen.getByLabelText('Uw geboortedatum'), {
        target: { value: '1990-01-01' },
      })
      fireEvent.change(screen.getByLabelText('Uw e-mailadres'), {
        target: { value: 'jan@example.com' },
      })
      fireEvent.change(screen.getByLabelText('Uw adres'), { target: { value: 'Straat 1' } })
    })

    const nextButton = screen.getByRole('button', { name: /volgende/i })
    await waitFor(() => expect(nextButton).toBeEnabled())
    fireEvent.click(nextButton)

    await waitFor(() => {
      expect(onSubmit.mock.calls[0]?.[0]).toEqual({
        firstname: 'Jan',
        lastname: 'Jansen',
        dateOfBirth: '1990-01-01',
        email: 'jan@example.com',
        address: 'Straat 1',
      })
    })
  })

  it('shows the exact minimum-age error and summary banner', async () => {
    render(<TestForm onSubmit={vi.fn()} />)

    fireEvent.change(screen.getByLabelText('Uw geboortedatum'), {
      target: { value: '2010-06-15' },
    })
    fireEvent.blur(screen.getByLabelText('Uw geboortedatum'))

    await waitFor(() => {
      expect(
        screen.getByText('Kinderen zijn meeverzekerd met hun ouders tot 18 jaar'),
      ).toBeInTheDocument()
      expect(
        screen.getByText('Er lijkt iets mis te gaan met uw ingevulde gegevens.'),
      ).toBeInTheDocument()
    })
  })

  it('shows required validation when an untouched field is blurred', async () => {
    render(<TestForm onSubmit={vi.fn()} />)

    const firstname = screen.getByLabelText('Uw voornaam')
    fireEvent.focus(firstname)
    fireEvent.blur(firstname)

    await waitFor(() => expect(screen.getByText('Voornaam is verplicht')).toBeInTheDocument())
  })

  it('shows invalid email and date validation errors', async () => {
    render(<TestForm onSubmit={vi.fn()} />)

    fireEvent.change(screen.getByLabelText('Uw e-mailadres'), { target: { value: 'invalid' } })
    fireEvent.change(screen.getByLabelText('Uw geboortedatum'), {
      target: { value: '2050-01-01' },
    })

    await waitFor(() => {
      expect(screen.getByText('Ongeldig e-mailadres')).toBeInTheDocument()
      expect(screen.getByText('Geboortedatum is een toekomstige datum')).toBeInTheDocument()
    })
  })
})
