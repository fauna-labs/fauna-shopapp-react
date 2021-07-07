export interface Credentials {
  phone: string
  password: string
}

export interface User {
  ref: string
  phone: string
  firstName: string
  lastName: string
}

export interface SessionPayload {
  authorization: string
  user: User
}
