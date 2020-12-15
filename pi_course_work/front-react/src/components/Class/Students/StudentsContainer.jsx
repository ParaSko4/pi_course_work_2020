import React from "react";
import {compose} from "redux";
import {connect} from "react-redux";
import Students from "./Students";
import {remoteSubmit} from "../../../redux/redux-form";
import {addStudent, removeStudent, updateStudent} from "../../../redux/class-reducer";

class StudentsContainer extends React.Component {
    StudentSubmit = (student) => {
        this.props.addStudent(student)
    }

    StudentChangesSubmit = (student) => {
        this.props.updateStudent(student, this.props.schoolClass.id)
    }

    SubmitStudentRemoving = (studentId) => {
        this.props.removeStudent(studentId, this.props.schoolClass.id)
    }

    render() {
        return <Students {...this.props}
                         onSubmitStudent={this.StudentSubmit}
                         onSubmitStudentRemoving={this.SubmitStudentRemoving}
                         onStudentChangesSubmit={this.StudentChangesSubmit}
        />
    }
}

export default compose(
    connect(
        state => ({
            studentsCount: state.class.studentsCount,
            students: state.class.students,
            schoolClass: state.class.schoolClass
        }),
        {remoteSubmit, addStudent, removeStudent, updateStudent}
    )
)(StudentsContainer)