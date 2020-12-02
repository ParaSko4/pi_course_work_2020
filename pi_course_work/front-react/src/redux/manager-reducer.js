import {apiAccount as apiAccoun, apiAccount, apiLogin, apiSchoolCRUD} from "../api/api_course_work";
import {message} from "antd";

const SET_SCHOOL_WORKERS = 'schoolManager/SET_SCHOOL_WORKERS'
const ADD_NEW_WORKER = 'schoolManager/ADD_NEW_WORKER'
const SET_MODIFIED_WORKER = 'schoolManager/SET_MODIFIED_WORKER'
const LOGOUT_FROM_APP = 'schoolManager/LOGOUT_FROM_APP'

let initialState = {
    workersCount: 0,
    workers: [],
    classesCount: 0,
    classes: []
}

const managerReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_SCHOOL_WORKERS:
            return {
                ...state,
                workers: [...action.workers],
                workersCount: action.workers.length
            }
        case ADD_NEW_WORKER:
            return {
                ...state,
                workersCount: state.schoolWorkers.workersCount + 1,
                workers: [...state.schoolWorkers.workers, action.newWorker]
            }
        case SET_MODIFIED_WORKER:
            let arr = state.workers.filter(function(item) {
                return item.id !== action.modifiedWorker.id
            })

            action.modifiedWorker.fullName = action.modifiedWorker.name + ' ' + action.modifiedWorker.surname + ' ' + action.modifiedWorker.middlename

            return{
                ...state,
                workers: [...arr, action.modifiedWorker].sort()
            }
        default:
            return state
    }
}
export const setSchoolWorkers = (workers) => ({type: SET_SCHOOL_WORKERS, workers})
export const setNewWorker = (newWorker) => ({type: ADD_NEW_WORKER, newWorker})
export const setModifiedWorker = (modifiedWorker) => ({type: SET_MODIFIED_WORKER, modifiedWorker})

export const loadSchoolWorkers = () => async (dispatch) => {
    let response = await apiSchoolCRUD.loadWorkers()

    if (response.result === 0){
        dispatch(setSchoolWorkers(response.workers))
    }else{
        console.log(response.error)
    }
}

export const addNewWorker = (values) => async (dispatch) => {
    console.log(values)
    let response = await apiSchoolCRUD.newWorker(values)

    if(response.result === 0){
        let response = await apiSchoolCRUD.loadWorkers()

        if (response.result === 0){
            dispatch(setSchoolWorkers(response.workers))
        }else{
            console.log(response.error)
        }
    }else{
        console.log(response.error)
    }
}

export const removeWorker = (index) => async (dispatch) => {
    let response = await apiSchoolCRUD.removeWorker(index)

    if (response.result === 0){
        message.success({content: 'Worker removed success!', duration: 2})

        let response = await apiSchoolCRUD.loadWorkers()

        if (response.result === 0){
            dispatch(setSchoolWorkers(response.workers))
        }else{
            console.log(response.error)
        }
    }else{
        message.error({content: 'Can\'t remove this worker ): ', duration: 2})
    }
}

export const modifiedWorker = (worker) => async (dispatch) => {
    let response = await apiSchoolCRUD.setModifiedObject(worker)

    if (response.result === 0){
        dispatch(setModifiedWorker(worker))
    }else{
        console.log(response.error)
    }
}
export default managerReducer;