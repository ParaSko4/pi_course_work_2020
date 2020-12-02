import React from "react";
import {compose} from "redux";
import Login from "./Login";
import {connect} from "react-redux";
import {loginInApp, registrationInApp} from "../../redux/auth-reducer";
import {Redirect} from "react-router-dom";

class LoginContainer extends React.Component {
    SubmitLogin = (values) => {
        this.props.loginInApp(values.login, values.password)
    }

    SubmitRegistration = (values) => {
        this.props.registrationInApp(values.login, values.password, values.schoolName, values.location)
    }

    render() {
        return this.props.isAuth ? <Redirect to={'/'} /> :
            <Login onSubmitLogin={this.SubmitLogin} onSubmitRegistration={this.SubmitRegistration} />
    }
}

export default compose(
    connect(
        state => ({
            isAuth: state.auth.isAuth,
            role: state.auth.role
        }),
        {loginInApp, registrationInApp})
)(LoginContainer)