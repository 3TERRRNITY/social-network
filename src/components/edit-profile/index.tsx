import { useContext, useState } from 'react'
import type { User } from '../../app/types'
import { ThemeContext } from '../theme-provider'
import { useUpdateUserMutation } from '../../app/services/userApi'
import { useParams } from 'react-router-dom'
import { Controller, useForm } from 'react-hook-form'
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Textarea,
} from '@nextui-org/react'
import { Input } from '../input'
import { MdOutlineEmail } from 'react-icons/md'
import { ErrorMessage } from '../error-message'
import { hasErrorField } from '../../utils/hasErrorHeld'

type TEditProfile = {
  isOpen: boolean
  onClose: () => void
  user?: User
}

export const EditProfile: React.FC<TEditProfile> = ({
  isOpen,
  onClose,
  user,
}) => {
  const { theme } = useContext(ThemeContext)
  const [updateUser, { isLoading }] = useUpdateUserMutation()
  const [error, setError] = useState('')
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const { id } = useParams<{ id: string }>()

  const { handleSubmit, control } = useForm<User>({
    mode: 'onChange',
    reValidateMode: 'onBlur',
    defaultValues: {
      email: user?.email,
      name: user?.name,
      dateOfBirth: user?.dateOfBirth,
      bio: user?.bio,
      location: user?.location,
    },
  })

  const handleFileChange = (e: any) => {
    if (e.target.files !== null) {
      setSelectedFile(e.target.files[0])
    }
  }

  const onSubmit = async (data: User) => {
    if (id) {
      try {
        const formData = new FormData()
        data.name && formData.append('name', data.name)
        data.email &&
          data.email !== user?.email &&
          formData.append('email', data.email)
        data.dateOfBirth &&
          formData.append(
            'dateOfBirth',
            new Date(data.dateOfBirth).toISOString(),
          )
        data.bio && formData.append('bio', data.bio)
        data.location && formData.append('location', data.location)
        selectedFile && formData.append('avatar', selectedFile)

        await updateUser({ userData: formData, id }).unwrap()
        onClose()
      } catch (error) {
        if (hasErrorField(error)) {
          setError(error.data.error)
        }
      }
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      hideCloseButton
      className={`${theme} text-foreground`}
    >
      <ModalContent>
        {onClose => (
          <>
            <ModalHeader className='flex flex-col gap-1'>
              Изменение профиля
            </ModalHeader>
            <ModalBody>
              <form
                className='flex flex-col gap-4'
                onSubmit={handleSubmit(onSubmit)}
              >
                <Input
                  control={control}
                  name='email'
                  label='Email'
                  type='email'
                  endContent={<MdOutlineEmail />}
                />
                <Input control={control} name='name' label='Имя' type='text' />
                <input
                  type='file'
                  name='avatarUrl'
                  placeholder='Выбери файл'
                  onChange={handleFileChange}
                />
                <Input
                  control={control}
                  name='dateOfBirth'
                  label='Дата появления на свет'
                  type='date'
                  placeholder='Дата рождения'
                />
                <Controller
                  name='bio'
                  control={control}
                  render={({ field }) => (
                    <Textarea {...field} rows={4} placeholder='Биография' />
                  )}
                />
                <Input
                  control={control}
                  name='location'
                  label='Место дислокации'
                  type='text'
                  placeholder='г. Майами'
                />
                <ErrorMessage error={error} />
                <div className='flex gap-2 justify-end'>
                  <Button
                    fullWidth
                    color='primary'
                    type='submit'
                    isLoading={isLoading}
                  >
                    Обновить профиль
                  </Button>
                </div>
              </form>
            </ModalBody>
            <ModalFooter>
              <Button color='danger' variant='light' onPress={onClose}>
                Закрыть
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}
