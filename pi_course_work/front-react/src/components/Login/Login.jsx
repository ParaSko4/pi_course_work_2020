import React, {useState} from "react";
import {Field, reduxForm} from 'redux-form';
import 'antd/dist/antd.css';
import {Divider, Col, Button, Form, Row, Layout} from 'antd';
import {TextField} from "redux-form-antd";
import {requiredMes} from "../../utils/validators/common-validations";
import styles from "../../AppComponent.module.css";

const { Content, Footer } = Layout;

let required = requiredMes('Require filed')

const LoginForm = (props) => {
    return <form onSubmit={props.handleSubmit}>
        <Field
            label="Login" name="login"
            component={TextField}
            validate={[required]}
            placeholder="enter your login"
        />
        <Field
            label="Password" name="password"
            component={TextField}
            validate={[required]}
            placeholder="password"
            type={'Password'}
        />

        <Button type="primary" htmlType="submit">
            Submit
        </Button>
        <Button style={{margin: '0 0 0 10px'}} type="primary" onClick={() => props.setReg(true)}>
            Registration
        </Button>
    </form>
}

const RegistrationForm = (props) => {
    return <form onSubmit={props.handleSubmit}>
        <Field
            label="Login: " name="login"
            component={TextField}
            validate={[required]}
            placeholder="enter your login"
        />
        <Field
            label="Password: " name="password"
            component={TextField}
            validate={[required]}
            placeholder="password"
            type={'Password'}
        />

        <Field
            label="School Name: " name="schoolName"
            component={TextField}
            validate={[required]}
            placeholder="School of React"
        />

        <Field
            label="Location: " name="location"
            component={TextField}
            validate={[required]}
            placeholder='ul. Kosmonavtov'
        />

        <Button type="primary" htmlType="submit">
            Register you school!
        </Button>
        <Button style={{margin: '0 0 0 20px'}} type="primary" onClick={() => props.setReg(false)}>
            Back
        </Button>
    </form>
}

const LoginReduxForm = reduxForm({form: 'login'})(LoginForm)
const RegistrationReduxForm = reduxForm({form: 'registration'})(RegistrationForm)

const Login = (props) => {
    let [isReg, setReg] = useState(false)

    const regSubmit = (values) => {
        setReg(false)
        props.onSubmitRegistration(values)
    }

    return <Layout className={styles.siteLayout}>
        <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
            {/*<BreadcrumbContainer />*/}
            <div className={styles.siteLayoutBackground} style={{padding: 24, minHeight: '80vh'}}>
                {
                    !isReg && <>
                        <Divider>Login in app</Divider>
                        <div style={{
                            width: '300px',
                            margin: 'auto'
                        }}>
                            <LoginReduxForm onSubmit={props.onSubmitLogin} setReg={setReg}/>
                        </div>
                    </> ||
                    <>
                        <Divider>Registration in app</Divider>
                        <div style={{
                            width: '360px',
                            margin: 'auto'
                        }}>
                            {console.log(props)}
                            <RegistrationReduxForm onSubmit={regSubmit} setReg={setReg}/>
                        </div>
                    </>
                }
            </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Course Work ©2020 Created by Hlob</Footer>
    </Layout>
}

export default Login