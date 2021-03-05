var yamlFront = require("yaml-front-matter");

import Vue from 'vue'
// import axios from 'axios'
export default ({  app,  store}) => {

// 根据model取产品路径
Vue.prototype.$fetchPath=(model) => {
  let path;
  store.state.i18n.messages.modelPath.map(res => {
    if (res.model == model) {
      path = res.path;
    }
  });
  return path;
}


  //取产品缩略图路径
  Vue.prototype.$thumb=(imageUrl)=> {
    if (imageUrl) {
      let _array = imageUrl.split("/");
      var array = _array.map((res, index) => {
        _array.length - 1 == index
          ? (res = "thumbs/" + res)
          : (res = res + "/");
        //console.log(array)
        return res;
      });
      return array.join("");      
    }
  }
  //大小变小写 空格变 "string"
  Vue.prototype.$toLower = (name, string) => {
    if (name&&typeof(name)=='string') {
      string = string || '-'
      let _name = name.replace(/\s/g, string);
      return _name.toLowerCase()      
    }
  }
  //大小变小写  "string"变空格
  Vue.prototype.$retoLower = (name, string) => {
    if (typeof(name)=='string') {
      let _name = name.replace(new RegExp(string, 'g'), " ");
      return _name.toLowerCase()      
    }

  }
  //根据key 值 排序array
  Vue.prototype.$sortKey = (array, key) => {
    return array.sort(function (a, b) {
      var x = a[key];
      var y = b[key];
      return x < y ? -1 : x > y ? 1 : 0;
    })
  }

  Vue.prototype.$mdContentFit = (data, sourceSrt, targetSrt) => {
    let outData = data.replace(new RegExp(sourceSrt, 'g'), targetSrt)
    return outData
  }

}
