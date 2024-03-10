import { IUser } from "entities/user"

export type IPost = {
  userId: IUser['id']
  id: number | string
  title: string
  body: string
  createdAt: string
}