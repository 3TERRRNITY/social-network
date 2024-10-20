import { Button as NextButton } from '@nextui-org/react'

type ButtonProps = {
  children: React.ReactNode
  icon?: JSX.Element
  className?: string
  type?: 'button' | 'submit' | 'reset'
  fullWidth?: boolean
  color:
    | 'default'
    | 'primary'
    | 'secondary'
    | 'success'
    | 'warning'
    | 'danger'
    | undefined
}

export const Button: React.FC<ButtonProps> = ({
  children,
  className,
  color,
  icon,
  fullWidth,
  type,
}) => {
  return (
    <NextButton
      className={className}
      startContent={icon}
      size='lg'
      color={color}
      variant='light'
      fullWidth={fullWidth}
    >
      {children}
    </NextButton>
  )
}
