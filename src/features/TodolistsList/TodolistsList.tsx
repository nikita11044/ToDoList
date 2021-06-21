import React, {useCallback, useEffect} from 'react'
import {useSelector} from 'react-redux'
import {AppRootStateType, useActions, useAppDispatch} from '../../app/store'
import {TasksStateType} from './tasks-reducer'
import {Grid, Paper} from '@material-ui/core'
import {AddItemForm} from '../../components/AddItemForm/AddItemForm'
import {Todolist} from './Todolist/Todolist'
import {Redirect} from 'react-router-dom'
import {todolistsActions, todolistsSelectors} from "./index";
import {selectIsLoggedIn} from "../Auth/selectors";
import {TodolistDomainType} from "./todolists-reducer";

type PropsType = {
    demo?: boolean
}

export const TodolistsList: React.FC<PropsType> = ({demo = false}) => {
    const todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>(todolistsSelectors.selectTodolists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(todolistsSelectors.selectTasks)
    const isLoggedIn = useSelector(selectIsLoggedIn)

    const {fetchTodolistsTC, addTodolistTC} = useActions(todolistsActions)

    useEffect(() => {
        if (demo || !isLoggedIn) {
            return;
        }
        fetchTodolistsTC()
    }, [])

    const addTodolist = useCallback((title: string) => {
        addTodolistTC(title)
    }, [])

    if (!isLoggedIn) {
        return <Redirect to={"/login"} />
    }

    return <>
        <Grid container style={{padding: '20px'}}>
            <AddItemForm addItem={addTodolist}/>
        </Grid>
        <Grid container spacing={3} style={ {flexWrap: 'nowrap', overflowX: 'scroll'} }>
            {
                todolists.map(tl => {
                    let allTodolistTasks = tasks[tl.id]

                    return <Grid item key={tl.id}>
                        <div style={{width: '280px'}}>
                            <Todolist
                                todolist={tl}
                                tasks={allTodolistTasks}
                                demo={demo}
                            />
                        </div>
                    </Grid>
                })
            }
        </Grid>
    </>
}
