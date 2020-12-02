import React from "react";
import {compose} from "redux";
import {connect} from "react-redux";
import SchoolWorkers from "./SchoolWorkers";
import {changeCurrentPath, setNewNavBreadcrumbPath} from "../../../../../redux/breadcrumb-reducer";
import {remoteSubmit, resetForm} from "../../../../../redux/redux-form";
import {addNewWorker, loadSchoolWorkers, modifiedWorker, removeWorker} from "../../../../../redux/manager-reducer";

class SchoolWorkersContainer extends React.Component{
    componentDidMount() {
        this.props.loadSchoolWorkers()
    }

    SubmitWorker = (values) => {
        console.log(values)
        this.props.addNewWorker(values)
    }

    RemoveWorker = (index) => {
        this.props.removeWorker(index)
    }

    render() {
        return <SchoolWorkers {...this.props} onSubmitWorker={this.SubmitWorker} onRemoveWorker={this.RemoveWorker}/>
    }
}

export default compose(
    connect(
        state => ({
            schoolWorkersCount: state.manager.workersCount,
            data: state.manager.workers.sort()
        }),
        {
            setNewNavBreadcrumbPath, changeCurrentPath, remoteSubmit,
            addNewWorker, resetForm, modifiedWorker, loadSchoolWorkers,
            removeWorker
        }
    )
)(SchoolWorkersContainer)