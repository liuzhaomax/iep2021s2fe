/****************************************************************************
 * @copyright   LIU Zhao
 * @authors     LIU Zhao (liuzhaomax@163.com)
 * @date        2021/9/4 6:04
 * @version     v1.0
 * @filename    AboutStory.jsx
 * @description
 ***************************************************************************/

import React from "react"
import "./AboutStory.css"

class AboutStory extends React.Component {
    render() {
        return (
            <div className="AboutStory" id="AboutStory">
                <div className="ab-banner ab-banner-story">
                    <h1>OUR STORY</h1>
                </div>
                <div className="ab-content">
                    <h2>How do we come together to start Flora Protech?</h2>
                    <div id="ab-story-timeline"/>
                </div>
            </div>
        )
    }
}

export default AboutStory