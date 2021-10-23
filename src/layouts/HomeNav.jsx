/****************************************************************************
 * @copyright   LIU Zhao
 * @authors     LIU Zhao (liuzhaomax@163.com)
 * @date        2021/8/6 0:16
 * @version     v1.0
 * @filename    HomeNav.jsx
 * @description
 ***************************************************************************/

import React from "react"
import { Menu } from 'antd';
import {withRouter} from "react-router-dom";
import "./HomeNav.css"
import {WEBSITE_1} from "../config/constants";
import {MenuOutlined} from "@ant-design/icons";

class HomeNav extends React.Component {
    constructor() {
        super();
        this.state = {
            current: "0",
            menu: null,
        }
    }

    async componentDidMount() {
        let nav = document.getElementById("home-nav")
        await window.addEventListener("scroll", () => {
            let value = window.scrollY
            if (value >= 710) {
                nav.style.backgroundColor = "#333"
                nav.style.height = "50px"
            } else {
                nav.style.backgroundColor = "rgba(0,0,0,0)"
                nav.style.height = "100px"
            }
        })
        await this.scrollToTop()
        await this.menuHandler()
        await this.listenWindowSize()
    }

    listenWindowSize = () => {
        window.addEventListener("resize", this.menuHandler.bind(this))
    }

    menuHandler = () => {
        if (document.body.clientWidth >= 1020) {
            this.setState({
                menu: (
                    <Menu id="home-nav-menu" className="menu"
                          onClick={this.toggleNav}
                          selectedKeys={[this.state.current]}
                          mode={"horizontal"}
                          key="home-nav-menu-without-sub"
                    >
                        <Menu.Item className="menu-item" key="0"> Home </Menu.Item>
                        <Menu.Item className="menu-item" key="1"> {WEBSITE_1.MODULE_1.NAME} </Menu.Item>
                        <Menu.Item className="menu-item" key="2"> {WEBSITE_1.MODULE_2.NAME} </Menu.Item>
                        <Menu.Item className="menu-item" key="3"> {WEBSITE_1.MODULE_3.NAME} </Menu.Item>
                        <Menu.Item className="menu-item" key="4"> {WEBSITE_1.MODULE_4.NAME} </Menu.Item>
                        <Menu.Item className="menu-item" key="5"> {WEBSITE_1.MODULE_5.NAME} </Menu.Item>
                    </Menu>
                )
            })
        } else {
            this.setState({
                menu: (
                    <Menu id="home-nav-menu" className="menu"
                          onClick={this.toggleNav}
                          selectedKeys={[this.state.current]}
                          mode={"horizontal"}
                          key="home-nav-menu-with-sub"
                    >
                        <Menu.SubMenu id="home-submenu" key="SubMenu" icon={<MenuOutlined className="submenu-icon"/>}>
                            <Menu.Item className="menu-item" key="0"> Home </Menu.Item>
                            <Menu.Item className="menu-item" key="1"> {WEBSITE_1.MODULE_1.NAME} </Menu.Item>
                            <Menu.Item className="menu-item" key="2"> {WEBSITE_1.MODULE_2.NAME} </Menu.Item>
                            <Menu.Item className="menu-item" key="3"> {WEBSITE_1.MODULE_3.NAME} </Menu.Item>
                            <Menu.Item className="menu-item" key="4"> {WEBSITE_1.MODULE_4.NAME} </Menu.Item>
                            <Menu.Item className="menu-item" key="5"> {WEBSITE_1.MODULE_5.NAME} </Menu.Item>
                        </Menu.SubMenu>
                    </Menu>
                )
            })
        }
    }

    scrollToTop = () => {
        document.getElementById("parallax-compo").scrollIntoView(true)
    }

    jumpToPath = path => {
        this.props.history.push(path)
    }

    toggleNav = e => {
        this.setState({ current: e.key })
        let path
        if (e.key === "0") {
            this.scrollToTop()
        } else {
            path = WEBSITE_1["MODULE_" + e.key].PATH
            this.jumpToPath(path)
        }
    }

    render() {
        return (
            <div id="home-nav" className="HomeNav">
                <div id="home-nav-logo" className="logo" onClick={this.jumpToPath.bind(this, "/home")}/>
                {this.state.menu}
            </div>
        )
    }
}

export default withRouter(HomeNav)