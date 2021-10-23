/****************************************************************************
 * @copyright   LIU Zhao
 * @authors     LIU Zhao (liuzhaomax@163.com)
 * @date        2021/8/21 12:19
 * @version     v1.0
 * @filename    PlantHubMain.jsx
 * @description
 ***************************************************************************/

import React from "react"
import "./PlantHubMain.css"
import {Layout, Collapse, Pagination, Drawer} from "antd";
import { CloseCircleTwoTone, setTwoToneColor } from '@ant-design/icons';
import axios from "axios";
import {WEBSITE_1} from "../../config/constants";
import {initFilter, initCards, updateCards, checkFilterWithSearchCond} from "../../utils/csvOps";
import {loadDrawerImg} from "../../utils/PlantImg"

setTwoToneColor('#338e6c')
const { Panel } = Collapse
let data = {
    header: null,
    body: null,
    length: 0
}

class PlantHubMain extends React.Component {
    constructor() {
        super();
        this.state = {
            visible: false,
            currentPageNum: 1,
            pageSize: 10,
            totalItemsNum: 1378,
            sourceFlag: "",
            drawerWidth: 1200,
            drawerDetails: {
                Scientific_Name: "",
                Common_Name: "",
                Threatened_status: "",
                Class: "",
                Family: "",
                Genus: "",
                Species: "",
                State_found: "",
                Profile: "",
            }
        }
    }

    async componentDidMount() {
        await this.getData()
        await this.loadPageData(data)
        this.props.getData(data)
        this.props.getShowDrawer(this.showDrawer)
        this.props.getClearFilters(this.clearFilters)
        this.props.pagiEvent(this)
        this.props.getOnCheckFilter(this.onCheck)
        this.props.getPageSize(this.state.pageSize)
        this.initDrawer()
    }

    loadPageData = data => {
        initFilter(data, this.onCheck)
        initCards(data, 1, this.state.pageSize, this.showDrawer)
    }

    getData = async () => {
        await axios.get(WEBSITE_1.MODULE_1.PATH + WEBSITE_1.MODULE_1.FUNCTION_1.PATH)
        .then(res => {
            data.header = res.data[0]
            data.body = res.data.slice(1)
            data.length = data.body.length
        })
        .catch(err => {
            console.log(err)
        })
    }

    onCurrentPageChange = (page, pageSize) => {
        this.setState({
            currentPageNum: page,
            pageSize: pageSize,
        })
        let searchCondition = document.getElementById("ph-search-bar").getAttribute("value")
        checkFilterWithSearchCond(data, page, pageSize, this.showDrawer, searchCondition, this.state.sourceFlag)
        this.props.getPageSize(pageSize)
        this.props.onBlurCameraBox()
    }

    setSourceFlag = (sourceFlag) => {
        this.setState({
            sourceFlag: sourceFlag
        })
    }

    setTotalItemsNum = (totalItemsNum) => {
        this.setState({
            totalItemsNum: totalItemsNum
        })
    }

    resetPageNum = (pageNum) => {
        this.setState({
            currentPageNum: pageNum
        })
    }

    initDrawer = () => {
        let width = document.body.clientWidth
        if (width > 1600) {
            this.setState({drawerWidth: 1600})
        } else if (width >= 1366 && width <= 1600) {
            this.setState({drawerWidth: 1100})
        } else if (width >= 1024 && width < 1366) {
            this.setState({drawerWidth: 800})
        } else if (width >= 768 && width < 1024) {
            this.setState({drawerWidth: 700})
        } else if (width > 414 && width < 768) {
            this.setState({drawerWidth: 250})
        } else if (width > 375 && width <= 414) {
            this.setState({drawerWidth: 250})
        } else if (width <= 375) {
            this.setState({drawerWidth: 250})
        }
    }

    showDrawer = e => {
        this.setState({
            visible: true,
        })
        setTimeout(() => {
            document.getElementById("ph-close-mask").style.display = "inline-block"
        },1)
        let pos = this.getDrawerCategory(data, [
            "Scientific_Name",
            "Common_Name",
            "Threatened_status",
            "Class",
            "Family",
            "Genus",
            "Species",
            "State_found",
            "Profile"
        ])
        let _data = data.body
        for (let i = 0; i < _data.length; i++) {
            if (e.currentTarget.getElementsByTagName("p")[0].innerText === _data[i][0]) {
                this.setState({
                    drawerDetails: {
                        Scientific_Name: _data[i][pos[0]],
                        Common_Name: _data[i][pos[1]],
                        Threatened_status: _data[i][pos[2]],
                        Class: _data[i][pos[3]],
                        Family: _data[i][pos[4]],
                        Genus: _data[i][pos[5]],
                        Species: _data[i][pos[6]],
                        State_found: _data[i][pos[7]],
                        Profile: _data[i][pos[8]],
                    }
                })
                break
            }
        }
        document.getElementById("ph-search-bar-container").style.visibility = "hidden"
        setTimeout(() => {
            loadDrawerImg(this.state.drawerDetails.Scientific_Name)
        },1)
        this.props.onBlurCameraBox()
    }

    getDrawerCategory = (data, categoryArr) => {
        let posArr = []
        for (let i = 0; i < categoryArr.length; i++) {
            posArr.push(data.header.indexOf(categoryArr[i]))
        }
        return posArr
    }

    onClose = () => {
        this.setState({
            visible: false,
        })
        document.getElementById("ph-close-mask").style.display = "none"
        document.getElementById("ph-search-bar-container").style.visibility = "visible"
    }

    onCheck = () => {
        setTimeout(() => {
            let searchCondition = document.getElementById("ph-search-bar").getAttribute("value")
            if (searchCondition) {
                let total = checkFilterWithSearchCond(data, this.state.currentPageNum, this.state.pageSize,
                    this.showDrawer, searchCondition)
                this.setState({
                    totalItemsNum: total,
                })
            } else {
                let keywords = document.getElementById("ph-keywords")
                keywords.getElementsByTagName("span")[0].innerText = "All Plants"
                this.props.setSearchBarValue("")
                let total = updateCards(data, this.state.currentPageNum, this.state.pageSize, this.showDrawer)
                this.setState({
                    totalItemsNum: total,
                })
            }
            this.props.onBlurCameraBox()
        },1)
    }

    clearFilters = () => {
        setTimeout(() => {
            let keywords = document.getElementById("ph-keywords")
            keywords.getElementsByTagName("span")[0].innerText = "All Plants"
            this.props.setSearchBarValue("")
            initFilter(data, this.onCheck)
            let total = updateCards(data, 1, this.state.pageSize, this.showDrawer)
            this.setState({
                totalItemsNum: total,
                currentPageNum: 1,
                sourceFlag: ""
            })
            this.props.onBlurCameraBox()
        },1)
    }

    colorStatusInDrawer = (status) => {
        let color
        switch (status) {
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
                color = "#338e6c"
        }
        return color
    }

    render() {
        return (
            <div id="PlantHubMain" className="PlantHubMain">
                <Layout id="ph-layout-table-content" className="ph-layout">
                    <div className="ph-layout-table-content-wrap">
                        <div id="ph-filter-title">
                            <div><span>Filters</span></div>
                            <div><span onClick={this.clearFilters}>Show All</span></div>
                        </div>
                        <Collapse defaultActiveKey={['1', '2', '3', '4', '5']} onChange={this.props.onBlurCameraBox}>
                            <Panel className="ph-collapse-panel" header="Threatened Status" key="1"/>
                            <Panel className="ph-collapse-panel" header="Location" key="2"/>
                            <Panel className="ph-collapse-panel" header="Class" key="3"/>
                            <Panel className="ph-collapse-panel" header="Family" key="4"/>
                            <Panel className="ph-collapse-panel" header="Genus" key="5"/>
                        </Collapse>
                    </div>
                    <div className="ph-layout-table-content-wrap">
                        <div id="ph-keywords">
                            Searching for "<span>All Plants</span>".
                        </div>
                        <div id="ph-list-header">
                            <span/>
                            <span>Scientific Name</span>
                            <span>Common Name</span>
                            <span>Status</span>
                        </div>
                        <div id="ph-list"/>
                        <Pagination
                            total={this.state.totalItemsNum}
                            showSizeChanger
                            showQuickJumper
                            current={this.state.currentPageNum}
                            pageSize={this.state.pageSize}
                            showTotal={total => `Total ${total} items`}
                            onChange={this.onCurrentPageChange}
                            onReceiveTotal={this.setTotalItemsNum.bind(this)}
                        />
                    </div>
                </Layout>
                {
                    this.state.drawerDetails.Scientific_Name ?
                    <Drawer
                        title="Drawer"
                        placement="right"
                        closable={false}
                        onClose={this.onClose}
                        visible={this.state.visible}
                        getContainer={document.getElementById("App")}
                        zIndex={100}
                        width={this.state.drawerWidth}
                    >
                        <CloseCircleTwoTone id="ph-close-mask" onClick={this.onClose}/>
                        <div id="ph-drawer-content">
                            <div id="ph-plant-profile">Plant Profile</div>
                            <h1>{this.state.drawerDetails.Scientific_Name}</h1>
                            <hr/>
                            <div className="ph-plant-detail-wrap">
                                <div id="ph-plant-detail" className="ph-plant-detail">
                                    {
                                        this.state.drawerDetails.Common_Name ?
                                            <React.Fragment>
                                                <h2>Common Name:</h2>
                                                <h2 style={{wordBreak: "keep-all", color: "#338e6c"}}>
                                                    {this.state.drawerDetails.Common_Name}
                                                </h2>
                                            </React.Fragment>
                                            :
                                            <React.Fragment/>
                                    }
                                    <p>Threatened Status: <span
                                        style={{
                                            "color": this.colorStatusInDrawer(this.state.drawerDetails.Threatened_status)
                                        }}
                                    >{this.state.drawerDetails.Threatened_status}</span></p>
                                    <p>Class: <span>{this.state.drawerDetails.Class}</span></p>
                                    <p>Family: <span>{this.state.drawerDetails.Family}</span></p>
                                    <p>Genus: <span>{this.state.drawerDetails.Genus}</span></p>
                                    <p>Species: <span>{this.state.drawerDetails.Species}</span></p>
                                    <p>States Found: <span>{this.state.drawerDetails.State_found}</span></p>
                                    <p>More Information: <a href={this.state.drawerDetails.Profile}
                                                            style={{textDecoration: "underline"}}
                                                            target="view_window"
                                    >Click here to see more</a></p>
                                </div>
                                <div id="ph-plant-detail-img-container" className="ph-plant-detail"/>
                            </div>
                        </div>
                    </Drawer>
                    :
                    <React.Fragment/>
                }
            </div>
        )
    }
}

export default PlantHubMain