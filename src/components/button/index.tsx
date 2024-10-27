import { Button as NextButton } from '@nextui-org/react'

type ButtonProps = {
  children: React.ReactNode
  icon?: JSX.Element
  className?: string
  type?: 'button' | 'submit' | 'reset'
  fullWidth?: boolean
  isLoading?: boolean
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
  isLoading,
  type,
}) => {
  return (
    <NextButton
      className={className}
      startContent={icon}
      type={type}
      size='lg'
      color={color}
      variant='solid'
      fullWidth={fullWidth}
      isLoading={isLoading}
    >
      {children}
    </NextButton>
  )
}
