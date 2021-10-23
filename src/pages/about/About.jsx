/****************************************************************************
 * @copyright   LIU Zhao
 * @authors     LIU Zhao (liuzhaomax@163.com)
 * @date        2021/9/3 14:52
 * @version     v1.0
 * @filename    About.jsx
 * @description
 ***************************************************************************/

import React from "react"
import "./About.css"
import btnUs from "../../assets/about/btn_about.jpg"
import btnMoti from "../../assets/about/btn_moti.jpg"
import btnStory from "../../assets/about/btn_story.jpg"
import AboutUs from "./AboutUs";
import AboutMoti from "./AboutMoti";
import AboutStory from "./AboutStory";
import AboutFuture from "./AboutFuture";

class About extends React.Component {

    componentDidMount() {
        window.onload = () => {
            this.jumpToAnchor("About")
        }
    }

    jumpToAnchor = id => {
        setTimeout(() => {
            document.getElementById(id).scrollIntoView(true)
        }, 1)
    }

    onClick = e => {
        document.getElementById(e.target.name).scrollIntoView(true)
    }

    render() {
        return (
            <div className="About" id="About">
                <div className="ab-banner ab-banner-title">
                    <h1>FLORA PROTECH</h1>
                    <h2>A NON-PROFIT COMPANY FOCUSING ON SAVING PLANTS</h2>
                    <h3>Email: info@floraprotech.com</h3>
                </div>
                <div className="ab-content">
                    <p className="ab-p ab-profile">
                        Flora Protech is a company devoting to save endangered plants
                        through IT and machine learning technology in Australia.
                        Our vision is to arouse individual and social awareness of protecting the environment
                        through integrating and providing information about endangered and non-endangered plants.
                    </p>
                    <h1>“SAVE PLANTS, SAVE OURSELVES”</h1>
                    <div className="ab-btn-nav-wrap">
                        <div className="ab-btn-nav-wrap-left ab-btn-nav-sub-wrap" id="ab-btn-nav-us"
                            onClick={this.onClick}
                        >
                            <img src={btnUs} alt="btnUs" name="AboutUs"/>
                            <h2>ABOUT US</h2>
                        </div>
                        <div className="ab-btn-nav-wrap-middle ab-btn-nav-sub-wrap" id="ab-btn-nav-moti"
                             onClick={this.onClick}
                        >
                            <img src={btnMoti} alt="btnMoti" name="AboutMoti"/>
                            <h2>OUR MOTIVATION</h2>
                        </div>
                        <div className="ab-btn-nav-wrap-right ab-btn-nav-sub-wrap" id="ab-btn-nav-story"
                             onClick={this.onClick}
                        >
                            <img src={btnStory} alt="btnStory" name="AboutStory"/>
                            <h2>OUR STORY</h2>
                        </div>
                    </div>
                </div>
                <AboutUs/>
                <AboutMoti/>
                <AboutStory/>
                <AboutFuture/>
            </div>
        )
    }
}

export default About