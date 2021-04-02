import React, {useEffect, useState} from 'react'
import {todoListsAPI} from "../api/todolist-api";
import {tasksAPI} from "../api/tasks-api";

export default {
    title: 'API/Tasks-API'
}

const settings = {
    withCredentials: true,
    headers: {
        "API-KEY": "34d63932-9379-4f86-a5b9-c4b335d4ab1f"
    }
}

export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '6b22a26b-4aa6-40c3-881d-436bd2fbabe8'
        tasksAPI.getTasks(todolistId).then((res) => {
            debugger
            setState(res.data);
        })

    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = 'ce6f9d48-f021-4591-ad69-e78d12aad8d9'
        tasksAPI.createTask(todolistId, 'new task').then((res) => {
            debugger
            setState(res.data);
        })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '6b22a26b-4aa6-40c3-881d-436bd2fbabe8'
        const taskId = '6ca5db94-e567-4d5e-9352-a21ab8e9eaf6'
        tasksAPI.deleteTask(todolistId, taskId).then( (res) => {
            debugger
            setState(res.data);
        })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const UpdateTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '6b22a26b-4aa6-40c3-881d-436bd2fbabe8'
        const taskId = '6ca5db94-e567-4d5e-9352-a21ab8e9eaf6'
        tasksAPI.updateTask(todolistId, taskId, 'modified task').then((res) => {
            debugger
            setState(res.data)
        })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
