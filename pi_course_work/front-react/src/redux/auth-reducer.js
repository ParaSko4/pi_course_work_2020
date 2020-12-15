import {apiAccount as apiAccoun, apiAccount, apiAnon} from "../api/api_course_work";
import {message} from "antd";
import {logoutTeacher} from "./teacher-reducer";
import {logoutStudent} from "./student-reducer";
import {logoutStatic} from "./statistic-reducer";
import {logoutSetting} from "./setting-reducer";
import {logoutManager} from "./manager-reducer";
import {logoutClass} from "./class-reducer";

const SET_USER_DATA = 'auth/SET_USER_DATA'
const LOGOUT_FROM_APP = 'auth/LOGOUT_FROM_APP'

const messageLoaderKey = 'updatable';

let initialState = {
    user: {
        userId: null,
        name: null,
        role: null,
        schoolId: null
    },
    isAuth: false
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                user: {
                    userId: action.userId,
                    name: action.name,
                    role: action.role,
                    schoolId: action.schoolId
                },
                isAuth: true
            }
        case LOGOUT_FROM_APP:
            return initialState
        default:
            return state
    }
}

export const setUserData = (userId, name, role, schoolId) => ({type: SET_USER_DATA, userId, name, role, schoolId})
export const logoutFromApp = () => ({type: LOGOUT_FROM_APP})


export const getAuthUserData = () => async (dispatch) => {
    let response = await apiAccount.getUserInfo()

    if (response.result === 0) {
        dispatch(setUserData(response.userData.userId, response.userData.name, response.userData.role, response.userData.schoolId))
    }
}
export const loginInApp = (login, password) => async (dispatch) => {
    let response = await apiAnon.login(login, password)

    if (response.result === 0) {
        dispatch(getAuthUserData())
    }else{
        message.error({ content: response.error, messageLoaderKey, duration:	2 })
    }
}

export const registrationInApp = (login, password, schoolName, location) => async (dispatch) => {
    let response = await apiAnon.registration(login, password, schoolName, location)

    if (response.result !== 0){
        message.info(response.error);
    }
}

export const exitFromApp = () => async (dispatch) => {
    let response = await apiAccoun.logoutFromApp()

    if (response.result === 0) {
        dispatch(logoutFromApp())
        dispatch(logoutTeacher())
        dispatch(logoutStudent())
        dispatch(logoutStatic())
        dispatch(logoutSetting())
        dispatch(logoutManager())
        dispatch(logoutClass())
    }
}


export default authReducer;