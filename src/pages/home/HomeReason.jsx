/****************************************************************************
 * @copyright   LIU Zhao
 * @authors     LIU Zhao (liuzhaomax@163.com)
 * @date        2021/8/22 10:24
 * @version     v1.0
 * @filename    HomeReason.jsx
 * @description
 ***************************************************************************/

import React from "react"
import "./Home.css"
import "./HomeReason.css"
import wood from "../../assets/home/wood.jpeg"
import lab from "../../assets/home/lab.jpg"
import invasion from "../../assets/home/invasion.png"
import ice from "../../assets/home/ice.jpeg"

class HomeReason extends React.Component {
    render() {
        return (
            <div className="HomeReason home-block" id="HomeReason">
                <div className="home-block-container">
                    <h1>Why Plants Become Endangered</h1>
                    <div className="home-reason-sub-block-container">
                        <div className="home-reason-sub-block-wrap">
                            <div className="home-reason-sub-block home-reason-sub-block-small home-reason-sub-block-left">
                                <div className="home-reason-sub-block-element">
                                    <h3>Loss of Habitat</h3>
                                    <p>
                                        The most general cause of plant habitat loss and subsequent plant rarity
                                        and endangerment is conversion of native plant habitat to cities,
                                        farms, roads, and regulated-flow river systems and reservoirs.
                                    </p>
                                </div>
                                <div className="home-reason-sub-block-element home-reason-sub-block-element-img">
                                    <img className="home-reason-img" src={wood} alt="wood"/>
                                </div>
                            </div>
                            <div className="home-reason-sub-block home-reason-sub-block-small home-reason-sub-block-right">
                                <div className="home-reason-sub-block-element">
                                    <h3>Medicinal Use</h3>
                                    <p>
                                        Native plants collected from wildlands for the herbal or medicinal market are
                                        sometimes harvested faster than they can grow back,
                                        leading to population declines.
                                    </p>
                                </div>
                                <div className="home-reason-sub-block-element home-reason-sub-block-element-img">
                                    <img className="home-reason-img" src={lab} alt="lab"/>
                                </div>
                            </div>
                        </div>
                        <div className="home-reason-sub-block-wrap">
                            <div className="home-reason-sub-block home-reason-sub-block-small home-reason-sub-block-left">
                                <div className="home-reason-sub-block-element">
                                    <h3>Species Invasion</h3>
                                    <p>
                                        Invasive non-native weeds have contributed to the decline of nearly half of
                                        the plants listed as endangered or threatened under the Endangered Species Act.
                                    </p>
                                </div>
                                <div className="home-reason-sub-block-element home-reason-sub-block-element-img">
                                    <img className="home-reason-img" src={invasion} alt="invasion"/>
                                </div>
                            </div>
                            <div className="home-reason-sub-block home-reason-sub-block-small home-reason-sub-block-right">
                                <div className="home-reason-sub-block-element">
                                    <h3>Climate Change</h3>
                                    <p>
                                        Climate change presents a serious threat to plant species around the world
                                        because the speed of which climate is changing is much faster than the speed
                                        of which a plant evolves to adapt new climate.
                                    </p>
                                </div>
                                <div className="home-reason-sub-block-element home-reason-sub-block-element-img">
                                    <img className="home-reason-img" src={ice} alt="ice"/>
                                </div>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default HomeReason