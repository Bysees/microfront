import { AppBar, Box } from '@mui/material'
import Grid from '@mui/material/Grid'

type LayoutProps = {
  content?: React.ReactNode
  header?: React.ReactNode
  sidebar?: React.ReactNode
}

const Layout = (props: LayoutProps) => {
  const { content, header, sidebar } = props

  return (
    <Grid container>
      <Grid item xs={12}>
        <Header />
      </Grid>
      <Grid item xs={2}>
        <Sidebar />
      </Grid>
      <Grid item xs={10} p={2}>
        {content}
      </Grid>
    </Grid>
  )
}

export { Layout }

const Header = () => {
  return (
    <AppBar position='static' sx={{ height: 75 }} color='primary'>
      Header
    </AppBar>
  )
}

const Sidebar = () => {
  return <Box border={1}>Sidebar</Box>
}
