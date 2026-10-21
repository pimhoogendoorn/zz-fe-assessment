import { Field } from '@/components/forms/Field'
import { Input } from '@/components/forms/Input'
import { Label } from '@/components/forms/Label'
import type { PersonalInfoData } from '@/schemas/personal'
import { useFormContext } from 'react-hook-form'
import { Button } from '@/components/forms/Button/Button'

export const PersonalInfo = () => {
  const {
    register,
    trigger,
    formState: { errors, isValid },
  } = useFormContext<PersonalInfoData>()

  const hasFieldErrors = Object.keys(errors).some((key) => key !== 'root')

  const fields = [
    { name: 'firstname', label: 'Uw voornaam', type: 'text' },
    { name: 'lastname', label: 'Uw achternaam', type: 'text' },
    { name: 'dateOfBirth', label: 'Uw geboortedatum', type: 'date' },
    { name: 'email', label: 'Uw e-mailadres', type: 'email' },
    { name: 'address', label: 'Uw adres', type: 'text' },
  ] as const

  return (
    <fieldset className="w-full" aria-labelledby="personal-info-heading">
      <legend id="personal-info-heading" className="font-semibold text-blue-500 mb-0.5">
        Persoonlijke informatie
      </legend>
      <p className="text-gray-900 mb-4">
        Vul onderstaande gegevens in om te beginnen met uw aanmelding. Alle velden zijn verplicht.
      </p>

      {hasFieldErrors && (
        <div role="alert" className="mb-4 bg-red-200 p-2 ">
          Er lijkt iets mis te gaan met uw ingevulde gegevens.
        </div>
      )}
      {errors.root && <div className="mb-4 bg-red-800 p-2 text-white">{errors.root.message}</div>}

      {fields.map(({ name, label, type }) => {
        const error = errors[name]
        const errorId = `${name}-error`
        const field = register(name)

        return (
          <Field key={name} className="my-4">
            <Label htmlFor={name} className="mb-2 inline-block">
              {label}
            </Label>
            <Input
              id={name}
              type={type}
              {...field}
              required
              autoComplete="off"
              onBlur={(event) => {
                field.onBlur(event)
                void trigger(name)
              }}
              aria-invalid={error ? 'true' : 'false'}
              aria-describedby={error ? errorId : undefined}
              isValid={!error}
              errorId={errorId}
              errorMessage={error?.message}
              className="w-full"
            />
          </Field>
        )
      })}
      <div className="flex justify-between">
        <Button type="submit" disabled={!isValid} className="ml-auto">
          Volgende stap
        </Button>
      </div>
    </fieldset>
  )
}
