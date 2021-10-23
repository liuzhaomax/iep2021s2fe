/****************************************************************************
 * @copyright   LIU Zhao
 * @authors     LIU Zhao (liuzhaomax@163.com)
 * @date        2021/9/25 14:33
 * @version     v1.0
 * @filename    SubRouters.jsx
 * @description
 ***************************************************************************/

import React from "react"
import {Redirect, Route, Switch} from "react-router-dom";
import {WEBSITE_1} from "../../config/constants";
import BlogMain from "./BlogMain";
import BlogArticle from "./BlogArticle";

const modulePath = WEBSITE_1.MODULE_4.PATH

class SubRouters extends React.Component {
    render() {
        return (
            <Switch>
                <Redirect from={modulePath} to={modulePath + WEBSITE_1.MODULE_4.FUNCTION_1.PATH + "/10"} exact/>
                <Route path={modulePath + WEBSITE_1.MODULE_4.FUNCTION_1.PATH + "/:limit"}
                       render={(props) => ( <BlogMain {...props} getLoadBlogList={this.props.getLoadBlogList}/> )} exact/>
                <Route path={modulePath + WEBSITE_1.MODULE_4.FUNCTION_2.PATH + "/:blogid"}
                       render={(props) => ( <BlogArticle {...props} /> )} exact/>
            </Switch>
        )
    }
}

export default SubRouters