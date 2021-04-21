import Vue from 'vue'

export default ({
  app,
  store,
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
    if (screen_width < 500) {
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
  Vue.prototype.$getItemData = (model, method) => {
    let productsData = store&&store.state.shopifyData.productsMerged.length>0 && store.state.shopifyData.productsMerged,
        hardwareLocal = store && store.state.localData && store.state.localData.hardware;
    if (productsData && hardwareLocal) {
      let data = productsData.find(res => res.productModel.toLowerCase() == model.toLowerCase()), 
          localItem = hardwareLocal.find(res => res.productModel.toLowerCase() == model.toLowerCase()) 
      if (data && method == 'imgPath') {
        return data.images[0].src;
      } else if (data && method == 'name') {
        return data.title
      } else if(data&&localItem) {        
        data = Object.assign(localItem,data);
        return data
      }
    }
  }
  
  Vue.prototype.$fetchItem=(itemName)=>{

    let productData = store&&store.state.localData.productData;

    if (productData.length>0) {
      let item =  productData.find(res=>res.handleName.toLowerCase() == itemName.toLowerCase()) 
    
      return item
    }    
  }

  //inject $initMD to context.app
  if (app) app.$initMD = async (data, method = 'page') => {

    let pathData = await $content('default').only(['imagesPath', 'KB_basePath', 'download_basePath', 'manual_basePath', 'video_basePath', 'videoProduct_basePath']).fetch();
    let pathHandle=(value,globalPath)=>{
      if(value.substr(0,4) == 'http'){
        return value
      } else {
        return globalPath+value
      }
    } 
    // 给指定变量加上全局定义
    function foreachObj(obj) {
      for (let key in obj) {
        key == 'imageUrl' || key == 'iconUrl' ?obj[key]= pathHandle(obj[key],pathData.imagesPath): '';
        key == 'kbUrl' ? obj[key]= pathHandle(obj[key],pathData.KB_basePath): '';
        key == 'downloadUrl' ?obj[key]= pathHandle(obj[key],pathData.download_basePath): '';
        key == 'downloadUrl_64bit' ?obj[key]= pathHandle(obj[key],pathData.download_basePath): '';
        key == 'videoUrl' ?obj[key]= pathHandle(obj[key],pathData.video_basePath): '';
        key == 'videoProductUrl' ?obj[key]= pathHandle(obj[key],pathData.videoProduct_basePath): '';
        key == 'manualUrl' ?obj[key]= pathHandle(obj[key],pathData.manual_basePath): '';
        if (typeof (obj[key]) == 'object') {
          foreachObj(obj[key]);
        }
      }
    }
    foreachObj(data)

    if (method == 'page') {

      // adjust meta info
      var head = {};
      var fnMeta = (data) => data.map(res => {
        res.hid = res.name
        return res
      });

      if (data.metaItems && data.title) {
        head = {
          title: data.title,
          meta: fnMeta(data.metaItems)
        }
      } else if (data.metaItems) {
        head = {
          meta: fnMeta(data.metaItems)
        }
      } else if (data.title) {
        head = {
          title: data.title
        }
      }

      data.head = head;
      delete data.metaItems;

      //data.body.children

      // MD文档区替换全局定义
      let globalValue = {
        imageUrl: pathData.imagesPath,
        kbUrl: pathData.KB_basePath,
        downloadUrl: pathData.download_basePath
      }

      function replaceObj(obj, string, path) {
        let sourceSrt = escape("{" + string + "}");
        
        for (let i in obj) {

          // 这里使用递归，属性类型为对象则进一步遍历
          if (typeof (obj[i]) == 'object') {
            replaceObj(obj[i], string, path);
          } else if (typeof (obj[i]) == 'string') {
            obj[i] = obj[i].replace(new RegExp("{" + string + "}", 'g'), path)
            obj[i] = obj[i].replace(new RegExp(sourceSrt, 'g'), path)
          }
        }
      }
      Object.keys(globalValue).map(res => {
        replaceObj(data, res, globalValue[res])
      })
    }
    return data
  }

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
