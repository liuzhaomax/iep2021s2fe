/****************************************************************************
 * @copyright   LIU Zhao
 * @authors     LIU Zhao (liuzhaomax@163.com)
 * @date        2021/7/3 0:42
 * @version     v1.0
 * @filename    PlantHub.jsx
 * @description
 ***************************************************************************/

import React from "react"
import "./PlantHub.css"
import {withRouter} from "react-router-dom";
import {Button, Layout, Input, Tag} from "antd";
import { SearchOutlined, CameraFilled, VerticalAlignTopOutlined, FireFilled } from "@ant-design/icons";
import PlantHubMain from "./PlantHubMain";
import {
    renderTagHistory,
    renderTagLocation,
    renderTagStatus,
    updateCards,
    updateCardsWithMultiCond
} from "../../utils/csvOps";
import { Upload, notification } from "antd";
import { InboxOutlined, FrownOutlined, SmileOutlined } from "@ant-design/icons";
import axios from "axios";

const { Dragger } = Upload;

class PlantHub extends React.Component {
    constructor() {
        super();
        this.state = {
            data: null,
            showDrawer: null,
            clearFilters: null,
            onCheckFilter: null,
            pageSize: 10,
            searchBarValue: ""
        }
        this.propsCamera = {
            name: "image",
            multiple: false,
            // action: "http://34.125.105.204:5000/predictPlant",
            beforeUpload: file => {
                if (file.type !== "image/png" && file.type !== "image/jpeg") {
                    notification.open({
                        message: "File type error",
                        description: `${file.name} is not a png or jpeg (jpg) file`,
                        icon: <FrownOutlined style={{ color: "#ff4d4f" }} />,
                    })
                }
                return file.type === "image/png" || file.type === "image/jpeg" ? true : Upload.LIST_IGNORE;
            },
            onChange(info) {
                const { status } = info.file
                if (status === "done") {
                    notification.open({
                        message: "Image uploaded successfully",
                        description: `${info.file.name} image uploaded successfully.`,
                        icon: <SmileOutlined style={{ color: "#52c41a" }} />,
                    })
                } else if (status === "error") {
                    notification.open({
                        message: "Image upload failed",
                        description: `${info.file.name} image upload failed.`,
                        icon: <FrownOutlined style={{ color: "#ff4d4f" }} />,
                    })
                }
            },
            onDrop(e) {
                console.log("Dropped files", e.dataTransfer.files)
            },
        }
    }

    componentDidMount() {
        this.scrolling()
        if (!window.localStorage.getItem("searchingRecord")) {
            window.localStorage.setItem("searchingRecord", JSON.stringify([]))
        }
        document.getElementById("ph-search-bar-prefix").addEventListener("click", this.onPressEnterSearchBar)
        document.getElementById("ph-search-bar-suffix").addEventListener("click", this.onClickCamera)
    }

    getData = data => {
        this.setState({
            data: data
        })
        renderTagLocation(this.onClickTag)
        renderTagStatus(data, this.onClickTag)
        renderTagHistory(this.onClickTag, this.removeSearchingHistory)
    }

    getShowDrawer = (showDrawer) => {
        this.setState({
            showDrawer: showDrawer
        })
    }

    getClearFilters = (clearFilters) => {
        this.setState({
            clearFilters: clearFilters
        })
    }

    getOnCheckFilter = (onCheckFilter) => {
        this.setState({
            onCheckFilter: onCheckFilter
        })
    }

    getPageSize = (pageSize) => {
        this.setState({
            pageSize: pageSize
        })
    }

    scrolling = () => {
        let btnToTop = document.getElementById("ph-btn-to-top")
        let searchBar = document.getElementById("PlantHub")
            .getElementsByClassName("ant-input-affix-wrapper")[0]
        let searchBarTop = searchBar.getBoundingClientRect().top + ""
        let phBanner = document.getElementById("ph-banner")
        let phBannerHeight = window.getComputedStyle(phBanner).height.split("px")[0]
        let phBg = document.getElementById("ph-layout-search-bar")
        let phBgHeight = window.getComputedStyle(phBg).height.split("px")[0]
        let searchContainer = document.getElementById("ph-search-bar-container")
        let phMain = document.getElementById("PlantHubMain")
        let value = 0
        window.addEventListener("scroll", () => {
            value = window.scrollY
            let trigger = Number(phBgHeight) - (Number(searchBarTop) - Number(phBannerHeight)/2)
            if (value === 0) {
                searchContainer.style.top = 0 + "px"
                phBanner.style.position = "relative"
                phBanner.style.top = Number(phBgHeight) + "px"
                phMain.style.top = 0 + "px"
                btnToTop.style.display = "none"
            } else if (value <= trigger && value > 0) {
                searchContainer.style.top = 0 + "px"
                phBanner.style.position = "relative"
                phBanner.style.top = Number(phBgHeight) + "px"
                phMain.style.top = 0 + "px"
                btnToTop.style.display = "none"
            } else if (value > trigger && value < Number(phBgHeight)) {
                searchContainer.style.top = trigger - value + "px"
                phBanner.style.position = "relative"
                phBanner.style.top = Number(phBgHeight) + "px"
                phMain.style.top = 0 + "px"
                btnToTop.style.display = "none"
            } else if (value >= Number(phBgHeight)) {
                searchContainer.style.top = trigger - Number(phBgHeight) + "px"
                phBanner.style.position = "fixed"
                phBanner.style.top = 0 + "px"
                phMain.style.top = Number(phBannerHeight) + "px"
                btnToTop.style.display = "block"
            }
        })
        window.onload = () => {
            this.jumpToAnchor("PlantHub")
        }
    }

    browseAll = () => {
        this.onBlurCameraBox()
        setTimeout(() => {
            document.getElementById("ph-banner").scrollIntoView(true)
        }, 1)
    }

    scrollToTop = () => {
        let phBg = document.getElementById("ph-layout-search-bar")
        let phBgHeight = window.getComputedStyle(phBg).height.split("px")[0]
        window.scrollTo(0, Number(phBgHeight))
        this.onBlurCameraBox()
    }

    jumpToAnchor = id => {
        setTimeout(() => {
            document.getElementById(id).scrollIntoView(true)
        }, 1)
    }

    onBlurSearchBar = () => {
        let searchBox = document.getElementById("ph-search-bar-box")
        setTimeout(() => {
            searchBox.style.visibility = "hidden"
        },2)
    }

    onBlurCameraBox = () => {
        let cameraBox = document.getElementById("ph-search-camera-box")
        setTimeout(() => {
            cameraBox.style.visibility = "hidden"
        },2)
    }

    onClickSearchBar = () => {
        let box = document.getElementById("ph-search-bar-box")
        let historyTitle = document.getElementById("ph-search-tag-history-title")
        let historyTagWrap = document.getElementById("ph-search-tag-history-wrap")
        box.style.visibility = "visible"
        if (window.localStorage.getItem("searchingRecord")) {
            if (JSON.parse(window.localStorage.getItem("searchingRecord")).length) {
                historyTitle.style.display = "block"
                historyTagWrap.style.display = "flex"
            } else {
                historyTitle.style.display = "none"
                historyTagWrap.style.display = "none"
            }
        }
        renderTagHistory(this.onClickTag, this.removeSearchingHistory)
        this.onBlurCameraBox()
    }

    onChangeSearchBar = e => {
        this.setState({
            searchBarValue: e.target.value
        })
    }

    setSearchBarValue = (value) => {
        this.setState({
            searchBarValue: value
        })
    }

    removeSearchingHistory = () => {
        let historyTagWrap = document.getElementById("ph-search-tag-history-wrap")
        let historyArr = JSON.parse(window.localStorage.getItem("searchingRecord"))
        let prepareToDeleteArr = []
        if (historyTagWrap.children) {
            setTimeout(() => {
                for (let i = 0; i < historyTagWrap.children.length; i++) {
                    if (historyTagWrap.children[i].classList.contains("ant-tag-hidden")) {
                        prepareToDeleteArr.push(historyTagWrap.children[i].textContent)
                    }
                }
                let newHistoryArr = historyArr.filter((value) => {
                    return prepareToDeleteArr.indexOf(value) === -1
                })
                window.localStorage.setItem("searchingRecord", JSON.stringify(newHistoryArr))
            },1)
        }
    }

    onClickTag = e => {
        let searchCond = e.currentTarget.textContent.trim()
        let keywords = document.getElementById("ph-keywords")
        keywords.getElementsByTagName("span")[0].innerText = searchCond
        let totalItemsNum
        let tagId = e.currentTarget.getAttribute("id")
        if (tagId) {
            let tagIdArr = tagId.split("-")
            tagIdArr.splice(-1)
            tagId = tagIdArr.join("-")
        }
        if (tagId === "ph-search-tag-history") {
            totalItemsNum = updateCards(this.state.data, 1, this.state.pageSize,
                this.state.showDrawer, searchCond, this.state.onCheckFilter, "search")
        } else {
            totalItemsNum = updateCards(this.state.data, 1, this.state.pageSize,
                this.state.showDrawer, searchCond, this.state.onCheckFilter, "tag")
        }
        this.setState({
            searchBarValue: searchCond
        })
        this.setPagination(totalItemsNum, this.state.sourceFlag)
        this.onBlurSearchBar()
        this.onBlurCameraBox()
        this.browseAll()
    }

    onPressEnterSearchBar = e => {
        let searchCond
        if (e.target.value) {
            searchCond = e.target.value.trim()
        } else {
            searchCond = document.getElementById("ph-search-bar").getAttribute("value").trim()
        }
        let keywords = document.getElementById("ph-keywords")
        let totalItemsNum
        if (searchCond) {
            keywords.getElementsByTagName("span")[0].innerText = searchCond
            totalItemsNum = updateCards(this.state.data, 1, this.state.pageSize,
                this.state.showDrawer, searchCond, this.state.onCheckFilter, "search")
            this.updateSearchingRecord(searchCond)
        } else {
            totalItemsNum = updateCards(this.state.data, 1, this.state.pageSize,
                this.state.showDrawer, searchCond, this.state.onCheckFilter, "search")
            keywords.getElementsByTagName("span")[0].innerText = "All Plants"
            this.state.clearFilters()
        }
        this.setPagination(totalItemsNum, "search")
        this.onBlurSearchBar()
        this.onBlurCameraBox()
        this.browseAll()
    }

    customRequest = (info) => {
        const { file } = info
        let params = new FormData()
        params.append("my_image", file)
        axios.post("http://www.endangeredplantsaus.ga/predictPlant", params, {
            onUploadProgress: ({ total, loaded }) => {
                info.onProgress({ percent: Math.round((loaded / total) * 100).toFixed(2) }, file)
            },
        })
            .then(res => {
                this.showImageRecognition(res.data, 60)
                info.onSuccess(res, info.file)
            })
            .catch(err => {
                info.onError(err, info.file)
            })
    }

    showImageRecognition = (recogArr, matchLevel) => {
        let keywords = document.getElementById("ph-keywords")
        let totalItemsNum
        let searchCondArr = []
        for (let i = 0; i < recogArr.length; i++) {
            if (Number(recogArr[i].score) >= matchLevel && !searchCondArr.includes(recogArr[i]["Scientific_Name"])) {
                searchCondArr.push(recogArr[i]["Scientific_Name"])
            }
        }
        totalItemsNum = updateCardsWithMultiCond(this.state.data, 1, this.state.pageSize,
            this.state.showDrawer, searchCondArr, this.state.onCheckFilter, "recognition")
        keywords.getElementsByTagName("span")[0].innerText = "Image Recognition"
        this.updateSearchingRecord(searchCondArr)
        this.setState({
            searchBarValue: ""
        })
        this.setPagination(totalItemsNum, this.state.sourceFlag)
        this.onBlurSearchBar()
        this.onBlurCameraBox()
        this.browseAll()
    }

    onClickCamera = () => {
        this.onBlurSearchBar()
        let cameraBox = document.getElementById("ph-search-camera-box")
        setTimeout(() => {
            if (cameraBox.style.visibility !== "visible") {
                cameraBox.style.visibility = "visible"
            } else {
                cameraBox.style.visibility = "hidden"
            }
        },3)
    }

    updateSearchingRecord = (searchCond) => {
        let historyArr = JSON.parse(window.localStorage.getItem("searchingRecord"))
        let repeatFlag = false
        let repeatIndex
        for (let i = 0; i < historyArr.length; i++) {
            if (searchCond === historyArr[i]) {
                repeatFlag = true
                repeatIndex = i
                break
            }
        }
        if (repeatFlag) {
            historyArr.splice(repeatIndex, 1)
        }
        historyArr.reverse()
        historyArr.push(searchCond)
        let historyStr = historyArr.join("")
        while (historyStr.length > 100 || historyArr.length > 10) {
            historyArr = historyArr.slice(1)
            historyStr = historyArr.join("")
        }
        historyArr.reverse()
        window.localStorage.setItem("searchingRecord", JSON.stringify(historyArr))
    }

    pagiEvent = (_this) => {
        this.$child = _this
    }

    setPagination = (totalItemsNum, sourceFlag) => {
        this.$child.setTotalItemsNum(totalItemsNum)
        this.$child.resetPageNum(1)
        this.$child.setSourceFlag(sourceFlag)
    }

    render() {
        return (
            <div id="PlantHub" className="PlantHub">
                <Layout id="ph-layout-search-bar">
                    <Layout id="ph-layout-search-bar-panel">
                        <h1>Plants Search</h1>
                        <p>All information in one click</p>
                        <Button id="ph-btn-browse-all" type="primary" onClick={this.browseAll}>Browse All the Plants</Button>
                    </Layout>
                </Layout>
                <Layout id="ph-search-bar-container">
                    <Input id="ph-search-bar"
                           value={this.state.searchBarValue}
                           onClick={this.onClickSearchBar}
                           onBlur={this.onBlurSearchBar}
                           onPressEnter={this.onPressEnterSearchBar}
                           onChange={this.onChangeSearchBar}
                           placeholder="Search Plants by Names, Genus, Family etc."
                           maxLength={50}
                           prefix={<SearchOutlined id="ph-search-bar-prefix" className="ph-inner-icon"/>}
                           suffix={<CameraFilled id="ph-search-bar-suffix" className="ph-inner-icon"/>}
                    />
                    <div id="ph-search-bar-box">
                        <h3 id="ph-search-tag-history-title">Searching History</h3>
                        <div className="ph-search-tag-wrap" id="ph-search-tag-history-wrap"/>
                        <h3>Popular Search</h3>
                        <div className="ph-search-tag-wrap">
                            <Tag className="ph-search-tag" onMouseDown={this.onClickTag}><FireFilled className="ph-search-tag-icon"/>Darwinia collina</Tag>
                            <Tag className="ph-search-tag" onMouseDown={this.onClickTag}><FireFilled className="ph-search-tag-icon"/>Acacia auratiflora</Tag>
                            <Tag className="ph-search-tag" onMouseDown={this.onClickTag}><FireFilled className="ph-search-tag-icon"/>Melicytus latifolius</Tag>
                            <Tag className="ph-search-tag" onMouseDown={this.onClickTag}><FireFilled className="ph-search-tag-icon"/>Pultenaea</Tag>
                            <Tag className="ph-search-tag" onMouseDown={this.onClickTag}><FireFilled className="ph-search-tag-icon"/>Hensmania chapmanii</Tag>
                        </div>
                        <h3>View by States</h3>
                        <div className="ph-search-tag-wrap" id="ph-search-tag-location"/>
                        <h3>View by Threatened Status</h3>
                        <div className="ph-search-tag-wrap" id="ph-search-tag-status"/>
                    </div>
                    <div id="ph-search-camera-box">
                        <Dragger {...this.propsCamera} customRequest={this.customRequest}>
                            <p className="ant-upload-drag-icon">
                                <InboxOutlined />
                            </p>
                            <p className="ant-upload-text">Click or drag an image file to this area to upload</p>
                            <p className="ant-upload-text">
                                Support for a single or bulk upload.
                                The filename extension only allows ".jpg", ".png", ".jpeg".
                            </p>
                            <p className="ant-upload-hint">
                                Detectron2 Citing Declaration:
                                Authors: Yuxin Wu and Alexander Kirillov and Francisco Massa and Wan-Yen Lo and Ross Girshick;
                                <br/>
                                Published Year: 2019;
                                Published URL: https://github.com/facebookresearch/detectron2
                            </p>
                        </Dragger>
                    </div>
                </Layout>
                <div id="ph-banner" className="ph-layout"/>
                <PlantHubMain
                    getData={this.getData}
                    getShowDrawer={this.getShowDrawer}
                    pagiEvent={this.pagiEvent}
                    getClearFilters={this.getClearFilters}
                    getOnCheckFilter={this.getOnCheckFilter}
                    getPageSize={this.getPageSize}
                    setSearchBarValue={this.setSearchBarValue}
                    onBlurCameraBox={this.onBlurCameraBox}
                />
                <VerticalAlignTopOutlined id="ph-btn-to-top" onClick={this.scrollToTop}/>
            </div>
        )
    }
}

export default withRouter(PlantHub)