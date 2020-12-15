import {apiSchoolCRUD} from "../api/api_course_work";
import {message} from "antd";

const SUCCESS_INITIALIZING_MANAGER = 'schoolManager/SUCCESS_INITIALIZING_MANAGER'
const LOGOUT = 'schoolManager/LOGOUT'
const SET_WORKERS = 'schoolManager/SET_WORKERS'
const SET_WORKERS_WITHOUT_CLASS = 'schoolManager/SET_WORKERS_WITHOUT_CLASS'
const SET_CLASSES = 'schoolManager/SET_CLASSES'
const SET_STUDENTS = 'schoolManager/SET_STUDENTS'

let initialState = {
    isInitializing: false,
    workersCount: 0,
    workers: [],
    workersWithoutClass: [],
    classesCount: 0,
    classes: [],
    students: [],
    studentsCount: 0
}

const managerReducer = (state = initialState, action) => {
    switch (action.type) {
        case SUCCESS_INITIALIZING_MANAGER:
            return {
                ...state,
                isInitializing: true
            }
        case LOGOUT:
            return initialState
        case SET_WORKERS:
            return {
                ...state,
                workers: [...action.workers],
                workersCount: action.workers.length
            }
        case SET_CLASSES:
            return {
                ...state,
                classes: [...action.classes],
                classesCount: action.classes.length
            }
        case SET_STUDENTS:
            return {
                ...state,
                students: [...action.students],
                studentsCount: action.students.length
            }
        case SET_WORKERS_WITHOUT_CLASS:
            return {
                ...state,
                workersWithoutClass: [...action.workersWithoutClass]
            }
        default:
            return state
    }
}

export const initializingSuccess = () => ({type: SUCCESS_INITIALIZING_MANAGER})
export const logoutManager = () => ({type: LOGOUT})
export const setWorkers = (workers) => ({type: SET_WORKERS, workers})
export const setWorkersWithoutClass = (workersWithoutClass) => ({type: SET_WORKERS_WITHOUT_CLASS, workersWithoutClass})
export const setClasses = (classes) => ({type: SET_CLASSES, classes})
export const setStudents = (students) => ({type: SET_STUDENTS, students})

export const startInitializingManager = () => (dispatch) => {
    let promise = []
    promise.push(dispatch(loadSchoolWorkers()))
    promise.push(dispatch(loadWorkersWithoutClass()))
    promise.push(dispatch(loadClasses()))

    Promise.all(promise).then(() => {
            dispatch(initializingSuccess())
        }
    )
}

export const loadSchoolWorkers = () => async (dispatch) => {
    let response = await apiSchoolCRUD.loadWorkers()

    if (response.result === 0) {
        dispatch(setWorkers(response.workers))
    } else {
        console.log(response.error)
    }
}

export const loadWorkersWithoutClass = () => async (dispatch) => {
    let response = await apiSchoolCRUD.loadWorkersWithoutClass()

    if (response.result === 0) {
        dispatch(setWorkersWithoutClass(response.workers))
    } else {
        console.log(response.error)
    }
}

export const loadClasses = () => async (dispatch) => {
    let response = await apiSchoolCRUD.loadClasses();

    if (response.result === 0) {
        dispatch(setClasses(response.classes))
    } else {
        console.log(response.error)
    }
}

export const addNewWorker = (values) => async (dispatch) => {
    let response = await apiSchoolCRUD.newWorker(values)

    if (response.result === 0) {
        dispatch(loadSchoolWorkers())
        dispatch(loadWorkersWithoutClass())
        message.success({content: 'Worker was added', duration: 2})
    } else {
        console.log(response.error)
        message.error({content: 'Action error', duration: 2})
    }
}

export const removeWorker = (index) => async (dispatch) => {
    let response = await apiSchoolCRUD.removeWorker(index)

    if (response.result === 0) {
        message.success({content: 'Worker removed success!', duration: 2})

        dispatch(loadSchoolWorkers())
        dispatch(loadWorkersWithoutClass())
        dispatch(loadClasses())
    } else {
        message.error({content: 'Can\'t remove this worker ): ', duration: 2})
    }
}

export const modifiedWorker = (worker) => async (dispatch) => {
    let response = await apiSchoolCRUD.updateWorker(worker)

    if (response.result === 0) {
        dispatch(loadSchoolWorkers())
        dispatch(loadWorkersWithoutClass())
    } else {
        console.log(response.error)
        message.error({content: 'Action error', duration: 2})
    }
}

export const addNewClass = (newClass) => async (dispatch) => {
    let response = await apiSchoolCRUD.addClass(newClass);

    if (response.result === 0) {
        dispatch(loadClasses())
        dispatch(loadWorkersWithoutClass())
        message.success({content: 'Class was added', duration: 2})
    } else {
        if (response.result === 56) {
            message.error({content: response.error})
        } else {
            console.log(response.error)
        }
    }
}

export default managerReducer;