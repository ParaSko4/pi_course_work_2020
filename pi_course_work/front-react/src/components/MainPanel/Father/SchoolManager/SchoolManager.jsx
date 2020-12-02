import React from "react";
import {Layout, Col, Row} from "antd";
import SchoolWorkersContainer from "./SchoolWorkers/SchoolWorkersContainer";
import ClassesContainer from "./Classes/ClassesContainer";

const {Content} = Layout;

const SchoolManager = () => {
    return <Layout style={{minHeight: '80vh'}}>
        <Layout style={{backgroundColor: "white"}}>
            <Content style={{backgroundColor: "white"}}>
                <Row gutter={[40, 0]}>
                    <Col flex="400px">
                        <SchoolWorkersContainer/>
                    </Col>
                    <Col flex="auto">
                        <ClassesContainer/>
                    </Col>
                </Row>
            </Content>
        </Layout>
    </Layout>
}

export default SchoolManager