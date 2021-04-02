import axios from "axios";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/todo-lists/',
    withCredentials: true,
    headers: {
        "API-KEY": "34d63932-9379-4f86-a5b9-c4b335d4ab1f"
    }
})

export const tasksAPI = {
    getTasks(todolistId: string) {
        return instance.get<TaskType[]>(`${todolistId}/tasks`)
    },
    createTask(todolistId: string, taskTitle: string) {
        return instance.post<CommonResponseType<{item: TaskType}>>(`${todolistId}/tasks`, {title: taskTitle})
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<CommonResponseType<{}>>(`${todolistId}/tasks/${taskId}`)
    },
    updateTask(todolistId: string, taskId: string, title: string) {
        return instance.put<CommonResponseType<{}>>(`${todolistId}/tasks/${taskId}`, {title: title})
    }
}

type TaskType = {
    id: string,
    title: string,
    description: string,
    todoListId: string,
    order: number,
    status: number,
    priority: number,
    startDate: string,
    deadline: string,
    addedDate: string
}

type CommonResponseType<D> = {
    resultCode: number
    messages: string[]
    fieldsError: string[]
    data: D
}
// {id: "6ca5db94-e567-4d5e-9352-a21ab8e9eaf6", title: "modified task", description: null, todoListId: "6b22a26b-4aa6-40c3-881d-436bd2fbabe8", todoList: null, …}