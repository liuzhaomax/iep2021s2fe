/****************************************************************************
 * @copyright   LIU Zhao
 * @authors     LIU Zhao (liuzhaomax@163.com)
 * @date        2021/9/10 19:42
 * @version     v1.0
 * @filename    shMapLoading.js
 * @description
 ***************************************************************************/

import {MAP_LOADING} from "../../config/constants";

const initialState = {
    mapIsLoading: false,
}

const shMapLoading = (state=initialState, action) => {
    switch (action.type) {
        case MAP_LOADING:
            console.log(action.mapIsLoading)
            return {
                mapIsLoading: action.mapIsLoading,
            }
        default:
            return state
    }
}

export default shMapLoading
