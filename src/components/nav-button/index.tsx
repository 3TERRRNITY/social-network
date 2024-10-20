import { Link } from 'react-router-dom'
import { Button } from '../button'

type NavButtonProps = {
  children: React.ReactNode
  icon: JSX.Element
  href: string
}
export const NavButton: React.FC<NavButtonProps> = ({
  children,
  icon,
  href,
}) => {
  return (
    <Button className='flex justify-start text-xl' icon={icon} color='primary'>
      <Link to={href}>{children}</Link>
    </Button>
  )
}
