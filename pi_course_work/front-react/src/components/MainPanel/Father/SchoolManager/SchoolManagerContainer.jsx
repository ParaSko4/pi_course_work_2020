import React from "react";
import {compose} from "redux";
import {connect} from "react-redux";
import SchoolManager from "./SchoolManager";
import {setNewBreadcrumbStartPath, setNewNavBreadcrumbPath} from "../../../../redux/breadcrumb-reducer";
import {withAuthRedirect} from "../../../../hoc/withAuthRedirect";
import {withFatherRoleRedirect} from "../../../../hoc/withFatherRoleRedirect";
import {startInitializingManager} from "../../../../redux/manager-reducer";
import {Loader} from "../../../commons/Loader";

class SchoolManagerContainer extends React.Component{
    componentDidMount() {
        this.props.startInitializingManager()
    }

    render() {
        if (!this.props.isInitialize) return <Loader />
        return <SchoolManager {...this.props} />
    }
}

export default compose(
    withAuthRedirect,
    withFatherRoleRedirect,
    connect(
        state => ({
            isInitialize: state.manager.isInitializing
        }),
        {setNewBreadcrumbStartPath, setNewNavBreadcrumbPath, startInitializingManager}
    )
)(SchoolManagerContainer)