import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import {action} from "@storybook/addon-actions";
import AppWithRedux from "../AppWithRedux";
import {Provider} from "react-redux";
import {store} from "../state/store";
import {ReduxStoreProviderDecorator} from "./ReduxStoreProviderDecorator.stories";


export default {
    title: 'TODOLIST/AppWithRedux',
    component: AppWithRedux,
    decorators: [ReduxStoreProviderDecorator],
    argTypes: {
        value: {
            defaultValue: 'React'
        }
    }
} as Meta;

const Template: Story = (args) => <AppWithRedux {...args} />;

export const AppWithReduxStories = Template.bind({})
AppWithReduxStories.args = {

}