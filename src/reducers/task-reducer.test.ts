import {TasksStateType} from '../App';
import tasksReducer, {addTaskAC, changeTaskStatusAC, changeTitleAC, removeTaskAC} from "./task-reducer";
import {AddTodolistAC} from "./todolists-reducer";

let startState: TasksStateType

beforeEach(() => {
    startState = {
        "todolistId1": [
            { id: "1", title: "CSS", isDone: false },
            { id: "2", title: "JS", isDone: true },
            { id: "3", title: "React", isDone: false }
        ],
        "todolistId2": [
            { id: "1", title: "bread", isDone: false },
            { id: "2", title: "milk", isDone: true },
            { id: "3", title: "tea", isDone: false }
        ]
    };
})

test('correct task should be deleted from correct array', () => {
    const action = removeTaskAC("2", "todolistId2");

    const endState = tasksReducer(startState, action)

    expect(endState).toEqual({
        "todolistId1": [
            { id: "1", title: "CSS", isDone: false },
            { id: "2", title: "JS", isDone: true },
            { id: "3", title: "React", isDone: false }
        ],
        "todolistId2": [
            { id: "1", title: "bread", isDone: false },
            { id: "3", title: "tea", isDone: false }
        ]
    });

});

test('correct task should be added to correct array', () => {
    const action = addTaskAC("juice", "todolistId2");

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId1"].length).toBe(3);
    expect(endState["todolistId2"].length).toBe(4);
    expect(endState["todolistId2"][0].id).toBeDefined();
    expect(endState["todolistId2"][0].title).toBe('juice');
    expect(endState["todolistId2"][0].isDone).toBe(false);
})

test('status of specified task should be changed', () => {
    const action = changeTaskStatusAC("2", false, "todolistId2");

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId2"][1].isDone).toBe(false);
    expect(endState["todolistId1"][1].isDone).toBe(true);
});

test('title of specified task should be changed', () => {
    const action = changeTitleAC('2', 'salt', 'todolistId1');

    const endState = tasksReducer(startState, action)

    expect(endState['todolistId1'][1].title).toBe('salt');
    expect(endState['todolistId2'][1].title).toBe('milk');
});

test('new array should be added when new todolist is added', () => {
    const action = AddTodolistAC("new todolist");

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState);
    const newKey = keys.find(k => k != "todolistId1" && k != "todolistId2");
    if (!newKey) {
        throw Error("new key should be added")
    }

    expect(keys.length).toBe(3);
    expect(endState[newKey]).toEqual([]);
});