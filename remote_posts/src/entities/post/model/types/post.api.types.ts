import { IPost } from './post.types'

export type PostParams = {
  _limit?: number
  _page?: number
  userId?: number
}

export type GetPostListResponse = {
  posts: IPost[]
  totalCount?: number
  firstPage?: number
  prevPage?: number
  nextPage?: number
  lastPage?: number
}
