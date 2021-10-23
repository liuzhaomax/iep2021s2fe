/****************************************************************************
 * @copyright   LIU Zhao
 * @authors     LIU Zhao (liuzhaomax@163.com)
 * @date        2021/7/27 22:45
 * @version     v1.0
 * @filename    MainLayout.jsx
 * @description
 ***************************************************************************/

import React from "react"
import "./MainLayout.css";
import MainNav from "./MainNav";
import Footer from "./Footer";

class MainLayout extends React.Component {

    componentDidMount() {
        // lztodo 请求数据
    }

    render() {
        let { component: Component } = this.props
        return (
            <div className="MainLayout">
                <MainNav/>
                <Component/>
                <Footer/>
            </div>
        )
    }
}

export default MainLayout

