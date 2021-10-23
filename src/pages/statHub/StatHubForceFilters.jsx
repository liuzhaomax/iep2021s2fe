/****************************************************************************
 * @copyright   LIU Zhao
 * @authors     LIU Zhao (liuzhaomax@163.com)
 * @date        2021/9/11 23:27
 * @version     v1.0
 * @filename    StatHubForceFilters.jsx
 * @description
 ***************************************************************************/

import React from "react"
import "./StatHubForce.css"
import {Button} from "antd";
import {CaretLeftOutlined, CaretRightOutlined} from "@ant-design/icons";

class StatHubForceFilters extends React.Component {

    constructor() {
        super();
        this.state = {
            currentFilterCollapseIcon: "left",
        }
    }

    toggleFilterCollapse = () => {
        let filtersContainer = document.getElementsByClassName("sh-force-filters-container")[0]
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
        let currentStatus = e.currentTarget.getElementsByClassName("sh-force-filters-wrap-row-text-status")[0]
        let currentStatusText = currentStatus.innerText
        this.props.getFilterStatus(currentStatusText)
        let allStatus = document.getElementsByClassName("sh-force-filters-wrap-row-text-status")
        for (let i = 0; i < allStatus.length; i++) {
            allStatus[i].style.color = "white"
        }
        currentStatus.style.color = "#338e6c"
    }

    clickFilterStates = e => {
        let currentStates = e.currentTarget.getElementsByClassName("sh-force-filters-wrap-row-text-state")[0]
        let currentStatesText = currentStates.innerText
        this.props.getFilterStates(currentStatesText)
        let allStates = document.getElementsByClassName("sh-force-filters-wrap-row-text-state")
        for (let i = 0; i < allStates.length; i++) {
            allStates[i].style.color = "white"
        }
        currentStates.style.color = "#338e6c"
    }
    
    render() {
        return (
            <div className="StatHubForceFilters" id="sh-force-filters">
                <Button className="sh-force-filters-btn-collapse"
                        icon={this.state.currentFilterCollapseIcon === "left" ? <CaretLeftOutlined/> : <CaretRightOutlined />}
                        onClick={this.toggleFilterCollapse}
                />
                <div className="sh-force-filters-container">
                    <p>
                        The force has shown the relationship between the states and the endangered plants in Australia.
                    </p>
                    <p>
                        The width of the lines represented the collected data quantity of each kind of endangered plants. Wider means more data.
                    </p>
                    <p>
                        The threatened status of those plants are represented in following colours.
                    </p>
                    <p style={{fontWeight: "bold", margin: "10px 0 0 0"}}>Threatened Status</p>
                    <div className="sh-force-filters-wrap">
                        <div className="sh-force-filters-wrap-row" onClick={this.clickFilterStatus}>
                            <span className="sh-force-filters-wrap-row-color" id="sh-force-filters-wrap-row-color-0"/>
                            <span className="sh-force-filters-wrap-row-text sh-force-filters-wrap-row-text-status" style={{color: "#338e6c"}}>
                                All
                            </span>
                        </div>
                        <div className="sh-force-filters-wrap-row" onClick={this.clickFilterStatus}>
                            <span className="sh-force-filters-wrap-row-color" id="sh-force-filters-wrap-row-color-1"/>
                            <span className="sh-force-filters-wrap-row-text sh-force-filters-wrap-row-text-status">
                                Vulnerable
                            </span>
                        </div>
                        <div className="sh-force-filters-wrap-row" onClick={this.clickFilterStatus}>
                            <span className="sh-force-filters-wrap-row-color" id="sh-force-filters-wrap-row-color-2"/>
                            <span className="sh-force-filters-wrap-row-text sh-force-filters-wrap-row-text-status">
                                Endangered
                            </span>
                        </div>
                        <div className="sh-force-filters-wrap-row" onClick={this.clickFilterStatus}>
                            <span className="sh-force-filters-wrap-row-color" id="sh-force-filters-wrap-row-color-3"/>
                            <span className="sh-force-filters-wrap-row-text sh-force-filters-wrap-row-text-status">
                                Critically Endangered
                            </span>
                        </div>
                        <div className="sh-force-filters-wrap-row" onClick={this.clickFilterStatus}>
                            <span className="sh-force-filters-wrap-row-color" id="sh-force-filters-wrap-row-color-4"/>
                            <span className="sh-force-filters-wrap-row-text sh-force-filters-wrap-row-text-status">
                                Extinct
                            </span>
                        </div>
                    </div>
                    <p style={{fontWeight: "bold", margin: "10px 0 0 0"}}>States</p>
                    <div className="sh-force-filters-wrap sh-force-filters-wrap-state">
                        <div className="sh-force-filters-wrap-row" onClick={this.clickFilterStates}>
                            <span className="sh-force-filters-wrap-row-text sh-force-filters-wrap-row-text-state" style={{color: "#338e6c"}}>
                                All
                            </span>
                        </div>
                        <div className="sh-force-filters-wrap-row" onClick={this.clickFilterStates}>
                            <span className="sh-force-filters-wrap-row-text sh-force-filters-wrap-row-text-state">
                                ACT
                            </span>
                        </div>
                        <div className="sh-force-filters-wrap-row" onClick={this.clickFilterStates}>
                            <span className="sh-force-filters-wrap-row-text sh-force-filters-wrap-row-text-state">
                                VIC
                            </span>
                        </div>
                        <div className="sh-force-filters-wrap-row" onClick={this.clickFilterStates}>
                            <span className="sh-force-filters-wrap-row-text sh-force-filters-wrap-row-text-state">
                                NSW
                            </span>
                        </div>
                        <div className="sh-force-filters-wrap-row" onClick={this.clickFilterStates}>
                            <span className="sh-force-filters-wrap-row-text sh-force-filters-wrap-row-text-state">
                                QLD
                            </span>
                        </div>
                        <div className="sh-force-filters-wrap-row" onClick={this.clickFilterStates}>
                            <span className="sh-force-filters-wrap-row-text sh-force-filters-wrap-row-text-state">
                                SA
                            </span>
                        </div>
                        <div className="sh-force-filters-wrap-row" onClick={this.clickFilterStates}>
                            <span className="sh-force-filters-wrap-row-text sh-force-filters-wrap-row-text-state">
                                NT
                            </span>
                        </div>
                        <div className="sh-force-filters-wrap-row" onClick={this.clickFilterStates}>
                            <span className="sh-force-filters-wrap-row-text sh-force-filters-wrap-row-text-state">
                                WA
                            </span>
                        </div>
                        <div className="sh-force-filters-wrap-row" onClick={this.clickFilterStates}>
                            <span className="sh-force-filters-wrap-row-text sh-force-filters-wrap-row-text-state">
                                TAS
                            </span>
                        </div>
                        <div className="sh-force-filters-wrap-row" onClick={this.clickFilterStates}>
                            <span className="sh-force-filters-wrap-row-text sh-force-filters-wrap-row-text-state">
                                External territories
                            </span>
                        </div>
                    </div>
                    <p style={{color: "#338e6c"}}>
                        Click on the threatened status or states to focus.
                    </p>
                    <p style={{fontSize: "12px"}}>
                        The scene can be zoomed and dragged.
                    </p>
                </div>
            </div>
        )
    }
}

export default StatHubForceFilters