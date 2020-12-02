import React from "react";
import {Breadcrumb} from "antd";


const BreadcrumbMainWindow = (props) => {
    let breadcrumbItems = props.paths.map(p => <Breadcrumb.Item key={p}>{p}</Breadcrumb.Item>)

    return <Breadcrumb style={{margin: '16px 0'}}>
        {breadcrumbItems}
        <Breadcrumb.Item>{ props.currentPath }</Breadcrumb.Item>
    </Breadcrumb>
}

export default BreadcrumbMainWindow