export {
  docStringInit, docYamlInit, yamlCategroyInit, fetchProduct, retoLower, slugify, dateFormat, timestampToID, contentPathHandle
}
const slugify = (string='') => {
  string.toString()
    let _name = string.replace(new RegExp("_", 'g'), "-");
    _name = string.replace(new RegExp(" ", 'g'), "-");
    return _name.toLowerCase()
  
}
/**
 * 大写变小写 全局 替换 string
 * @param {string} name 
 * @param {string} string 
 * @returns 
 */
const retoLower = (name, string) => {
  if (typeof (name) == 'string') {
    let _name = name.replace(new RegExp(string, 'g'), " ");
    return _name.toLowerCase()
  }
}
const timestampToID = (date) => {
  return new Date(date).getTime().toString(20)
}
const contentPathHandle = (path = '') => {
  let lastStr = path.charAt(path.length - 1);
  if (lastStr == '/') { path = path.slice(0, path.length - 1); }
  return path
}
/**
 * 查找单个产品
 * @param {array} items 
 * @param {string} model 
 * @returns {object | undefined} 
 */

const fetchProduct = (items, model) => {
  if (items.length > 0) {
    let item = items.find(res => res.slug.toLowerCase() == model.toLowerCase())
    if (!item) item = items.find(res => {
      if (res.model) return res.model.toLowerCase() == model.toLowerCase()
    });
    return item
  }
}


/** md文档替换全局关键字
 * 
 * @param {object} basePath - 定义好的全局变量
 * @param {string} docStr - md document
 */
const docStringInit = (docStr, basePath) => {

  // MD文档区替换全局定义
  Object.keys(basePath).forEach(key => {
    let sourceSrt = escape("{" + key + "}");
    docStr = docStr.replace(new RegExp("{" + key + "}", 'g'), basePath[key])
    docStr = docStr.replace(new RegExp(sourceSrt, 'g'), basePath[key])
  })
  return docStr
}
/**分类索引文件初始化
 * 
 * @param {string} str 
 * @returns {string}
 */
const yamlCategroyInit = (str = '') => {
  // yaml区替换全局定义
  str = str.replace(/^\s+|\s+$/g, '');  //去掉末尾多余的换行
  str = str.replace(new RegExp("\n", 'g'), '\n    - ');
  str = 'data:\r\n    - ' + str
  return str
}
/** md yaml 添加全局路径
 * 
 * @param {object} docParsed nuxt/content 编译以后的文档
 * @param {object} basePath 定义好的全局变量
 * @returns 
 */
const docYamlInit = (docParsed, basePath) => {

  const pathHandle = (value, path) => {
    if (value && value.substr(0, 4) == 'http') {
      return value
    } else {
      return path + value
    }
  }
  // 给指定变量加上全局定义
  function foreachObj(obj) {
    for (let key in obj) {
      Object.keys(basePath).forEach(keyPath => {
        key == keyPath ? obj[key] = pathHandle(obj[key], basePath[keyPath]) : '';
      })
      if (typeof (obj[key]) == 'object') {
        foreachObj(obj[key]);
      }
    }
  }
  foreachObj(docParsed)


  // adjust meta info
  var head = {};
  var fnMeta = (metaItems) => metaItems.map(res => {
    res.hid = res.name
    return res
  });

  if (docParsed.metaItems && docParsed.title) {
    head = {
      title: docParsed.title,
      meta: fnMeta(docParsed.metaItems)
    }
  } else if (docParsed.metaItems) {
    head = {
      meta: fnMeta(docParsed.metaItems)
    }
  } else if (docParsed.title) {
    head = {
      title: docParsed.title
    }
  }

  docParsed.head = head;
  delete docParsed.metaItems;

  return docParsed
}

/**
 * 遍历目录下的文件
 * @param {string} currentDirPath 
 * @param {function} callback 
 */
/* 
const traverSync = (currentDirPath, callback)=> {
  
  fs.readdirSync(currentDirPath).forEach( (name)=> {
    let filePath = path.join(currentDirPath, name);
    let stat = fs.statSync(filePath);
      if (stat.isFile()) {
          callback(filePath, stat);
      } else if (stat.isDirectory()) {
        traverSync(filePath, callback);
      }
  });
} */

const dateFormat = (date) => {
  console.log(data);
  if (date) {
    date = date.replace(new RegExp('T', 'g'), " ");
    date = date.replace(new RegExp('.000Z', 'g'), " ");
  
  }

  return date
  //return date.format('yyyy-MM-dd hh:mm:ss') 
}

