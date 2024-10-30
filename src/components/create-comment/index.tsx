import {
  useCreatePostMutation,
  useLazyGetAllPostsQuery,
  useLazyGetPostByIdQuery,
} from '../../app/services/postsApi'
import { Controller, useForm } from 'react-hook-form'
import { Button, Textarea } from '@nextui-org/react'
import { ErrorMessage } from '../error-message'
import { IoMdCreate } from 'react-icons/io'
import { useCreateCommentMutation } from '../../app/services/commentsApi'
import { useParams } from 'react-router-dom'

export const CreateComment = () => {
  const params = useParams<{ id: string }>()
  const [createComment] = useCreateCommentMutation()
  const [getPostById] = useLazyGetPostByIdQuery()

  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm()

  const error = errors?.post?.message as string

  const onSubmit = handleSubmit(async data => {
    try {
      if (params.id) {
        await createComment({
          content: data.comment,
          postId: params.id,
        }).unwrap()
        setValue('comment', '')
        await getPostById(params.id).unwrap()
      }
    } catch (error) {
      console.error(error)
    }
  })
  return (
    <form className='flex-grow' onSubmit={onSubmit}>
      <Controller
        name='comment'
        control={control}
        defaultValue={''}
        rules={{ required: 'Пиши не бойся. Я друг.' }}
        render={({ field }) => (
          <Textarea
            {...field}
            labelPlacement='outside'
            placeholder='Ответь корешу'
            className='mb-5'
          />
        )}
      />

      {errors && <ErrorMessage error={error} />}

      <Button
        color='success'
        className='flex-end'
        endContent={<IoMdCreate />}
        type='submit'
      >
        Ответить корешу
      </Button>
    </form>
  )
}
