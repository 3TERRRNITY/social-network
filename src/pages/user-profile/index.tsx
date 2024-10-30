import { Button, Card, Image, useDisclosure } from '@nextui-org/react'
import { useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import {
  useGetUserByIdQuery,
  useLazyCurrentQuery,
  useLazyGetUserByIdQuery,
} from '../../app/services/userApi'
import {
  useFollowUserMutation,
  useUnfollowUserMutation,
} from '../../app/services/followApi'
import { useEffect } from 'react'
import { resetUser, selectCurrent } from '../../features/user/userSlice'
import { GoBack } from '../../components/go-back'
import { BASE_URL } from '../../constants'
import {
  MdOutlinePersonAddAlt1,
  MdOutlinePersonAddDisabled,
} from 'react-icons/md'
import { CiEdit } from 'react-icons/ci'
import { ProfileInfo } from '../../components/profile-info'
import { formatToClientDate } from '../../utils/formatToClientData'
import { CountInfo } from '../../components/count-info'
import { EditProfile } from '../../components/edit-profile'

export const UserProfile = () => {
  const { id } = useParams<{ id: string }>()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const currentUser = useAppSelector(selectCurrent)
  const { data } = useGetUserByIdQuery(id ?? '')
  const [followUser] = useFollowUserMutation()
  const [unfollowUser] = useUnfollowUserMutation()
  const [triggerGetUserById] = useLazyGetUserByIdQuery()
  const [triggerCurrentQuery] = useLazyCurrentQuery()
  const dispatch = useAppDispatch()

  const handleFollow = async () => {
    try {
      if (id) {
        data?.isFollowing
          ? await unfollowUser(id).unwrap()
          : await followUser({ followingId: id }).unwrap()

        await triggerGetUserById(id).unwrap()
        await triggerCurrentQuery().unwrap()
      }
    } catch (error) {
      console.error(error)
    }
  }

  const handleClose = async () => {
    try {
      if (id) {
        await triggerGetUserById(id).unwrap()
        await triggerCurrentQuery().unwrap()
        onClose()
      }
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    dispatch(resetUser())
  }, [])

  if (!data) {
    return null
  }
  return (
    <>
      <GoBack />
      <div className='flex items-center gap-4'>
        <Card className='flex flex-col items-center text-center space-y-4 p-5 flex-2'>
          <Image
            src={`${BASE_URL}${data.avatarUrl}`}
            alt={data.name}
            width={200}
            height={200}
            className='border-4 border-white'
          />
          <div className='flex flex-col text-2xl font-bold gap-4 items-center'>
            {data.name}
            {currentUser?.id !== id ? (
              <Button
                color={data.isFollowing ? 'default' : 'primary'}
                className='gap-2'
                variant='flat'
                onClick={handleFollow}
                endContent={
                  data.isFollowing ? (
                    <MdOutlinePersonAddDisabled />
                  ) : (
                    <MdOutlinePersonAddAlt1 />
                  )
                }
              >
                {data.isFollowing ? 'Отписаться' : 'Подписаться'}
              </Button>
            ) : (
              <Button endContent={<CiEdit />} onClick={() => onOpen()}>
                Редактировать
              </Button>
            )}
          </div>
        </Card>

        <Card className='flex flex-col space-y-4 p-5 flex-1 h-[344px]'>
          <ProfileInfo title='Почта' info={data.email} />
          <ProfileInfo title='Место дислокации' info={data.location} />
          <ProfileInfo
            title='Дата появления на свет'
            info={formatToClientDate(data.dateOfBirth)}
          />
          <ProfileInfo title='О фикседгире и его обладателе' info={data.bio} />

          <div className='flex gap-2'>
            <CountInfo count={data.followers.length} title={'Подписчики'} />
            <CountInfo count={data.following.length} title={'Подписки'} />
          </div>
        </Card>
      </div>
      <EditProfile isOpen={isOpen} onClose={handleClose} user={data} />
    </>
  )
}
