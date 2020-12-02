import React from "react";
import {compose} from "redux";
import {connect} from "react-redux";
import SchoolManager from "./SchoolManager";
import {setNewBreadcrumbStartPath, setNewNavBreadcrumbPath} from "../../../../redux/breadcrumb-reducer";
import {withAuthRedirect} from "../../../../hoc/withAuthRedirect";
import {withFatherRoleRedirect} from "../../../../hoc/withFatherRoleRedirect";

class SchoolManagerContainer extends React.Component{
    render() {
        return <SchoolManager {...this.props} />
    }
}

export default compose(
    withAuthRedirect,
    withFatherRoleRedirect,
    connect(
        null,
        {setNewBreadcrumbStartPath, setNewNavBreadcrumbPath}
    )
)(SchoolManagerContainer)