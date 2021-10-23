/****************************************************************************
 * @copyright   LIU Zhao
 * @authors     LIU Zhao (liuzhaomax@163.com)
 * @date        2021/8/23 22:37
 * @version     v1.0
 * @filename    showDynamicNum.js
 * @description
 ***************************************************************************/

var DynamicNumber = {}
DynamicNumber.numberList = {}

DynamicNumber.show = (elementId, number) => {
    let dynaNum = DynamicNumber.numberList[elementId]
    if (dynaNum) {
        dynaNum.step = 0
        dynaNum.desNumber = number
        dynaNum.render()
        return
    }

    dynaNum = new function (_elementId) {
        this.elementId = _elementId
        this.preNumber = 0
        this.desNumber = 0
        this.step = 0
        this.render = function () {
            // finish condition
            if (this.preNumber === this.desNumber) {
                this.step = 0
                return
            }
            // step 2s -> 40*50=2000）
            if (this.step === 0) {
                this.step = Math.round((this.desNumber - this.preNumber) / 250)
                if (this.step === 0) this.step = (this.desNumber - this.preNumber > 0) ? 1 : -1
            }
            // one step
            this.preNumber += this.step
            if (this.step < 0) {
                if (this.preNumber < this.desNumber) this.preNumber = this.desNumber
            } else {
                if (this.preNumber > this.desNumber) this.preNumber = this.desNumber
            }
            // display
            if (document.getElementById(this.elementId)) {
                document.getElementById(this.elementId).innerHTML = this.preNumber
            }
            // 20 times per second
            var _this = this
            setTimeout(function () {
                _this.render()
            }, 50 )
        }
    } (elementId)

    DynamicNumber.numberList[elementId] = dynaNum

    dynaNum.step = 0
    dynaNum.desNumber = number
    dynaNum.render()
}

export default DynamicNumber