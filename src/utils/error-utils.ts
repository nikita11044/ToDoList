import {setAppErrorAC, SetAppErrorActionType, setAppStatusAC, SetAppStatusActionType} from '../app/app-reducer'
import {ResponseType} from '../api/todolists-api'
import {Dispatch} from 'redux'
import {AxiosError} from "axios";

type ThunkAPIType = {
    dispatch: (action: any) => any
    rejectWithValue: Function
}

export const handleServerAppError = <D>(data: ResponseType<D>, dispatch: Dispatch<SetAppErrorActionType | SetAppStatusActionType>) => {
    if (data.messages.length) {
        dispatch(setAppErrorAC({error: data.messages[0]}))
    } else {
        dispatch(setAppErrorAC({error: 'Some error occurred'}))
    }
    dispatch(setAppStatusAC({status: 'failed'}))
}

export const handleServerNetworkError = (error: { message: string }, dispatch: Dispatch<SetAppErrorActionType | SetAppStatusActionType>) => {
    dispatch(setAppErrorAC({error: error.message ? error.message: 'Some error occurred'}))
    dispatch(setAppStatusAC({status: 'failed'}))
}

export const handleAsyncServerAppError = <D>(data: ResponseType<D>,
                                             thunkAPI: ThunkAPIType,
                                             showError = true) => {
    if (showError) {
        thunkAPI.dispatch(setAppErrorAC({error: data.messages.length ? data.messages[0] : 'Some error occurred'}))
    }
    thunkAPI.dispatch(setAppStatusAC({status: 'failed'}))
    return thunkAPI.rejectWithValue({errors: data.messages, fieldsErrors: data.fieldErrors})
}

export const handleAsyncServerNetworkError = (error: AxiosError,
                                              thunkAPI: ThunkAPIType,
                                              showError = true) => {
    if (showError) {
        thunkAPI.dispatch(setAppErrorAC({error: error.message ? error.message : 'Some error occurred'}))
    }
    thunkAPI.dispatch(setAppStatusAC({status: 'failed'}))

    return thunkAPI.rejectWithValue({errors: [error.message], fieldsErrors: undefined})
}

