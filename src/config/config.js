/****************************************************************************
 * @copyright   LIU Zhao
 * @authors     LIU Zhao (liuzhaomax@163.com)
 * @date        2021/7/4 1:51
 * @version     v1.0
 * @filename    config.js
 * @description
 ***************************************************************************/

import configJson from "../config/config.json"

const config = {
    domain: configJson.release.fe.domain,
    beBaseUrl: configJson.run_mode === "release" ?
        `${configJson.release.be.protocol}://${configJson.release.be.domain}` :
        `${configJson.debug.be.protocol}://${configJson.debug.be.host}:${configJson.debug.be.port}`
}
export default config