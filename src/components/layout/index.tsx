import { Outlet, useNavigate } from 'react-router-dom'
import { Container } from '../container'
import { Header } from '../header'
import { Navbar } from '../navbar'
import { useAppSelector } from '../../app/hooks'
import {
  selectIsAuthentificated,
  selectUser,
} from '../../features/user/userSlice'
import { useEffect } from 'react'
import { Profile } from '../profile'

export const Layout = () => {
  const isAuthentificated = useAppSelector(selectIsAuthentificated)
  const user = useAppSelector(selectUser)
  const navigate = useNavigate()

  useEffect(() => {
    if (!isAuthentificated) {
      navigate('/auth')
    }
  }, [])

  return (
    <>
      <Header />
      <Container>
        <div className='flex-2 p-4'>
          <Navbar />
        </div>

        <div className='flex-1 p-4'>
          <Outlet />
        </div>

        <div className='flex-2 p-4'>
          <div className='flex-col flex gap-5'>{!user && <Profile />}</div>
        </div>
      </Container>
    </>
  )
}
