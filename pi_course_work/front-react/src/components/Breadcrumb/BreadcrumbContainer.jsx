import React from "react";
import {compose} from "redux";
import {connect} from "react-redux";
import BreadcrumbMainWindow from "./BreadcrumbMainWindow";

class BreadcrumbContainer extends React.Component{
    render() {
        return <BreadcrumbMainWindow {...this.props} />
    }
}

export default compose(
    connect(
        state => ({
            paths: state.breadcrumb.previous_navPath,
            currentPath: state.breadcrumb.current_navPath
        }),
        null
    )
)(BreadcrumbContainer)