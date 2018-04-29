
/**
 * 将对象转为 style 属性值字符串
 * @param {object} args 
 */
function toStyle(args) {
    let result = "";
    for(let [k, v] of Object.entries(args)) {
        result = result.concat(k, ": ", v, ";");
    }
    return result;
}

export {
    toStyle,
}