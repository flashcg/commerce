
export {camelCaseToWords,isMobile,toLower}

function camelCaseToWords (field:string,targetStr:string=' ') {
    const stringArray = field.split('') // 将字符串分割成相应的字符串数组
    let newField = field
    stringArray.forEach(t => {
      if (/[A-Z]/.test(t)) { 
        // 遍历分割之后的字符串组，将找到的大写字母替换成其他字符串，将替换后的字符串赋值给另外一个新的string 变量
        newField = field.replace(t, `${targetStr+t.toLowerCase()}`)
      }
    })
    return newField
}
function toLower (name:string, string:string) {
  if (name&&typeof(name)=='string') {
    string = string || '-'
    let _name = name.replace(/\s/g, string);
    return _name.toLowerCase()      
  }
}
/**
 * 判断是否为移动设备
 * @param screen if this param is 'width',return screen_width
 * @returns boolean
 */
function isMobile (screen:string) {
  var userAgentInfo = navigator.userAgent;
  var mobileAgents = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"];
  var mobile_flag = false;

  //根据userAgent判断是否是手机
  for (var v = 0; v < mobileAgents.length; v++) {
    if (userAgentInfo.indexOf(mobileAgents[v]) > 0) {
      mobile_flag = true;
      break;
    }
  }

  var screen_width = document.documentElement.clientWidth;
  var screen_height = document.documentElement.clientHeight;

  if (screen == 'width') return screen_width

  //根据屏幕分辨率判断是否是手机
  if (screen_width < 500) {
    mobile_flag = true;
  }
  return mobile_flag;
}

