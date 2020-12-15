import React from "react";
import {compose} from "redux";
import {connect} from "react-redux";
import Class from "./Class";
import {withRouter} from "react-router";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {withFatherRoleRedirect} from "../../hoc/withFatherRoleRedirect";
import {Loader} from "../commons/Loader";
import {startInitializingClass} from "../../redux/class-reducer";

class ClassContainer extends React.Component {
    componentDidMount() {
        this.props.startInitializingClass(this.props.match.params.classId)
    }

    render(){
        if (!this.props.isInitialize) return <Loader />
        return <Class {...this.props}/>
    }
}

export default compose(
    withRouter,
    withAuthRedirect,
    withFatherRoleRedirect,
    connect(
        state => ({
            isInitialize: state.class.isInitializing,
            schoolClass: state.class.schoolClass
        }),
        {startInitializingClass}
    )
)(ClassContainer)