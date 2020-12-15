import React from "react";
import {Card, Col, Row} from "antd";

const days = [
    { key: 1, tab: 'Monday'},
    { key: 2, tab: 'Tuesday'},
    { key: 3, tab: 'Wednesday'},
    { key: 4, tab: 'Thursday'},
    { key: 5, tab: 'Friday'},
    { key: 6, tab: 'Saturday'},
]

const Statistic = (props) => {
    return <div>
        <Row gutter={[12, 12]}>
            <Col span={6}>
                <Card title="Best Teacher" bordered style={{ width: 300, height: 150 }}>
                    {props.stat.bestWorker ? props.stat.bestWorker.fullName : null}
                </Card>
            </Col>
            <Col span={6}>
                <Card title="Worthless Teacher" bordered style={{ width: 300, height: 150 }}>
                    {props.stat.worthlessWorker ? props.stat.worthlessWorker.fullName : null}
                </Card>
            </Col>
            <Col span={6}>
                <Card title="Best Student" bordered style={{ width: 300, height: 150 }}>
                    {props.stat.bestStudent ? props.stat.bestStudent.fullName : null}
                </Card>
            </Col>
            <Col span={6}>
                <Card title="Worthless Student" bordered style={{ width: 300, height: 150 }}>
                    {props.stat.worthlessStudent ? props.stat.worthlessStudent.fullName : null}
                </Card>
            </Col>
        </Row>
        <Row gutter={[12, 12]}>
            <Col span={6}>
                <Card title="Best Class" bordered style={{ width: 300, height: 150 }}>
                    {props.stat.bestClass ? props.stat.bestClass.number + props.stat.bestClass.letter : null}
                </Card>
            </Col>
            <Col span={6}>
                <Card title="Worthless Class" bordered style={{ width: 300, height: 150 }}>
                    {props.stat.worthlessClass ? props.stat.worthlessClass.number + props.stat.worthlessClass.letter : null}
                </Card>
            </Col>
            <Col span={6}>
                <Card title="Easy Day" bordered style={{ width: 300, height: 150 }}>
                    {props.stat.bestDay ? days[props.stat.bestDay].tab : null}
                </Card>
            </Col>
            <Col span={6}>
                <Card title="Hard Day" bordered style={{ width: 300, height: 150 }}>
                    {props.stat.easyDay ? days[props.stat.easyDay].tab : null}
                </Card>
            </Col>
        </Row>
    </div>
}

export default Statistic