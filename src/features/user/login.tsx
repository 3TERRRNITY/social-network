import { useForm } from 'react-hook-form'
import { Input } from '../../components/input'
import { Link } from '@nextui-org/react'
import { Button } from '../../components/button'
import {
  useLazyCurrentQuery,
  useLoginMutation,
} from '../../app/services/userApi'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { ErrorMessage } from '../../components/error-message'
import { hasErrorField } from '../../utils/hasErrorHeld'

type Login = {
  email: string
  password: string
}

type LoginProps = {
  setSelected: (value: string) => void
}

export const Login: React.FC<LoginProps> = ({ setSelected }) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Login>({
    mode: 'onChange',
    reValidateMode: 'onBlur',
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const [login, { isLoading }] = useLoginMutation()
  const navigate = useNavigate()
  const [error, setError] = useState('')
  const [triggerCurrentQuery] = useLazyCurrentQuery()

  const onSubmit = async (data: Login) => {
    try {
      await login(data).unwrap()
      await triggerCurrentQuery().unwrap()
      navigate('/')
    } catch (error) {
      if (hasErrorField(error)) {
        setError(error.data.error)
      }
    }
  }
  return (
    <form className='flex flex-col gap-4' onSubmit={handleSubmit(onSubmit)}>
      <Input
        control={control}
        name='email'
        label='Email'
        type='email'
        required='Обязательно надо, старина'
      />
      <Input
        control={control}
        name='password'
        label='Пароль'
        type='password'
        required='Обязательно надо, старина'
      />

      <ErrorMessage error={error} />

      <p className='text-center text-small'>
        Впервые тут?{' '}
        <Link
          size='sm'
          className='cursor-pointer'
          onPress={() => setSelected('sign-up')}
        >
          Зарегистрируйся
        </Link>
      </p>

      <div className='flex gap-2 justify-end'>
        <Button fullWidth color='primary' type='submit' isLoading={isLoading}>
          Войти
        </Button>
      </div>
    </form>
  )
}
