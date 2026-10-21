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

  return (
    <fieldset className="w-full">
      <h2 className="font-semibold text-blue-500 mb-0.5">Persoonlijke informatie</h2>
      <p className="text-gray-900">
        Vul onderstaande gegevens in om te beginnen met uw aanmelding.
      </p>

      {errors.root && <div className="mb-4 bg-red-800 p-2 text-white">{errors.root.message}</div>}

      <Field className="my-4">
        <Label htmlFor="firstname" className="mb-2 inline-block">
          Uw voornaam
        </Label>
        <Input
          id="firstname"
          type="text"
          {...register('firstname')}
          required={true}
          isValid={!errors.firstname}
          onBlur={() => trigger('firstname')}
          errorMessage={errors.firstname?.message}
          className="w-full"
        />
      </Field>
      <Button type="submit" disabled={!isValid}>
        Volgende stap
      </Button>
    </fieldset>
  )
}
