import {Avatar, Button, Col, List, Row} from "antd";
import {NavLink} from "react-router-dom";
import {navBarPath} from "../../resources/const-strings";
import {PlusSquareOutlined, UserOutlined} from "@ant-design/icons";
import React from "react";

const EmptyList = (props) => {
    return <div>
        <List bordered header={
            <Row align={'middle'}>
                <Col span={12}>
                    School Workers
                </Col>
                <Col span={12} align={'end'}>
                    <NavLink to={navBarPath.addNewWorker}>
                        <Button type="primary" shape="circle" icon={<PlusSquareOutlined/>} size='large'
                                onClick={props.setActionState}/>
                    </NavLink>
                </Col>
            </Row>
        }/>
    </div>
}

export const WorkersList = (props) => {
    if (props.schoolWorkersCount === 0) return <EmptyList setActionState={props.setActionState}/>

    return <List
        bordered
        size="large"
        pagination={{
            pageSize: 6,
        }}
        header={
            <Row align={'middle'}>
                <Col span={12}>
                    School Workers
                </Col>
                <Col span={12} align={'end'}>
                    <NavLink to={navBarPath.addNewWorker}>
                        <Button type="primary" shape="circle" icon={<PlusSquareOutlined/>} size='large'
                                onClick={props.setActionState}/>
                    </NavLink>
                </Col>
            </Row>
        }
        itemLayout="horizontal"
        dataSource={props.data}
        renderItem={item => (
            <List.Item>
                <NavLink to={''}>
                    <List.Item.Meta
                        avatar={
                            <Avatar size={'large'} icon={<UserOutlined/>}/>
                        }
                        title={<div>{item.name}</div>}
                        // description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                    />
                </NavLink>
            </List.Item>
        )}
    />
}