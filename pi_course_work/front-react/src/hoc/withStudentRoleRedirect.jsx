import React from "react";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {roles} from "../resources/const-strings";

export const withStudentRoleRedirect = (Component) => {
    class RedirectComponent extends React.Component{
        render() {
            if (this.props.role !== roles.STUDENT_ROLE){
                return <Redirect to='/'/>
            }
            return <Component {...this.props} />
        }
    }

    return connect(
        state => ({
            role: state.auth.user.role
        }),
        null)
    (RedirectComponent)
}