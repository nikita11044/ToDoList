import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType, TaskType} from './App';

type TodoListPropsType = {
    key: string
    id: string
    filter: FilterValuesType
    title: string
    tasks: Array<TaskType>
    addTask: (taskTitle: string, todoListID: string) => void
    removeTask: (taskID: string, todoListID: string) => void
    removeTodoList: (todoListID: string) => void
    changeFilter: (newFilterValue: FilterValuesType, todoListID: string) => void
    changeStatus: (taskID: string, isDone: boolean, todoListID: string) => void
}

function TodoList(props: TodoListPropsType) {
    const [title, setTitle] = useState('')
    const [error, setError] = useState<boolean>(false)
    const all = () => {
        props.changeFilter('all', props.id)
    }
    const active = () => {
        props.changeFilter('active', props.id)
    }
    const completed = () => {
        props.changeFilter('completed', props.id)
    }
    const addTask = () => {
        const trimmedTitle = title.trim()
        if(trimmedTitle) {
            props.addTask(trimmedTitle, props.id)
        } else {
            setError(true)
        }
        setTitle('')
    }
    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError(false)
    }
    const onKeyPressAddTask = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") addTask()
    }
    const removeTodolist = () => {
        props.removeTodoList(props.id)
    }

    const tasks = props.tasks.map(t => {
        const removeTask = () => {
            props.removeTask(t.id, props.id)
        }
        const changeStatus = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeStatus(t.id, e.currentTarget.checked, props.id)
        }
        return (
            <li
                className={t.isDone ? 'is-done' : ''}
                key={t.id}>
                <input type="checkbox"
                       checked={t.isDone}
                       onChange={changeStatus}/>
                <span>{t.title}</span>
                <button onClick={removeTask}>X</button>
            </li>
        )
    })

    return (
        <div>
            <h3>
                {props.title}
                <button onClick={removeTodolist}>X</button>
            </h3>
            <div>
                <input
                    className={error ? 'error' : ''}
                    value={title}
                    onChange={changeTitle}
                    onKeyPress={onKeyPressAddTask}
                    onBlur={() => {setError(false)}}
                />
                <button onClick={addTask}>+</button>
                {error && <div className='error-message'>Please, enter task title</div>}
            </div>
            <ul>
                {tasks}
            </ul>
            <div>
                <button
                    className = {props.filter === 'all' ? 'active-filter' : ''}
                    onClick={all}>All</button>
                <button
                    className = {props.filter === 'active' ? 'active-filter' : ''}
                    onClick={active}>Active</button>
                <button
                    className = {props.filter === 'completed' ? 'active-filter' : ''}
                    onClick={completed}>Completed</button>
            </div>
        </div>
    )
}

export default TodoList;

