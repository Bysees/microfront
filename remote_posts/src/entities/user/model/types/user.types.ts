type ISex = 'male' | 'female'

export type IUser = {
  id: string | number
  avatar: string
  birthday: Date
  email: string
  firstName: string
  lastName: string
  sex: ISex
}
