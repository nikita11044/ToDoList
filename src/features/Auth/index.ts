import * as authSelectors from './selectors'
import * as Login from './Login'
import {asyncActions as asyncAuthActions, slice as authSlice} from "./auth-reducer";

const authActions = {
    ...asyncAuthActions,
    ...authSlice.actions
}

const authReducer = authSlice.reducer

export {
    authActions,
    authReducer,
    authSelectors,
    Login
}