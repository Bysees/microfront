import { IUser } from './user.types'

// TODO Вынести в shared, создать axios instance

export type UserParams = {
  ids: IUser['id'][]
}
