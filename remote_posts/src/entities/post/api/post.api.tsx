import axios from 'axios'
import { GetPostListResponse, PostParams } from '../model/types/post.api.types'
import { IPost } from '../model/types/post.types'
import { extractResponsePages } from '../lib/extractResponsePages'

// const BASE_URL = 'https://jsonplaceholder.typicode.com/'
const BASE_URL = 'http://localhost:3000'

export const getPostList = async (params: PostParams): Promise<GetPostListResponse> => {
  const response = await axios.get<IPost[]>(`${BASE_URL}/posts`, {
    params
  })

  let totalCount: string | number | undefined = response.headers['x-total-count']
  totalCount = typeof totalCount === 'string' ? +totalCount : undefined
  const links = response.headers['link']?.split(',') || []
  const pages = extractResponsePages(links)
  const posts = response.data

  return {
    posts,
    totalCount: totalCount,
    firstPage: pages.first,
    prevPage: pages.prev,
    nextPage: pages.next,
    lastPage: pages.last
  }
}

export const createPost = async (post: Omit<IPost, 'id'>): Promise<IPost> => {
  const response = await fetch(`${BASE_URL}/posts`, {
    method: 'POST',
    body: JSON.stringify(post)
  })
  const createdPost: IPost = await response.json()
  return createdPost
}

export const updatePost = async (
  id: IPost['id'],
  post: Partial<Omit<IPost, 'id'>>
): Promise<IPost> => {
  const response = await fetch(`${BASE_URL}/posts/${id}`, {
    method: 'PUT',
    body: JSON.stringify({ id, ...post })
  })
  const updatedPost: IPost = await response.json()
  return updatedPost
}

export const deletePost = async ({ id }: Pick<IPost, 'id'>): Promise<IPost> => {
  const response = await fetch(`${BASE_URL}/posts/${id}`, { method: 'DELETE' })
  const deletedPost: IPost = await response.json()
  return deletedPost
}
