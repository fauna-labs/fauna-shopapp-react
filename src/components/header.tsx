import { FC } from 'react'
import cn from 'classnames'
import { Link, Redirect } from 'react-router-dom'
import { useSession } from './session'
import { Button } from './button'

// interface CartButtonProps extends HTMLAttributes<HTMLButtonElement> {}

// const CartButton: FC<CartButtonProps> = ({ className }) => (
//   <Link className={cn('font-semibold', className)} to="/cart">
//     Cart
//     <span className="ml-2 bg-red-600 px-2 py-1 font-bold text-white rounded-full">
//       4
//     </span>
//   </Link>
// )

export const WithHeader: FC = ({ children }) => {
  const { hasSession, signOut } = useSession()

  if (!hasSession) {
    return <Redirect to="/sign-in" />
  }

  return (
    <>
      <header
        className={cn(
          'w-full flex justify-between',
          'items-center py-4 px-6 bg-white shadow',
        )}
      >
        <div>
          <Link
            to="/"
            className={cn(
              'text-2xl no-underline',
              'text-grey-darkest hover:text-blue-dark',
            )}
          >
            Home
          </Link>
        </div>
        <div>
          <Button color="blue" onClick={signOut}>
            Sign Out
          </Button>
        </div>
      </header>
      {children}
    </>
  )
}
