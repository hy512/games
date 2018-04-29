
import {screenUpdateAction} from './app/actions';

export default function (doc = document, win = window) {
    // 得到文档对象和 resize事件名称
    var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        // 定义重置窗口大小函数
        recalc = function () {
            // 得到窗口宽度
            var clientWidth = docEl.clientWidth;
            if (!clientWidth) return;

            //这里是假设在640px宽度设计稿的情况下，1rem = 20px；
            //可以根据实际需要修改
            docEl.style.fontSize = 20* (clientWidth / 640) + 'px';

            // 添加更新屏幕大小
            screenUpdateAction({width: docEl.clientWidth, height: docEl.clientHeight});
        };
    if (!doc.addEventListener) return;
    // 添加监听
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
}