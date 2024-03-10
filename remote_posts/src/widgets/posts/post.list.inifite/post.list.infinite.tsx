import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query'
import {
  PostList,
  PostListSkeleton,
  SortPostOrder,
  SortPostValue,
  getPostList
} from 'entities/post'
import { useInView } from 'react-intersection-observer'
import Box from '@mui/material/Box'
import { IUser, getUser } from 'entities/user'
import { Stack } from '@mui/material'

type PostListInfiniteProps = {
  userId?: IUser['id']
  sortValue: SortPostValue
  sortOrder: SortPostOrder
}

const PostListInfinite = (props: PostListInfiniteProps) => {
  const { sortOrder, sortValue, userId } = props
  const limit = 3
  const queryClient = useQueryClient()

  const { data, isError, isFetching, isLoading, isSuccess, fetchNextPage, hasNextPage } =
    useInfiniteQuery({
      queryFn: async ({ pageParam }) => {
        const response = await getPostList({
          _page: pageParam,
          _limit: limit,
          _sort: sortValue,
          _order: sortOrder,
          userId: userId
        })

        const userIds = response.posts.map((post) => post.userId)

        const userRequests = userIds.map((userId) =>
          queryClient.fetchQuery({ queryKey: [userId], queryFn: () => getUser(userId) })
        )

        const users = await Promise.all(userRequests)

        const userPosts = response.posts.map((post) => ({
          post,
          user: users.find((user) => post.userId === user.id) as IUser
        }))

        return {
          ...response,
          userPosts
        }
      },
      queryKey: ['posts', { sortValue, sortOrder }, userId],
      initialPageParam: 1,
      getNextPageParam: (lastPage) => lastPage.nextPage
    })

  const { ref: intersectRef } = useInView({
    threshold: 1,
    onChange: (inView) => inView && fetchNextPage()
  })

  if (isError) return <div>Error</div>

  return (
    <Box>
      <Stack spacing={2}>
        {isSuccess &&
          data.pages.map((page, pageParam) => (
            <PostList key={pageParam} userPostList={page.userPosts} />
          ))}

        {hasNextPage && <Box ref={intersectRef} aria-label='intersect element' />}
        {(isLoading || isFetching) && <PostListSkeleton />}
      </Stack>
    </Box>
  )
}

export { PostListInfinite }
