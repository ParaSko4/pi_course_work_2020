import React, {useEffect} from "react";
import Statistic from "./Statistic";
import {compose} from "redux";
import {connect} from "react-redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {withFatherRoleRedirect} from "../../hoc/withFatherRoleRedirect";
import {Layout} from "antd";
import {startInitializingStat} from "../../redux/statistic-reducer";
import {Loader} from "../commons/Loader";

const {Content} = Layout;

const StatisticComponent = (props) => {
    useEffect(() => {
        props.startInitializingStat()
    }, [])
    if (props.isInitialize){
        return <Layout style={{minHeight: '70vh'}}>
            <Layout style={{backgroundColor: "white"}}>
                <Content style={{backgroundColor: "white"}}>
                    <Statistic {...props}/>
                </Content>
            </Layout>
        </Layout>
    }
    return <Loader/>
}

export default compose(
    withAuthRedirect,
    withFatherRoleRedirect,
    connect(
        state => ({
            isInitialize: state.stat.isInitialize,
            stat: state.stat.stat,
        }),
        {startInitializingStat}
    )
)(StatisticComponent)