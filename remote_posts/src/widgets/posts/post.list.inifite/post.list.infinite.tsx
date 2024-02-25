import { useInfiniteQuery } from '@tanstack/react-query'
import { PostList, getPostList } from 'entities/post'
import { useInView } from 'react-intersection-observer'
import Box from '@mui/material/Box'

const PostListInfinite = () => {
  const { data, isError, isFetching, isLoading, isSuccess, fetchNextPage, hasNextPage } =
    useInfiniteQuery({
      queryFn: ({ pageParam }) => getPostList({ _page: pageParam, _limit: 10 }),
      queryKey: ['posts'],
      initialPageParam: 1,
      getNextPageParam: (lastPage) => lastPage.nextPage
    })

  const { ref: intersectRef } = useInView({
    threshold: 0,
    onChange: (inView) => inView && fetchNextPage()
  })

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error</div>

  return (
    <Box>
      {isSuccess && (
        <>
          {data.pages.map((page, pageParam) => (
            <PostList key={pageParam} postList={page.posts} />
          ))}
        </>
      )}
      {hasNextPage && <Box ref={intersectRef} aria-label='intersect element' />}
      {isFetching && <div>Loading...</div>}
    </Box>
  )
}

export { PostListInfinite }
