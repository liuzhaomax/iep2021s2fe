/****************************************************************************
 * @copyright   LIU Zhao
 * @authors     LIU Zhao (liuzhaomax@163.com)
 * @date        2021/8/27 0:25
 * @version     v1.0
 * @filename    checkSameValOfTwoArray.js
 * @description
 ***************************************************************************/

const checkSameValOfTwoArray = (arr1, arr2) => {
    for (let i = 0; i < arr1.length; i++) {
        for (let j = 0; j < arr2.length; j++) {
            if (arr1[i] === arr2[j]) {
                return true
            }
        }
    }
    return false
}

export default checkSameValOfTwoArray