import {getAuthUserData} from "./auth-reducer";

const SET_NEW_PATH = 'breadcrumb/SET_NEW_PATH'
const SET_PREVIOUS_PATH = 'breadcrumb/SET_PREVIOUS_PATH'
const SET_NEW_START_PATH = 'breadcrumb/SET_NEW_START_PATH'
const CHANGE_CURRENT_PATH = 'breadcrumb/CHANGE_CURRENT_PATH'

let initialState = {
    current_navPath: null,
    previous_navPath: []
}

const breadcrumbReducer = (state = initialState, action) => {
    switch (action.type){
        case SET_NEW_PATH:
            return{
                ...state,
                previous_navPath: [...state.previous_navPath, state.current_navPath],
                current_navPath: action.newPath
            }
        case CHANGE_CURRENT_PATH:
            return {
                ...state,
                current_navPath: action.newPath
            }
        case SET_PREVIOUS_PATH:
            return{
                ...state,
                current_navPath: state.previous_navPath[state.previous_navPath.length - 1],
                previous_navPath: state.previous_navPath.slice(0, -1)
            }
        case SET_NEW_START_PATH:
            return{
                ...state,
                current_navPath: action.newPath,
                previous_navPath: []
            }
        default:
            return state
    }
}

export const setNewNavBreadcrumbPath = (newPath) => ({type: SET_NEW_PATH, newPath})
export const changeCurrentPath = (newPath) => ({type: CHANGE_CURRENT_PATH, newPath})
export const popPreviousPath = () => ({type: SET_PREVIOUS_PATH})
export const setNewBreadcrumbStartPath = (newPath) => ({type: SET_NEW_START_PATH, newPath})


export default breadcrumbReducer;