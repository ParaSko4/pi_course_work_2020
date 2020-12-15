import React from "react";
import {Col, Layout, Row} from "antd";
import StudentsContainer from "./Students/StudentsContainer";
import ClassInfoContainer from "./ClassInfo/ClassInfoContainer";

const {Content} = Layout;

const Class = (props) => {
    return <Layout style={{minHeight: '70vh'}}>
        <Layout style={{backgroundColor: "white"}}>
            <Content style={{backgroundColor: "white"}}>
                <Row gutter={[40, 0]}>
                    <Col flex="auto">
                        <ClassInfoContainer/>
                    </Col>
                    <Col flex="8vw">
                        <StudentsContainer/>
                    </Col>
                </Row>
            </Content>
        </Layout>
    </Layout>
}

export default Class