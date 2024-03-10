import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  IPost,
  SortPostOrder,
  PostList,
  PostListSkeleton,
  SortPostValue,
  createPost,
  deletePost,
  getPostList
} from 'entities/post'
import { useEffect, useState } from 'react'
import Pagination from '@mui/material/Pagination'
import Box from '@mui/material/Box'
import { IUser, getUser, getUserList } from 'entities/user'
import { Skeleton, Typography } from '@mui/material'

type PostListPagionationProps = {
  userId?: IUser['id']
  sortValue: SortPostValue
  sortOrder: SortPostOrder
}

const PostListPagionation = (props: PostListPagionationProps) => {
  const { sortOrder, sortValue, userId } = props
  const limit = 3
  const [page, setPage] = useState(1)

  const queryClient = useQueryClient()

  const { data, isError, isLoading, isFetching, isSuccess, isFetched, isPlaceholderData } =
    useQuery({
      queryFn: async () => {
        const { posts, totalCount } = await getPostList({
          _page: page,
          _limit: limit,
          _sort: sortValue,
          _order: sortOrder,
          userId: userId
        })

        const userIds = posts.map((post) => post.userId)

        const userRequests = userIds.map((userId) =>
          queryClient.fetchQuery({ queryKey: [userId], queryFn: () => getUser(userId) })
        )

        const users = await Promise.all(userRequests)

        const userPostList = posts.map((post) => ({
          post,
          user: users.find((user) => post.userId === user.id) as IUser
        }))

        return {
          userPostList,
          totalCount
        }
      },
      queryKey: ['posts', { sortValue, sortOrder }, page, userId],
      placeholderData: keepPreviousData
    })

  const { mutate: mutateCreatePost } = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] })
    }
  })

  const { mutate: mutateDeletePost } = useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] })
    }
  })

  const addNewPost = () => {
    const newPost: Omit<IPost, 'id'> = {
      userId: 1,
      title: `new post`,
      body: `post`,
      createdAt: new Date().toISOString()
    }

    mutateCreatePost(newPost)
  }

  const removePost = (id: IPost['id']) => {
    mutateDeletePost({ id })
  }

  if (isError) return <div>Error</div>

  return (
    <Box>
      {isSuccess && isFetched && <PostList userPostList={data.userPostList} />}
      {(isLoading || isFetching) && <PostListSkeleton items={limit} />}
      <Box mt={2} display={'flex'} justifyContent={'center'}>
        <Pagination
          disabled={isPlaceholderData}
          variant='outlined'
          color='standard'
          page={page}
          onChange={(_, p) => {
            setPage(p)
          }}
          count={Math.ceil((data?.totalCount ?? 0) / limit)}
        />
      </Box>
    </Box>
  )
}

export { PostListPagionation }
