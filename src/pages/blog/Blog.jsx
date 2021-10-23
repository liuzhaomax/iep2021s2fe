/****************************************************************************
 * @copyright   LIU Zhao
 * @authors     LIU Zhao (liuzhaomax@163.com)
 * @date        2021/9/24 11:15
 * @version     v1.0
 * @filename    Blog.jsx
 * @description
 ***************************************************************************/

import React from "react"
import "./Blog.css"
import SubRoutes from "../blog/SubRouters";
import {VerticalAlignTopOutlined, DoubleRightOutlined} from "@ant-design/icons";
import {WEBSITE_1} from "../../config/constants";
import {withRouter} from "react-router-dom";

class Blog extends React.Component {
    constructor() {
        super();
        this.state = {
            getBlogList: undefined,
            mainHeight: 0,
        }
    }

    scrollToTop = () => {
        document.getElementById("Blog").scrollIntoView(true)
    }

    onClickLoadMore = () => {
        let limit = window.location.pathname.split("/").slice(-1)[0] ?
            window.location.pathname.split("/").slice(-1)[0]
            :
            window.location.pathname.split("/").slice(-2)[0]
        this.props.history.push(
            WEBSITE_1.MODULE_4.PATH + WEBSITE_1.MODULE_4.FUNCTION_1.PATH + "/" + (Number(limit) + 10)
        )
        setTimeout(() => {
            this.state.getBlogList()
            let loadMordBox = document.getElementById("blog-load-more-box")
            let height = document.getElementById("BlogMain").clientHeight
            if (this.state.mainHeight === height) {
                loadMordBox.style.display = "none"
            } else {
                this.setState({
                    mainHeight: height
                })
            }
        },1)
    }

    getLoadBlogList = (getBlogList) => {
        this.setState({
            getBlogList,
        })
    }

    render() {
        return (
            <div className="Blog" id="Blog">
                <div className="blog-banner blog-banner-title">
                    <h1>Blog</h1>
                    <h2>Find out more articles about endangered plants</h2>
                </div>
                <SubRoutes getLoadBlogList={this.getLoadBlogList}/>
                <div id="blog-load-more-box" onClick={this.onClickLoadMore}>
                    <DoubleRightOutlined id="blog-btn-load-more"/>
                </div>
                <VerticalAlignTopOutlined id="blog-btn-to-top" onClick={this.scrollToTop}/>
            </div>
        )
    }
}

export default withRouter(Blog)