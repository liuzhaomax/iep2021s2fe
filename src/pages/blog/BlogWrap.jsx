/****************************************************************************
 * @copyright   LIU Zhao
 * @authors     LIU Zhao (liuzhaomax@163.com)
 * @date        2021/9/25 12:19
 * @version     v1.0
 * @filename    BlogWrap.jsx
 * @description
 ***************************************************************************/

import React from "react"
import "./Blog.css"
import {WEBSITE_1} from "../../config/constants";

class BlogWrap extends React.Component {

    onClickBlog = () => {
        this.props.history.push(
            WEBSITE_1.MODULE_4.PATH + WEBSITE_1.MODULE_4.FUNCTION_2.PATH + "/" + this.props.data.blogId
        )
    }

    render() {
        return (
            <div className="blog-wrap" id="BlogWrap" onClick={this.onClickBlog}>
                {
                    this.props.data.blogPreviewImg ?
                        <img src={this.props.data.blogPreviewImg} alt="blog-img"/>
                        :
                        <React.Fragment/>
                }
                <h3>{this.props.data.blogTitle}</h3>
                <p>{this.props.data.blogPreview}</p>
                <div className="blog-wrap-widget">
                    <p>{this.props.data.blogCreateTime}</p>
                    <p>Views {this.props.data.blogView}</p>
                </div>
            </div>
        )
    }
}

export default BlogWrap