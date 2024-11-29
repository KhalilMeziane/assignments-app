import { withProviders } from "./providers"
import { Router } from "./router"

function App() {
  return <Router />
}

export default withProviders(App)
