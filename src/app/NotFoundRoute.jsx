/****************************************************************************
 * @copyright   LIU Zhao
 * @authors     LIU Zhao (liuzhaomax@163.com)
 * @date        2021/7/21 22:51
 * @version     v1.0
 * @filename    NotFoundRoute.jsx
 * @description
 ***************************************************************************/

import React from 'react';
import {Route, withRouter} from 'react-router-dom';

class NotFoundRoute extends React.Component {
    render() {
        let { component: Component, ...rest} = this.props;
        return <Route {...rest} render={(props) => ( <Component {...props} /> )} exact/>
    }
}

export default withRouter(NotFoundRoute)
