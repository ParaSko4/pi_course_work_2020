import {apiSchoolCRUD} from "../api/api_course_work";
import {message} from "antd";
import {loadClasses, loadSchoolWorkers, loadWorkersWithoutClass} from "./manager-reducer";
import {loadAuditoriums, loadLessons, loadSchool, loadTimes} from "./setting-reducer";

const SUCCESS_INITIALIZING_CLASS = 'class/SUCCESS_INITIALIZING_CLASS'
const LOGOUT = 'class/LOGOUT'
const SUCCESS_UPLOAD_SCHEDULE = 'class/SUCCESS_UPLOAD_SCHEDULE'
const WAIT_SCHEDULE_UPLOAD = 'class/WAIT_SCHEDULE_UPLOAD'
const SET_CLASS = 'class/SET_CLASS'
const SET_WORKER = 'class/SET_WORKER'
const SET_STUDENTS = 'class/SET_STUDENTS'
const SET_SCHEDULE = 'class/SET_SCHEDULE'
const SET_ALL_SCHEDULES = 'class/SET_ALL_SCHEDULES'

let initialState = {
    isInitializing: false,
    isScheduleUpload: false,
    schoolClass: null,
    worker: null,
    students: null,
    studentsCount: 0,
    classSchedule: [],
    scheduleCount: 0,
    allSchedules: []
}

const classReducer = (state = initialState, action) => {
    switch (action.type) {
        case SUCCESS_INITIALIZING_CLASS:
            return {
                ...state,
                isInitializing: true
            }
        case LOGOUT:
            return initialState
        case SUCCESS_UPLOAD_SCHEDULE:
            return {
                ...state,
                isScheduleUpload: true
            }
        case WAIT_SCHEDULE_UPLOAD:
            return {
                ...state,
                isScheduleUpload: false
            }
        case SET_CLASS:
            return {
                ...state,
                schoolClass: action.schoolClass
            }
        case SET_WORKER:
            return {
                ...state,
                worker: action.worker
            }
        case SET_STUDENTS:
            return {
                ...state,
                students: [...action.students],
                studentsCount: action.students.length
            }
        case SET_SCHEDULE:
            return {
                ...state,
                classSchedule: action.schedule ? action.schedule : [],
                scheduleCount: action.schedule ? action.schedule.length : 0
            }
        case SET_ALL_SCHEDULES:
            return {
                ...state,
                allSchedules: action.schedules
            }
        default:
            return state
    }
}

export const initializingSuccess = () => ({type: SUCCESS_INITIALIZING_CLASS})
export const logoutClass = () => ({type: LOGOUT})
export const uploadScheduleSuccess = () => ({type: SUCCESS_UPLOAD_SCHEDULE})
export const waitScheduleUpload = () => ({type: WAIT_SCHEDULE_UPLOAD})
export const setStudents = (students) => ({type: SET_STUDENTS, students})
export const setClass = (schoolClass) => ({type: SET_CLASS, schoolClass})
export const setClassWorker = (worker) => ({type: SET_WORKER, worker})
export const setClassStudents = (students) => ({type: SET_STUDENTS, students})
export const setSchedule = (schedule) => ({type: SET_SCHEDULE, schedule})
export const setAllSchedule = (schedules) => ({type: SET_ALL_SCHEDULES, schedules})

export const startInitializingClass = (classId) => (dispatch) => {
    let promise = []
    promise.push(dispatch(loadClass(classId)))
    promise.push(dispatch(loadClassStudents(classId)))
    promise.push(dispatch(loadClassWorker(classId)))
    promise.push(dispatch(loadSchedule(classId)))
    promise.push(dispatch(loadAllSchedules()))

    promise.push(dispatch(loadWorkersWithoutClass()))
    promise.push(dispatch(loadTimes()))
    promise.push(dispatch(loadAuditoriums()))
    promise.push(dispatch(loadLessons()))
    promise.push(dispatch(loadSchoolWorkers()))
    promise.push(dispatch(loadSchool()))

    Promise.all(promise).then(() => {
            dispatch(initializingSuccess())
        }
    )
}

export const loadClassStudents = (classId) => async (dispatch) => {
    let response = await apiSchoolCRUD.loadClassStudents(classId);

    if (response.result === 0) {
        dispatch(setClassStudents(response.students))
    } else {
        console.log(response.error)
    }
}

export const loadClassWorker = (classId) => async (dispatch) => {
    let response = await apiSchoolCRUD.getClassWorkerById(classId);

    if (response.result === 0) {
        dispatch(setClassWorker(response.classWorker))
    } else {
        console.log(response.error)
    }
}

export const loadClass = (id) => async (dispatch) => {
    let response = await apiSchoolCRUD.getClassById(id);

    if (response.result === 0) {
        dispatch(setClass(response.schoolClass))
    } else {
        console.log(response.error)
    }
}

export const loadSchedule = (classId) => async (dispatch) => {
    let response = await apiSchoolCRUD.loadSchedule(classId);

    if (response.result === 0) {
        dispatch(setSchedule(response.schedules))
    } else {
        console.log(response.error)
    }
}

export const loadAllSchedules = () => async (dispatch) => {
    let response = await apiSchoolCRUD.loadAllSchedules();

    if (response.result === 0) {
        dispatch(setAllSchedule(response.schedules))
    } else {
        console.log(response.error)
    }
}

export const addStudent = (student) => async (dispatch) => {
    let response = await apiSchoolCRUD.addStudent(student);

    if (response.result === 0) {
        dispatch(loadClassStudents(student.classId))
        message.success({content: 'Student was added', duration: 2})
    } else {
        console.log(response.error)
        message.error({content: 'Action error', duration: 2})
    }
}

export const updateStudent = (updatedStudent, classId) => async (dispatch) => {
    let response = await apiSchoolCRUD.updateStudent(updatedStudent);

    if (response.result === 0) {
        dispatch(loadClassStudents(classId))
        message.success({content: 'Student was updated', duration: 2})
    } else {
        console.log(response.error)
        message.error({content: 'Action error', duration: 2})
    }
}

export const removeStudent = (personalDataId, classId) => async (dispatch) => {
    let response = await apiSchoolCRUD.removeStudent(personalDataId);

    if (response.result === 0) {
        dispatch(loadClassStudents(classId))
        message.success({content: 'Student was removed', duration: 2})
    } else {
        console.log(response.error)
        message.error({content: 'Action error', duration: 2})
    }
}

export const updateClass = (schoolClass) => async (dispatch) => {
    let response = await apiSchoolCRUD.updateClass(schoolClass);

    if (response.result === 0) {
        dispatch(loadClass(schoolClass.id))
        dispatch(loadClassWorker(schoolClass.id))
        message.success({content: 'Class was updated', duration: 2})
    } else {
        console.log(response.error)
        message.error({content: 'Action error', duration: 2})
    }
}

export const removeClass = (classId) => async (dispatch) => {
    let response = await apiSchoolCRUD.removeClass(classId);

    if (response.result === 0) {
        dispatch(loadClasses())
        message.success({content: 'Class was removed', duration: 2})
    } else {
        console.log(response.error)
        message.error({content: 'Action error', duration: 2})
    }
}

export const addSchedule = (schedule, classId) => async (dispatch) => {
    let response = await apiSchoolCRUD.addSchedule(schedule);

    if (response.result === 0) {
        dispatch(loadSchedule(classId))
        message.success({content: 'Schedule was added', duration: 2})
    } else {
        console.log(response.error)
        message.error({content: 'Action error', duration: 2})
    }
}

export const updateSchedule = (schedule, classId) => async (dispatch) => {
    let response = await apiSchoolCRUD.updateSchedule(schedule);

    if (response.result === 0) {
        dispatch(loadSchedule(classId))
        message.success({content: 'Schedule was updated', duration: 2})
    } else {
        console.log(response.error)
        message.error({content: 'Action error', duration: 2})
    }
}

export const removeScheduleDay = (classId, day) => async (dispatch) => {
    let response = await apiSchoolCRUD.removeScheduleDay(classId, day);

    if (response.result === 0) {
        dispatch(loadSchedule(classId))
        message.success({content: 'Schedule Day was removed', duration: 2})
    } else {
        console.log(response.error)
        message.error({content: 'Action error', duration: 2})
    }
}

export default classReducer;