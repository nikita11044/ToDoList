import React, {useState} from 'react';
import './App.css';
import TodoList from './TodoList';
import {v1} from "uuid";
import AddItemForm from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

export type FilterValuesType = 'all' | 'active' | 'completed'

function App() {
    // CRUD
    // BLL

    const todoLists1 = v1()
    const todoLists2 = v1()
    const [todoLists, setTodoLists] = useState<Array<TodolistType>>([
        {id: todoLists1, title: 'What to learn', filter: "all"},
        {id: todoLists2, title: 'What to buy', filter: "all"}
    ])

    const [tasks, setTasks] = useState<TasksStateType>({
            [todoLists1]: [
                {id: v1(), title: "JS", isDone: true},
                {id: v1(), title: "CSS", isDone: false},
                {id: v1(), title: "React", isDone: true},
                {id: v1(), title: "Redux", isDone: true},
            ],
            [todoLists2]: [
                {id: v1(), title: "Milk", isDone: true},
                {id: v1(), title: "Bread", isDone: false},
                {id: v1(), title: "Beer", isDone: true},
                {id: v1(), title: "Meat", isDone: true},
            ]
        }
    )

    //function for TodoLists
    function addTodoList(title: string) {
        let newTodoListID = v1()
        let newTodoList: TodolistType = {id: newTodoListID, title: title, filter: 'all'}
        setTodoLists([newTodoList, ...todoLists])
        setTasks({
            ...tasks,
            [newTodoListID]: []
        })
    }
    function removeTodoList(todoListID: string) {
        setTodoLists(todoLists.filter(el => el.id !== todoListID))
        delete tasks[todoListID]
        setTasks({...tasks})
    }
    function changeFilter(newFilterValue: FilterValuesType, todoListID: string) {
        const todoList = todoLists.find(tl => tl.id === todoListID)
        if (todoList) {
            todoList.filter = newFilterValue
            setTodoLists([...todoLists])
        }
    }
    function changeTodoListTitle(title: string, todoListID: string) {
        const todoList = todoLists.find(tl => tl.id === todoListID)
        if (todoList) {
            todoList.title = title
            setTodoLists([...todoLists])
        }
    }

    //functions for tasks
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
    function changeStatus(taskID: string, isDone: boolean, todoListID: string) {
        const todoListTasks = tasks[todoListID]
        const task: TaskType | undefined = todoListTasks.find(t => t.id === taskID)
        if (task) {
            task.isDone = isDone
            setTasks({...tasks})
        }
    }
    function changeTaskTitle(taskID: string, title: string, todoListID: string) {
        const todoListTasks = tasks[todoListID]
        const task: TaskType | undefined = todoListTasks.find(t => t.id === taskID)
        if (task) {
            task.title = title
            setTasks({...tasks})
        }
    }

    // UI
    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: "20px 0"}}>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>
                <Grid container spacing={4}>
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

                            return <Grid item key={el.id}>
                                <Paper elevation={10} style={{padding: "10px"}}>
                                    <TodoList
                                        id={el.id}
                                        filter={el.filter}
                                        title={el.title}
                                        tasks={tasksForTodoList}
                                        addTask={addTask}
                                        removeTask={removeTask}
                                        removeTodoList={removeTodoList}
                                        changeFilter={changeFilter}
                                        changeStatus={changeStatus}
                                        changeTaskTitle={changeTaskTitle}
                                        changeTodoListTitle={changeTodoListTitle}
                                    />
                                </Paper>
                            </Grid>
                        })
                    }
                </Grid>
            </Container>
        </div>

    );
}

export default App;
