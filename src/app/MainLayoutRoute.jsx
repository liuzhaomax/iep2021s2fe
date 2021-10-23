/****************************************************************************
 * @copyright   LIU Zhao
 * @authors     LIU Zhao (liuzhaomax@163.com)
 * @date        2021/7/19 18:25
 * @version     v1.0
 * @filename    MainLayoutRoute.jsx
 * @description
 ***************************************************************************/

import React from 'react';
import {Route} from 'react-router-dom';
import MainLayout from "../layouts/MainLayout";

class MainLayoutRoute extends React.Component {
    render() {
        let { component: Component, ...rest} = this.props
        return <Route {...rest} render={(props) => ( <MainLayout {...props} component={Component}/> )} />
    }
}

export default MainLayoutRoute