import { Suspense, lazy } from 'react'
import { Layout } from './layout'

//@ts-ignore
import AppPosts from 'remote_posts/AppPosts'
// const AppPosts = lazy(() => import('remote_posts/AppPosts'))

const App = () => {
  return (
    <div>
      {/* <Suspense fallback={<div>Loading...</div>}> */}
      {/* <AppPosts /> */}
      <Layout content={<AppPosts />} />
      {/* </Suspense> */}
    </div>
  )
}

export default App
