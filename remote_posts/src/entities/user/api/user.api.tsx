import axios from 'axios'
import { IUser } from '../model/types/user.types'
import { UserParams } from '../model/types/user.api.types'

// TODO Вынести в shared, создать axios instance
const BASE_URL = 'http://localhost:3000'

export const getUserList = async (params: UserParams): Promise<IUser[]> => {

  const response = await axios.get<IUser[]>(`${BASE_URL}/users`, {
    params: {
      id: params.ids
    }
  })
  const users = response.data
  return users
}

export const getUser = async (id: IUser['id']): Promise<IUser> => {
  const response = await axios.get<IUser>(`${BASE_URL}/users/${id}`)
  const user = response.data
  return user
}
