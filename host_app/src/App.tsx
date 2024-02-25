import { Suspense, lazy } from 'react'

//@ts-ignore
const AppPosts = lazy(() => import('remote_posts/AppPosts'))

const App = () => {
  return (
    <div>
      <h1>Hello world</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <AppPosts />
      </Suspense>
    </div>
  )
}

export default App
