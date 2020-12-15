import React from "react";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {Layout} from "antd";
import styles from "../AppComponent.module.css";
import {roles} from "../resources/const-strings";

const {Content, Footer} = Layout;

export const withAuthRedirect = (Component) => {
    class RedirectComponent extends React.Component {
        render() {
            if (!this.props.isAuth) {
                return <Redirect to='/login'/>
            }

            return <Layout className={styles.siteLayout}
                           style={this.props.userRole === roles.FATHER_ROLE ? {marginLeft: 200} : null}>
                <Content style={{margin: '24px 16px 0', overflow: 'initial'}}>
                    {/*<BreadcrumbContainer />*/}
                    <div className={styles.siteLayoutBackground} style={{padding: 24, minHeight: 360}}>
                        <Component {...this.props} />
                    </div>
                </Content>
                <Footer style={{textAlign: 'center'}}>Course Work ©2020 Created by Hlob</Footer>
            </Layout>
        }
    }

    return connect((state) => ({
            isAuth: state.auth.isAuth,
            userRole: state.auth.user.role
        }),
        null)
    (RedirectComponent)
}