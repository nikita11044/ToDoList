import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {AddBox} from "@material-ui/icons";
import {IconButton, TextField} from "@material-ui/core";

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

function AddItemForm(props: AddItemFormPropsType) {
    const [title, setTitle] = useState('')
    const [error, setError] = useState<boolean>(false)

    const addItem = () => {
        const trimmedTitle = title.trim()
        if(trimmedTitle) {
            props.addItem(trimmedTitle)
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
        if (e.key === "Enter") addItem()
    }

    return (
        <div>
            <TextField
                variant={'outlined'}
                value={title}
                onChange={changeTitle}
                onKeyPress={onKeyPressAddTask}
                onBlur={() => {setError(false)}}
                helperText={error ? 'Title is required!' : ''}
                label={"Title"}
                error={error}/>
            <IconButton onClick={addItem}>
                <AddBox />
            </IconButton>
            {/*{error && <div className='error-message'>Please, enter task title</div>}*/}
        </div>
    )
}

export default AddItemForm;