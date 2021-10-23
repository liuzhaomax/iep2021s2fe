/****************************************************************************
 * @copyright   LIU Zhao
 * @authors     LIU Zhao (liuzhaomax@163.com)
 * @date        2021/9/9 21:54
 * @version     v1.0
 * @filename    StatHubMapFilters.jsx
 * @description
 ***************************************************************************/

import React from "react"
import "./StatHubMap.css"
import {Button} from "antd";
import {CaretLeftOutlined, CaretRightOutlined} from "@ant-design/icons";

class StatHubMapFilters extends React.Component {

    constructor() {
        super();
        this.state = {
            currentFilterCollapseIcon: "left",
        }
    }

    toggleFilterCollapse = () => {
        let filtersContainer = document.getElementsByClassName("sh-map-filters-container")[0]
        if (this.state.currentFilterCollapseIcon ==="left") {
            this.setState({
                currentFilterCollapseIcon: "right"
            })
            filtersContainer.style.display = "none"
        } else {
            this.setState({
                currentFilterCollapseIcon: "left"
            })
            filtersContainer.style.display = "flex"
        }
    }

    clickFilterStatus = e => {
        let currentStatus = e.currentTarget.getElementsByClassName("sh-map-filters-wrap-row-text")[0]
        let currentStatusText = currentStatus.innerText
        this.props.getFilterStatus(currentStatusText)
        let allStatus = document.getElementsByClassName("sh-map-filters-wrap-row-text")
        for (let i = 0; i < allStatus.length; i++) {
            allStatus[i].style.color = "white"
        }
        currentStatus.style.color = "#338e6c"
    }

    render() {
        return (
            <div className="StatHubMapFilters" id="sh-map-filters">
                <Button className="sh-map-filters-btn-collapse"
                        icon={this.state.currentFilterCollapseIcon === "left" ? <CaretLeftOutlined/> : <CaretRightOutlined />}
                        onClick={this.toggleFilterCollapse}
                />
                <div className="sh-map-filters-container">
                    <p>
                        The map has shown the distribution of the endangered plants in Australia. *
                    </p>
                    <p>
                        The height of the bar represented the year the data was collected, the higher the latest.
                    </p>
                    <p>
                        The threatened status are represented in following colours.
                    </p>
                    <div className="sh-map-filters-wrap">
                        <div className="sh-map-filters-wrap-row" onClick={this.clickFilterStatus}>
                            <span className="sh-map-filters-wrap-row-color" id="sh-map-filters-wrap-row-color-0"/>
                            <span className="sh-map-filters-wrap-row-text" style={{color: "#338e6c"}}>
                                All
                            </span>
                        </div>
                        <div className="sh-map-filters-wrap-row" onClick={this.clickFilterStatus}>
                            <span className="sh-map-filters-wrap-row-color" id="sh-map-filters-wrap-row-color-1"/>
                            <span className="sh-map-filters-wrap-row-text">
                                Vulnerable
                            </span>
                        </div>
                        <div className="sh-map-filters-wrap-row" onClick={this.clickFilterStatus}>
                            <span className="sh-map-filters-wrap-row-color" id="sh-map-filters-wrap-row-color-2"/>
                            <span className="sh-map-filters-wrap-row-text">
                                Endangered
                            </span>
                        </div>
                        <div className="sh-map-filters-wrap-row" onClick={this.clickFilterStatus}>
                            <span className="sh-map-filters-wrap-row-color" id="sh-map-filters-wrap-row-color-3"/>
                            <span className="sh-map-filters-wrap-row-text">
                                Critically Endangered
                            </span>
                        </div>
                        <div className="sh-map-filters-wrap-row" onClick={this.clickFilterStatus}>
                            <span className="sh-map-filters-wrap-row-color" id="sh-map-filters-wrap-row-color-4"/>
                            <span className="sh-map-filters-wrap-row-text">
                                Extinct
                            </span>
                        </div>
                    </div>
                    <p style={{color: "#338e6c"}}>
                        Click on the threatened status to focus.
                    </p>
                    <p>
                        The map has displayed a result that <span style={{fontWeight: "bold"}}>Victoria</span> has
                        a leading amount of the distribution of endangered plants compared to all the states
                        in Australia among all the threatened status.
                    </p>
                    <p style={{fontSize: "12px"}}>
                        * The map has a location deviation between 0.3km to 3km.
                    </p>
                </div>
            </div>
        )
    }
}

export default StatHubMapFilters