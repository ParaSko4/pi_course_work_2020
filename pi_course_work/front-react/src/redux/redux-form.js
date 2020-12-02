import {submit, reset} from "redux-form";

export const remoteSubmit = (formName) => (dispatch) => {
    dispatch(submit(formName))
}

export const resetForm = (formName) => (dispatch) => {
    dispatch(reset(formName));
}