/****************************************************************************
 * @copyright   LIU Zhao
 * @authors     LIU Zhao (liuzhaomax@163.com)
 * @date        2021/9/24 23:07
 * @version     v1.0
 * @filename    blogActions.js
 * @description
 ***************************************************************************/

import axios from "axios";

export const getReqBlogList = path => {
    return dispatch => {
        return {
            promise: axios.get(path),
            dispatch
        }
    }
}

export const getReqBlog = blogIdPath => {
    return dispatch => {
        return {
            promise: axios.get(blogIdPath),
            dispatch
        }
    }
}