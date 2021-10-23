/****************************************************************************
 * @copyright   LIU Zhao
 * @authors     LIU Zhao (liuzhaomax@163.com)
 * @date        2021/8/26 3:24
 * @version     v1.0
 * @filename    csvOps.js
 * @description
 ***************************************************************************/

import React from "react";
import ReactDOM from "react-dom"
import {Card, Checkbox, Tag} from "antd";
import quickSort from "./quickSort";
import checkSameValOfTwoArray from "./checkSameValOfTwoArray";
import { EnvironmentFilled, FallOutlined } from '@ant-design/icons'
import none from "../assets/plants/none.png";
import {getCardImgSrc} from "./PlantImg";

let cateStatus
let cateLocation
let cateClass
let cateFamily
let cateGenus

let statusPos
let locationPos
let classPos
let familyPos
let genusPos

const renderFilterCategory = (conditions, pos, onCheck, searchData, catePos) => {
    let containerParent = document.getElementsByClassName("ph-collapse-panel")[pos]
    let container = containerParent.getElementsByClassName("ant-collapse-content-box")[0]
    let time = new Date()
    let elems
    if (container) {
        if (searchData) {
            let needCheckConditions = conditions.filter(value => {
                for (let i = 0; i < searchData.body.length; i++) {
                    if (catePos === locationPos || catePos === statusPos) {
                        if (value === searchData.body[i][catePos]) {
                            return true
                        }
                    } else {
                        if (value.toLowerCase().includes(searchData.body[i][catePos].toLowerCase())) {
                            return true
                        }
                    }
                }
                return false
            })
            elems = conditions.map((value, index) => {
                for (let i = 0; i < needCheckConditions.length; i++) {
                    if (value === needCheckConditions[i]) {
                        return <Checkbox className="check-box"
                                         onChange={onCheck}
                                         defaultChecked
                                         key={value + time}>{value}</Checkbox>
                    }
                }
                return <Checkbox className="check-box"
                                 onChange={onCheck}
                                 defaultChecked={false}
                                 disabled
                                 key={value + time}>{value}</Checkbox>
            })
        } else {
            elems = conditions.map((value, index) => {
                return <Checkbox className="check-box"
                                 onChange={onCheck}
                                 defaultChecked
                                 key={value + time}>{value}</Checkbox>
            })
        }
        ReactDOM.render(elems, container)
    }
}

const initFilterCategory = (data, category) => {
    let pos = data.header.indexOf(category)
    let result = []
    result.push(data.body[0][pos])
    data.body.reduce((prev, curr) => {
        if (result.indexOf(curr[pos]) === -1) {
            result.push(curr[pos])
        }
        return null
    })
    if (category === "Threatened_status") {
        return result
    }
    return quickSort(result)
}

export const initFilter = (data, onCheck, searchData) => {
    cateStatus = initFilterCategory(data,"Threatened_status")
    cateLocation = ["ACT", "NSW", "NT", "QLD", "SA", "TAS", "VIC", "WA", "External territories"]
    cateClass = initFilterCategory(data,"Class")
    cateFamily = initFilterCategory(data,"Family")
    cateGenus = initFilterCategory(data,"Genus")
    statusPos = initCardsData(data, ["Threatened_status"])[0]
    locationPos = initCardsData(data, ["State_found"])[0]
    classPos = initCardsData(data, ["Class"])[0]
    familyPos = initCardsData(data, ["Family"])[0]
    genusPos = initCardsData(data, ["Genus"])[0]
    renderFilterCategory(cateStatus, 0, onCheck, searchData, statusPos)
    renderFilterCategory(cateLocation, 1, onCheck, searchData, locationPos)
    renderFilterCategory(cateClass, 2, onCheck, searchData, classPos)
    renderFilterCategory(cateFamily, 3, onCheck, searchData, familyPos)
    renderFilterCategory(cateGenus, 4, onCheck, searchData, genusPos)
}

const initCardsData = (data, categoryArr) => {
    let posArr = []
    for (let i = 0; i < categoryArr.length; i++) {
        posArr.push(data.header.indexOf(categoryArr[i]))
    }
    return posArr
}

const reload = () => {
    window.location.reload()
}

const renderCardsData = (data, posArr, currentPageNum, pageSize, showDrawer) => {
    let _data = data.body.slice((currentPageNum - 1) * pageSize, currentPageNum * pageSize)
    let container = document.getElementById("ph-list")
    let color
    if (!_data.length) {
        ReactDOM.render(
            <div style={{width:"80%",textAlign:"center",margin:"0 auto",fontSize:"16px",color:"#999"}}>
                <span style={{fontSize:"24px",color:"#338e6c",fontWeight:"bold"}}>
                    Plant Not Found
                </span>
                <br/>
                Click the <span style={{color:"#338e6c",fontWeight:"bold"}}>"Show All"</span> button on the top of the Filters zone,
                or click <span id="ph-list-empty-here"
                            style={{color:"#338e6c",fontWeight:"bold",textDecoration:"underline"}}
                            onClick={reload}>here</span> to reload the Plant Hub page.
                <br/>
                There is no plant matching your recent search.
                <br/>
                If you were using the image recognition functionality,
                please make sure that your image is clear and easily to be distinguished.
                If there is still no result, it means either the plant is not threatened,
                or the plant is not in Australia.
            </div>
            , container
        )
        return
    }
    let cards = _data.map((value, index) => {
        switch (value[posArr[2]]) {
            case "Extinct":
                color = "#5802c9"
                break
            case "Critically Endangered":
                color = "#b40212"
                break
            case "Endangered":
                color = "#d57a03"
                break
            case "Vulnerable":
                color = "#3899ad"
                break
            default:
                color = "#333"
        }
        return (
            <Card className="ph-card" hoverable onClick={showDrawer} key={index}>
                <div className="ph-card-img-container">
                    <img src={none} alt={"img" + index} className="ph-card-img" id={value[posArr[0]]}/>
                </div>
                <p>{value[posArr[0]]}</p>
                <p>{value[posArr[1]]}</p>
                <p style={{"color": color}}>{value[posArr[2]]}</p>
            </Card>
        )
    })
    ReactDOM.render(cards, container)
    setTimeout(() => {
        _data.map(value => {
            let img = document.getElementById(value[posArr[0]])
            getCardImgSrc(value[posArr[0]]).then(src => {
                img.setAttribute("src",  src)
            })
            return value
        })
    },1)
}

export const initCards = (data, currentPageNum, pageSize, showDrawer) => {
    renderCardsData(data,
        initCardsData(data, ["Scientific_Name", "Common_Name", "Threatened_status"]),
        currentPageNum, pageSize, showDrawer)
}

const getFilteredData = (data) => {
    let statusCheckedArr = []
    let locationCheckedArr = []
    let classCheckedArr = []
    let familyCheckedArr = []
    let genusCheckedArr = []
    let container = document.getElementById("PlantHubMain")
    let checkboxes = container.getElementsByClassName("ant-checkbox")
    // get the keys of all checked filters
    for (let i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].classList.contains("ant-checkbox-checked")) {
            if (i < cateStatus.length) {
                statusCheckedArr.push(checkboxes[i].nextElementSibling.innerText)
            } else if (i >= cateStatus.length && i < cateStatus.length + cateLocation.length) {
                locationCheckedArr.push(checkboxes[i].nextElementSibling.innerText)
            } else if (i >= cateLocation.length && i < cateStatus.length + cateLocation.length + cateClass.length) {
                classCheckedArr.push(checkboxes[i].nextElementSibling.innerText)
            } else if (i >= cateClass.length && i < cateStatus.length + cateLocation.length + cateClass.length + cateFamily.length) {
                familyCheckedArr.push(checkboxes[i].nextElementSibling.innerText)
            } else {
                genusCheckedArr.push(checkboxes[i].nextElementSibling.innerText)
            }
        }
    }
    // filtered data
    let filteredData = {}
    filteredData.body = data.body.filter(value => {
        return statusCheckedArr.includes(value[statusPos])
            && checkSameValOfTwoArray(locationCheckedArr, value[locationPos].split(","))
            && classCheckedArr.includes(value[classPos])
            && familyCheckedArr.includes(value[familyPos])
            && genusCheckedArr.includes(value[genusPos])
    })
    return filteredData
}

const getSearchData = (data, searchCondition, sourceFlag) => {
    let _data = {}
    _data.body = data.body.filter(val => {
        for (let i = 0; i < val.length; i++) {
            if (sourceFlag === "tag") {
                if (i === locationPos) {
                    if (val[i].includes(searchCondition)) {
                        return true
                    }
                } else if (i === statusPos) {
                    if (val[i] === searchCondition) {
                        return true
                    }
                } else {
                    if (val[i].includes(searchCondition)) {
                        return true
                    }
                }
            } else {
                if (val[i].toLowerCase().includes(searchCondition.toLowerCase())) {
                    return true
                }
            }
        }
        return false
    })
    return _data
}

const getRecognitionData = (data, searchCondArr, sourceFlag) => {
    let _data = {}
    _data.body = data.body.filter(val => {
        for (let i = 0; i < searchCondArr.length; i++) {
            if (val[0].toLowerCase() === searchCondArr[i].toLowerCase()) {
                return true
            }
        }
        return false
    })
    return _data
}

export const updateCardsWithMultiCond = (data, currentPageNum, pageSize, showDrawer, searchCondArr, onCheck, sourceFlag) => {
    let _data = getRecognitionData(data, searchCondArr, sourceFlag)
    initFilter(data, onCheck, _data)
    renderCardsData(_data,
        initCardsData(data, ["Scientific_Name", "Common_Name", "Threatened_status"]),
        currentPageNum, pageSize, showDrawer)
    return _data.body.length
}

export const updateCards = (data, currentPageNum, pageSize, showDrawer, searchCondition, onCheck, sourceFlag) => {
    let _data
    if (searchCondition) {
        _data = getSearchData(data, searchCondition, sourceFlag)
        initFilter(data, onCheck, _data)
        renderCardsData(_data,
            initCardsData(data, ["Scientific_Name", "Common_Name", "Threatened_status"]),
            currentPageNum, pageSize, showDrawer)
    } else {
        _data = getFilteredData(data)
        renderCardsData(_data,
            initCardsData(data, ["Scientific_Name", "Common_Name", "Threatened_status"]),
            currentPageNum, pageSize, showDrawer)
    }
    return _data.body.length
}

export const checkFilterWithSearchCond = (data, currentPageNum, pageSize, showDrawer, searchCondition, sourceFlag) => {
    let _data
    if (searchCondition) {
        let searchData = getSearchData(data, searchCondition, sourceFlag)
        _data = getFilteredData(searchData)
    } else {
        _data = getFilteredData(data)
    }
    renderCardsData(_data,
        initCardsData(data, ["Scientific_Name", "Common_Name", "Threatened_status"]),
        currentPageNum, pageSize, showDrawer)
    return _data.body.length
}

export const renderTagLocation = (onClickTag) => {
    let box = document.getElementById("ph-search-tag-location")
    let tags = cateLocation.map((value, index) => {
        return <Tag className="ph-search-tag" onMouseDown={onClickTag} key={index}><EnvironmentFilled className="ph-search-tag-icon"/>{value}</Tag>
    })
    ReactDOM.render(tags, box)
}

export const renderTagStatus = (data, onClickTag) => {
    let box = document.getElementById("ph-search-tag-status")
    let tags = cateStatus.map((value, index) => {
        return <Tag className="ph-search-tag" onMouseDown={onClickTag} key={index}><FallOutlined className="ph-search-tag-icon"/>{value}</Tag>
    })
    ReactDOM.render(tags, box)
}

export const renderTagHistory = (onClickTag, removeSearchingHistory) => {
    let historyArr = JSON.parse(window.localStorage.getItem("searchingRecord"))
    if (historyArr.length) {
        let box = document.getElementById("ph-search-tag-history-wrap")
        let tags = historyArr.map((value, index) => {
            return <Tag className="ph-search-tag ph-search-tag-history" id={"ph-search-tag-history-" + index}
                        onMouseDown={onClickTag}
                        closable onClose={removeSearchingHistory} key={index}>{value}</Tag>
        })
        ReactDOM.render(tags, box)
    }
}