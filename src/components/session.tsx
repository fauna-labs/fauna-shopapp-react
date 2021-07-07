import {
  FC,
  createContext,
  useState,
  useMemo,
  useContext,
} from 'react'
import {
  User,
  Credentials,
  bootstrap,
  signIn,
  signOut,
} from '../domain/auth'

interface SessionValue {
  user: null | User
  hasSession: boolean
  signIn: (creds: Credentials) => Promise<void>
  signOut: () => void
}

const OUTSIDE_PROVIDER_ERR = 'Calling outside of "SessionProvider"'

const SessionCtx = createContext<SessionValue>({
  user: null,
  hasSession: false,

  signIn: () => Promise.reject(new Error(OUTSIDE_PROVIDER_ERR)),

  signOut: () => {
    throw new Error(OUTSIDE_PROVIDER_ERR)
  },
})

export const SessionProvider: FC = ({ children }) => {
  const [user, setUser] = useState(bootstrap)
  const sessionValue = useMemo<SessionValue>(
    () => ({
      user,
      hasSession: user != null,

      signIn: creds => signIn(creds).then(setUser),

      signOut: () => {
        signOut()
        setUser(null)
      },
    }),
    [user],
  )

  return (
    <SessionCtx.Provider value={sessionValue}>
      {children}
    </SessionCtx.Provider>
  )
}

export const useSession = () => useContext(SessionCtx)
