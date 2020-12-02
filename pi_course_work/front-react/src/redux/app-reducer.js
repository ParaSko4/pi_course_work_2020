import {getAuthUserData} from "./auth-reducer";

const SUCCESS_INITIALIZING_APP = 'app/SUCCESS_INITIALIZING_APP'

let initialState = {
    isInitializing: false
}

const appReducer = (state = initialState, action) => {
    switch (action.type){
        case SUCCESS_INITIALIZING_APP:
            return{
                ...state,
                isInitializing: true
            }
        default:
            return state
    }
}

export const initializaingSuccess = () => ({type: SUCCESS_INITIALIZING_APP})
export const startInitializingApp = () => (dispatch) => {
    let promise = dispatch(getAuthUserData())

    Promise.all([promise]).then(() => {
            dispatch(initializaingSuccess())
        }
    )
}

export default appReducer;