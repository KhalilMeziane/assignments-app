import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {},
  },
})

export const witQueryClient = (component: () => React.ReactNode) => () => (
  <QueryClientProvider client={queryClient}>{component()}</QueryClientProvider>
)
