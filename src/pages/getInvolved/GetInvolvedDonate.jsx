/****************************************************************************
 * @copyright   LIU Zhao
 * @authors     LIU Zhao (liuzhaomax@163.com)
 * @date        2021/9/26 14:34
 * @version     v1.0
 * @filename    GetInvolvedDonate.jsx
 * @description
 ***************************************************************************/

import React from "react"
import "./GetInvolvedDonate.css"
import ANPC from "../../assets/getInvolved/ANPC.svg";
import FRAME from "../../assets/getInvolved/FRAME.svg";

class GetInvolvedDonate extends React.Component {
    render() {
        return (
            <div className="GetInvolvedDonate" id="GetInvolvedDonate">
                <div className="gi-donate-container">
                    <h1>DONATE</h1>
                    <div className="gi-donate-container-wrap">
                        <div className="gi-donate-row-wrap">
                            <div className="gi-donate-svg-cover">
                                <img src={ANPC} alt="gi-donate-svg" className="gi-donate-svg"/>
                                <a href="https://www.anpc.asn.au/donate/"
                                   target="view_window"
                                >
                                    DONATE NOW
                                </a>
                            </div>
                            <div className="gi-donate-text">
                                <h2>Australian Network for Plant Conservation Inc (ANPC)</h2>
                                <h3>
                                    The ANPC brings together plant conservationists from all walks of life
                                    to inform and inspire each other in our efforts to save Australia’s plants,
                                    especially those threatened with extinction. Donate to the ANPC to support their
                                    projects and networks of people working in plant conservation.
                                </h3>
                            </div>
                        </div>
                        <div className="gi-donate-row-wrap">
                            <div className="gi-donate-svg-cover">
                                <img src={FRAME} alt="gi-donate-svg" className="gi-donate-svg"/>
                                <a href="https://www.fame.org.au/projects/securing-the-future-of-australias-most-endangered-macadamia-species-macadamia-jansenii"
                                   target="view_window"
                                >
                                    DONATE NOW
                                </a>
                            </div>
                            <div className="gi-donate-text">
                                <h2>Frame</h2>
                                <h3>
                                    Securing the future of Australia’s most endangered macadamia species:
                                    Macadamia Jansenii - Australia's national nut. It is one of Australia’s
                                    most endangered species, with only 90 known trees remaining in a 6000m2
                                    area of natural habitat.
                                </h3>
                                <h3>
                                    In partnership with FAME and the Macadamia Conservation Trust this reintroduction
                                    program is under way with the involvement of the Gidarjil Rangers
                                    (Traditional Owners of M. Jansenii habitat), the Queensland Parks and Wildlife Service,
                                    the University of the Sunshine Coast and the Tondoon Botanic Gardens at Gladstone.
                                </h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default GetInvolvedDonate