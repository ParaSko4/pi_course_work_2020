import React from "react";
import {applyMiddleware, combineReducers, createStore} from "redux";
import thunkMiddleware from "redux-thunk";
import authReducer from "./auth-reducer";
import {reducer as formReducer} from 'redux-form';
import appReducer from "./app-reducer";
import managerReducer from "./manager-reducer";
import breadcrumbReducer from "./breadcrumb-reducer";

let rootReducer = combineReducers({
    form: formReducer,
    auth: authReducer,
    app: appReducer,
    manager: managerReducer,
    breadcrumb: breadcrumbReducer
})

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))

window.store = store

export default store;