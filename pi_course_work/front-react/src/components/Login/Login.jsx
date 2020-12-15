import React, {useState} from "react";
import {Field, reduxForm} from 'redux-form';
import 'antd/dist/antd.css';
import {Divider, Button, Layout} from 'antd';
import {TextField} from "redux-form-antd";
import {requiredMes} from "../../utils/validators/common-validations";
import styles from "../../AppComponent.module.css";

const { Content, Footer } = Layout;

let required = requiredMes('Require filed')

const formItemLayout = {
    labelCol: {span: 6},
    wrapperCol: {span: 14},
};

const LoginForm = (props) => {
    return <form onSubmit={props.handleSubmit}>
        <Field {...formItemLayout}
            label="Login" name="login"
            component={TextField}
            validate={[required]}
            placeholder="enter your login"
        />
        <Field {...formItemLayout}
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
            Cancel
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
        <Content style={{ margin: '24px 16px 0 0', overflow: 'initial' }}>
            <div className={styles.siteLayoutBackground}
                 style={{padding: 24, minHeight: '80vh', textAlign:'center'}}>
                {
                    !isReg && <>
                        <Divider>Login in app</Divider>
                        <div style={{
                            width: '20%',
                            margin: '10% 0 0 40%'
                        }}>
                            <LoginReduxForm onSubmit={props.onSubmitLogin} setReg={setReg}/>
                        </div>
                    </> ||
                    <>
                        <Divider>Registration in app</Divider>
                        <div style={{
                            width: '360px',
                            margin: '7% 0 0 38%'
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