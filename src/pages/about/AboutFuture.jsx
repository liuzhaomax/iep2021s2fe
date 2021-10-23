/****************************************************************************
 * @copyright   LIU Zhao
 * @authors     LIU Zhao (liuzhaomax@163.com)
 * @date        2021/9/4 7:20
 * @version     v1.0
 * @filename    AboutFuture.jsx
 * @description
 ***************************************************************************/

import React from "react"
import "./AboutFuture.css"

class AboutFuture extends React.Component {
    render() {
        return (
            <div className="AboutFuture" id="AboutFuture">
                <div className="ab-banner ab-future-banner">
                    <h1>FUTURE PROJECT</h1>
                    <p>The next step is to include endangered plants in following continents.</p>
                    <div className="ab-future-content">
                        <div className="ab-future-content-img" id="ab-future-img-na">
                            <h2>NORTH AMERICA</h2>
                            <div className="ab-future-content-hint">TO BE DEVELOPED</div>
                        </div>
                        <div className="ab-future-content-img" id="ab-future-img-sa">
                            <h2>SOUTH AMERICA</h2>
                            <div className="ab-future-content-hint">TO BE DEVELOPED</div>
                        </div>
                        <div className="ab-future-content-img" id="ab-future-img-as">
                            <h2>ASIA</h2>
                            <div className="ab-future-content-hint">TO BE DEVELOPED</div>
                        </div>
                        <div className="ab-future-content-img" id="ab-future-img-af">
                            <h2>AFRICA</h2>
                            <div className="ab-future-content-hint">TO BE DEVELOPED</div>
                        </div>
                        <div className="ab-future-content-img" id="ab-future-img-eu">
                            <h2>EUROPE</h2>
                            <div className="ab-future-content-hint">TO BE DEVELOPED</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default AboutFuture