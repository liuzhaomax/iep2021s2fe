/****************************************************************************
 * @copyright   LIU Zhao
 * @authors     LIU Zhao (liuzhaomax@163.com)
 * @date        2021/7/25 5:42
 * @version     v1.0
 * @filename    Index.jsx
 * @description
 ***************************************************************************/

import React from "react"
import {Redirect} from "react-router-dom"

class Index extends React.Component {
    render() {
        return <Redirect to="/home"/>
    }
}

export default Index
