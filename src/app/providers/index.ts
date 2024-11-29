import compose from "compose-function"

import { withHelmet } from "./withHelmet"
import { witQueryClient } from "./withQueryClient"

export const withProviders = compose(witQueryClient, withHelmet)