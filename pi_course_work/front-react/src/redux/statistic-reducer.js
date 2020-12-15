import {apiSchoolCRUD, apiStatistic, apiTeacher} from "../api/api_course_work";
import {loadAuditoriums, loadLessons, loadTimes} from "./setting-reducer";
import {loadClasses} from "./manager-reducer";

const SUCCESS_INITIALIZING = 'statistic/SUCCESS_INITIALIZING'
const LOGOUT = 'statistic/LOGOUT'
const SET_STATISTIC = 'statistic/SET_STATISTIC'

let initialState = {
    isInitialize: false,
    stat: [],
}

const statisticReducer = (state = initialState, action) => {
    switch (action.type) {
        case SUCCESS_INITIALIZING:
            return {
                ...state,
                isInitialize: true
            }
        case LOGOUT:
            return initialState
        case SET_STATISTIC:
            return {
                ...state,
                stat: action.stat
            }
        default:
            return state
    }
}

export const initializingSuccess = () => ({type: SUCCESS_INITIALIZING})
export const logoutStatic = () => ({type: LOGOUT})
export const setStatistic = (stat) => ({type: SET_STATISTIC, stat})

export const startInitializingStat = () => (dispatch) => {
    let promise = []
    promise.push(dispatch(loadStat()))

    Promise.all(promise).then(() => {
            dispatch(initializingSuccess())
        }
    )
}

export const loadStat = () => async (dispatch) => {
    let response = await apiStatistic.loadStat();

    if (response.result === 0) {
        dispatch(setStatistic(response.statistic))
    } else {
        console.log(response.error)
    }
}

export default statisticReducer