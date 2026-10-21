import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import { personalInfoSchema, type PersonalInfoData } from '@/schemas/personal'
import { PersonalInfo } from '../PersonalInfo'

const mockOnSubmit = vi.fn()

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

const renderPersonalInfo = () => render(<TestForm onSubmit={mockOnSubmit} />)

describe('PersonalInfo component', () => {
  beforeEach(() => {
    mockOnSubmit.mockClear()
  })

  it('renders every personal information field', () => {
    renderPersonalInfo()

    expect(screen.getByRole('textbox', { name: /voornaam/i })).toBeInTheDocument()
    expect(screen.getByRole('textbox', { name: /achternaam/i })).toBeInTheDocument()
    expect(screen.getByLabelText(/geboortedatum/i)).toBeInTheDocument()
    expect(screen.getByRole('textbox', { name: /e-mailadres/i })).toBeInTheDocument()
    expect(screen.getByRole('textbox', { name: 'Uw adres' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /volgende/i })).toBeDisabled()
    expect(screen.queryByRole('button', { name: /vorige|terug/i })).not.toBeInTheDocument()
  })
})
