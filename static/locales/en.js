
var yamlFront = require("yaml-front-matter");
var enMenu = require("!raw-loader!@/static/locales/en/default.md");
var salePlatform = require("!raw-loader!@/static/locales/en/salePlatform.md");
enMenu = yamlFront.loadFront(enMenu.default);
salePlatform = yamlFront.loadFront(salePlatform.default);
// 给指定变量加上全局定义
let imagesPathData = enMenu.imagesPath
let kbUrlData = enMenu.KB_basePath
let downloadUrlData = enMenu.download_basePath

function foreachObj(obj) {
    for (let key in obj) {
      key == 'imageUrl' && obj[key]|| key == 'iconUrl'  ? obj[key] = imagesPathData + obj[key] : '';          
      key == 'kbUrl'  && obj[key]? obj[key] = kbUrlData + obj[key] : '';
      key == 'downloadUrl'  && obj[key] ? obj[key] = downloadUrlData + obj[key] : '';
      if (typeof (obj[key]) == 'object') {
        foreachObj(obj[key]);
      }
    }
  }
  foreachObj(enMenu)
  foreachObj(salePlatform)


var enLocale = Object.assign(enMenu,salePlatform);

export default enLocale