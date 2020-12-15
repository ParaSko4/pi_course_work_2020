import React, {useEffect} from "react";
import Student from "./Student";
import {compose} from "redux";
import {withAuthRedirect} from "../../../hoc/withAuthRedirect";
import {connect} from "react-redux";
import {withStudentRoleRedirect} from "../../../hoc/withStudentRoleRedirect";
import {Loader} from "../../commons/Loader";
import {startInitializingStudent} from "../../../redux/student-reducer";
import {exitFromApp} from "../../../redux/auth-reducer";

const StudentContainer = (props) => {
    useEffect(() => {
        props.startInitializingStudent()
    }, [])

    if (props.isInitialize){
        return <Student {...props}/>
    }
    return <Loader/>
}

export default compose(
    withAuthRedirect,
    withStudentRoleRedirect,
    connect(
        state => ({
            isInitialize: state.student.isInitialize,
            personalData: state.student.personalData,
            marks: state.student.marks,
            schedules: state.student.schedules,

            workers: state.manager.workers,
            lessons: state.settings.lessons,
            times: state.settings.times,
            auditoriums: state.settings.auditoriums,
            classes: state.manager.classes,
            students: state.class.students,
        }),
        {startInitializingStudent, exitFromApp}
    )
)(StudentContainer)