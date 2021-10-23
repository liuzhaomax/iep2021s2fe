/****************************************************************************
 * @copyright   LIU Zhao
 * @authors     LIU Zhao (liuzhaomax@163.com)
 * @date        2021/9/9 10:56
 * @version     v1.0
 * @filename    json2LineJson.js
 * @description
 ***************************************************************************/

const json2LineJson = (json) => {
    let result = []
    json.map((value) => {
        let item = {
            Year: "",
            Threatened_status: "",
            Quantity: 1,
        }
        let newItemFlag = true
        for (let i = 0; i < result.length; i++) {
            if (value["Year"] === result[i]["Year"] && value["Threatened_status"] === result[i]["Threatened_status"]) {
                result[i]["Quantity"] += 1
                newItemFlag = false
                break
            }
        }
        if (newItemFlag) {
            item["Year"] = value["Year"]
            item["Threatened_status"] = value["Threatened_status"]
            item["Quantity"] = 1
            result.push(item)
        }
        return value
    })
    return quickSort(result, "Year")
}

function quickSort(arr, attr) {
    let _arr = arr
    if (_arr.length <= 1) { return _arr }
    let pivotIndex = Math.floor(_arr.length / 2)
    let pivot = _arr.splice(pivotIndex, 1)[0]
    let left = []
    let right = []
    for (let i = 0; i < _arr.length; i++){
        if (Number(_arr[i][attr]) < Number(pivot[attr])) {
            left.push(_arr[i])
        } else {
            right.push(_arr[i])
        }
    }
    return quickSort(left, attr).concat([pivot], quickSort(right, attr))
}

export default json2LineJson