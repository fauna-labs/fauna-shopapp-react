import { FC, ButtonHTMLAttributes } from 'react'
import cn from 'classnames'

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  color?: string
  selected?: boolean
  disabled?: boolean
}

export const Button: FC<ButtonProps> = ({
  children,
  className,
  selected,
  disabled,
  color = 'indigo',
  ...rest
}) => (
  <button
    {...rest}
    className={cn(
      selected
        ? `bg-${color}-800`
        : disabled
        ? 'bg-gray-300'
        : `bg-${color}-500 hover:bg-${color}-600`,
      'text-white text-sm px-4 py-1 border rounded-2xl',
      'transition-colors duration-300',
      className,
    )}
    disabled={disabled}
  >
    {children}
  </button>
)
