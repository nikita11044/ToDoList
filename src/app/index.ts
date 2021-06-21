import * as appSelectors from './selectors'
import {asyncActions as asyncAppActions, slice as appSice} from "./app-reducer";

const appActions = {
    ...asyncAppActions,
    ...appSice.actions
}

const appReducer = appSice.reducer

export {
    appSelectors,
    appActions,
    appReducer
}