import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { IPost, PostList, createPost, deletePost, getPostList } from 'entities/post'
import { useState } from 'react'
import Pagination from '@mui/material/Pagination'
import Box from '@mui/material/Box'

const PostListPagionation = () => {
  const limit = 10
  const [page, setPage] = useState(1)

  const queryClient = useQueryClient()

  const { data, isError, isLoading, isSuccess, isPlaceholderData } = useQuery({
    queryFn: () => getPostList({ _page: page, _limit: limit }),
    queryKey: ['posts', page],
    placeholderData: keepPreviousData,
    select: (data) => ({
      posts: data.posts,
      totalCount: data.totalCount
    })
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
      body: `post`
    }

    mutateCreatePost(newPost)
  }

  const removePost = (id: IPost['id']) => {
    mutateDeletePost({ id })
  }

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error</div>

  return (
    <Box>
      {isSuccess && <PostList postList={data.posts} />}
      <Box mt={2} display={'flex'} justifyContent={'center'}>
        <Pagination
          disabled={isPlaceholderData}
          variant='outlined'
          color='standard'
          page={page}
          onChange={(_, p) => {
            setPage(p)
          }}
          count={(data?.totalCount ?? 0) / limit}
        />
      </Box>
    </Box>
  )
}

export { PostListPagionation }
