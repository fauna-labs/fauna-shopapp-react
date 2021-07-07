import { FC, HTMLAttributes } from 'react'
import cn from 'classnames'
import { Button } from './button'
import { Product as ProductType } from '../domain/product'

export interface ProductProps extends HTMLAttributes<HTMLDivElement> {
  product: ProductType
  added?: boolean
  onBuy?: () => void
}

export const Product: FC<ProductProps> = ({
  className,
  product,
  onBuy,
  added,
  ...rest
}) => {
  const isOutOfStock = product.quantity === 0

  return (
    <div
      {...rest}
      className={cn(
        'flex flex-col bg-white',
        'overflow-hidden rounded-lg shadow',
        className,
      )}
    >
      <div
        className={cn(
          'w-full h-44 md:h-64',
          'bg-gradient-to-r from-purple-800 to-blue-300',
        )}
      />
      <div
        className={cn('flex flex-grow justify-between p-4 md:p-6')}
      >
        <div className="flex flex-col mr-1">
          <h3
            className={cn(
              'font-semibold mb-2 text-xl',
              'leading-tight sm:leading-normal',
            )}
          >
            {product.name}
          </h3>
          <span className="font-semibold text-gray-600 leading-none">
            ${product.price.toFixed(2)}
          </span>
        </div>
        <Button
          className={cn('self-end', isOutOfStock && 'cursor-default')}
          disabled={isOutOfStock}
          color="blue"
          onClick={onBuy}
        >
          {isOutOfStock ? 'OUT OF STOCK' : added ? 'ADDED' : 'BUY'}
        </Button>
      </div>
    </div>
  )
}
