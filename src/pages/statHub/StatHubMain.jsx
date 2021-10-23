/****************************************************************************
 * @copyright   LIU Zhao
 * @authors     LIU Zhao (liuzhaomax@163.com)
 * @date        2021/9/4 22:00
 * @version     v1.0
 * @filename    StatHubMain.jsx
 * @description
 ***************************************************************************/

import React from "react"
import "./StatHubMain.css"
import axios from "axios";
import {WEBSITE_1} from "../../config/constants";
import {Menu, Spin} from "antd";
import { GlobalOutlined, ShareAltOutlined, LineChartOutlined } from '@ant-design/icons';
import { RingProgress } from '@ant-design/charts';
import SubRoutes from "./SubRoutes";
import {withRouter} from "react-router-dom";
import csv2json from "../../utils/csv2json";

class StatHubMain extends React.Component {
    constructor() {
        super();
        this.state = {
            current: "1",
            totalPercentArr: [0.851, 0.913, 0.896],
            data: {
                json: null,
                header: null,
                body: null,
                length: 0,
            },
        }
    }

    componentDidMount() {
        this.setSelectedKeys()
        this.getData()
    }

    getData = () => {
        axios.get(WEBSITE_1.MODULE_2.PATH + WEBSITE_1.MODULE_2.FUNCTION_1.PATH)
            .then(res => {
                this.setState({
                    data: {
                        json: csv2json(res.data),
                        header: res.data[0],
                        body: res.data.slice(1),
                        length: res.data.length - 1,
                    }
                })
            })
            .catch(err => {
                console.log(err)
            })
    }

    setSelectedKeys = () => {
        let pathArr = window.location.pathname.split("/")
        let path
        if (pathArr[pathArr.length - 1]) {
            path = pathArr.slice(-1)[0]
        } else {
            path = pathArr.slice(-2)[0]
        }
        let shMenuItems = document.getElementsByClassName("sh-menu-item")
        for (let i = 0; i < shMenuItems.length; i++) {
            let target = shMenuItems[i].getElementsByClassName("ant-menu-title-content")[0].innerText.toLowerCase()
            if (target === path || target === path) {
                this.setState({
                    current: i + 1 + ""
                })
                break
            }
        }
    }

    jumpToPath = path => {
        this.props.history.push(path)
    }

    toggleNav = e => {
        document.getElementById("sh-graph-loading").style.display = "flex"
        this.setState({ current: e.key })
        let path = WEBSITE_1.MODULE_2.PATH + WEBSITE_1.MODULE_2["FUNCTION_" + (Number(e.key) + 1)].PATH
        this.jumpToPath(path)
    }

    render() {
        let config = {
            height: 50,
            width: 50,
            autoFit: false,
            color: ['#338e6c', '#E8EDF3'],
            innerRadius: 0.82,
            radius: 0.98,
        }
        return (
            <div className="StatHubMain" id="StatHubMain">
                <div className="sh-zone-upper">
                    <div className="sh-nav-container">
                        <Menu id="sh-nav" className="sh-nav"
                              onClick={this.toggleNav}
                              selectedKeys={[this.state.current]}
                              mode={"horizontal"}
                              key="sh-nav"
                        >
                            <Menu.Item className="sh-menu-item" key="1" icon={<GlobalOutlined />}>Map</Menu.Item>
                            <Menu.Item className="sh-menu-item" key="2" icon={<ShareAltOutlined />}>Force</Menu.Item>
                            <Menu.Item className="sh-menu-item" key="3" icon={<LineChartOutlined/>}>Line</Menu.Item>
                        </Menu>
                        <div className="sh-nav-total-wrap">
                            <RingProgress {...config} percent={1} className="sh-nav-total-hover-1"/>
                            <div className="sh-nav-total-text-wrap sh-nav-total-hover-1">
                                <p>14,763</p>
                                <p>Dataset Capacity</p>
                            </div>
                            <RingProgress {...config} percent={this.state.totalPercentArr[0]} className="sh-nav-total-hover-2"/>
                            <div className="sh-nav-total-text-wrap sh-nav-total-hover-2">
                                <p>84.9%</p>
                                <p>Occurrence</p>
                            </div>
                            <RingProgress {...config} percent={this.state.totalPercentArr[1]} className="sh-nav-total-hover-3"/>
                            <div className="sh-nav-total-text-wrap sh-nav-total-hover-3">
                                <p>91.3%</p>
                                <p>With Year</p>
                            </div>
                            <RingProgress {...config} percent={this.state.totalPercentArr[2]} className="sh-nav-total-hover-4"/>
                            <div className="sh-nav-total-text-wrap sh-nav-total-hover-4">
                                <p>98.6%</p>
                                <p>With Coordinates</p>
                            </div>
                            <div className="sh-nav-total-text-hover-panel-container">
                                <div className="sh-nav-total-text-hover-panel">
                                    The size of the dataset
                                </div>
                                <div className="sh-nav-total-text-hover-panel">
                                    The percentage of data has been used to plot the visualizations in the dataset
                                </div>
                                <div className="sh-nav-total-text-hover-panel">
                                    The percentage of data included the recorded years in the dataset
                                </div>
                                <div className="sh-nav-total-text-hover-panel">
                                    The percentage of data included the coordinates of the plants in the dataset
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Spin tip="Loading..." size="large" id="sh-graph-loading" />
                <SubRoutes data={this.state.data}/>
            </div>
        )
    }
}

export default withRouter(StatHubMain)