import { Provider } from "react-redux"
import { PersistGate } from "redux-persist/integration/react"

import { persistor, store } from "../store/index"

export const withRedux = (component: () => React.ReactNode) => () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      {component()}
    </PersistGate>
  </Provider>
)
