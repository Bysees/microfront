import { CssBaseline } from '@mui/material'
import { PostListPage } from 'pages'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: Infinity
    }
  }
})

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <PostListPage />
      <ReactQueryDevtools />
      <CssBaseline />
    </QueryClientProvider>
  )
}

export default App
