import axios from "axios";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        "API-KEY": "34d63932-9379-4f86-a5b9-c4b335d4ab1f"
    }
})

export const todoListsAPI = {
    getTodos() {
        return instance.get<TodoType[]>('todo-lists').then(res => res.data)
    },
    createTodolist(title: string) {
        return instance.post<CommonResponseType<{item: TodoType}>>('todo-lists', {title: title})
    },
    deleteTodoList(todolistId: string) {
        return instance.delete<CommonResponseType<{}>>(`todo-lists/${todolistId}`)
    },
    updateTodoList(todolistId: string, title: string) {
        return instance.put<CommonResponseType<{}>>(`todo-lists/${todolistId}`, {title: title})
    }
}

type TodoType = {
    id: string
    addedDate: string
    order: number
    title: string
}

type CommonResponseType<D> = {
    resultCode: number
    messages: string[]
    fieldsError: string[]
    data: D
}