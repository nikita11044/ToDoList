import React, {useEffect, useState} from 'react'
import {todoListsAPI} from "../api/todolist-api";

export default {
    title: 'API/Todolists-API'
}

const settings = {
    withCredentials: true,
    headers: {
        "API-KEY": "34d63932-9379-4f86-a5b9-c4b335d4ab1f"
    }
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todoListsAPI.getTodos().then((res) => {
                setState(res);
            })

    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todoListsAPI.createTodolist("newTodolist").then((res) => {
            setState(res.data.data.item);
        })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todoListsAPI.deleteTodoList('').then( (res) => {
            setState(res.data);
        })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = 'ce6f9d48-f021-4591-ad69-e78d12aad8d9'
        todoListsAPI.updateTodoList(todolistId, '').then((res) => {
            debugger
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
