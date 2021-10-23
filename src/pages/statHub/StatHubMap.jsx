/****************************************************************************
 * @copyright   LIU Zhao
 * @authors     LIU Zhao (liuzhaomax@163.com)
 * @date        2021/9/5 1:02
 * @version     v1.0
 * @filename    StatHubMap.jsx
 * @description
 ***************************************************************************/
// https://endangeredplantsau.ga, https://www.endangeredplantsau.ga, https://iter2.endangeredplantsau.ga, https://iter3.endangeredplantsau.ga, http://192.168.0.2:81
// pk.eyJ1IjoibGl1emhhb21heCIsImEiOiJja3Q4aDVibDcxMjU1Mm9yNTAwejMxbm56In0.Vk1iW_AdNKvhdNbgSX8iuw

import React from "react"
import "./StatHubMap.css"
import StatHubMapFilters from "./StatHubMapFilters";
import {Button, Layout} from 'antd';
import {PointLayer, Scale, Scene, Zoom} from "@antv/l7";
import {Mapbox} from "@antv/l7-maps";
import mapDark from "../../assets/statHub/map_dark.png"
import mapLight from "../../assets/statHub/map_light.png"
import mapGeo from "../../assets/statHub/map_geo.png"
import mapAdmin from "../../assets/statHub/map_admin.png"
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as shActions from "../../state/actions/shActions";

let loadingTimer
let scene
let mapStyle = "dark"

class StatHubMap extends React.Component {

    constructor() {
        super();
        this.state = {
            filterStatus: "All",
        }
    }

    componentDidMount() {
        this.loadScene()
    }

    componentWillUnmount() {
        clearInterval(loadingTimer)
    }

    getFilterStatus = filterStatus => {
        this.setState({
            filterStatus: filterStatus
        })
    }

    loadScene = () => {
        setTimeout(() => {
            if (this.props.data.length && document.getElementById("sh-map")) {
                document.getElementById("sh-map").innerHTML = ""
                let filteredJson = this.filterStatusJson(this.props.data.json, this.state.filterStatus)
                scene = this.onSceneLoaded(filteredJson)
                loadingTimer = setInterval(() => {
                    let graphLoading = document.getElementById("sh-graph-loading")
                    if (graphLoading) {
                        graphLoading.style.display = "none"
                    }
                    clearInterval(loadingTimer)
                },1)
            }
        },1)
    }

    addScene = () => {
        return new Scene({
            id: "sh-map",
            map: new Mapbox({
                style: "dark",
                center: [ 132.47566288666962, -26.04940828425968 ],
                pitch: 35.210526315789465,
                zoom: 3.5,
                token: "pk.eyJ1IjoibGl1emhhb21heCIsImEiOiJja3Q4aDVibDcxMjU1Mm9yNTAwejMxbm56In0.Vk1iW_AdNKvhdNbgSX8iuw",
            })
        })
    }

    filterStatusJson = (json, filterStatus) => {
        let result = this.props.data.json
        if (filterStatus !== "All") {
            result = result.filter(value => filterStatus.toLowerCase() === value["Threatened_status"].toLowerCase())
        }
        return result
    }

    loadColors = () => {
        let colors
        switch (this.state.filterStatus) {
            case "Vulnerable":
                colors = ["#3899ad"]
                break
            case "Endangered":
                colors = ["#d57a03"]
                break
            case "Critically Endangered":
                colors = ["#b40212"]
                break
            case "Extinct":
                colors = ["#5802c9"]
                break
            default:
                colors = [
                    "#3899ad",
                    "#d57a03",
                    "#b40212",
                    "#5802c9",
                ]
        }
        return colors
    }

    loadPointLayer = (filteredJson) => {
        return new PointLayer({})
            .source(filteredJson, {
                parser: {
                    type: "json",
                    x: "Longitude",
                    y: "Latitude"
                }
            })
            .shape("cylinder")
            .size("Year", year => [1.5, 1.5, (Number(year) % 1800) / 3])
            .active(true)
            .color("Threatened_status", this.loadColors())
            .style({
                opacity: 0.9
            })
    }

    onSceneLoaded = (filteredJson) => {
        scene = this.addScene()
        scene.setMapStyle(mapStyle)
        const pointLayer = this.loadPointLayer(filteredJson)
        scene.addLayer(pointLayer)
        const zoomControl = new Zoom({
            position: "topleft",
        })
        scene.addControl(zoomControl)
        const scaleControl = new Scale({
            position: 'bottomleft',
        })
        scene.addControl(scaleControl)
        return scene
    }

    setMapStyle = (mapStyleTag) => {
        switch (mapStyleTag) {
            case "mapAdmin":
                mapStyle = "mapbox://styles/mapbox/outdoors-v11"
                break
            case "mapGeo":
                mapStyle = "mapbox://styles/mapbox/satellite-v9"
                break
            case "mapLight":
                mapStyle = "light"
                break
            case "mapDark":
                mapStyle = "dark"
                break
            default:
                mapStyle = "dark"
        }
        scene.setMapStyle(mapStyle)
    }

    toggleMapStyle = e => {
        let changeFlag = true
        for (let i = 0; i < e.target.classList.length; i++) {
            if (e.target.classList[i] === "sh-map-style-btn-active") {
                changeFlag = false
                break
            }
        }
        let parent = document.getElementsByClassName("sh-map-control-layer-switcher")[0]
        if (changeFlag) {
            for (let i = 0; i < parent.children.length; i++) {
                parent.children[i].classList.remove("sh-map-style-btn-active")
            }
            e.target.classList.add("sh-map-style-btn-active")
            parent.removeChild(e.target)
            parent.appendChild(e.target)
            this.setMapStyle(e.target.children[0].alt)
        }
    }

    render() {
        this.loadScene()
        return (
            <div className="StatHubMap" id="StatHubMap">
                <Layout id="sh-map"/>
                <div id="sh-map-control">
                    <StatHubMapFilters getFilterStatus={this.getFilterStatus}/>
                    <div className="sh-map-control-layer-switcher">
                        <Button className="sh-map-control-layer-btn" onClick={this.toggleMapStyle}>
                            <img src={mapAdmin} alt="mapAdmin" className="sh-map-control-img"/>
                        </Button>
                        <Button className="sh-map-control-layer-btn" onClick={this.toggleMapStyle}>
                            <img src={mapGeo} alt="mapGeo" className="sh-map-control-img"/>
                        </Button>
                        <Button className="sh-map-control-layer-btn" onClick={this.toggleMapStyle}>
                            <img src={mapLight} alt="mapLight" className="sh-map-control-img"/>
                        </Button>
                        <Button className="sh-map-control-layer-btn sh-map-style-btn-active" onClick={this.toggleMapStyle}>
                            <img src={mapDark} alt="mapDark" className="sh-map-control-img"/>
                        </Button>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        shMapLoading: state.shMapLoading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        shActions: bindActionCreators(shActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(StatHubMap)