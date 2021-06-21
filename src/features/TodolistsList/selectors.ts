import {AppRootStateType} from "../../app/store";
import {TodolistDomainType} from "./todolists-reducer";
import {TasksStateType} from "./tasks-reducer";

export const selectTodolists =  (state: AppRootStateType): TodolistDomainType[] => state.todolists
export const selectTasks = (state: AppRootStateType): TasksStateType => state.tasks