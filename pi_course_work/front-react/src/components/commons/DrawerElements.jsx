import React from "react";
import {Col, Row, Typography} from "antd";

const {Paragraph} = Typography;

export const DescriptionItem = ({title, content, onChangeMethod}) => (
    <Row>
        <Col span={8}>
            <div style={{textAlign: 'right'}}>
                {title} :
            </div>
        </Col>
        <Col span={16}>
            <div style={{textAlign: 'center', margin: '0 0 0 20px'}}>
                <Paragraph editable={{onChange: (value) => onChangeMethod({type: title, value})}}>{content}</Paragraph>
            </div>
        </Col>
    </Row>
);
export const SmallDescriptionItem = ({title, content, onChangeMethod}) => (
    <Row>
        <Col span={4}>
            <div style={{textAlign: 'right'}}>
                {title} :
            </div>
        </Col>
        <Col span={20}>
            <div style={{textAlign: 'center', margin: '0 0 0 20px'}}>
                <Paragraph editable={{onChange: (value) => onChangeMethod({type: title, value})}}>{content}</Paragraph>
            </div>
        </Col>
    </Row>
);

export const RowDrawer = ({title1, title2, content1, content2, onChangeMethod}) => (
    <Row>
        <Col span={12}>
            <DescriptionItem title={title1} content={content1} onChangeMethod={onChangeMethod}/>
        </Col>
        <Col span={12}>
            <DescriptionItem title={title2} content={content2} onChangeMethod={onChangeMethod}/>
        </Col>
    </Row>
)
export const TwoRowDrawer = ({title1, title2, content1, content2, onChangeMethod}) => (
    <div style={{margin: '10% 0 10% 0 ', height: '10%', width: '100%'}}>
        <SmallDescriptionItem title={title1} content={content1} onChangeMethod={onChangeMethod}/>
        <SmallDescriptionItem title={title2} content={content2} onChangeMethod={onChangeMethod}/>
    </div>
)
export const SoloRowDrawer = ({title, content, onChangeMethod}) => (
    <div style={{margin: '10% 0 10% 0 ', height: '10%', width: '100%'}}>
        <DescriptionItem title={title} content={content} onChangeMethod={onChangeMethod}/>
    </div>
)