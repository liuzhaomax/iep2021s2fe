/****************************************************************************
 * @copyright   LIU Zhao
 * @authors     LIU Zhao (liuzhaomax@163.com)
 * @date        2021/7/19 18:25
 * @version     v1.0
 * @filename    HomeRoute.jsx
 * @description
 ***************************************************************************/

import React from 'react';
import {Route} from 'react-router-dom';
import HomeLayout from "../layouts/HomeLayout";

class HomeRoute extends React.Component {
    render() {
        let { component: Component, ...rest} = this.props;
        return <Route {...rest} render={(props) => ( <HomeLayout {...props} component={Component}/> )} exact/>
    }
}

export default HomeRoute