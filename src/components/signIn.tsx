import { FC, ChangeEvent, SyntheticEvent, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { isInvalidCredsError } from '../domain/auth'
import { Card } from './card'
import { InputGroup } from './inputGroup'
import { Button } from './button'
import { useSession } from './session'

const useSignInFlow = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [values, setValues] = useState({
    phone: '',
    password: '',
  })
  const history = useHistory()
  const { signIn } = useSession()

  const makeOnChange =
    (field: 'phone' | 'password') =>
    ({ target: { value } }: ChangeEvent<HTMLInputElement>) =>
      setValues({
        ...values,
        [field]: value,
      })

  const onSignIn = (ev: SyntheticEvent<HTMLFormElement>) => {
    ev.preventDefault()

    setIsSubmitting(true)

    signIn(values)
      .then(() => {
        history.push('/')
      })
      .catch(err => {
        alert(
          isInvalidCredsError(err)
            ? 'Invalid phone or password'
            : 'Something went wrong :(',
        )
      })
      .finally(() => {
        setIsSubmitting(false)
      })
  }

  return {
    values,
    isSubmitting,
    makeOnChange,
    onSignIn,
  }
}

export const SignIn: FC = () => {
  const flow = useSignInFlow()

  return (
    <div className="container mx-auto">
      <Card
        className="w-4/5 sm:w-2/3 lg:w-1/3 mx-auto mt-20"
        title="Sign In"
      >
        <form
          className="px-8 pb-4 flex flex-col space-y-4"
          onSubmit={flow.onSignIn}
        >
          <InputGroup
            required
            noBottomMargin
            id="phone"
            label="Phone"
            value={flow.values.phone}
            onChange={flow.makeOnChange('phone')}
          />
          <InputGroup
            required
            noBottomMargin
            id="password"
            label="Password"
            type="password"
            value={flow.values.password}
            onChange={flow.makeOnChange('password')}
          />
          <Button
            className="w-full h-10 my-6"
            type="submit"
            disabled={flow.isSubmitting}
          >
            Sign In
          </Button>
        </form>
      </Card>
    </div>
  )
}
