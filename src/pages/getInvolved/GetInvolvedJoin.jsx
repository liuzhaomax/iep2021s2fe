/****************************************************************************
 * @copyright   LIU Zhao
 * @authors     LIU Zhao (liuzhaomax@163.com)
 * @date        2021/9/26 14:34
 * @version     v1.0
 * @filename    GetInvolvedJoin.jsx
 * @description
 ***************************************************************************/

import React from "react"
import "./GetInvolvedJoin.css"
import VIC from "../../assets/getInvolved/VIC.svg"
import NSW from "../../assets/getInvolved/NSW.svg"
import imgVIC from "../../assets/getInvolved/VIC.jpg"
import imgNSW from "../../assets/getInvolved/NSW.jpg"

class GetInvolvedJoin extends React.Component {
    render() {
        return (
            <div className="GetInvolvedJoin" id="GetInvolvedJoin">
                <div className="gi-join-container">
                    <h1>JOIN</h1>
                    <div className="gi-join-row-wrap">
                        <div className="gi-join-img-wrap">
                            <img src={imgVIC} alt="gi-join-img" className="gi-join-img"/>
                            <div className="gi-join-svg-cover gi-join-svg-cover-vic">
                                <img src={VIC} alt="gi-join-svg" className="gi-join-svg"/>
                            </div>
                        </div>
                        <div className="gi-join-text">
                            <h2>VIC Department of Environment, Land, Water and Planning</h2>
                            <h3>
                                Victoria has a strong history of environmental volunteering,
                                with volunteers contributing enormously to improving our environment,
                                our local communities, and our economy.
                            </h3>
                            <a href="https://www.environment.vic.gov.au/volunteering/getting-involved-and-grants-available"
                               target="view_window"
                            >
                                LEARN MORE ABOUT THEIR PROGRAM
                            </a>
                        </div>
                    </div>
                    <div className="gi-join-row-wrap">
                        <div className="gi-join-text">
                            <h2>NSW Department of Planning, Industry and Environment</h2>
                            <h3>
                                NSW Department of Planning, Industry and Environment have a huge range
                                of opportunities across the state - in national parks,
                                botanic gardens and with the Saving our Species program.
                            </h3>
                            <a href="https://app.betterimpact.com/PublicEnterprise/68d8138e-28e1-4a02-85b8-341d9d9edb57"
                               target="view_window"
                            >
                                LEARN MORE ABOUT THEIR PROGRAM
                            </a>
                        </div>
                        <div className="gi-join-img-wrap">
                            <img src={imgNSW} alt="gi-join-img" className="gi-join-img"/>
                            <div className="gi-join-svg-cover gi-join-svg-cover-nsw">
                                <img src={NSW} alt="gi-join-svg" className="gi-join-svg"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default GetInvolvedJoin