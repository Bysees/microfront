import { IUser } from 'entities/user'
import { IPost } from './post.types'

export type SortPostValue = keyof Pick<IPost, 'createdAt'>
export type SortPostOrder = 'asc' | 'desc'

export type PostParams = {
  _limit?: number
  _page?: number
  _sort?: SortPostValue
  _order?: SortPostOrder
  userId?: IUser['id']
}

export type GetPostListResponse = {
  posts: IPost[]
  totalCount?: number
  firstPage?: number
  prevPage?: number
  nextPage?: number
  lastPage?: number
}
