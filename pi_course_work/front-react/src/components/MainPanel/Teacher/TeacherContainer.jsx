import React, {useEffect} from "react";
import Teacher from "./Teacher";
import {compose} from "redux";
import {withAuthRedirect} from "../../../hoc/withAuthRedirect";
import {connect} from "react-redux";
import {withTeacherRoleRedirect} from "../../../hoc/withTeacherRoleRedirect";
import {Loader} from "../../commons/Loader";
import {addMark, removeMark, startInitializingTeacher, updateMark} from "../../../redux/teacher-reducer";
import {loadClassStudents} from "../../../redux/class-reducer";
import {exitFromApp} from "../../../redux/auth-reducer";

const TeacherContainer = (props) => {
    const LoadClassStudents = (classId) => {
        props.loadClassStudents(classId)
    }

    const AddMark = (lessonId, studentId, mark) => {
        props.addMark(lessonId, studentId, mark, props.worker.workerId)
    }

    const RemoveMark = (markId) => {
        props.removeMark(markId)
    }

    const UpdateMark = (markId, mark) => {
        props.updateMark(markId, mark)
    }

    useEffect(() => {
        props.startInitializingTeacher();
    }, [])

    if (props.isInitialize) {
        return <Teacher {...props} loadClassStudents={LoadClassStudents} AddMark={AddMark} RemoveMark={RemoveMark}
                        UpdateMark={UpdateMark}/>
    }
    return <Loader/>
}

export default compose(
    withAuthRedirect,
    withTeacherRoleRedirect,
    connect(
        state => ({
            isInitialize: state.teacher.isInitialize,
            worker: state.teacher.personalData,
            marks: state.teacher.marks,
            schedules: state.teacher.schedules,
            lessons: state.settings.lessons,
            times: state.settings.times,
            auditoriums: state.settings.auditoriums,
            classes: state.manager.classes,
            students: state.class.students,
        }),
        {startInitializingTeacher, loadClassStudents, addMark, updateMark, removeMark, exitFromApp}
    )
)(TeacherContainer)