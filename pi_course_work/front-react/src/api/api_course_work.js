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
    loadWorkersWithoutClass(){
        return instance.get('worker/workersWithoutClass').then((response) => {
            return response.data
        })
    },
    newWorker(newWorker){
        return instance.post('worker/newWorker', newWorker).then((response) => {
            return response.data
        })
    },
    updateWorker(worker){
        return instance.put('worker/updateWorker', worker).then((response) => {
            return response.data
        })
    },
    removeWorker(index){
        return instance.delete('worker/removeWorker?id='+index).then((response) => {
            return response.data
        })
    },
    loadClasses(){
        return instance.get('class/GetAllClasses').then((response) => {
            return response.data
        })
    },
    addClass(schoolClass){
        console.log(schoolClass)
        return instance.post('class/addClass', schoolClass).then((response) => {
            return response.data
        })
    },

    addStudent(newStudent){
        return instance.post('student/addStudent', newStudent).then((response) => {
            return response.data
        })
    },
    updateStudent(updatedStudent){
        console.log(updatedStudent)
        return instance.put('student/updateStudent', updatedStudent).then((response) => {
            return response.data
        })
    },
    removeStudent(personalDataId){
        return instance.delete('student/removeStudent?personalDataId=' + personalDataId).then((response) => {
            return response.data
        })
    },

    getClassById(id){
        return instance.get('class/classById?id='+id).then((response) => {
            return response.data
        })
    },
    loadClassStudents(classId){
        return instance.get('student/getClassStudents?classId='+classId).then((response) => {
            return response.data
        })
    },
    getClassWorkerById(classId){
        return instance.get('worker/classWorkerByClass?classId='+classId).then((response) => {
            return response.data
        })
    },
    loadTimes(){
        return instance.get('time/getTimes').then((response) => {
            return response.data
        })
    },
    addTime(time){
        return instance.post('time/addTime', time).then((response) => {
            return response.data
        })
    },
    updateTime(time){
        return instance.put('time/updateTime', time).then((response) => {
            return response.data
        })
    },
    deleteTime(id){
        return instance.delete('time/removeTime?id='+id).then((response) => {
            return response.data
        })
    },
    loadAuditoriums(){
        return instance.get('auditorium/getAuditoriums').then((response) => {
            return response.data
        })
    },
    addAuditorium(newAuditorium){
        return instance.post('auditorium/addAuditorium', newAuditorium).then((response) => {
            return response.data
        })
    },
    updateAuditorium(auditorium){
        return instance.put('auditorium/updateAuditorium', auditorium).then((response) => {
            return response.data
        })
    },
    deleteAuditorium(id){
        return instance.delete('auditorium/removeAuditorium?id='+id).then((response) => {
            return response.data
        })
    },
    loadSchool(){
        return instance.get('school/getSchool').then((response) => {
            return response.data
        })
    },
    updateSchool(school){
        return instance.put('school/updateSchool', school).then((response) => {
            return response.data
        })
    },
    removeSchool(){
        return instance.delete('school/removeSchool').then((response) => {
            return response.data
        })
    },
    loadLessons(){
        return instance.get('lesson/getLessons').then((response) => {
            return response.data
        })
    },
    addLesson(lesson){
        return instance.post('lesson/addLesson', lesson).then((response) => {
            return response.data
        })
    },
    updateLesson(lesson){
        return instance.put('lesson/updateLesson', lesson).then((response) => {
            return response.data
        })
    },
    removeLesson(id){
        return instance.delete('lesson/removeLesson?id='+id).then((response) => {
            return response.data
        })
    },

    loadSchedule(classId){
        return instance.get('schedule/getSchedule?classId='+parseInt(classId)).then((response) => {
            return response.data
        })
    },
    loadAllSchedules(){
        return instance.get('schedule/getAllSchedules').then((response) => {
            return response.data
        })
    },
    addSchedule(schedule){
        return instance.post('schedule/addSchedule', schedule).then((response) => {
            return response.data
        })
    },
    updateSchedule(schedule){
        return instance.put('schedule/updateSchedule', schedule).then((response) => {
            return response.data
        })
    },
    removeSchedule(id){
        return instance.delete('schedule/removeSchedule?id='+id).then((response) => {
            return response.data
        })
    },
    removeScheduleDay(classId, day){
        return instance.delete('schedule/removeScheduleDay?classId='+classId+'&day='+day).then((response) => {
            return response.data
        })
    },

    updateClass(schoolClass){
        return instance.put('class/updateClass', schoolClass).then((response) => {
            return response.data
        })
    },
    removeClass(classId){
        return instance.delete('class/removeClass?id='+classId).then((response) => {
            return response.data
        })
    },
}

export const apiTeacher = {
    loadPersonalData(){
        return instance.get('teacher/getPersonalData').then((response) => {
            return response.data
        })
    },
    loadWorkerSchedule(){
        return instance.get('teacher/getSchedule').then((response) => {
            return response.data
        })
    },
    loadWorkerMarks(){
        return instance.get('teacher/getMarks').then((response) => {
            return response.data
        })
    },
    addMark(idlesson, idstudent, mark, idteacher){
        console.log(idteacher)
        return instance.post('teacher/AddMark', {idteacher, idlesson, idstudent, mark}).then((response) => {
            return response.data
        })
    },
    updateMark(markId, mark){
        return instance.put('teacher/UpdateMark?markId='+markId+'&mark='+mark).then((response) => {
            return response.data
        })
    },
    removeMark(markId){
        return instance.delete('teacher/DeleteMark?markId='+markId).then((response) => {
            return response.data
        })
    },
}

export const apiStudent = {
    loadStudentData(){
        return instance.get('student/getStudent').then((response) => {
            return response.data
        })
    },
    loadStudentSchedule(){
        return instance.get('schedule/getStudentSchedules').then((response) => {
            return response.data
        })
    },
    loadStudentMarks(){
        return instance.get('progress/getStudentMarks').then((response) => {
            return response.data
        })
    },
}

export const apiStatistic = {
    loadStat(){
        return instance.get('statistic/getStat').then((response) => {
            return response.data
        })
    },
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
