import {authAPI, FieldErrorType, LoginParamsType} from '../../api/todolists-api'
import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {AxiosError} from "axios";
import {appActions} from "../../app";
import {ThunkError} from "../../utils/types";
import {handleAsyncServerAppError, handleAsyncServerNetworkError} from "../../utils/error-utils";

const {setAppStatusAC} = appActions

export const loginTC = createAsyncThunk<undefined, LoginParamsType, ThunkError>('Auth/login', async (param: LoginParamsType, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))
    try {
        const res = await authAPI.login(param)
        if (res.data.resultCode === 0) {
            thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))
            return
        } else {
            handleAsyncServerAppError(res.data, thunkAPI)
            return thunkAPI.rejectWithValue({errors: res.data.messages, fieldsErrors: res.data.fieldErrors})
        }
    } catch (err) {
        const error: AxiosError = err
        handleAsyncServerNetworkError(error, thunkAPI)
        return thunkAPI.rejectWithValue({errors: [error.message], fieldsErrors: undefined})
    }
})

export const logoutTC = createAsyncThunk('auth/logout', async (param, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))
    authAPI.logout()
        .then(res => {
            if (res.data.resultCode === 0) {
                thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))
                return
            } else {
                handleAsyncServerAppError(res.data, thunkAPI)
                return thunkAPI.rejectWithValue({})
            }
        })
        .catch((error) => {
            handleAsyncServerNetworkError(error, thunkAPI)
            return thunkAPI.rejectWithValue({})
        })
})

export const asyncActions = {
    loginTC,
    logoutTC
}

export const slice = createSlice({
    name: 'auth',
    initialState: {
        isLoggedIn: false
    },
    reducers: {
        setIsLoggedIn(state, action: PayloadAction<{ value: boolean }>) {
            state.isLoggedIn = action.payload.value
        }
    },
    extraReducers: builder => {
        builder
            .addCase(loginTC.fulfilled, (state, action) => {
                state.isLoggedIn = true
            })
            .addCase(logoutTC.fulfilled, (state, action) => {
                state.isLoggedIn = false
            })
    }
})