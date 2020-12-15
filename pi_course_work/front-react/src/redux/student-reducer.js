import {apiStudent} from "../api/api_course_work";
import {loadAuditoriums, loadLessons, loadTimes} from "./setting-reducer";
import {loadClasses, loadSchoolWorkers} from "./manager-reducer";

const SUCCESS_INITIALIZING = 'student/SUCCESS_INITIALIZING'
const LOGOUT = 'student/LOGOUT'
const SET_PERSONAL_DATA = 'student/SET_PERSONAL_DATA'
const SET_SCHEDULES = 'student/SET_SCHEDULES'
const SET_MARKS = 'student/SET_MARKS'

let initialState = {
    isInitialize: false,
    personalData: null,
    schedules: [],
    marks: [],
}

export const studentReducer = (state = initialState, action) => {
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
        case SET_SCHEDULES:
            return {
                ...state,
                schedules: action.schedules
            }
        case SET_MARKS:
            return {
                ...state,
                marks: action.marks
            }
        default:
            return state
    }
}

export const initializingSuccess = () => ({type: SUCCESS_INITIALIZING})
export const logoutStudent = () => ({type: LOGOUT})
export const setPersonalData = (personalData) => ({type: SET_PERSONAL_DATA, personalData})
export const setSchedules = (schedules) => ({type: SET_SCHEDULES, schedules})
export const setMarks = (marks) => ({type: SET_MARKS, marks})

export const startInitializingStudent = () => (dispatch) => {
    let promise = []
    promise.push(dispatch(loadPersonalData()))
    promise.push(dispatch(loadSchedules()))
    promise.push(dispatch(loadMarks()))

    promise.push(dispatch(loadSchoolWorkers()))
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
    let response = await apiStudent.loadStudentData();

    if (response.result === 0) {
        dispatch(setPersonalData(response.personalData))
    } else {
        console.log(response.error)
    }
}

export const loadSchedules = () => async (dispatch) => {
    let response = await apiStudent.loadStudentSchedule();

    if (response.result === 0) {
        dispatch(setSchedules(response.schedules))
    } else {
        console.log(response.error)
    }
}

export const loadMarks = () => async (dispatch) => {
    let response = await apiStudent.loadStudentMarks();

    if (response.result === 0) {
        dispatch(setMarks(response.marks))
    } else {
        console.log(response.error)
    }
}