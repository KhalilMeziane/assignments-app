import compose from "compose-function"

import { withHelmet } from "./withHelmet"

export const withProviders = compose(withHelmet)