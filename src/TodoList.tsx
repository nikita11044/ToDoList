import React, {ChangeEvent} from 'react';
import {FilterValuesType, TaskType} from './App';
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";

type TodoListPropsType = {
    id: string
    filter: FilterValuesType
    title: string
    tasks: Array<TaskType>
    addTask: (taskTitle: string, todoListID: string) => void
    removeTask: (taskID: string, todoListID: string) => void
    removeTodoList: (todoListID: string) => void
    changeTodoListTitle: (title: string, todoLisID: string) => void
    changeFilter: (newFilterValue: FilterValuesType, todoListID: string) => void
    changeStatus: (taskID: string, isDone: boolean, todoListID: string) => void
    changeTaskTitle: (taskID: string, title: string, todoLisID: string) => void
}

function TodoList(props: TodoListPropsType) {
    const all = () => {
        props.changeFilter('all', props.id)
    }
    const active = () => {
        props.changeFilter('active', props.id)
    }
    const completed = () => {
        props.changeFilter('completed', props.id)
    }
    const addTask = (title: string) => {
        props.addTask(title, props.id)
    }
    const removeTodolist = () => {
        props.removeTodoList(props.id)
    }
    const changeTodoListTitle = (title: string) => {
        props.changeTodoListTitle(title, props.id)
    }

    const tasks = props.tasks.map(t => {
        const removeTask = () => {
            props.removeTask(t.id, props.id)
        }
        const changeStatus = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeStatus(t.id, e.currentTarget.checked, props.id)
        }
        const changeTaskTitle = (title: string) => {
            props.changeTaskTitle(t.id, title, props.id,)
        }
        return (
            <li
                className={t.isDone ? 'is-done' : ''}
                key={t.id}>
                <Checkbox checked={t.isDone}
                          onChange={changeStatus}/>
                <EditableSpan title={t.title} onChange={changeTaskTitle}/>
                <IconButton onClick={removeTask}>
                    <Delete/>
                </IconButton>
            </li>
        )
    })

    return (
        <div>
            <h3>
                <EditableSpan title={props.title} onChange={changeTodoListTitle}/>
                <IconButton onClick={removeTodolist}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask}/>
            <ul style={{listStyleType: "none", paddingLeft: "8"}}>
                {tasks}
            </ul>
            <div>
                <Button
                    size={"small"}
                    color={props.filter === 'all' ? 'secondary' : 'primary'}
                    variant={props.filter === 'completed' ? 'outlined' : 'contained'}
                    onClick={all}>All
                </Button>
                <Button
                    size={"small"}
                    color={props.filter === 'active' ? 'secondary' : 'primary'}
                    variant={props.filter === 'completed' ? 'outlined' : 'contained'}
                    onClick={active}>Active
                </Button>
                <Button
                    size={"small"}
                    color={props.filter === 'completed' ? 'secondary' : 'primary'}
                    variant={props.filter === 'completed' ? 'outlined' : 'contained'}
                    onClick={completed}>Completed
                </Button>
            </div>
        </div>
    )
}

export default TodoList;

