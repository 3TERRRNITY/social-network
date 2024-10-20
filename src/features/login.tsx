import { useForm } from 'react-hook-form'
import { Input } from '../components/input'
import { Link } from '@nextui-org/react'
import { Button } from '../components/button'

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
  return (
    <form className='flex flex-col gap-4'>
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
        <Button fullWidth color='primary' type='submit'>
          Войти
        </Button>
      </div>
    </form>
  )
}
