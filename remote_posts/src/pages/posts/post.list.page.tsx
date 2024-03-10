import { useState } from 'react'
import { PostListInfinite, PostListPagionation } from 'widgets/posts'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import Typography from '@mui/material/Typography'
import { SortPostOrder, SortPostValue } from 'entities/post'
import { Stack, ToggleButton, ToggleButtonGroup } from '@mui/material'
import ArrowDownwardOutlinedIcon from '@mui/icons-material/ArrowDownwardOutlined'
import ArrowUpwardOutlined from '@mui/icons-material/ArrowUpwardOutlined'
const PostListPage = () => {
  const limit = 10
  const [page, setPage] = useState(1)

  const orders: SortPostOrder[] = ['asc', 'desc']
  const [sortOrder, setSortOrder] = useState<SortPostOrder>('asc')
  const [sortValue] = useState<SortPostValue>('createdAt')

  const viewTypes = ['pagination', 'infinite'] as const
  const [tab, setTab] = useState(0)

  return (
    <Box>
      <Container maxWidth='lg'>
        <Typography mb={2} variant='h4'>
          Posts
        </Typography>
        <Stack direction={'row'} justifyContent={'space-between'}>
          <Tabs value={tab} onChange={(_, v) => setTab(v)}>
            {viewTypes.map((title) => (
              <Tab key={title} label={title} />
            ))}
          </Tabs>
          <ToggleButtonGroup value={sortOrder} size='small' aria-label='Small sizes'>
            {orders.map((order) => (
              <ToggleButton key={order} value={order} onClick={() => setSortOrder(order)}>
                {order === 'asc' ? <ArrowDownwardOutlinedIcon /> : <ArrowUpwardOutlined />}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        </Stack>
        <Box mb={5} mt={1}>
          {viewTypes[tab] === 'pagination' && (
            <PostListPagionation sortValue={sortValue} sortOrder={sortOrder} />
          )}
          {viewTypes[tab] === 'infinite' && (
            <PostListInfinite sortValue={sortValue} sortOrder={sortOrder} />
          )}
        </Box>
      </Container>
    </Box>
  )
}

export default PostListPage
