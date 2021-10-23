/****************************************************************************
 * @copyright   LIU Zhao
 * @authors     LIU Zhao (liuzhaomax@163.com)
 * @date        2021/4/8 21:08
 * @version     v1.0
 * @filename    index.js
 * @description
 ***************************************************************************/

import { combineReducers } from "redux"
import shMapLoading from "./shMapLoading";

const rootReducer = combineReducers({
    shMapLoading,
})

export default rootReducer