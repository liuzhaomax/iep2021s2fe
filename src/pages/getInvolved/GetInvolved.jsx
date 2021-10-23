/****************************************************************************
 * @copyright   LIU Zhao
 * @authors     LIU Zhao (liuzhaomax@163.com)
 * @date        2021/9/24 11:15
 * @version     v1.0
 * @filename    GetInvolved.jsx
 * @description
 ***************************************************************************/

import React from "react"
import "./GetInvolved.css"
import GetInvolvedJoin from "./GetInvolvedJoin";
import GetInvolvedDonate from "./GetInvolvedDonate";
import GetInvolvedConnect from "./GetInvolvedConnect";

class GetInvolved extends React.Component {

    jumpToAnchor = id => {
        document.getElementById(id).scrollIntoView(true)
    }

    render() {
        return (
            <div className="GetInvolved" id="GetInvolved">
                <div className="gi-banner gi-banner-title">
                    <div className="gi-banner-title-text">
                        <h1>Get Involved</h1>
                        <h2>Help safeguard plants from extinction</h2>
                    </div>
                    <div className="gi-banner-shadow">
                        <h2>WHY WE NEED TO INVOLVE IN SAVING ENDANGERED PLANTS</h2>
                        <h3>
                            Once a species of plants is extinct, humans will lose this precious
                            biological resource forever. This may trigger a chain reaction of
                            its ecological chain, leading to a series of species extinctions
                            and even ecosystem instability, causing ecological disasters.
                        </h3>
                        <h2>WHAT YOU CAN DO</h2>
                        <h3>
                            There are multiple ways you can save endangered plants, and one must fit you.
                        </h3>
                        <div className="gi-banner-shadow-btn-wrap">
                            <div className="gi-banner-shadow-btn gi-banner-shadow-btn-join"
                                 onClick={this.jumpToAnchor.bind(this, "GetInvolvedJoin")}
                            >
                                <div className="gi-position-holder"/>
                                <h2>JOIN</h2>
                                <h3>
                                    There are a lot of programs from the government and organisation,
                                    join them as a volunteer.
                                </h3>
                                <h4>LEARN MORE</h4>
                            </div>
                            <div className="gi-banner-shadow-btn gi-banner-shadow-btn-donate"
                                 onClick={this.jumpToAnchor.bind(this, "GetInvolvedDonate")}
                            >
                                <div className="gi-position-holder"/>
                                <h2>DONATE</h2>
                                <h3>
                                    Donation is always the most effective way to support.
                                    You can choose to donate to different organisations.
                                </h3>
                                <h4>LEARN MORE</h4>
                            </div>
                            <div className="gi-banner-shadow-btn gi-banner-shadow-btn-connect"
                                 onClick={this.jumpToAnchor.bind(this, "GetInvolvedConnect")}
                            >
                                <div className="gi-position-holder"/>
                                <h2>CONNECT</h2>
                                <h3>
                                    You can do more. Keep connecting with different organisations
                                    to get what else you can do.
                                </h3>
                                <h4>LEARN MORE</h4>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="gi-transition-blank"/>
                <GetInvolvedJoin/>
                <div className="gi-bg-donate-connect">
                    <GetInvolvedDonate/>
                    <GetInvolvedConnect/>
                </div>
            </div>
        )
    }
}

export default GetInvolved