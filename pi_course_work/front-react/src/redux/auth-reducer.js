import {apiAccount as apiAccoun, apiAccount, apiAnon} from "../api/api_course_work";
import {message} from "antd";
import {initializaingSuccess} from "./app-reducer";

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
    let promise = message.loading({ content: 'Loading...', messageLoaderKey, duration:	1 });
    let response = await apiAnon.login(login, password)

    if (response.result === 0) {
        let response = await apiAccount.getUserInfo()

        if (response.result === 0) {
            dispatch(setUserData(response.userData.userId, response.userData.name, response.userData.role, response.userData.schoolId))

            Promise.all([promise]).then(() => {
                    message.success({ content: 'Welcome to Course Work', messageLoaderKey, duration:	2 });
                }
            )
        }
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
    }
}


export default authReducer;