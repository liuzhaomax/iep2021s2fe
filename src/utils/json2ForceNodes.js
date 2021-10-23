/****************************************************************************
 * @copyright   LIU Zhao
 * @authors     LIU Zhao (liuzhaomax@163.com)
 * @date        2021/9/8 17:14
 * @version     v1.0
 * @filename    json2ForceNodes.js
 * @description
 ***************************************************************************/

import AUS from "../assets/statHub/force/AUS.svg"
import ACT from "../assets/statHub/force/ACT.svg"
import VIC from "../assets/statHub/force/VIC.svg"
import NSW from "../assets/statHub/force/NSW.svg"
import QLD from "../assets/statHub/force/QLD.svg"
import SA from "../assets/statHub/force/SA.svg"
import NT from "../assets/statHub/force/NT.svg"
import WA from "../assets/statHub/force/WA.svg"
import TAS from "../assets/statHub/force/TAS.svg"

let scale = 1.5

const images = {
    "AUS": {
        src: AUS,
        width: 559,
        height: 464,
    },
    "ACT": {
        src: ACT,
        width: 50 * scale,
        height: 50 * scale,
    },
    "VIC": {
        src: VIC,
        width: 116 * scale,
        height: 88 * scale,
    },
    "NSW": {
        src: NSW,
        width: 183 * scale,
        height: 146 * scale,
    },
    "QLD": {
        src: QLD,
        width: 215 * scale,
        height: 311 * scale,
    },
    "SA": {
        src: SA,
        width: 169 * scale,
        height: 198 * scale,
    },
    "NT": {
        src: NT,
        width: 140 * scale,
        height: 243 * scale,
    },
    "WA": {
        src: WA,
        width: 221 * scale,
        height: 357 * scale,
    },
    "TAS": {
        src: TAS,
        width: 50 * 2,
        height: 45 * 2,
    },
    "External territories": {
        src: ACT,
        width: 50 * scale,
        height: 50 * scale,
    },
}

const json2ForceNodes = (json, status, state) => {
    let _status = status === "All" ? undefined : status
    let _state = state === "All" ? undefined : state
    let _json = json
    let result = {
        nodes: [
            // {
            //     id: "AUS",
            //     img: images["AUS"],
            // },
            {
                id: "ACT",
                img: images["ACT"],
            }, {
                id: "VIC",
                img: images["VIC"],
            }, {
                id: "NSW",
                img: images["NSW"],
            }, {
                id: "QLD",
                img: images["QLD"],
            }, {
                id: "SA",
                img: images["SA"],
            }, {
                id: "NT",
                img: images["NT"],
            }, {
                id: "WA",
                img: images["WA"],
            }, {
                id: "TAS",
                img: images["TAS"],
            }, {
                id: "External territories",
                img: images["ACT"],
            },
        ],
        edges: [],
        // edges: [
        //     {
        //         source: "AUS",
        //         target: "VIC",
        //         value: 1,
        //     }, {
        //         source: "AUS",
        //         target: "ACT",
        //         value: 1,
        //     },{
        //         source: "AUS",
        //         target: "NSW",
        //         value: 1,
        //     },{
        //         source: "AUS",
        //         target: "QLD",
        //         value: 1,
        //     },{
        //         source: "AUS",
        //         target: "SA",
        //         value: 1,
        //     },{
        //         source: "AUS",
        //         target: "NT",
        //         value: 1,
        //     },{
        //         source: "AUS",
        //         target: "WA",
        //         value: 1,
        //     },{
        //         source: "AUS",
        //         target: "TAS",
        //         value: 1,
        //     },{
        //         source: "AUS",
        //         target: "External territories",
        //         value: 1,
        //     },
        // ],
    }
    if (_status) {
        _json = _json.filter(val => {
            return val["Threatened_status"] === _status;
        })
    }
    if (_state) {
        _json = _json.filter(val => {
            return val["State_found"].includes(_state);
        })
    }
    _json.map((value) => {
        let node = {
            id: "",
            status: "",
        }
        let edge = {
            source: "",
            target: "",
            value: 1,
        }
        let newNodeFlag = true
        for (let i = 0; i < result.nodes.length; i++) {
            if (value["Scientific_Name"] === result.nodes[i]["id"]) {
                newNodeFlag = false
                break
            }
        }
        if (newNodeFlag) {
            node.id = value["Scientific_Name"]
            node.status = value["Threatened_status"]
            result.nodes.push(node)
        }
        let newEdgeFlag = true
        for (let i = 0; i < result.edges.length; i++) {
            if (value["Scientific_Name"] === result.edges[i]["source"]
                && value["State_found"] === result.edges[i]["target"]) {
                newEdgeFlag = false
                result.edges[i]["value"] += 1
                break
            }
        }
        if (newEdgeFlag) {
            edge.source = value["Scientific_Name"]
            edge.target = value["State_found"]
            edge.value = 1
            result.edges.push(edge)
        }
        return value
    })
    return result
}

export default json2ForceNodes