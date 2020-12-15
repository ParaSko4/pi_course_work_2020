import {Menu} from "antd";
import {
    DesktopOutlined,
    FileOutlined,
    InfoOutlined,
    PieChartOutlined
} from "@ant-design/icons";
import React from "react";
import {NavLink} from "react-router-dom";
import {navBarPath} from "../../../resources/const-strings";

const NavFatherMenu = () => {
    return <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
        <Menu.Item key="1" icon={<DesktopOutlined/>}>
            <NavLink to={navBarPath.SchoolManager}>
                Manager
            </NavLink>
        </Menu.Item>
        <Menu.Item key="2" icon={<PieChartOutlined/>}>
            <NavLink to={navBarPath.SchoolStat}>
                Stats
            </NavLink>
        </Menu.Item>
        <Menu.Item key="3" icon={<InfoOutlined/>}>
            <NavLink to={navBarPath.SchoolInfo}>
                School params
            </NavLink>
        </Menu.Item>
    </Menu>
}

export default NavFatherMenu;