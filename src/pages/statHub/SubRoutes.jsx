/****************************************************************************
 * @copyright   LIU Zhao
 * @authors     LIU Zhao (liuzhaomax@163.com)
 * @date        2021/9/5 0:59
 * @version     v1.0
 * @filename    SubRoutes.jsx
 * @description
 ***************************************************************************/

import React from "react"
import {Redirect, Route, Switch} from "react-router-dom";
import {WEBSITE_1} from "../../config/constants";
import StatHubMap from "./StatHubMap";
import StatHubForce from "./StatHubForce";
import StatHubLine from "./StatHubLine";

const modulePath = WEBSITE_1.MODULE_2.PATH

class SubRoutes extends React.Component {
    render() {
        return (
            <Switch>
                <Redirect from={modulePath} to={modulePath + WEBSITE_1.MODULE_2.FUNCTION_2.PATH} exact/>
                <Route path={modulePath + WEBSITE_1.MODULE_2.FUNCTION_2.PATH}
                       render={(props) => ( <StatHubMap {...props} data={this.props.data}/> )} exact/>
                <Route path={modulePath + WEBSITE_1.MODULE_2.FUNCTION_3.PATH}
                       render={(props) => ( <StatHubForce {...props} data={this.props.data}/> )} exact/>
                <Route path={modulePath + WEBSITE_1.MODULE_2.FUNCTION_4.PATH}
                       render={(props) => ( <StatHubLine {...props} data={this.props.data}/> )} exact/>
            </Switch>
        )
    }
}

export default SubRoutes