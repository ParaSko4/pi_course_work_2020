import React from "react";
import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import thunkMiddleware from "redux-thunk";
import authReducer from "./auth-reducer";
import {reducer as formReducer} from 'redux-form';
import appReducer from "./app-reducer";
import managerReducer from "./manager-reducer";
import breadcrumbReducer from "./breadcrumb-reducer";
import classReducer from "./class-reducer";
import settingsReducer from "./setting-reducer";
import teacherReducer from "./teacher-reducer";
import {studentReducer} from "./student-reducer";
import statisticReducer from "./statistic-reducer";

let rootReducer = combineReducers({
    form: formReducer,
    auth: authReducer,
    app: appReducer,
    manager: managerReducer,
    class: classReducer,
    breadcrumb: breadcrumbReducer,
    settings: settingsReducer,
    student: studentReducer,
    teacher: teacherReducer,
    stat: statisticReducer,
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleware)))

export default store;