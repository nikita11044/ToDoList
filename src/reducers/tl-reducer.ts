import {FilterValuesType, TodoListsType} from "../App";
import {v1} from "uuid";

type RemoveTodoListsActionType = {
    type: 'REMOVE-TODOLIST'
    id: string
}

type AddTodoListActionType = {
    type: 'ADD-TODOLIST'
    title: string
}

type ChangeFilterActionType = {
    type: 'CHANGE-FILTER'
    filter: FilterValuesType
    id: string
}

type ChangeTodoListTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE'
    title: string
    id: string
}

type ActionType = AddTodoListActionType |
RemoveTodoListsActionType |
ChangeFilterActionType |
ChangeTodoListTitleActionType

export const todoListReducer = (state: Array<TodoListsType>, action: ActionType) => {
    switch (action.type) {
        case "ADD-TODOLIST": {
            let newTodoListID = v1()
            let newTodoList: TodoListsType = {id: newTodoListID, title: action.title, filter: 'all'}
            return [newTodoList, ...state]
        }
        case "REMOVE-TODOLIST": {
            return state.filter(el => el.id !== action.id)
        }
        case "CHANGE-FILTER": {
            // const todoList = state.find(tl => tl.id === action.id)
            // if (todoList) {
            //     todoList.filter = action.filter
            //     return [...state]
            // }
            // return state
            return state.map(tl => {
                if(tl.id === action.id) {
                    return {...tl, filter: action.filter}
                } else {
                    return tl
                }
            })
        }
        case "CHANGE-TODOLIST-TITLE":
            // const todoList = state.find(tl => tl.id === action.id)
            // if (todoList) {
            //     todoList.title = action.title
            //     return [...state]
            // }
            // return state
            return state.map(tl => {
                if (tl.id === action.id) {
                    return {...tl, title: action.title}
                } else {
                    return tl
                }
            })
        default:
            return state
    }
}