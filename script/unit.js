export {
    isMobile, isEmail ,sortDesc
  }
const isMobile = (screen) => {
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
  },
  isEmail = (str) => {
    var myRegExp = /[a-z0-9-]{1,30}@[a-z0-9-]{1,65}.[a-z]{3}/;
    return myRegExp.test(str)
  },
  sortDesc = (array, key) => {
    return array.sort(function (a, b) {
      var x = a[key];
      var y = b[key];
      return x > y ? -1 : x < y ? 1 : 0;
    })
  }