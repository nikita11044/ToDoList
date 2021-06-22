import {FieldErrorType} from "../api/todolists-api";

export type ThunkError = { rejectValue: {errors: string[], fieldsErrors?: FieldErrorType[]} }
export type AddItemFormSubmitHelperType = {setError: (error: string) => void, setTitle: (title: string) => void}