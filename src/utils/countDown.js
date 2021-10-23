/****************************************************************************
 * @copyright   LIU Zhao
 * @authors     LIU Zhao (liuzhaomax@163.com)
 * @date        2021/7/22 0:20
 * @version     v1.0
 * @filename    countDown.js
 * @description
 ***************************************************************************/

import {Modal} from "antd";
import NoFound from "antd/es/result/noFound";

const notFound = 'Your page is not found. Code: 404.'

const countDown = (secondsToGo, history) => {
    const modal = Modal.success({
        title: notFound,
        content: (
            <div>
                <NoFound/>
                <br/>
                <p>Will jump to the previous page after {secondsToGo} second(s).</p>
            </div>
        ),
        onOk() {
            history.goBack()
            clearInterval(timer);
            modal.destroy();
        },
    });
    const timer = setInterval(() => {
        secondsToGo -= 1;
        modal.update({
            content: (
                <div>
                    <NoFound/>
                    <br/>
                    <p>Will jump to the previous page after {secondsToGo} second(s).</p>
                </div>
            ),
        });
    }, 1000);
    setTimeout(() => {
        history.goBack()
        clearInterval(timer);
        modal.destroy();
    }, secondsToGo * 1000);
}

export default countDown