import {TasksStateType} from "../App";
import {v1} from "uuid";
import {AddTodolistActionType, RemoveTodolistActionType} from "./todolists-reducer";

export type RemoveTaskActionType = {
    type: 'REMOVE-TASK'
    taskID: string
    todolistID: string
}

export type AddTaskActionType = {
    type: 'ADD-TASK'
    taskTitle: string
    todolistID: string
}

export type ChangeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS'
    taskID: string
    isDone: boolean
    todolistID: string
}

export type ChangeTitleActionType = {
    type: 'CHANGE-TITLE'
    taskID: string
    taskTitle: string
    todolistID: string
}

type ActionTypes = RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTitleActionType
    | AddTodolistActionType
    | RemoveTodolistActionType

export const tasksReducer = (state: TasksStateType, action: ActionTypes) => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            // let copyState = {...state}
            // let todolistTasks = copyState[action.todolistID]
            // copyState[action.todolistID] = todolistTasks.filter(task => task.id !== action.taskID)
            // return copyState
            return {
                ...state,
                [action.todolistID]: state[action.todolistID].filter(task => task.id !== action.taskID)
            }
        }
        case "ADD-TASK": {
            // let copyState = {...state}
            // let task = {id: v1(), title: action.taskTitle, isDone: false}
            // let todolistTasks = copyState[action.todolistID]
            // copyState[action.todolistID] = [task, ...todolistTasks]
            // return copyState
            return {
                ...state,
                [action.todolistID]: [
                    {id: v1(), title: action.taskTitle, isDone: false},
                    ...state[action.todolistID]
                ]
            }
        }
        case "CHANGE-TASK-STATUS": {
            return {
                ...state,
                [action.todolistID]: state[action.todolistID].map(task => {
                    if(task.id === action.taskID) {
                       return {...task, isDone: action.isDone}
                    } else {
                       return task
                    }
                })
            }
        }
        case "CHANGE-TITLE": {
            return {
                ...state,
                [action.todolistID]: state[action.todolistID].map(task => {
                    if(task.id === action.taskID) {
                        return {...task, title: action.taskTitle}
                    } else {
                        return task
                    }
                })
            }
        }
        case "ADD-TODOLIST": {
            return {
                ...state,
                [action.todolistID]: []
            }
        }
        case "REMOVE-TODOLIST": {
            let copyState = {...state}
            delete copyState[action.id]
            return copyState
        }
        default: {
            return state
        }
    }
}

export const removeTaskAC = (taskID: string, todolistID: string): RemoveTaskActionType => {
    return {type: 'REMOVE-TASK', taskID, todolistID}
}

export const addTaskAC = (taskTitle: string, todolistID: string): AddTaskActionType => {
    return {type: 'ADD-TASK', taskTitle, todolistID}
}

export const changeTaskStatusAC = (taskID: string, isDone: boolean, todolistID: string): ChangeTaskStatusActionType => {
    return {type: 'CHANGE-TASK-STATUS', taskID, isDone, todolistID}
}

export const changeTitleAC = (taskID: string, taskTitle: string, todolistID: string): ChangeTitleActionType => {
    return {type: 'CHANGE-TITLE', taskID, taskTitle, todolistID}
}

export default tasksReducer