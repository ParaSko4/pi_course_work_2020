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
import ClassContainer from "./components/Class/ClassContainer";
import {Loader} from "./components/commons/Loader";
import SettingContainer from "./components/Setting/SettingContainer";
import TeacherContainer from "./components/MainPanel/Teacher/TeacherContainer";
import StudentContainer from "./components/MainPanel/Student/StudentContainer";
import StatisticComponent from "./components/Statistic/StatisticContainer";

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
            return <Loader />
        }
        return (
            <Layout style={{ minHeight: '100vh' }}>
                {
                    this.props.isAuth && this.props.userRole === roles.FATHER_ROLE && <Sider
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
                        <NavFatherMenuContainer />
                    </Sider>
                }
                <Switch>
                    <Route exact path={navBarPath.Login} render={() => <LoginContainer/>}/>
                    <Route exact path={navBarPath.SchoolManager} render={() => <SchoolManagerContainer />}/>
                    <Route exact path={navBarPath.SchoolStat} render={() => <StatisticComponent/>}/>
                    <Route exact path={navBarPath.SchoolInfo} render={() => <SettingContainer />}/>
                    <Route exact path={navBarPath.ClassById} render={() => <ClassContainer />}/>

                    <Route exact path={navBarPath.TeacherPage} render={() => <TeacherContainer />}/>
                    <Route exact path={navBarPath.StudentPage} render={() => <StudentContainer />}/>


                    <Route exact path={'/'} render={() => {
                        if (!this.props.isAuth){
                            return <Redirect to={navBarPath.Login}/>
                        }
                        if(this.props.userRole === roles.FATHER_ROLE){
                            return <Redirect to={navBarPath.SchoolManager}/>
                        }
                        if(this.props.userRole === roles.TEACHER_ROLE){
                            return <Redirect to={navBarPath.TeacherPage}/>
                        }
                        if(this.props.userRole === roles.STUDENT_ROLE){
                            return <Redirect to={navBarPath.StudentPage}/>
                        }
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