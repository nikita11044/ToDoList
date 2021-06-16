import {FieldErrorType, todolistsAPI, TodolistType} from '../../api/todolists-api'
import {Dispatch} from 'redux'
import {
    initializeAppTC,
    RequestStatusType,
    SetAppErrorActionType,
    setAppStatusAC,
    SetAppStatusActionType
} from '../../app/app-reducer'
import {handleAsyncServerNetworkError, handleServerNetworkError} from '../../utils/error-utils'
import {createAsyncThunk, createSlice, PayloadAction, ThunkDispatch} from '@reduxjs/toolkit'
import {action} from "@storybook/addon-actions";
import {removeTaskTC} from "./tasks-reducer";

const initialState: Array<TodolistDomainType> = []

export const fetchTodolistsTC = createAsyncThunk<{ todolists: TodolistType[] }>('todolists/fetchTodolists', async (param, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))
    try {
        const res = await todolistsAPI.getTodolists()
        thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))
        return {todolists: res.data}
    } catch (error) {
        return handleAsyncServerNetworkError(error, thunkAPI)
    }
})

export const removeTodolistTC = createAsyncThunk<{ id: string }, string>('todolists/removeTodoList', async (todolistId: string, {
    dispatch,
    rejectWithValue
}) => {
    //изменим глобальный статус приложения, чтобы вверху полоса побежала
    dispatch(setAppStatusAC({status: 'loading'}))
    //изменим статус конкретного тудулиста, чтобы он мог задизеблить что надо
    dispatch(changeTodolistEntityStatusAC({id: todolistId, status: 'loading'}))
    const res = await todolistsAPI.deleteTodolist(todolistId)
    //скажем глобально приложению, что асинхронная операция завершена
    dispatch(setAppStatusAC({status: 'succeeded'}))
    return {id: todolistId}
})

export const addTodolistTC = createAsyncThunk<{ todolist: TodolistType }, string, {rejectValue: { errors: Array<string>, fieldsErrors?: Array<FieldErrorType> }}>
('todolists/addTodolist', async (title: string, thunkAPI) => {
    try {
        thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))
        const res = await todolistsAPI.createTodolist(title)
        thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))
        return {todolist: res.data.data.item}
    } catch (error) {
        return handleAsyncServerNetworkError(error, thunkAPI, false)
    }
})

export const changeTodolistTitleTC = (id: string, title: string) => {
    return (dispatch: Dispatch) => {
        todolistsAPI.updateTodolist(id, title)
            .then((res) => {
                dispatch(changeTodolistTitleAC({id: id, title}))
            })
    }
}

const slice = createSlice({
    name: 'todolists',
    initialState: initialState,
    reducers: {
        changeTodolistTitleAC(state, action: PayloadAction<{ id: string, title: string }>) {
            const index = state.findIndex(tl => tl.id === action.payload.id);
            state[index].title = action.payload.title;
        },
        changeTodolistFilterAC(state, action: PayloadAction<{ id: string, filter: FilterValuesType }>) {
            const index = state.findIndex(tl => tl.id === action.payload.id);
            state[index].filter = action.payload.filter;
        },
        changeTodolistEntityStatusAC(state, action: PayloadAction<{ id: string, status: RequestStatusType }>) {
            const index = state.findIndex(tl => tl.id === action.payload.id);
            state[index].entityStatus = action.payload.status;
        },
        setTodolistsAC(state, action: PayloadAction<{ todolists: Array<TodolistType> }>) {
        }
    },
    extraReducers: builder => {
        builder
            .addCase(fetchTodolistsTC.fulfilled, (state, action) => {
                return action.payload.todolists.map(tl => ({...tl, filter: 'all', entityStatus: 'idle'}))
            })
            .addCase(removeTodolistTC.fulfilled, (state, action) => {
                const index = state.findIndex(tl => tl.id === action.payload.id);
                if (index > -1) {
                    state.splice(index, 1);
                }
            })
            .addCase(addTodolistTC.fulfilled, (state, action) => {
                state.unshift({...action.payload.todolist, filter: 'all', entityStatus: 'idle'})
            })
    }
})

export const todolistsReducer = slice.reducer
export const { changeTodolistTitleAC, changeTodolistFilterAC, changeTodolistEntityStatusAC, setTodolistsAC
} = slice.actions

// types
export type AddTodolistActionType = ReturnType<typeof addTodolistTC.fulfilled>;
export type RemoveTodolistActionType = ReturnType<typeof removeTodolistTC.fulfilled>;
export type SetTodolistsActionType = ReturnType<typeof setTodolistsAC>;

export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}
