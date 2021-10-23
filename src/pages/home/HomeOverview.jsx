/****************************************************************************
 * @copyright   LIU Zhao
 * @authors     LIU Zhao (liuzhaomax@163.com)
 * @date        2021/8/22 9:50
 * @version     v1.0
 * @filename    HomeOverview.jsx
 * @description
 ***************************************************************************/

import React from "react"
import "./Home.css"
import "./HomeOverview.css"
import DynamicNum from "../../utils/showDynamicNum";
// import earth from "../../assets/home/earth.png"
import earth from "../../utils/earth";

class HomeOverview extends React.Component {

    componentDidMount() {
        let homeOverview = document.getElementById("HomeOverview")
        let homeReason = document.getElementById("HomeReason")
        let homeOverviewTop = homeOverview.getBoundingClientRect().top + ""
        let homeReasonTop = homeReason.getBoundingClientRect().top + ""
        let timer
        let dynamicFlag = false
        window.addEventListener("scroll", () => {
            let value = window.scrollY
            if (value >= Number(homeOverviewTop) - 200 && value <= Number(homeReasonTop)) {
                timer = setTimeout(() => {
                    dynamicFlag = true
                })
            } else {
                clearTimeout(timer)
                dynamicFlag = false
            }
            if (dynamicFlag) {
                DynamicNum.show("num1", 390800)
                DynamicNum.show("num2", 9400)
                DynamicNum.show("num3", 23845)
                DynamicNum.show("num4", 6.1)
                DynamicNum.show("num5", 1341)
            } else {
                DynamicNum.numberList = {}
            }
        })
        window.onload = async () => {
            await setTimeout(() => {
                homeOverviewTop = homeOverview.getBoundingClientRect().top + ""
                homeReasonTop = homeReason.getBoundingClientRect().top + ""
            }, 1000)
        }
        try {
            earth()
        } catch (e) {
            console.log("Three.js render issue.")
        }
    }

    jumpToAnchor = id => {
        setTimeout(() => {
            document.getElementById(id).scrollIntoView(true)
        }, 1)
    }

    render() {
        return (
            <div className="HomeOverview home-block" id="HomeOverview">
                <div className="home-block-container">
                    <h1>Plant Overview</h1>
                    <div className="home-sub-block-container">
                        <div className="home-overview-stat-title">
                            Approximately
                            <div id="num1" className="dynamic-num dynamic-num-orange"/>
                            plants in the world, with around
                            <div id="num2" className="dynamic-num dynamic-num-red"/>
                            endangered plants (EPs)
                        </div>
                        <div className="home-overview-wrap">
                            <div className="home-overview-wrap-left">
                                <div className="home-overview-intro-au home-overview-text">
                                    <p>
                                        Approximately
                                        <span id="num3" className="dynamic-num dynamic-num-orange"/>
                                        plants in Australia, amounting to
                                        <span id="num4" className="dynamic-num dynamic-num-orange"/>
                                        <span id="num4-percentage">%</span>
                                        of world plants.
                                    </p>
                                </div>
                                <div className="home-overview-intro-au home-overview-text">
                                    <p>
                                        <span id="num5" className="dynamic-num dynamic-num-red"/>
                                        Endangered Plants
                                    </p>
                                </div>
                                <div className="home-overview-intro home-overview-text">
                                    <p>
                                        The plant species in Australia, <span>6.1%</span> of world plants.
                                        There are over <span>1,000</span> plants categorized as endangered
                                        and the number is still increasing.
                                    </p>
                                </div>
                            </div>
                            <div className="home-overview-wrap-right">
                                {/*<img id="home-overview-img" src={earth} alt="earth"/>*/}
                                <canvas id="home-overview-webgl"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default HomeOverview