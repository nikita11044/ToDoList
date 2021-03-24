import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import {EditableSpan, EditableSpanPropsType} from "../EditableSpan";
import {action} from "@storybook/addon-actions";


export default {
    title: 'TODOLIST/EditableSpan',
    component: EditableSpan,
    argTypes: {
        value: {
            defaultValue: 'React'
        }
    }
} as Meta;

const Template: Story<EditableSpanPropsType> = (args) => <EditableSpan {...args} />;

export const EditableSpanStories = Template.bind({})
EditableSpanStories.args = {
    value: 'HTML',
    onChange: action('Value was changed')
}

export const EditableSpanStories2 = Template.bind({})
EditableSpanStories2.args = {
    onChange: action('Value was changed')
}