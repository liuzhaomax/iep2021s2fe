/****************************************************************************
 * @copyright   LIU Zhao
 * @authors     LIU Zhao (liuzhaomax@163.com)
 * @date        2021/9/4 18:56
 * @version     v1.0
 * @filename    StatHub.jsx
 * @description
 ***************************************************************************/

import React from "react"
import "./StatHub.css"
import {withRouter} from "react-router-dom";
import StatHubMain from "./StatHubMain";

class StatHub extends React.Component {

    componentDidMount() {
        window.onload = () => {
            this.jumpToAnchor("StatHub")
        }
    }

    jumpToAnchor = id => {
        setTimeout(() => {
            document.getElementById(id).scrollIntoView(true)
        }, 1)
    }

    render() {
        return (
            <div className="StatHub" id="StatHub">
                <div className="sh-banner sh-banner-title">
                    <h1>Stat Hub</h1>
                    <h2>Endangered Plants Relevant Statistics</h2>
                </div>
                <StatHubMain/>
            </div>
        )
    }
}

export default withRouter(StatHub)