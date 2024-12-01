import compose from "compose-function"

import { withHelmet } from "./withHelmet"
import { witQueryClient } from "./withQueryClient"
import { withRedux } from "./withRedux"

export const withProviders = compose(withRedux, witQueryClient, withHelmet)