/****************************************************************************
 * @copyright   LIU Zhao
 * @authors     LIU Zhao (liuzhaomax@163.com)
 * @date        2021/9/26 14:35
 * @version     v1.0
 * @filename    GetInvolvedConnect.jsx
 * @description
 ***************************************************************************/

import React from "react"
import "./GetInvolvedConnect.css"
import WWF from "../../assets/getInvolved/WWF.svg";
import BGC from "../../assets/getInvolved/BGC.svg";
import GA from "../../assets/getInvolved/GA.svg";

class GetInvolvedConnect extends React.Component {
    render() {
        return (
            <div className="GetInvolvedConnect" id="GetInvolvedConnect">
                <div className="gi-connect-container">
                    <h1>CONNECT</h1>
                    <h2>Stay connect with other organisations to stay connect with the latest program.</h2>
                    <div className="gi-connect-container-wrap">
                        <div className="gi-connect-column-wrap">
                            <div className="gi-connect-svg-cover">
                                <img src={WWF} alt="gi-connect-svg" className="gi-connect-svg"/>
                            </div>
                            <div className="gi-connect-text">
                                <h3>
                                    <a href="https://www.wwf.org.au/"
                                       target="view_window"
                                    >WWF</a> aims
                                    to increase public awareness of, and involvement with the protection
                                    and recovery of threatened species and their habitat.
                                </h3>
                            </div>
                        </div>
                        <div className="gi-connect-column-wrap">
                            <div className="gi-connect-svg-cover">
                                <img src={BGC} alt="gi-connect-svg" className="gi-connect-svg"/>
                            </div>
                            <div className="gi-connect-text">
                                <h3>
                                    <a href="https://www.bgci.org/"
                                       target="view_window"
                                    >BGCI</a> aims
                                    to mobilise botanic gardens and engage partners in securing plant
                                    diversity for the well-being of people and the planet.
                                </h3>
                            </div>
                        </div>
                        <div className="gi-connect-column-wrap">
                            <div className="gi-connect-svg-cover">
                                <img src={GA} alt="gi-connect-svg" className="gi-connect-svg"/>
                            </div>
                            <div className="gi-connect-text">
                                <h3>
                                    <a href="https://www.greeningaustralia.org.au/"
                                       target="view_window"
                                    >Greening Australia</a> works
                                    with the community to achieve sustainable land and water resources,
                                    primarily through improving vegetation management practices.
                                </h3>
                            </div>
                        </div>
                    </div>
                    <h2 className="gi-connect-find-more">
                        Find out more organisation through <a href="https://www.greeningaustralia.org.au/"
                           target="view_window"
                        >ANPC</a>
                    </h2>
                </div>
            </div>
        )
    }
}

export default GetInvolvedConnect