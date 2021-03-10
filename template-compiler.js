/**
 * 字符串（带变量）解析和输出对应字符串，
 * 字符串示例： "Hello ${name}, I'm ${myName}."
 * @author zhaowenhao
 */

/**
 * 正则方式实现
 */
const VAR_REG = /\$\{(\w+)\}/g

/**
 * 由于字符串是固定的，只需使用正则将字符串编译一次，之后不需要重新编译，
 * 所以使用柯里化进行优化
 * @param {String} str
 */
function compile(str) {
  let arr = [];
  let index = 0;
  let matched = VAR_REG.exec(str);
  while (matched) {
    let matchedStr = matched[0];
    let prop = matched[1];
    let start = matched.index;
    arr.push({
      type: "string",
      value: str.slice(index, start)
    })
    index = start + matchedStr.length;
    arr.push({
      type: "prop",
      value: prop
    })
    matched = VAR_REG.exec(str);
  }
  arr.push({
    type: "string",
    value: str.slice(index)
  });

  return (data) => {
    return arr.map(item => {
      if (item.type === "prop") {
        return data[item.value];
      }
      return item.value;
    }).join("");
  }
}

let str = "您收到了一个来自${orderFrom}的新订单，订单编号：${orderNo}";

let render = compile(str);

let o1 = {
  orderFrom: "天猫",
  orderNo: "20210309001"
}

let o2 = {
  orderFrom: "京东",
  orderNo: "20210309002"
}

render(o1);
render(o2);

