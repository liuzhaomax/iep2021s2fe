/****************************************************************************
 * @copyright   LIU Zhao
 * @authors     LIU Zhao (liuzhaomax@163.com)
 * @date        2021/8/22 10:35
 * @version     v1.0
 * @filename    HomeTrend.jsx
 * @description
 ***************************************************************************/

import React from "react";
import { Line } from "@ant-design/charts";
import {withRouter} from "react-router-dom";
import "./Home.css"
import "./HomeTrend.css"
import yellow from "../../assets/home/huanghua.jpg"
import {Button} from "antd";
import data from "../../config/homeTrendData"
// import white from "../../assets/home/whitef.png"

var config = {
    data: data,
    padding: "auto",
    xField: "Year",
    yField: "Rate",
    color: "#e9f7d2",
    xAxis: {
        tickCount: 11,
        line: {
            style: {
                fill: "#fff",
                stroke: "#fff",
            }
        },
        label: {
            style: {
                fill: "#fff",
                stroke: "#fff",
                fontSize: 18,
            }
        },
    },
    yAxis: {
        tickCount: 2,
        line: {
            style: {
                opacity: 0,
            }
        },
        label: {
            style: {
                opacity: 0,
            }
        },
        grid: {
            line: {
                style: {
                    opacity: 0,
                }
            }
        },
    },
    smooth: true,
}

class HomeTrend extends React.Component {

    jumpToStatHub = () => {
        this.props.history.push("/stathub")
    }

    render() {
        return (
            <div className="HomeTrend home-block" id="HomeTrend">
                <div className="home-block-container">
                    <h1>Endangered Plants Trend in Australia</h1>
                    <div className="home-sub-block-container">
                        <div className="home-trend-sub-block-container">
                            <div className="home-trend-sub-block-wrap-left">
                                <Line {...config} />
                                {/*<img src={white} alt="white" id="home-trend-img-white"/>*/}
                            </div>
                            <div className="home-trend-sub-block-wrap-right">
                                <img className="home-trend-img" src={yellow} alt="yellow"/>
                                <p>
                                    The trend on the left hand side indicates that the population of threatened plants
                                    are decreasing overall from 1985 to 2015.
                                    <br/>
                                    "Rate" is the population rate comparing with the first year.
                                </p>
                                <p>
                                    Want to know more about the statistics of endangered plants? ↓
                                </p>
                                <Button id="btn-home-trend" type="primary" onClick={this.jumpToStatHub}>More Details</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(HomeTrend)