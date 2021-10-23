/****************************************************************************
 * @copyright   LIU Zhao
 * @authors     LIU Zhao (liuzhaomax@163.com)
 * @date        2021/9/10 19:47
 * @version     v1.0
 * @filename    shActions.js
 * @description
 ***************************************************************************/

import {MAP_LOADING} from "../../config/constants";

export const changeMapLoadingStatus = bool => {
    return dispatch => {
        return dispatch(toggleMapLoadingStatus(bool))
    }
}

export const toggleMapLoadingStatus = mapIsLoading => {
    return {
        type: MAP_LOADING,
        mapIsLoading,
    }
}