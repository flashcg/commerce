import { ProductDataConfig } from "@/assets/script/interfaceSet";
export { camelCaseToWords, isMobile, toLower, fetchItem, sortFn,getDate,stringToObj }

function camelCaseToWords(field: string, targetStr: string = ' ') {
  const stringArray = field.split('') // 将字符串分割成相应的字符串数组
  let newField = field
  stringArray.forEach(t => {
    if (/[A-Z]/.test(t)) {
      // 遍历分割之后的字符串组，将找到的大写字母替换成其他字符串，将替换后的字符串赋值给另外一个新的string 变量
      newField = field.replace(t, `${targetStr + t.toLowerCase()}`)
    }
  })
  return newField
}
/**
 * 将源字符串以“,” 拆分成数组，再以":" 转成对象
 * @param string 源字符串
 */
function stringToObj(string: string) {
  if (string && typeof (string) == 'string') {
    let tempArray:string[] = string.split(','),tempObj:{[props:string]:string} = {};
    tempArray.map(res=>{
      let key = res.split(':',1)[0],
      value = res.replace(key,'')
      value = value.slice(1)      
      tempObj[key] = value      
    })
    return tempObj    
  } else {
    return {}
  }
}
function toLower(name: string, string: string) {
  if (name && typeof (name) == 'string') {
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
function isMobile(screen: string) {
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


function fetchItem(itemName: string, items: ProductDataConfig[] | undefined) {

  if (items && items.length > 0) {
    let item = items.find(res => res.handleName.toLowerCase() == itemName.toLowerCase())
    return item
  }
}

/**
 * 根据key 值 排序对象数组
 * @param array 源对象数组
 * @param key 排序对象key
 * @param method 正序 倒序 -- asce/desc
 * @returns 返回结果
 */
function sortFn(array: { [propName: string]: any }[]|{ [propName: string]: any }, key: string, method: string = 'asce') {
  return Array.isArray(array)&& array.sort(function (a, b) {
    var x = a[key];
    var y = b[key];
    if (method == 'asce') {
      return x < y ? -1 : x > y ? 1 : 0;
    } else if (method == 'desc') {
      return y < x ? -1 : y > x ? 1 : 0;
    } else {
      return x < y ? -1 : x > y ? 1 : 0;
    }
  })
}

/**
 * 格式化时间字符
 * @param format yyyy-mm-dd / yyyy/mm/dd
 * @param str 时间字符串
 * @returns 年月日 时间
 */
function getDate(str:string,format:string='yyyy-mm-dd'){

  let oTime:string='1900-01-01',oDate = new Date(str),  
  oYear = oDate.getFullYear(),  
  oMonth = oDate.getMonth()+1,  
  oDay = oDate.getDate(),  
  oHour = oDate.getHours(),  
  oMin = oDate.getMinutes(),  
  oSec = oDate.getSeconds(); 
  if(format == 'yyyy-mm-dd'){
       oTime = oYear +'-'+ getzf(oMonth) +'-'+ getzf(oDay) +' '+ getzf(oHour) +':'+ getzf(oMin) +':'+getzf(oSec);//最后拼接时间
  }else if(format == 'yyyy/mm/dd'){
    oTime = oYear +'/'+ getzf(oMonth) +'/'+ getzf(oDay) +' '+ getzf(oHour) +':'+ getzf(oMin) +':'+getzf(oSec);//最后拼接时间
  }
  return oTime;  


  function getzf(num:number){
    let outData:string='0';  
    if(num < 10){  
      outData = '0'+num.toString();  
    }  else {
      outData = num.toString();  
    }
    return outData;  
 }
};
  

