import {TaskStateType, TaskType} from "../App";
import {v1} from "uuid";

type AddTaskActionType = {
    type: 'ADD-TASK'
    title: string
    todoListID: string
}

type RemoveTaskActionType = {
    type: 'REMOVE-TASK'
    taskID: string
    todoListID: string
}

type ChangeStatusActionType = {
    type: 'CHANGE-STATUS'
    taskID: string
    isDone: boolean
    todoListID: string
}

type ChangeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE'
    taskID: string
    title: string
    todoListID: string
}

type ActionType = AddTaskActionType |
    RemoveTaskActionType |
    ChangeStatusActionType |
    ChangeTaskTitleActionType

export const tasksReducer = (state: TaskStateType, action: ActionType) => {
    switch (action.type) {
        case "ADD-TASK":
            const newTask: TaskType = {
                id: v1(),
                title: action.title,
                isDone: false
            }
            // const todoListTasks = tasks[todoListID]
            // tasks[todoListID] = [newTask, ...todoListTasks]
            // setTasks({...tasks})
        case "REMOVE-TASK":
            ///
        default:
            return state
    }
}