/****************************************************************************
 * @copyright   LIU Zhao
 * @authors     LIU Zhao (liuzhaomax@163.com)
 * @date        2021/7/3 0:42
 * @version     v1.0
 * @filename    PlantHub.jsx
 * @description
 ***************************************************************************/

import React from "react"
import "./Home.css"
import {withRouter} from "react-router-dom";
import HomeOverview from "./HomeOverview";
import HomeReason from "./HomeReason";
import HomeTrend from "./HomeTrend";
import HomeExtinct from "./HomeExtinct";
import {Timeline} from 'antd';

class Home extends React.Component {

    componentDidMount() {
        let dots
        if (document.getElementById("home-timeline")) {
            dots = document.getElementById("home-timeline")
                .getElementsByClassName("ant-timeline-item-head")
            this.clickTimelineDot()
        }
        let homeTimelineContainer = document.getElementById("home-timeline-container")
        let homeOverview = document.getElementById("HomeOverview")
        let homeReason = document.getElementById("HomeReason")
        let homeTrend = document.getElementById("HomeTrend")
        let homeExtinct = document.getElementById("HomeExtinct")
        let homeNeedHelp = document.getElementById("home-need-help")
        let homeOverviewTop = homeOverview.getBoundingClientRect().top + ""
        let homeReasonTop = homeReason.getBoundingClientRect().top + ""
        let homeTrendTop = homeTrend.getBoundingClientRect().top + ""
        let homeExtinctTop = homeExtinct.getBoundingClientRect().top + ""
        let homeNeedHelpTop = homeNeedHelp.getBoundingClientRect().top + ""
        homeTimelineContainer.style.display = "none"
        let value = 0
        if (value === 0) {
            homeOverviewTop = homeOverview.getBoundingClientRect().top + ""
            homeReasonTop = homeReason.getBoundingClientRect().top + ""
            homeTrendTop = homeTrend.getBoundingClientRect().top + ""
            homeExtinctTop = homeExtinct.getBoundingClientRect().top + ""
            homeNeedHelpTop = homeNeedHelp.getBoundingClientRect().top + ""
            homeTimelineContainer.style.display = "block"
        }
        window.addEventListener("scroll", () => {
            value = window.scrollY
            // scroll to top to prevent the scroll value bug
            // scroll first, then calc .getBoundingClientRect().top
            if (value === 0) {
                homeOverviewTop = homeOverview.getBoundingClientRect().top + ""
                homeReasonTop = homeReason.getBoundingClientRect().top + ""
                homeTrendTop = homeTrend.getBoundingClientRect().top + ""
                homeExtinctTop = homeExtinct.getBoundingClientRect().top + ""
                homeNeedHelpTop = homeNeedHelp.getBoundingClientRect().top + ""
                homeTimelineContainer.style.display = "block"
            }
            if (dots) {
                for (let j = 0; j < dots.length; j++) {
                    dots[j].style.backgroundColor = "#30406a"
                }
                if (value >= 400 && value < (Number(homeNeedHelpTop) - 400)) {
                    homeTimelineContainer.style.pointerEvents = "all"
                } else {
                    homeTimelineContainer.style.pointerEvents = "none"
                }
                if (value >= Number(homeOverviewTop) - 200 && value < Number(homeReasonTop) - 200) {
                    dots[0].style.backgroundColor = "#B14848"
                } else if (value >= Number(homeReasonTop) - 200 && value < Number(homeTrendTop) - 200) {
                    dots[1].style.backgroundColor = "#B14848"
                } else if (value >= Number(homeTrendTop) - 200 && value < Number(homeExtinctTop) - 200) {
                    dots[2].style.backgroundColor = "#B14848"
                } else if (value >= Number(homeExtinctTop) - 200 && value < Number(homeNeedHelpTop) - 650) {
                    dots[3].style.backgroundColor = "#B14848"
                }
            }
            // fade
            if (value / (Number(homeOverviewTop) - 200) <= 1 && value <= (Number(homeNeedHelpTop) - 650)) {
                homeTimelineContainer.style.opacity = value / (Number(homeOverviewTop) - 200)
            }
            if (value > (Number(homeNeedHelpTop) - 650)) {
                homeTimelineContainer.style.opacity = 1- (1-(Number(homeNeedHelpTop) - 650)/value) *10
            }

        })
        window.onload = () => {
            this.jumpToAnchor("parallax-compo")
        }
    }

    clickTimelineDot = () => {
        let dots = document.getElementById("home-timeline")
            .getElementsByClassName("ant-timeline-item-head")
        for (let i = 0; i < dots.length; i++) {
            dots[i].addEventListener("click", e => {
                let num = 0
                for (let j = 0; j < dots.length; j++) {
                    dots[j].style.backgroundColor = "#30406a"
                    if (dots[j] === e.currentTarget) {
                        num = j
                    }
                }
                e.currentTarget.style.backgroundColor = "#B14848"
                let id = ""
                switch (num) {
                    case 0:
                        id = "HomeOverview"
                        break
                    case 1:
                        id = "HomeReason"
                        break
                    case 2:
                        id = "HomeTrend"
                        break
                    case 3:
                        id = "HomeExtinct"
                        break
                    default:
                        break
                }
                this.jumpToAnchor(id)
            })
        }
    }

    jumpToAnchor = id => {
        setTimeout(() => {
            document.getElementById(id).scrollIntoView(true)
        }, 1)
    }

    render() {
        return (
            <div id="Home" className="Home">
                <div id="home-matter">
                    <h2>Why endangered plants matter?</h2>
                    <p>
                        Endangered plants are exclusive and important to the entire ecosystem and biodiversity.
                    </p>
                    <p>
                        Their ecological, medical, recreational and agricultural significance provide unique value to our earth.
                    </p>
                </div>
                <HomeOverview/>
                <HomeReason/>
                <HomeTrend/>
                <HomeExtinct/>
                <div id="home-timeline-container">
                    {
                        document.body.clientWidth >= 1366 ?
                            <Timeline id="home-timeline">
                                <Timeline.Item/>
                                <Timeline.Item/>
                                <Timeline.Item/>
                                <Timeline.Item/>
                            </Timeline>
                            :
                            null
                    }
                </div>
            </div>
        )
    }
}

export default withRouter(Home)