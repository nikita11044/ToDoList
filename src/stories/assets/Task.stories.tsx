import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import {Task, TaskPropsType} from "../../Task";
import {action} from "@storybook/addon-actions";


export default {
    title: 'TODOLIST/Task',
    component: Task
} as Meta;

const changeTaskStatus = action('Task status was changed')
const changeTaskTitle = action('Task title was changed')
const removeTask = action('Task was removed')

const Template: Story<TaskPropsType> = (args) => <Task {...args} />;

const baseArgs = {
    changeTaskStatus,
    changeTaskTitle,
    removeTask
}

export const TaskIsDoneStory = Template.bind({});
TaskIsDoneStory.args = {
    ...baseArgs,
    task: {id: '1', title: 'REACT', isDone: false},
    todolistID: 'todolist1'
};

export const TaskIsNotDoneStory = Template.bind({});
TaskIsNotDoneStory.args = {
    ...baseArgs,
    task: {id: '1', title: 'REACT', isDone: true},
    todolistID: 'todolist1'
};


