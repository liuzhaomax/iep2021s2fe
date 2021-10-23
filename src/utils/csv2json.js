/****************************************************************************
 * @copyright   LIU Zhao
 * @authors     LIU Zhao (liuzhaomax@163.com)
 * @date        2021/9/7 22:52
 * @version     v1.0
 * @filename    csv2json.js
 * @description
 ***************************************************************************/

const csv2json = (csv) => {
    let json = []
    let header = csv[0]
    let body = csv.slice(1)
    body.map((value) => {
        let obj = {}
        for (let i = 0; i < header.length; i++) {
            obj[header[i]] = value[i]
        }
        json.push(obj)
        return value
    })
    return json
}

export default csv2json