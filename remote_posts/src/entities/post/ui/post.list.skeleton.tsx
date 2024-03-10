import Typography from '@mui/material/Typography'
import Skeleton from '@mui/material/Skeleton'
import Stack from '@mui/material/Stack'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

type PostListSkeletonProps = {
  items?: number
}

const PostListSkeleton = (props: PostListSkeletonProps) => {
  const { items = 3 } = props

  return (
    <Stack spacing={2}>
      {Array.from({ length: items }).map((_, i) => {
        return (
          <Card key={i} sx={{ boxShadow: 5 }}>
            <CardHeader
              alt='user avatar'
              avatar={<Skeleton animation='wave' variant='circular' width={40} height={40} />}
              title={<Skeleton animation='wave' height={20} width='10%' />}
              subheader={<Skeleton animation='wave' height={20} width='20%' />}
            />
            <CardContent>
              <Typography variant='subtitle1'>
                <Skeleton animation='wave' height={40} width='30%' />
              </Typography>
              <Typography variant='body2'>
                <Skeleton animation='wave' height={100} />
              </Typography>
            </CardContent>
          </Card>
        )
      })}
    </Stack>
  )
}

export { PostListSkeleton }
