import Typography from '@mui/material/Typography'

import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Avatar from '@mui/material/Avatar'
import IconButton from '@mui/material/IconButton'
import FavoriteIcon from '@mui/icons-material/Favorite'

import { Stack } from '@mui/material'
import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'

import { IPost } from '../model/types/post.types'
import { IUser } from 'entities/user'

dayjs.extend(localizedFormat)

type PostListProps = {
  userPostList: {
    post: IPost
    user: IUser
  }[]
}

const PostList = (props: PostListProps) => {
  let { userPostList } = props

  return (
    <Stack spacing={2}>
      {userPostList.map(({ post, user }) => {
        return (
          <Card key={post.id} sx={{ boxShadow: 5 }}>
            <CardHeader
              alt='user avatar'
              avatar={<Avatar src={user.avatar} />}
              title={user.firstName}
              subheader={dayjs(post.createdAt).format('LLL')}
            />
            <CardContent>
              <Typography variant='subtitle1' fontWeight={600} color={'text.secondary'} mb={2}>
                {post.title}
              </Typography>
              <Typography variant='body2'>{post.body}</Typography>
            </CardContent>
            <CardActions disableSpacing>
              <IconButton aria-label='add to favorites'>
                <FavoriteIcon />
              </IconButton>
            </CardActions>
          </Card>
        )
      })}
    </Stack>
  )
}

export { PostList }
