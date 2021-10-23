/****************************************************************************
 * @copyright   LIU Zhao
 * @authors     LIU Zhao (liuzhaomax@163.com)
 * @date        2021/9/4 6:02
 * @version     v1.0
 * @filename    AboutUs.jsx
 * @description
 ***************************************************************************/

import React from "react"
import "./AboutUs.css"
import goal from "../../assets/about/goal.png"

const srcVideo1 = "https://www.youtube.com/embed/auQpTzPxdiQ"
const srcVideo2 = "https://www.youtube.com/embed/1rWSIpNN_qk"

class AboutUs extends React.Component {
    constructor() {
        super();
        this.state = {
            play: {
                v1: false,
                v2: false
            }
        }
    }

    render() {
        return (
            <div className="AboutUs" id="AboutUs">
                <div className="ab-banner ab-banner-video">
                    <div className="ab-content-video">
                        <div className="ab-content-video-container">
                            <iframe width="560" height="315" src={srcVideo1}
                                    title="YouTube video player" frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen className="ab-video"/>
                        </div>
                        <div className="ab-content-video-container">
                            <iframe width="560" height="315" src={srcVideo2}
                                    title="YouTube video player" frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen className="ab-video"/>
                        </div>
                    </div>
                </div>
                <div className="ab-content">
                    <div className="ab-us-container">
                        <div className="ab-us-p-container">
                            <h2>Company Profile</h2>
                            <p className="ab-p ab-us-p">
                                Flora Protech is founded in 2021.
                                Our company is composed of people with different technical background and roles
                                such as strategist, developer, data engineer and designer. As a start-up company,
                                we are dedicated to making it easier for individuals to know more about
                                the current situation of endangered plants and bring them back to the nature,
                                save plants, protect biodiversity.
                                <span> All by browsing our website!</span>
                            </p>
                            <p className="ab-p ab-us-p">
                                Our vision is to arouse individual and social awareness of protecting the environment
                                through integrating and providing information about endangered and non-endangered plants.
                                In the future, we plan to expand our project to worldwide scale.
                                <span> Not only Australia needs us, but the world also need us!</span>
                            </p>
                        </div>
                        <img src={goal} alt="goal"/>
                    </div>
                </div>
            </div>
        )
    }
}

export default AboutUs