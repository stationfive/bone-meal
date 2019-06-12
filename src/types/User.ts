import { Omit } from 'utils/TypeUtils/Omit'

export type User = {
  id: string,
  email: string,
}

export type UserNew = Omit<User, "id">
