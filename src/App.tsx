import type { PersonalInfoData } from '@/schemas/personal'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { PersonalInfo } from './features/personal-info/PersonalInfo'
import { zodResolver } from '@hookform/resolvers/zod'
import { personalInfoSchema } from '@/schemas/personal'

function App() {
  const methods = useForm<PersonalInfoData>({
    resolver: zodResolver(personalInfoSchema),
  })

  const { setError, handleSubmit } = methods

  // Submit or store in localStorage?
  const onSubmit: SubmitHandler<PersonalInfoData> = async (data) => {
    try {
      // Store the submitted data in localStorage or submit to API endpoint
      console.log('Submitting data', data)
    } catch (error) {
      // Make the error visible. In production we should pass this to our monitoring service
      console.error('Error form submit:', error, data)

      // Set a manual error for the root form state to display a general error message
      setError('root', {
        type: 'manual',
        message: 'Er is iets misgegaan bij het versturen. Probeer het later opnieuw.',
      })
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 md:flex md:items-center md:justify-center p-2">
      <main className="h-screen">
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className="w-full">
            <h1 className="text-xl">Aanmeldformulier Zorg & Zekerheid</h1>
            <PersonalInfo />
          </form>
        </FormProvider>
      </main>
    </div>
  )
}

export default App
