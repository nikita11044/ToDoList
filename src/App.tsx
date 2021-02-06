import React, {useState} from 'react';
import './App.css';
import TodoList from './TodoList';
import {v1} from "uuid";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type TodoListsType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TaskStateType = {
    [key: string]: Array<TaskType>
}

export type FilterValuesType = 'all' | 'active' | 'completed'

function App() {
    // CRUD
    // BLL

    const todoLists1 = v1()
    const todoLists2 = v1()
    const [todoLists, setTodoLists] = useState<Array<TodoListsType>>([
        {id: todoLists1, title: 'What to learn', filter: "all"},
        {id: todoLists2, title: 'What to buy', filter: "all"}
    ])

    const [tasks, setTasks] = useState<TaskStateType>({
            [todoLists1]: [
                {id: v1(), title: "JS", isDone: true},
                {id: v1(), title: "CSS", isDone: false},
                {id: v1(), title: "React", isDone: true},
                {id: v1(), title: "Redux", isDone: true},
            ],
            [todoLists2] : [
                {id: v1(), title: "Milk", isDone: true},
                {id: v1(), title: "Bread", isDone: false},
                {id: v1(), title: "Beer", isDone: true},
                {id: v1(), title: "Meat", isDone: true},
            ]
        }
    )

    function removeTodoList(todoListID: string) {
        setTodoLists(todoLists.filter(el => el.id !== todoListID))
        delete tasks[todoListID]
        setTasks({...tasks})
    }

    function addTask(taskTitle: string, todoListID: string) {
        const newTask: TaskType = {
            id: v1(),
            title: taskTitle,
            isDone: false
        }
        const todoListTasks = tasks[todoListID]
        tasks[todoListID] = [newTask, ...todoListTasks]
        setTasks({...tasks})
    }


    function removeTask(taskID: string, todoListID: string) {
        // setTasks({[todoListID]: tasks[todoListID].filter(t => t.id !== taskID), ...tasks})
        const todoListsTask = tasks[todoListID]
        tasks[todoListID] = todoListsTask.filter(t => t.id !== taskID)
        setTasks({...tasks})
    }

    function changeFilter(newFilterValue: FilterValuesType, todoListID: string) {
        const todoList = todoLists.find(tl => tl.id === todoListID)
        if (todoList) {
            todoList.filter = newFilterValue
            setTodoLists([...todoLists])
        }
    }

    function changeStatus(taskID: string, isDone: boolean, todoListID: string) {
        const todoListTasks = tasks[todoListID]
        const task: TaskType | undefined = todoListTasks.find(t => t.id === taskID)
        if (task) {
            task.isDone = isDone
            setTasks({...tasks})
        }
    }

    // UI
    return (
        <div className="App">
            {
                todoLists.map(el => {

                    const allToDoListTasks = tasks[el.id]
                    let tasksForTodoList = allToDoListTasks

                    if (el.filter === 'active') {
                        tasksForTodoList = allToDoListTasks.filter(t => t.isDone === false)
                    }

                    if (el.filter === 'completed') {
                        tasksForTodoList = allToDoListTasks.filter(t => t.isDone === true)
                    }

                    return <TodoList
                        key={el.id}
                        id={el.id}
                        filter={el.filter}
                        title={el.title}
                        tasks={tasksForTodoList}
                        addTask={addTask}
                        removeTask={removeTask}
                        removeTodoList={removeTodoList}
                        changeFilter={changeFilter}
                        changeStatus={changeStatus}
                        />
                })
            }
        </div>
    );
}

export default App;
