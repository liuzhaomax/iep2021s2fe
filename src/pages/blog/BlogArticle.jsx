/****************************************************************************
 * @copyright   LIU Zhao
 * @authors     LIU Zhao (liuzhaomax@163.com)
 * @date        2021/9/25 14:22
 * @version     v1.0
 * @filename    BlogArticle.jsx
 * @description
 ***************************************************************************/

import React from "react"
import "./BlogArticle.css"
import {WEBSITE_1} from "../../config/constants";
import {ClockCircleOutlined} from "@ant-design/icons";
import {bindActionCreators} from "redux";
import * as blogActions from "../../state/actions/blogActions";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import BlogArticleContent from "./BlogArticleContent";

class BlogArticle extends React.Component {
    constructor() {
        super();
        this.state = {
            data: {
                blogId: 0,
                blogTitle: "",
                blogAuthor: "",
                blogView: 0,
                blogCreateTime: "",
                blogReference: "",
                blogLink: "",
                blogContent: [],
            }
        }
    }

    componentDidMount() {
        this.getBlog()
        window.onload = () => {
            this.jumpToAnchor("Blog")
        }
    }

    getBlog = () => {
        let blogId = this.props.location.pathname.split("/").slice(-1)[0] ?
            this.props.location.pathname.split("/").slice(-1)[0]
            :
            this.props.location.pathname.split("/").slice(-2)[0]
        const getReqBlogObj = this.props.blogActions.getReqBlog(
            WEBSITE_1.MODULE_4.PATH + WEBSITE_1.MODULE_4.FUNCTION_2.PATH + "/" + blogId
        )
        getReqBlogObj.promise
            .then(res => {
                this.setState({
                    data: {
                        blogId: res.data.blogId,
                        blogTitle: res.data.blogTitle,
                        blogAuthor: "by " + res.data.blogAuthor,
                        blogView: res.data.blogView,
                        blogCreateTime: this.transformDate(res.data.blogCreateTime),
                        blogReference: res.data.blogReference,
                        blogLink: res.data.blogLink,
                        blogContent: JSON.parse(res.data.blogContent),
                    }
                })
            })
            .catch(err => {
                console.log(err)
            })
    }

    jumpToAnchor = id => {
        setTimeout(() => {
            document.getElementById(id).scrollIntoView(true)
        }, 1)
    }

    transformDate = dateStd => {
        let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
        let date = new Date(dateStd)
        let datee = date.getDate()
        let month = months[date.getMonth()]
        let year = date.getFullYear()
        let hours = date.getHours()
        let minutes = date.getMinutes()
        return `${datee} ${month} ${year} ${hours}:${minutes}`
    }

    render() {
        return (
            <div className="BlogArticle" id="BlogArticle">
                <div className="blog-row-wrap blog-article-widget">
                    <p><ClockCircleOutlined /> {this.state.data.blogCreateTime}</p>
                    <p>Views {this.state.data.blogView}</p>
                </div>
                <h1 className="blog-row-wrap">{this.state.data.blogTitle}</h1>
                <h4 className="blog-row-wrap" style={{color:"#9092BA"}}>{this.state.data.blogAuthor}</h4>
                <div className="blog-row-wrap" id="blog-article-content">
                    {
                        this.state.data.blogContent.length ?
                            <BlogArticleContent content={this.state.data.blogContent}/>
                            :
                            <React.Fragment/>
                    }
                </div>
                <hr/>
                <h4 className="blog-row-wrap">Reference:</h4>
                <p className="blog-row-wrap">{this.state.data.blogReference}</p>
                <h4 className="blog-row-wrap">Original Article Link:</h4>
                <a className="blog-row-wrap" href={this.state.data.blogLink}>
                    {this.state.data.blogLink}
                </a>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        blogActions: bindActionCreators(blogActions, dispatch),
    }
}

export default withRouter(connect(null, mapDispatchToProps)(BlogArticle))