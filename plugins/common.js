import Vue from 'vue'

export default ({
  app,
  store,route,
  $content
}) => {

  Vue.prototype.$handlify=(name='dvd-cloner')=> {
    let _name = name.replace(/\s/g, "-");
    return _name.toLowerCase();
  }
  Vue.prototype.$genID = (length) => {
    return Number(Math.random().toString().substr(3, length) + Date.now()).toString(36);
  }

  Vue.prototype.$isMobile = (screen) => {
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
    if (screen_width < 992) {
      mobile_flag = true;
    }
    return mobile_flag;
  }

  Vue.prototype.$isEmail = (str) => {
    var myRegExp = /[a-z0-9-]{1,30}@[a-z0-9-]{1,65}.[a-z]{3}/;
    return myRegExp.test(str)
  }
  Vue.prototype.$isFileValid = (fileObject, extStr, sizeLimit) => {
    var flag = false; //状态
    var ext = null;

    if (fileObject.name.indexOf('.') != -1) {
      var ext = fileObject.name.split('.').pop().toLowerCase();
    }
    if (extStr.indexOf(ext) != -1) {
      flag = true
    } else {
      return {
        value: false,
        type: 'ext'
      }
    }
    var size = fileObject.size / 1024;
    if (size < sizeLimit) {
      flag = true;
    } else {
      return {
        value: false,
        type: 'size'
      }
    }
    return {
      value: true
    }
  };
  Vue.prototype.$addCookie = (name, value, expiresHours) => { //添加一个cookie。  三个参数：cookie的名称、值、有效时间（为0时，关闭浏览器cookie消失）
    var cookieString = name + "=" + escape(value);
    //判断是否设置过期时间
    if (expiresHours && expiresHours > 0) {
      var date = new Date();
      date.setTime(date.getTime() + expiresHours * 3600 * 1000);
      //console.log(date.toGMTString());
      cookieString = cookieString + "; expires=" + date.toGMTString() + "; path=/";
    }
    document.cookie = cookieString + "; path=/";
  }

  Vue.prototype.$getCookie = (name) => { //获取指定cookie值。 该函数返回名称为name的cookie值，如果不存在则返回空
    var strCookie = document.cookie;
    var arrCookie = strCookie.split("; ");
    for (var i = 0; i < arrCookie.length; i++) {
      var arr = arrCookie[i].split("=");
      if (arr[0] == name) return unescape(arr[1]);
    }
    return "";
  }

  Vue.prototype.$deleteCookie = (name) => { //删除指定的cookie

    document.cookie = name + "=v; expires=" + '-1';
  }

  Vue.prototype.$strValTrans = (str, vmData) => {
    //replace {value} to string from 'vmData'
    //支持 Object 链式查询： {values.value.key}
    let outdata = str;
    let regex = /{(.*?)}/g;
    let dataArray = str.match(regex)

    dataArray && dataArray.map(res => {


      let dataValue;
      let array = res.substring(1, res.length - 1).split('.');
      //console.log(eval('vmData.'+res.substring(1, res.length - 1)));          
      if (array.length > 1) {
        array.map((resItem, resItemIndex) => {
          resItemIndex == 0 ? dataValue = vmData[resItem] : dataValue = dataValue[resItem];
        })
      } else if (array.length == 1) {
        dataValue = vmData[array]
      }
      //console.log(res,dataValue);
      outdata = outdata.replace(new RegExp(res), dataValue);

    });
    //console.log(outdata);
    return outdata
  }
  Vue.prototype.$objectSearch = (object, value) => {
    function foreachObj(obj, string) {
      for (let key in obj) {
        if (obj[key] == string) return [key];
        if (typeof (obj[key]) == "object") {
          var temp = foreachObj(obj[key], string);
          //console.log(temp);
          if (temp) return [key, temp].flat();
        }
      }
    }
    return foreachObj(object, value)
  }
  Vue.prototype.$getSoftwareData = (name) => {
    let localData = store && store.state.localData;
    if (localData&&localData.software) {      
       let outData = localData.software.find(res => name.toLowerCase() == res.productName.toLowerCase()) 
  
       return outData
    }
  }

  
  Vue.prototype.$fetchItem=(model)=>{

    let productData = store&&store.state.localData.productData;

    if (productData.length>0) {
      let item =  productData.find(res=>res.handleName.toLowerCase() == model.toLowerCase()) 
      if(!item) item = productData.find(res => {
        if(res.model) return res.model.toLowerCase() == model.toLowerCase()      
      });
      
      if ( model.indexOf('sic') != -1&& model != 'sic') {
        let sicItem = productData.find(res=>res.model == 'sic')
        item = sicItem.children.find(res=>res.model == model)
        // console.log(item);
      }
      return item
    }    
  }

  //inject $initMD to context.app
  
  Vue.prototype.$initMD = async (data, method = 'page') => {
    return data

  }
  if (app) app.$initMD =  Vue.prototype.$initMD
  Date.prototype.format = function(fmt) { 
    var o = { 
       "M+" : this.getMonth()+1,                 //月份 
       "d+" : this.getDate(),                    //日 
       "h+" : this.getHours(),                   //小时 
       "m+" : this.getMinutes(),                 //分 
       "s+" : this.getSeconds(),                 //秒 
       "q+" : Math.floor((this.getMonth()+3)/3), //季度 
       "S"  : this.getMilliseconds()             //毫秒 
   }; 
   if(/(y+)/.test(fmt)) {
           fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length)); 
   }
    for(var k in o) {
       if(new RegExp("("+ k +")").test(fmt)){
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
        }
    }
   return fmt; 
}
}
