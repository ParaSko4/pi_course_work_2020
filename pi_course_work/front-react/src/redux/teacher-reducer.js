import {apiSchoolCRUD, apiTeacher} from "../api/api_course_work";
import {loadAuditoriums, loadLessons, loadTimes} from "./setting-reducer";
import {loadClasses} from "./manager-reducer";
import {message} from "antd";

const SUCCESS_INITIALIZING = 'teacher/SUCCESS_INITIALIZING'
const LOGOUT = 'teacher/LOGOUT'
const SET_PERSONAL_DATA = 'teacher/SET_PERSONAL_DATA'
const SET_MARKS = 'teacher/SET_MARKS'
const SET_SCHEDULES = 'teacher/SET_SCHEDULES'

let initialState = {
    isInitialize: false,
    personalData: null,
    marks: [],
    schedules: [],
}

const teacherReducer = (state = initialState, action) => {
    switch (action.type) {
        case SUCCESS_INITIALIZING:
            return {
                ...state,
                isInitialize: true
            }
        case LOGOUT:
            return initialState
        case SET_PERSONAL_DATA:
            return {
                ...state,
                personalData: action.personalData
            }
        case SET_MARKS:
            return {
                ...state,
                marks: action.marks
            }
        case SET_SCHEDULES:
            return {
                ...state,
                schedules: action.schedules
            }
        default:
            return state
    }
}

export const initializingSuccess = () => ({type: SUCCESS_INITIALIZING})
export const logoutTeacher = () => ({type: LOGOUT})
export const setPersonalData = (personalData) => ({type: SET_PERSONAL_DATA, personalData})
export const setWorkerMarks = (marks) => ({type: SET_MARKS, marks})
export const setWorkerSchedules = (schedules) => ({type: SET_SCHEDULES, schedules})

export const startInitializingTeacher = () => (dispatch) => {
    let promise = []
    promise.push(dispatch(loadPersonalData()))
    promise.push(dispatch(loadWorkerMarks()))
    promise.push(dispatch(loadWorkerSchedules()))

    promise.push(dispatch(loadTimes()))
    promise.push(dispatch(loadAuditoriums()))
    promise.push(dispatch(loadLessons()))
    promise.push(dispatch(loadClasses()))

    Promise.all(promise).then(() => {
            dispatch(initializingSuccess())
        }
    )
}

export const loadPersonalData = () => async (dispatch) => {
    let response = await apiTeacher.loadPersonalData();

    if (response.result === 0) {
        dispatch(setPersonalData(response.personalData))
    } else {
        console.log(response.error)
    }
}

export const loadWorkerMarks = () => async (dispatch) => {
    let response = await apiTeacher.loadWorkerMarks();

    if (response.result === 0) {
        dispatch(setWorkerMarks(response.marks))
    } else {
        console.log(response.error)
    }
}

export const loadWorkerSchedules = () => async (dispatch) => {
    let response = await apiTeacher.loadWorkerSchedule();

    if (response.result === 0) {
        dispatch(setWorkerSchedules(response.schedules))
    } else {
        console.log(response.error)
    }
}

export const addMark = (lessonId, studentId, mark, workerId) => async (dispatch) => {
    let response = await apiTeacher.addMark(lessonId, studentId, mark, workerId);

    if (response.result === 0) {
        dispatch(loadWorkerMarks(response.marks))
        message.success({content: 'Mark was added', duration: 2})
    } else {
        console.log(response.error)
        message.error({content: 'Action error', duration: 2})
    }
}

export const updateMark = (markId, mark) => async (dispatch) => {
    let response = await apiTeacher.updateMark(markId, mark);

    if (response.result === 0) {
        dispatch(loadWorkerMarks(response.marks))
        message.success({content: 'Mark was updated', duration: 2})
    } else {
        console.log(response.error)
        message.error({content: 'Action error', duration: 2})
    }
}

export const removeMark = (markId) => async (dispatch) => {
    let response = await apiTeacher.removeMark(markId);

    if (response.result === 0) {
        dispatch(loadWorkerMarks(response.marks))
        message.success({content: 'Mark was removed', duration: 2})
    } else {
        console.log(response.error)
        message.error({content: 'Action error', duration: 2})
    }
}

export default teacherReducer;