/****************************************************************************
 * @copyright   LIU Zhao
 * @authors     LIU Zhao (liuzhaomax@163.com)
 * @date        2021/9/5 1:02
 * @version     v1.0
 * @filename    StatHubForce.jsx
 * @description
 ***************************************************************************/

import React from "react"
import "./StatHubForce.css"
import G6 from "@antv/g6";
import json2ForceNodes from "../../utils/json2ForceNodes";
import StatHubForceFilters from "./StatHubForceFilters";
import {Switch} from "antd";

let loadingTimer
let loadingTimer2
let graph
let data
let colors = [
    "#3899ad",
    "#d57a03",
    "#b40212",
    "#5802c9",
]
let labelChecked = false

G6.registerNode(
    "circle_plus",
    {
        drawShape(cfg, group) {
            return group.addShape("circle", {
                attrs: {
                    x: 0,
                    y: 0,
                    r: cfg.size / 2,
                    fill: cfg.style.fill,
                    shadowColor: "#338e6c",
                    shadowBlur: 20
                }
            });
        }
    },
    "circle"
)

G6.registerNode(
    "circle_state",
    {
        drawShape(cfg, group) {
            return group.addShape("image", {
                attrs: {
                    x: 0,
                    y: 0,
                    width: cfg.img.width,
                    height: cfg.img.height,
                    img: cfg.img.src,
                    fill: cfg.style.fill,
                    shadowColor: "#FF4654",
                    shadowBlur: 20,
                }
            });
        }
    },
    "circle"
)

class StatHubForce extends React.Component {

    constructor() {
        super();
        this.state = {
            filterStatus: "All",
            filterStates: "All",
            labelChecked: labelChecked,
        }
    }

    componentDidMount() {
        this.loadGraph()
    }

    componentWillUnmount() {
        clearInterval(loadingTimer)
        clearInterval(loadingTimer2)
    }

    getFilterStatus = filterStatus => {
        this.setState({
            filterStatus: filterStatus,
            labelChecked,
        })
    }

    getFilterStates = filterStates => {
        this.setState({
            filterStates: filterStates,
            labelChecked,
        })
    }

    loadGraph = () => {
        let container = document.getElementById("sh-force")
        let spin = document.getElementById("sh-graph-loading")
        if (this.props.data.length && container) {
            graph = this.onGraphLoaded()
            loadingTimer = setInterval(() => {
                loadingTimer2 = setTimeout(() => {
                    if (spin) spin.style.display = "none"
                    clearInterval(loadingTimer)
                    loadingTimer = 0
                },2000)
            },1)
        }
    }

    addGraph = () => {
        let container = document.getElementById("sh-force")
        let width = container.scrollWidth
        let height = container.scrollHeight || 500
        return new G6.Graph({
            container: "sh-force",
            width,
            height,
            fitView: true,
            fitViewPadding: 80,
            linkCenter: true,
            layout: {
                type: "force",
            },
            defaultNode: {
                size: 10,
                style: {
                    lineWidth: 0,
                    fill: "#338e6c",
                },
            },
            defaultEdge: {
                color: "#FEAB58",
                style: {
                    lineWidth: 0.3,
                    shadowBlur: 100,
                    shadowColor: "#5ea3ff",
                },
            },
            modes: {
                default: ["drag-node", "drag-canvas", "zoom-canvas"],
            },
            animate: true,
            plugins: [this.getTooltip()],
        })
    }

    getTooltip = () => {
        return new G6.Tooltip({
            offsetX: 10,
            offsetY: 10,
            itemTypes: ["node"],
            getContent: (e) => {
                const outDiv = document.createElement("div")
                const model = e.item.getModel()
                const name = `
                    <span style="text-align: left; font-size: 14px">
                        ${model.id}
                    </span>
                    <br/>
                    <span style="text-align: left; color: ${model.style.fill}; font-size: 14px">
                        ${model.status ? model.status : ""}
                    </span>
                `
                outDiv.style.width = "fit-content"
                //outDiv.style.padding = "0px 0px 20px 0px"
                outDiv.innerHTML = `<div>${name}</div>`
                return outDiv
            }
        })
    }

    onGraphLoaded = () => {
        graph = this.addGraph()
        let container = document.getElementById("sh-force")
        data = json2ForceNodes(this.props.data.json, this.state.filterStatus, this.state.filterStates)
        graph.data({
            nodes: data.nodes,
            edges: data.edges.map(function (edge, i) {
                edge.id = "edge" + i
                return Object.assign({}, edge)
            }),
        })

        graph.node(node => {
            let type = node.status ? "circle_plus" : "circle_state"
            let color
            switch (node.status) {
                case "Vulnerable":
                    color = colors[0]
                    break
                case "Endangered":
                    color = colors[1]
                    break
                case "Critically Endangered":
                    color = colors[2]
                    break
                case "Extinct":
                    color = colors[3]
                    break
                default:
                    color = "#000"
            }
            return {
                id: node.id,
                label: node.status ? "" : node.id,
                img: node.img,
                type,
                style: {
                    fill: color,
                    stroke: "#338e6c",
                },
                labelCfg: {
                    position: "center",
                    style: {
                        fill: "#fff",
                        fontSize: node.status ? 4 : 16,
                    },
                },
            }
        })

        graph.edge((edge) => {
            return {
                id: edge.id,
                style: {
                    lineWidth: 0.3 * edge.value,
                },
            };
        })

        graph.render()

        setTimeout(() => {
            graph.updateLayout({
                type: "concentric",
                minNodeSpacing: container.scrollHeight + 2500 || 500,
                // preventOverlap: true,
                // nodeSize: 10,
            })
            graph.zoomTo(0.2, { x: container.clientWidth/2, y: container.clientHeight/2 })
        },1500)

        graph.on("node:dragstart", function (e) {
            graph.layout()
            refreshDraggedNodePosition(e)
        })
        graph.on("node:drag", function (e) {
            const forceLayout = graph.get("layoutController").layoutMethods[0]
            forceLayout.execute()
            refreshDraggedNodePosition(e)
        })
        graph.on("node:dragend", function (e) {
            e.item.get("model").fx = null
            e.item.get("model").fy = null
        })

        if (typeof window !== "undefined") {
            window.onresize = () => {
                if (!graph || graph.get("destroyed")) return
                if (!container || !container.scrollWidth || !container.scrollHeight) return
                graph.changeSize(container.scrollWidth, container.scrollHeight)
            }
        }

        function refreshDraggedNodePosition(e) {
            const model = e.item.get("model")
            model.fx = e.x
            model.fy = e.y
        }

        return graph
    }

    // initStatePos = () => {
    //     graph.cfg.nodes.map(value => {
    //         if (value._cfg.currentShape === "circle_state") {
    //             switch (value._cfg.id) {
    //                 case "AUS":
    //                     console.log(value)
    //                     value.updatePosition({
    //                         x: 100,
    //                         y: 100,
    //                     })
    //                     break
    //             }
    //         }
    //         return value
    //     })
    // }

    toggleNodeText = () => {
        labelChecked = !labelChecked
        graph.cfg.nodes.map(value => {
            if (value._cfg.currentShape === "circle_plus") {
                if (value._cfg.model.label) {
                    value.update({
                        label: "",
                    })
                } else {
                    value.update({
                        label: value._cfg.model.id,
                    })
                }
            }
            return value
        })
    }

    render() {
        if (graph) graph.destroy()
        this.loadGraph()
        return (
            <div className="StatHubForce" id="StatHubForce">
                <div id="sh-force">
                    <StatHubForceFilters
                        getFilterStatus={this.getFilterStatus}
                        getFilterStates={this.getFilterStates}
                    />
                    <div id="sh-force-control">
                        <div className="sh-force-control-layer-switcher">
                            <span>Label</span>
                            <Switch defaultChecked={false}
                                    onChange={this.toggleNodeText}
                                    className="sh-force-control-layer-btn"
                                    checkedChildren="on" unCheckedChildren="off"
                                    id="sh-label-switch" key={this.state.labelChecked}
                            />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default StatHubForce