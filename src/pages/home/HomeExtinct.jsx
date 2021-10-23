/****************************************************************************
 * @copyright   LIU Zhao
 * @authors     LIU Zhao (liuzhaomax@163.com)
 * @date        2021/8/22 10:37
 * @version     v1.0
 * @filename    HomeExtinct.jsx
 * @description
 ***************************************************************************/

import React from "react"
import "./Home.css"
import "./HomeExtinct.css"
import {Button} from "antd";
import {withRouter} from "react-router-dom";
import cala from "../../assets/home/cala.jpg"
import dotp from "../../assets/home/dotp.jpg"
import miki from "../../assets/home/miki.png"
import unk from "../../assets/home/unk.jpg"
import seaweed from "../../assets/home/seaweed.jpg"

class HomeExtinct extends React.Component {

    jumpToPlantHub = () => {
        this.props.history.push("/planthub")
        window.location.reload("/planthub")
    }

    render() {
        return (
            <div className="HomeExtinct home-block home-block-long" id="HomeExtinct">
                <div className="home-block-container">
                    <h1>Extinct Plants in Australia</h1>
                    <div className="home-sub-block-container">
                        <div className="home-extinct-sub-block-container">
                            <div className="home-extinct-sub-block-wrap-upper">
                                <div className="home-extinct-sub-block">
                                    <img className="home-extinct-img" src={cala} alt="cala"/>
                                    <h2>Caladenia brachyscapa</h2>
                                </div>
                                <div className="home-extinct-sub-block">
                                    <img className="home-extinct-img" src={miki} alt="miki"/>
                                    <h2>Diuris bracteata</h2>
                                </div>
                                <div className="home-extinct-sub-block">
                                    <img className="home-extinct-img" src={seaweed} alt="seaweed"/>
                                    <h2>Huperzia serrata</h2>
                                </div>
                            </div>
                            <hr/>
                            <div className="home-extinct-sub-block-wrap-lower">
                                <div className="home-extinct-sub-block">
                                    <img className="home-extinct-img" src={unk} alt="unk"/>
                                    <h2>Ozothamnus selaginoides</h2>
                                </div>
                                <div className="home-extinct-sub-block">
                                    <img className="home-extinct-img" src={dotp} alt="dotp"/>
                                    <h2>Lemmaphyllum accedens</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="home-need-help">
                    <h2>Endangered plants need your help!</h2>
                    <h2>Get familiar with them to protect them!</h2>
                    <Button type="primary" id="home-btn-explore-now" onClick={this.jumpToPlantHub}>Discover Now</Button>
                </div>
            </div>
        )
    }
}

export default withRouter(HomeExtinct)