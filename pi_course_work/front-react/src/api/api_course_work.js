import * as axios from "axios";

const instance = axios.create({
    baseURL: 'https://localhost:44319/api/',
    withCredentials: true
})

export const apiAccount = {
    getUserInfo(){
        return instance.get('account/me').then((response) => {
            return response.data
        })
    },
    logoutFromApp(){
        return instance.delete('account/logout').then((response) => {
            return response.data
        })
    }
}

export const apiSchoolCRUD = {
    loadWorkers(){
        return instance.get('worker/workersdata').then((response) => {
            return response.data
        })
    },
    newWorker(newWorker){
        return instance.post('worker/newWorker', newWorker).then((response) => {
            return response.data
        })
    },
    setModifiedObject(modifiedObject){
        return instance.put('worker/updateWorker', modifiedObject).then((response) => {
            return response.data
        })
    },
    removeWorker(index){
        return instance.delete('worker/removeWorker?id='+index).then((response) => {
            return response.data
        })
    }
}

export const apiAnon = {
    async login(login, password) {
        let response = await instance.post('account/login', {
            login: login,
            password: password
        })
        return response.data
    },
    async registration(login, password, schoolName, location){
        let response = await instance.post('account/registration', {
            login: login,
            password: password,
            schoolName: schoolName,
            location: location
        })
        return response.data
    }
}
