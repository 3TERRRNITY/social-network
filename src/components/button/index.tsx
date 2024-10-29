import { Button as NextButton } from '@nextui-org/react'

type ButtonProps = {
  children: React.ReactNode
  icon?: JSX.Element
  className?: string
  type?: 'button' | 'submit' | 'reset'
  variant?:
    | 'solid'
    | 'bordered'
    | 'light'
    | 'flat'
    | 'faded'
    | 'shadow'
    | 'ghost'
    | undefined
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
  variant = 'solid',
  type,
}) => {
  return (
    <NextButton
      className={className}
      startContent={icon}
      type={type}
      size='lg'
      color={color}
      variant={variant}
      fullWidth={fullWidth}
      isLoading={isLoading}
    >
      {children}
    </NextButton>
  )
}
