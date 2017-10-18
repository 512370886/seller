// 函数功能：解析url参数   @example 输入 ?id=1234&a=b  输出 Object {id:12345, a:b}

export function urlParse () {
  let url = window.location.search
  let Obj = {}
  let reg = /[?&][^?&]+=[^?&]+/g
  let arr = url.match(reg)
  // ['?id=12345', '&a=b']
  if (arr) {
    arr.forEach((item) => {
      let temArr = item.substring(1).split('=')
      let keyName = decodeURIComponent(temArr[0])
      let val = decodeURIComponent(temArr[1])
      Obj[keyName] = val
    })
  }
  return Obj
}
