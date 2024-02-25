import { useState } from 'react'
import { IPost } from '../model/types/post.types'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import Typography from '@mui/material/Typography'

type PostListProps = {
  postList: IPost[]
}

const PostList = (props: PostListProps) => {
  const { postList } = props
  const [expandedPost, setExpandedPost] = useState<{ [Key in IPost['id']]?: boolean }>({})

  return postList.map((post) => (
    <Accordion
      key={post.id}
      sx={{ boxShadow: 4 }}
      expanded={expandedPost[post.id] ?? false}
      onChange={(_, expanded) => {
        setExpandedPost({ ...expandedPost, [post.id]: expanded })
      }}>
      <AccordionSummary expandIcon={<ArrowDropDownIcon />}>
        <Typography variant='overline'>id: {post.id}|</Typography>
        <Typography variant='overline'> {post.title}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography variant='body1'>{post.body}</Typography>
      </AccordionDetails>
    </Accordion>
  ))
}

export { PostList }
