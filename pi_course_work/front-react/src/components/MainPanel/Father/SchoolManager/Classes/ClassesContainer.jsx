import React from "react";
import {compose} from "redux";
import {connect} from "react-redux";
import Classes from "./Classes";
import {breadcrumbPaths} from "../../../../../resources/const-strings";
import {changeCurrentPath, setNewNavBreadcrumbPath} from "../../../../../redux/breadcrumb-reducer";

class ClassesContainer extends React.PureComponent{
    render() {
        return <Classes {...this.props} />
    }
}

export default compose(
    connect(
        state => ({
            classesCount: state.manager.classesCount
        }),
        {setNewNavBreadcrumbPath, changeCurrentPath}
    )
)(ClassesContainer)