/****************************************************************************
 * @copyright   LIU Zhao
 * @authors     LIU Zhao (liuzhaomax@163.com)
 * @date        2021/9/5 1:02
 * @version     v1.0
 * @filename    StatHubLine.jsx
 * @description
 ***************************************************************************/

import React from "react"
import "./StatHubLine.css"
import { Line } from "@ant-design/charts";
import json2LineJson from "../../utils/json2LineJson";

let loadingTimer
let config = {
    xField: "Year",
    yField: "Quantity",
    seriesField: "Threatened_status",
    xAxis: {
        tickCount: 15,
    },
    yAxis: {
        tickCount: 8,
        label: {
            formatter: function formatter(v) {
                return v
            },
        },
    },
    color: [
        "#d57a03",
        "#b40212",
        "#3899ad",
        "#5802c9",
    ],
    title: {
        text: "The discovery number of endangered plants throughout the history",
        position: "center",
        offset: 500,
        spacing: 200
    },
    legend: {
        position: "top"
    },
    // smooth: true,
    animation: {
        appear: {
            animation: "path-in",
            duration: 5000,
        },
    },
}

class StatHubLine extends React.Component {

    componentWillUnmount() {
        clearInterval(loadingTimer)
    }

    render() {
        let data = null
        if (this.props.data.length) {
            data = json2LineJson(this.props.data.json)
        }
        loadingTimer = setInterval(() => {
            document.getElementById("sh-graph-loading").style.display = "none"
            clearInterval(loadingTimer)
        },1)
        return (
            <div className="StatHubLine" id="StatHubLine">
                <h1>The number of discovered endangered plants throughout the history</h1>
                {
                    this.props.data.length ?
                        <Line className="sh-line" data={data} {...config}/>
                        :
                        <React.Fragment/>
                }
            </div>
        )
    }
}

export default StatHubLine