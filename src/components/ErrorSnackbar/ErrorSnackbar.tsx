import React, {useState} from "react"
import MuiAlert, {AlertProps} from "@material-ui/lab/Alert";
import {Snackbar} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../app/store";
import {setAppErrorAC} from "../../app/app-reducer";

function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />
}

export function ErrorSnackbar() {
    const error = useSelector<AppRootStateType, string | null>(state => state.app.error)
    const dispatch = useDispatch()

    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return
        }
        dispatch(setAppErrorAC(null))
    }

    return (
        <Snackbar open={error !== null} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error">
                This is a success message
            </Alert>
        </Snackbar>
    )
}