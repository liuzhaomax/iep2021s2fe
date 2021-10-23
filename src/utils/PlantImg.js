/****************************************************************************
 * @copyright   LIU Zhao
 * @authors     LIU Zhao (liuzhaomax@163.com)
 * @date        2021/9/12 18:07
 * @version     v1.0
 * @filename    PlantImg.js
 * @description
 ***************************************************************************/

import {Carousel, Image} from "antd";
import none from "../assets/plants/none.png";
import React from "react";
import "../pages/plantHub/PlantHubMain.css"
import ReactDOM from "react-dom";
import axios from "axios";
import config from "../config/config"

const basicPath = "/static/plantsphoto"

const getImages = async plantName => {
    let pathArr
    let folderPath = basicPath + "/" + plantName.split(" ").join("%20") + "/"
    await axios.get(folderPath)
        .then(res => {
            let noBackslashRes = res.data.split("\n").join("")
            let nullRes = noBackslashRes.split("<pre>").slice(1).join("").split("</pre>").slice(0,1).join("").trim()
            if (nullRes === "" || nullRes === `<a href="../">../</a>`) {
                pathArr = [none]
            } else {
                let rawArr = res.data.split(`">`).slice(1)
                if (rawArr[0][0] === ".") {
                    rawArr = rawArr.slice(1)  // prod env: nginx static server has a previous-folder link "../"
                }
                pathArr = rawArr.map(value => {
                    return folderPath + encodeURIComponent(value.split("</a>")[0])
                })
            }
        })
        .catch(err => {
            return err
        })
    return pathArr
}

export const getCardImgSrc = async plantName => {
    let pathArrPromise = getImages(plantName)
    let src
    await pathArrPromise.then(pathArr => {
        if (pathArr[0] === none) {
            src = none
        } else {
            src = config.beBaseUrl + pathArr[0]
        }
    })
    return src
}

export const loadDrawerImg = plantName => {
    let pathArrPromise = getImages(plantName)
    pathArrPromise.then(pathArr => {
        let time = new Date()
        let box = document.getElementById("ph-plant-detail-img-container")
        let imgWrap = pathArr.map(value => {
            return (
                <div className="ph-plant-detail-img-wrap" key={value + time}>
                    <Image src={value === none ? none : config.beBaseUrl + value}
                           width={700}
                           height={500}
                           preview={false}
                           className="ph-plant-detail-img"
                    />
                </div>
            )
        })
        ReactDOM.render((
            <Carousel autoplaySpeed={5000}
                      autoplay
                      style={{width: 700 + "px", height: 500 + "px"}}
                      className="ph-drawer-carousel"
                      key={"ph-drawer-carousel" + time}
            >
                { imgWrap }
            </Carousel>
        ), box)
    })
}
