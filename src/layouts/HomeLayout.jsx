/****************************************************************************
 * @copyright   LIU Zhao
 * @authors     LIU Zhao (liuzhaomax@163.com)
 * @date        2021/7/27 22:45
 * @version     v1.0
 * @filename    HomeLayout.jsx
 * @description
 ***************************************************************************/

import React from "react"
import "./HomeLayout.css";
import HomeNav from "./HomeNav";
import sq from "../assets/leaves/sq.png"
import bg from "../assets/leaves/bg.png"
import bottomleft from "../assets/leaves/bottomleft.png"
import bottomright from "../assets/leaves/bottomright.png"
import right from "../assets/leaves/right.png"
import top from "../assets/leaves/top.png"
import topleft from "../assets/leaves/topleft.png"
import topright from "../assets/leaves/topright.png"
import handssq from "../assets/leaves/handssq.png"
import {Button} from "antd";
import Footer from "./Footer";

class HomeLayout extends React.Component {

    componentDidMount() {
        let handssq = document.getElementById("handssq")
        let right = document.getElementById("right")
        let bottomright = document.getElementById("bottomright")
        let topleft = document.getElementById("topleft")
        let topright = document.getElementById("topright")
        let top = document.getElementById("top")
        let bottomleft = document.getElementById("bottomleft")
        let explore = document.getElementById("explore")
        let text = document.getElementById("text")
        let slogan1 = document.getElementById("slogan1")
        let slogan2 = document.getElementById("slogan2")
        let instruction = document.getElementById("instruction")
        window.addEventListener("scroll", () => {
            let value = window.scrollY
            top.style.marginTop = - value * 0.1 + "px"
            top.style.marginLeft = - value * 2 + "px"
            right.style.marginLeft = value * 2 + "px"
            topleft.style.marginLeft = - value * 0.5 + "px"
            topleft.style.marginTop = - value * 0.5 + "px"
            topright.style.marginLeft = value * 0.5 + "px"
            topright.style.marginBottom = value * 0.5 + "px"
            bottomright.style.marginTop = value * 0.5 + "px"
            bottomright.style.marginLeft = value * 0.7 + "px"
            bottomleft.style.marginLeft = - value * 0.9 + "px"
            bottomleft.style.marginTop = value * 0.9 + "px"
            text.style.marginRight = value * 5 + "px"
            text.style.marginTop = value * 1.5 - 420 + "px"
            slogan1.style.marginLeft = value * 5 + "px"
            slogan1.style.marginTop = value * 1.5 - 220 + "px"
            slogan2.style.marginLeft = value * 5 + "px"
            slogan2.style.marginTop = value * 1.5 - 130 + "px"
            instruction.style.marginTop = value * 1.5 - 10 + "px"
            instruction.style.marginLeft = value * 5 + "px"
            explore.style.marginTop = value * 0.58  + 100 + "px"
            handssq.style.opacity = value / 100
        })
    }

    mousemove = e => {
        let right = document.getElementById("right")
        let bottomright = document.getElementById("bottomright")
        let topleft = document.getElementById("topleft")
        let topright = document.getElementById("topright")
        let top = document.getElementById("top")
        let bottomleft = document.getElementById("bottomleft")
        e.mx = e.pageX || e.clientX + document.body.scrollLeft;
        let windowWidth = document.body.clientWidth
        let centerW = windowWidth / 2
        right.style.marginLeft = (centerW - e.mx)/5 * 0.05 + "px"
        bottomright.style.marginLeft = (centerW - e.mx)/5 * 0.15 + "px"
        topleft.style.marginLeft = (centerW - e.mx)/5 * 0.2 + "px"
        topright.style.marginLeft = (centerW - e.mx)/5 * 0.05 + "px"
        top.style.marginLeft = (centerW - e.mx)/5 * 0.15 + "px"
        bottomleft.style.marginLeft = (centerW - e.mx)/5 * 0.3 + "px"
        e.my = e.pageY || e.clientY + document.body.scrollTop;
        let windowHeight = document.body.clientHeight
        let centerH = windowHeight / 2
        bottomleft.style.marginTop = (centerH - e.my)/5 * 0.2 + "px"
        right.style.marginTop = (centerH - e.my)/5 * 0.1 + "px"
        topleft.style.marginTop = (centerH - e.my)/5 * 0.2 + "px"
        bottomright.style.marginTop = (centerH - e.my)/5 * 0.1 + "px"
    }

    explore = () => {
        document.getElementById("HomeOverview").scrollIntoView(true)
    }

    render() {
        let { component: Component } = this.props
        return (
            <div className="HomeLayout" onMouseMove={this.mousemove}>
                <HomeNav/>
                <div className="home-bg"/>
                <section id="parallax-compo">
                    <img id="bg" src={bg} alt="bg"/>
                    <img id="handssq" src={handssq} alt="handssq"/>
                    <img id="sq" src={sq} alt="sq"/>
                    <img id="right" src={right} alt="right"/>
                    <img id="bottomright" src={bottomright} alt="bottomright"/>
                    <img id="topleft" src={topleft} alt="topleft"/>
                    <img id="topright" src={topright} alt="topright"/>
                    <img id="top" src={top} alt="top"/>
                    <img id="bottomleft" src={bottomleft} alt="bottomleft"/>
                    <h3 id="text">Conservation of Endangered Plants</h3>
                    <h4 id="slogan1">SAVING RARE PLANTS</h4>
                    <h4 id="slogan2">FOR FUTURE GENERATIONS</h4>
                    <h6 id="instruction">Know more about the plants in Australia</h6>
                    <Button id="explore" shape="round" onClick={this.explore}>Explore</Button>
                </section>
                <Component/>
                <Footer/>
            </div>
        )
    }
}

export default HomeLayout

