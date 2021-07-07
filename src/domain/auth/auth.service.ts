import {
  apiClient,
  signInApiClient,
  signOutApiClient,
} from '../apiClient'
import { Credentials, SessionPayload, User } from './auth.type'

const LS_SESSION_KEY = 'session'

const getSession = (): null | SessionPayload => {
  const session = localStorage.getItem(LS_SESSION_KEY)

  return session ? JSON.parse(session) : null
}

const putSession = (payload: SessionPayload) => {
  localStorage.setItem(LS_SESSION_KEY, JSON.stringify(payload))
}

const deleteSession = () => {
  localStorage.removeItem(LS_SESSION_KEY)
}

export const bootstrap = (): null | User => {
  const { authorization, user = null } = getSession() ?? {}

  if (authorization) {
    signInApiClient({
      authorization,
    })
  }

  return user
}

export const isInvalidCredsError = (err: any) =>
  err?.response?.status === 401

export const signIn = async (creds: Credentials): Promise<User> =>
  apiClient()
    .post<SessionPayload>('/users/login', {
      ...creds,
      type: 'CUSTOMER',
    })
    .then(({ data }) => {
      putSession(data)
      signInApiClient(data)

      return data.user
    })

export const signOut = () => {
  deleteSession()
  signOutApiClient()
}
