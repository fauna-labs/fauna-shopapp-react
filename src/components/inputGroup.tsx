import { FC, InputHTMLAttributes, ReactNode } from 'react'
import cn from 'classnames'

interface InputGroupProps
  extends InputHTMLAttributes<HTMLInputElement> {
  id: string
  label: ReactNode
  className?: string
  inputClassName?: string
  rootProps?: Omit<InputHTMLAttributes<HTMLDivElement>, 'className'>
  noBottomMargin?: boolean
}

export const InputGroup: FC<InputGroupProps> = ({
  id,
  label,
  className,
  inputClassName,
  rootProps,
  noBottomMargin,
  ...inputProps
}) => (
  <div
    {...rootProps}
    className={cn(
      !noBottomMargin && 'mb-2 last-child:mb-0',
      className,
    )}
  >
    <label
      htmlFor={id}
      className="block mb-1 text-sm font-bold text-gray-500"
    >
      {label}
    </label>
    <input
      {...inputProps}
      id={id}
      className={cn(
        'w-full px-3 py-2 text-sm text-gray-600 border rounded',
        inputClassName,
      )}
    />
  </div>
)
