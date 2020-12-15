import {apiSchoolCRUD} from "../api/api_course_work";
import {logoutFromApp} from "./auth-reducer";
import {message} from "antd";

const SUCCESS_INITIALIZING = 'setting/SUCCESS_INITIALIZING'
const LOGOUT = 'setting/LOGOUT'
const SET_TIMES = 'setting/SET_TIMES'
const SET_AUDITORIUMS = 'setting/SET_AUDITORIUMS'
const SET_SCHOOL = 'setting/SET_SCHOOL'
const SET_LESSONS = 'setting/SET_LESSONS'

let initialState = {
    isInitializing: false,
    school: null,
    times: [],
    timesCount: 0,
    auditoriums: [],
    auditoriumsCount: 0,
    lessons: [],
    lessonsCount: 0,
}

const settingsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SUCCESS_INITIALIZING:
            return {
                ...state,
                isInitializing: true
            }
        case LOGOUT:
            return initialState
        case SET_AUDITORIUMS:
            return {
                ...state,
                auditoriums: action.auditoriums,
                auditoriumsCount: action.auditoriums.length
            }
        case SET_TIMES:
            return {
                ...state,
                times: action.times,
                timesCount: action.times.length
            }
        case SET_SCHOOL:
            return {
                ...state,
                school: action.school
            }
        case SET_LESSONS:
            return {
                ...state,
                lessons: action.lessons,
                lessonsCount: action.lessons.length
            }
        default:
            return state
    }
}

export const initializingSuccess = () => ({type: SUCCESS_INITIALIZING})
export const logoutSetting = () => ({type: LOGOUT})
export const setTimes = (times) => ({type: SET_TIMES, times})
export const setAuditoriums = (auditoriums) => ({type: SET_AUDITORIUMS, auditoriums})
export const setSchool = (school) => ({type: SET_SCHOOL, school})
export const setLessons = (lessons) => ({type: SET_LESSONS, lessons})

export const startInitializingSetting = () => (dispatch) => {
    let promise = []
    promise.push(dispatch(loadSchool()))
    promise.push(dispatch(loadTimes()))
    promise.push(dispatch(loadAuditoriums()))
    promise.push(dispatch(loadLessons()))

    Promise.all(promise).then(() => {
            dispatch(initializingSuccess())
        }
    )
}

export const loadTimes = () => async (dispatch) => {
    let response = await apiSchoolCRUD.loadTimes();

    if (response.result === 0) {
        dispatch(setTimes(response.times))
    } else {
        console.log(response.error)
    }
}

export const addTime = (time) => async (dispatch) => {
    let response = await apiSchoolCRUD.addTime(time);

    if (response.result === 0) {
        dispatch(loadTimes())
        message.success({content: 'Time was add', duration: 2})
    } else {
        console.log(response.error)
        message.error({content: 'Action error', duration: 2})
    }
}

export const updateTime = (time) => async (dispatch) => {
    let response = await apiSchoolCRUD.updateTime(time);

    if (response.result === 0) {
        dispatch(loadTimes())
        message.success({content: 'Time was updated', duration: 2})
    } else {
        console.log(response.error)
        message.error({content: 'Action error', duration: 2})
    }
}

export const removeTime = (id) => async (dispatch) => {
    let response = await apiSchoolCRUD.deleteTime(id);

    if (response.result === 0) {
        dispatch(loadTimes())
        message.success({content: 'Time was removed', duration: 2})
    } else {
        console.log(response.error)
        message.error({content: 'Action error', duration: 2})
    }
}

export const loadAuditoriums = () => async (dispatch) => {
    let response = await apiSchoolCRUD.loadAuditoriums();

    if (response.result === 0) {
        dispatch(setAuditoriums(response.auditoriums))
    } else {
        console.log(response.error)
    }
}

export const addAuditorium = (auditorium) => async (dispatch) => {
    let response = await apiSchoolCRUD.addAuditorium(auditorium);

    if (response.result === 0) {
        dispatch(loadAuditoriums())
        message.success({content: 'Auditorium was added', duration: 2})
    } else {
        console.log(response.error)
        message.error({content: 'Action error', duration: 2})
    }
}

export const updateAuditorium = (auditorium) => async (dispatch) => {
    let response = await apiSchoolCRUD.updateAuditorium(auditorium);

    if (response.result === 0) {
        dispatch(loadAuditoriums())
        message.success({content: 'Auditorium was updated', duration: 2})
    } else {
        console.log(response.error)
        message.error({content: 'Action error', duration: 2})
    }
}

export const removeAuditorium = (id) => async (dispatch) => {
    let response = await apiSchoolCRUD.deleteAuditorium(id);

    if (response.result === 0) {
        dispatch(loadAuditoriums())
        message.success({content: 'Auditorium was removed', duration: 2})
    } else {
        console.log(response.error)
        message.error({content: 'Action error', duration: 2})
    }
}

export const loadSchool = () => async (dispatch) => {
    let response = await apiSchoolCRUD.loadSchool();

    if (response.result === 0) {
        dispatch(setSchool(response.school))
    } else {
        console.log(response.error)
    }
}

export const updateSchool = (school) => async (dispatch) => {
    let response = await apiSchoolCRUD.updateSchool(school);

    if (response.result === 0) {
        dispatch(loadSchool())
        message.success({content: 'School was updated', duration: 2})
    } else {
        console.log(response.error)
        message.error({content: 'Action error', duration: 2})
    }
}

export const removeSchool = () => async (dispatch) => {
    let response = await apiSchoolCRUD.removeSchool();

    if (response.result === 0) {
        dispatch(logoutFromApp())
        message.success({content: 'School was removed', duration: 2})
    } else {
        console.log(response.error)
        message.error({content: 'Action error', duration: 2})
    }
}

export const loadLessons = () => async (dispatch) => {
    let response = await apiSchoolCRUD.loadLessons();

    if (response.result === 0) {
        dispatch(setLessons(response.lessons))
    } else {
        console.log(response.error)
    }
}

export const addLesson = (lesson) => async (dispatch) => {
    let response = await apiSchoolCRUD.addLesson(lesson);

    if (response.result === 0) {
        dispatch(loadLessons())
        message.success({content: 'Lesson was added', duration: 2})
    } else {
        console.log(response.error)
        message.error({content: 'Action error', duration: 2})
    }
}

export const updateLesson = (lesson) => async (dispatch) => {
    let response = await apiSchoolCRUD.updateLesson(lesson);

    if (response.result === 0) {
        dispatch(loadLessons())
        message.success({content: 'Lesson was updated', duration: 2})
    } else {
        console.log(response.error)
        message.error({content: 'Action error', duration: 2})
    }
}

export const removeLesson = (id) => async (dispatch) => {
    let response = await apiSchoolCRUD.removeLesson(id);

    if (response.result === 0) {
        dispatch(loadLessons())
        message.success({content: 'Lesson was removed', duration: 2})
    } else {
        console.log(response.error)
        message.error({content: 'Action error', duration: 2})
    }
}

export default settingsReducer;