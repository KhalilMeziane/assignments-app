import { HelmetProvider } from "react-helmet-async"

export const withHelmet = (component: () => React.ReactNode) => () => (
  <HelmetProvider>{component()}</HelmetProvider>
)
