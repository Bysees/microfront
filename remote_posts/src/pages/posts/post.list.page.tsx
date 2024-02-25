import { useState } from 'react'
import { PostListInfinite, PostListPagionation } from 'widgets/posts'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import Typography from '@mui/material/Typography'

const PostListPage = () => {
  const limit = 10
  const [page, setPage] = useState(1)

  const viteTypes = ['pagination', 'infinite'] as const
  const [tab, setTab] = useState(0)

  return (
    <Box>
      <Container maxWidth='lg'>
        <Typography mb={2} variant='h4'>
          Posts
        </Typography>
        <Tabs value={tab} onChange={(_, v) => setTab(v)}>
          {viteTypes.map((title) => (
            <Tab key={title} label={title} />
          ))}
        </Tabs>
        <Box mb={5} mt={1}>
          {viteTypes[tab] === 'pagination' && <PostListPagionation />}
          {viteTypes[tab] === 'infinite' && <PostListInfinite />}
        </Box>
      </Container>
    </Box>
  )
}

export default PostListPage
