/****************************************************************************
 * @copyright   LIU Zhao
 * @authors     LIU Zhao (liuzhaomax@163.com)
 * @date        2021/7/3 0:15
 * @version     v1.0
 * @filename    routes.jsx
 * @description
 ***************************************************************************/

import React from "react"
import {Redirect, Route, Switch} from "react-router-dom"
import NotFoundRoute from "./NotFoundRoute";
import NotFound from "../pages/notFound/NotFound"
import HomeRoute from "./HomeRoute";
import MainLayoutRoute from "./MainLayoutRoute";
import Index from "../pages/index/Index";
import Home from "../pages/home/Home";
import {WEBSITE_1} from "../config/constants";
import PlantHub from "../pages/plantHub/PlantHub";
import StatHub from "../pages/statHub/StatHub";
import GetInvolved from "../pages/getInvolved/GetInvolved";
import Blog from "../pages/blog/Blog";
import About from "../pages/about/About";

const module1Path = WEBSITE_1.MODULE_1.PATH
const module2Path = WEBSITE_1.MODULE_2.PATH
const module3Path = WEBSITE_1.MODULE_3.PATH
const module4Path = WEBSITE_1.MODULE_4.PATH
const module5Path = WEBSITE_1.MODULE_5.PATH

export default (
    <Switch>
        <Redirect from={module2Path + WEBSITE_1.MODULE_2.FUNCTION_1.PATH} to={"/notfound"} exact/>
        <Route path="/" component={ Index } exact/>
        <HomeRoute path="/home" component={ Home } exact/>
        <MainLayoutRoute path={module1Path} component={ PlantHub } exact/>
        <MainLayoutRoute path={module2Path} component={ StatHub } />
        <MainLayoutRoute path={module3Path} component={ GetInvolved } exact/>
        <MainLayoutRoute path={module4Path} component={ Blog } />
        <MainLayoutRoute path={module5Path} component={ About } exact/>
        <NotFoundRoute component={NotFound} />
    </Switch>
)