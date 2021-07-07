import { FC, HTMLAttributes } from 'react'
import cn from 'classnames'

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  title: string
}

export const Card: FC<CardProps> = ({
  className,
  children,
  title,
  ...rest
}) => (
  <div
    className={cn('bg-white rounded-lg shadow-lg py-2', className)}
  >
    <div className="p-4">
      <h4 className="text-xl italic font-bold mr-4 text-indigo-800">
        {title}
      </h4>
    </div>
    {children}
  </div>
)
