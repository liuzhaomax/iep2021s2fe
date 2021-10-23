/****************************************************************************
 * @copyright   LIU Zhao
 * @authors     LIU Zhao (liuzhaomax@163.com)
 * @date        2021/8/21 9:25
 * @version     v1.0
 * @filename    MainNav.jsx
 * @description
 ***************************************************************************/

import React from "react"
import "./MainNav.css"
import {withRouter} from "react-router-dom";
import {Menu} from "antd";
import { MenuOutlined } from '@ant-design/icons';
import {WEBSITE_1} from "../config/constants";

class MainNav extends React.Component {
    constructor() {
        super();
        this.state = {
            current: "1",
            menu: null,
        }
    }

    async componentDidMount() {
        await this.setState({current: this.searchKey()})
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
                    <Menu id="main-nav-menu" className="menu"
                          onClick={this.toggleNav}
                          selectedKeys={[this.state.current]}
                          mode={"horizontal"}
                          key="nav-menu-without-sub"
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
                    <Menu id="main-nav-menu" className="menu"
                          onClick={this.toggleNav}
                          selectedKeys={[this.state.current]}
                          mode={"horizontal"}
                          key="nav-menu-with-sub"
                    >
                        <Menu.SubMenu key="SubMenu" icon={<MenuOutlined className="submenu-icon"/>}>
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
        let plantHub = document.getElementById("PlantHub")
        let statHub = document.getElementById("StatHub")
        let getInvolved = document.getElementById("GetInvolved")
        let blog = document.getElementById("Blog")
        let about = document.getElementById("About")
        if (plantHub) {
            plantHub.scrollIntoView(true)
        } else if (statHub) {
            statHub.scrollIntoView(true)
        } else if (getInvolved) {
            getInvolved.scrollIntoView(true)
        } else if (blog) {
            blog.scrollIntoView(true)
        } else if (about) {
            about.scrollIntoView(true)
        }
    }

    searchKey = () => {
        let result
        let recordPath
        let realPath
        for (const key in WEBSITE_1) {
            if (WEBSITE_1[key] instanceof Object) {
                recordPath = WEBSITE_1[key].PATH.split("/")[1]
                realPath = window.location.pathname.split("/")[1]
                if (recordPath === realPath) {
                    result = key
                    break
                }
            }
        }
        return result.slice(-1)
    }

    jumpToPath = path => {
        this.props.history.push(path)
    }

    toggleNav = e => {
        this.setState({ current: e.key })
        this.state.menu.props.selectedKeys[0] = e.key  // actual working codes
        let path
        if (e.key === "0") {
            this.jumpToPath("/home")
        } else {
            path = WEBSITE_1["MODULE_" + e.key].PATH
            this.jumpToPath(path)
        }
        this.scrollToTop()
    }

    render() {
        return (
            <div className="MainNav">
                <div id="main-nav-logo" className="logo" onClick={this.jumpToPath.bind(this, "/home")}/>
                {this.state.menu}
            </div>
        )
    }
}

export default withRouter(MainNav)