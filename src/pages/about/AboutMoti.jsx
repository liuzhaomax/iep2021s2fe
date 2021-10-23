/****************************************************************************
 * @copyright   LIU Zhao
 * @authors     LIU Zhao (liuzhaomax@163.com)
 * @date        2021/9/4 6:04
 * @version     v1.0
 * @filename    AboutMoti.jsx
 * @description
 ***************************************************************************/

import React from "react"
import "./AboutMoti.css"
import conf from "../../assets/about/conf.jpg";
import ag from "../../assets/about/ag.jpg";

class AboutMoti extends React.Component {
    render() {
        return (
            <div className="AboutMoti" id="AboutMoti">
                <div className="ab-banner ab-banner-moti">
                    <h1>OUR MOTIVATION</h1>
                </div>
                <div className="ab-content">
                    <h2>IT’S TIME TO DO SOMETHING FOR OUR EARTH AND FUTURE GENERATIONS!</h2>
                    <div className="ab-moti-container">
                        <p className="ab-p ab-moti-p">
                            The recent United Nations Climate Change Conference pointed out
                            that actions are required immediately to protect our earth.
                            Climate is changing towards a wrong direction in a rapid rate.
                            More frequent natural disasters and global warming have led to the loss of biodiversity.
                            Some scientists also predict that human beings may be eliminated within hundreds of years.
                            To share our little strength in protecting ourselves,
                            we decided to start this project to save endangered plants.
                            Everyone in Flora Protech are full of passion to save our earth.
                            We strongly believed that our project can be successful.
                        </p>
                        <div className="ab-moti-img-wrap">
                            <img src={conf} alt="conf"/>
                            <h3>UN Climate Change Conference</h3>
                        </div>
                    </div>
                </div>
                <div className="ab-banner ab-moti-banner-celebrity">
                    <div className="ab-moti-content-celebrity">
                        <div className="ab-moti-content-celebrity-container ab-moti-content-celebrity-person">
                            <img src={ag} alt="ag"/>
                            <h3>ANTÓNIO GUTERRES</h3>
                            <p>United Nations Secretary-General</p>
                        </div>
                        <div className="ab-moti-content-celebrity-container ab-moti-content-celebrity-saying">
                            <h2>“As today’s IPCC report makes clear, there is no time for delay and no room for excuses.”</h2>
                            <p>9 August 2021</p>
                            <a href="https://www.un.org/sw/node/81993">Reference: https://www.un.org/sw/node/81993</a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default AboutMoti