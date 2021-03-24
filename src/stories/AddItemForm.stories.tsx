import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import {AddItemForm, AddItemFormPropsType} from "../AddItemForm";
import {action} from "@storybook/addon-actions";


export default {
    title: 'TODOLIST/AddItemForm',
    component: AddItemForm
} as Meta;

const Template: Story<AddItemFormPropsType> = (args) => <AddItemForm {...args} />;

export const AddItemFormStories = Template.bind({});

AddItemFormStories.args = {
    addItem: action('Clicked add item')
};


