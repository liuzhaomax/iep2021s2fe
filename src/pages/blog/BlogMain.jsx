/****************************************************************************
 * @copyright   LIU Zhao
 * @authors     LIU Zhao (liuzhaomax@163.com)
 * @date        2021/9/24 11:42
 * @version     v1.0
 * @filename    BlogMain.jsx
 * @description
 ***************************************************************************/

import React from "react"
import ReactDOM from "react-dom"
import "./Blog.css"
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as blogActions from "../../state/actions/blogActions"
import {WEBSITE_1} from "../../config/constants";
import BlogWrap from "./BlogWrap";

class BlogMain extends React.Component {
    constructor() {
        super();
        this.state = {
            data: undefined,
        }
    }

    componentDidMount() {
        this.getBlogList()
        this.props.getLoadBlogList(this.getBlogList)
        window.onload = () => {
            this.jumpToAnchor("Blog")
        }
        let loadMordBox = document.getElementById("blog-load-more-box")
        loadMordBox.style.display = "flex"
    }

    componentWillUnmount() {
        let loadMordBox = document.getElementById("blog-load-more-box")
        loadMordBox.style.display = "none"
    }

    getBlogList = () => {
        let limit = this.props.location.pathname.split("/").slice(-1)[0] ?
            this.props.location.pathname.split("/").slice(-1)[0]
            :
            this.props.location.pathname.split("/").slice(-2)[0]
        const getBlogListReqObj = this.props.blogActions.getReqBlogList(
            WEBSITE_1.MODULE_4.PATH + WEBSITE_1.MODULE_4.FUNCTION_1.PATH + "/" + limit
        )
        this.setState({
            getBlogListReqObj,
        })
        getBlogListReqObj.promise
            .then(res => {
                let listData = []
                for (let i = 0; i < res.data.length; i++) {
                    listData.push({
                        blogId: res.data[i].blogId,
                        blogTitle: res.data[i].blogTitle,
                        // blogAuthor: "by " + res.data[i].blogAuthor,
                        blogPreview: res.data[i].blogPreview,
                        blogPreviewImg: res.data[i].blogPreviewImg,
                        blogView: res.data[i].blogView,
                        blogCreateTime: this.transformDate(res.data[i].blogCreateTime),
                        // blogUpdateTime: this.transformDate(res.data[i].blogUpdateTime),
                    })
                }
                this.setState({data: listData})
                this.createBlogWrap()
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

    createBlogWrap = () => {
        let container = document.getElementById("BlogMain")
        let dataList = this.state.data
        dataList = dataList.map((value) => {
            return <BlogWrap data={value} key={value.blogId} history={this.props.history}/>
        })
        ReactDOM.render(dataList, container)
    }

    render() {
        return (
            <div className="BlogMain" id="BlogMain"/>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        blogActions: bindActionCreators(blogActions, dispatch),
    }
}

export default withRouter(connect(null, mapDispatchToProps)(BlogMain))