import React from 'react';
import './App.css';
import {Redirect, Switch, Route} from 'react-router-dom';
import LoginContainer from "./components/Login/LoginContainer";
import {connect} from "react-redux";
import {startInitializingApp} from "./redux/app-reducer";
import {Avatar, Dropdown, Layout, Menu, Spin} from "antd";
import styles from "./AppComponent.module.css";
import {navBarPath, roles} from "./resources/const-strings";
import NavFatherMenuContainer from "./components/MainPanel/Father/NavFatherMenuContainer";
import SchoolManagerContainer from "./components/MainPanel/Father/SchoolManager/SchoolManagerContainer";
import {exitFromApp} from "./redux/auth-reducer";

const { Sider } = Layout;

class App extends React.Component {
    componentDidMount() {
        this.props.startInitializingApp()
    }

    menu = () => {
        return <Menu>
            <Menu.Item onClick={this.props.exitFromApp}>
                Logout
            </Menu.Item>
        </Menu>
    }

    render() {
        if (!this.props.isInitializing){
            return <div className={styles.parentLoaderDiv}>
                <Spin size="large" />
            </div>
        }
        return (
            <Layout style={{ minHeight: '100vh' }}>
                {
                    this.props.isAuth && <Sider
                        style={{
                            overflow: 'auto',
                            height: '100vh',
                            position: 'fixed',
                            left: 0,
                        }}
                    >
                        <div className={styles.profileAvatar} >
                            <Dropdown overlay={this.menu} placement="bottomRight" arrow>
                                <Avatar style={{backgroundColor: '#f56a00', verticalAlign: 'middle'}} size="large" gap={3}>
                                    {this.props.username}
                                </Avatar>
                            </Dropdown>
                        </div>
                        {this.props.userRole === roles.FATHER_ROLE && <NavFatherMenuContainer />}
                    </Sider>
                }
                <Switch>
                    <Route path='/login' render={() => <LoginContainer/>}/>
                    <Route path={navBarPath.SchoolManager} render={() => <SchoolManagerContainer />}/>
                    <Route path={navBarPath.SchoolStat} render={() => 'SchoolStat'}/>
                    <Route path={navBarPath.SchoolInfo} render={() => 'SchoolInfo'}/>
                    <Route path={'/'} render={() => {
                        if(this.props.userRole === roles.FATHER_ROLE){
                            return <Redirect to={navBarPath.SchoolManager}/>
                        }
                        // if(this.props.userRole === roles.TEACHER_ROLE){
                        //     return <Redirect to={navBarPath.SchoolManager}/>
                        // }
                        // if(this.props.userRole === roles.STUDENT_ROLE){
                        //     return <Redirect to={navBarPath.SchoolManager}/>
                        // }
                    }}/>
                </Switch>
            </Layout>
        );
    }
}

export default connect(
    state => ({
        isInitializing: state.app.isInitializing,
        userRole: state.auth.user.role,
        username: state.auth.user.name,
        isAuth: state.auth.isAuth
    }),
    {startInitializingApp, exitFromApp})(App);