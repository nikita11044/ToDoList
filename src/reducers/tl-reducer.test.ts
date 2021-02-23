import {todoListReducer} from './tl-reducer';
import {FilterValuesType, TodoListsType} from "../App";
import {v1} from "uuid";

test('correct todolist should be removed', () => {
    const todoLists1 = v1()
    const todoLists2 = v1()

    const startState: Array<TodoListsType> = [
        {id: todoLists1, title: 'What to learn', filter: "all"},
        {id: todoLists2, title: 'What to buy', filter: "all"}
    ];

    const endState = todoListReducer(startState, { type: 'REMOVE-TODOLIST', id:  todoLists1})

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todoLists2);
});

test('new todolist should be added', () => {
    const todoLists1 = v1()
    const todoLists2 = v1()

    const startState: Array<TodoListsType> = [
        {id: todoLists1, title: 'What to learn', filter: "all"},
        {id: todoLists2, title: 'What to buy', filter: "all"}
    ];
    const newTitle = 'What to avoid';

    const endState = todoListReducer(startState, {type: "ADD-TODOLIST", title: newTitle})
    expect(endState.length).toBe(3)
    expect(endState[0].title).toBe(newTitle)
});


test('correct todolist title should be changed', () => {
    const todoLists1 = v1()
    const todoLists2 = v1()

    const startState: Array<TodoListsType> = [
        {id: todoLists1, title: 'What to learn', filter: "all"},
        {id: todoLists2, title: 'What to buy', filter: "all"}
    ];
    const newTitle = 'What to avoid';

    const endState = todoListReducer(startState, { type: 'CHANGE-TODOLIST-TITLE', id: todoLists1, title: newTitle })

    expect(endState[0].title).toBe(newTitle);
});

test('correct todolist filter should be changed', () => {
    const todoLists1 = v1()
    const todoLists2 = v1()

    const startState: Array<TodoListsType> = [
        {id: todoLists1, title: 'What to learn', filter: "all"},
        {id: todoLists2, title: 'What to buy', filter: "all"}
    ];

    const endState = todoListReducer(startState, { type: 'CHANGE-FILTER', id: todoLists1, filter: "active" })

    expect(endState[0].filter).toBe("active");
    expect(endState[1].filter).toBe("all");
});


