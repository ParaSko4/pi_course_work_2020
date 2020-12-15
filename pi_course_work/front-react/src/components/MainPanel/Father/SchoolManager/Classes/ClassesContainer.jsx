import React from "react";
import {compose} from "redux";
import {connect} from "react-redux";
import Classes from "./Classes";
import {remoteSubmit} from "../../../../../redux/redux-form";
import {addNewClass} from "../../../../../redux/manager-reducer";

class ClassesContainer extends React.Component{
    SubmitClass = values => {
        this.props.addNewClass(values)
    }

    render() {
        return <Classes {...this.props} onSubmitClass={this.SubmitClass}/>
    }
}

export default compose(
    connect(
        state => ({
            classesCount: state.manager.classesCount,
            classes: state.manager.classes,
            workers: state.manager.workers,
            workersWithoutClass: state.manager.workersWithoutClass
        }),
        {remoteSubmit, addNewClass}
    )
)(ClassesContainer)