## Build Setup

``` bash
# MD 创建后运行的脚本
npm run md

# install dependencies
$ npm install

# shopify datas service
$ npm run serve

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm start

# generate static project
$ npm run generate
```

-------------------
# MD 变量区
## 页面根据MD自动生成

 * 键值用 冒号加空格的方式来定义 key: value ，
 值有yaml特殊字符，如: (冒号空格、*、&),可以用双引号引用值，也可以用如下格式：

```
Key: |
  this is my very very very
  long string
```
上面这种格式会保留换行符 `\n`，并在页面能识别 `\n` 的区块显示换行

* 重复的内容在YAML中可以使用&来完成锚点定义，使用*来完成锚点引用，例如：
```
hr:
- Mark McGwire
- &SS Sammy Sosa
rbi:
- *SS 
- Ken Griffey
```
可以看到，在hr中，使用&SS为Sammy Sosa设置了一个锚点（引用），名称为SS，在rbi中，使用*SS完成了锚点使用


 * 通用模板
 * 产品页模板 - 根据 变量 *template* - [product] 生成 
   模板二级分类在  *productType* 中定义: [Hardware]  [software]
 * 主要模板   - 根据 变量 *template* - [primary] 生成

 * imageUrl iconUrl kbUrl downloadUrl 为定义好的变量，都会被加上default.md里定义好的路径前缀
 
 * Buy Now 弹窗的国家分类，先根据IP判断国家，根据产品自动选择有效的地区，具体设定方法在 `salePlatform.md` 中已经注释

 * 页面组件 jumbotron ，通常命名为`jumbotron***`，网站应用最多的组件，内容为组，`active` 控制区块是否`显示`,默认为`true` ；
 jumbotron样式用`template`控制：
    - `template: left/right` 为文字图片左右摆放，分别显示，默认插入图片标签 `<img>`，当 `bgStyle - template: image` 时，图片显示为背景。
    - （待更新）
 * 导航菜单：内容在default.md - menuTop1 中的设置，menuTop1采用组格式
    - （待更新）
    - 促销图片：为需要添加促销的菜单组 加入key `promotion` ，包含 `imageUrl`图片路径  `path`图片链接 `hash`链接的锚点（链接页的ID ,通常为促销区 `name` 的 value）属性 ,md文件中有注释掉的范例
 * store 页面
    - 促销区：页面组件 `card` ，通常命名为`cardRow***`, **其中 `active` 控制区域是否显示，值为`true\false`**
    - 促销行为：顶部banner锚点和下面的促销售卖区
        - 顶部banner锚点：`heroCarousel - block - anchor` 包含 `title imageUrl target` 属性,其中 `target` 为锚点，为促销区 `name` 的值 
        - 促销售卖区：通常为 `cardRow2` ,其中 `name` 的值生成区块的 `ID`, `block`组生成产品，每个组中 `discount` 为促销区:
            - 属性`title`在进入购物车和结算页面显示，
            - 属性`code` 为 shopify中建立的discount code，会在进入购物车时，根据规则自动进行价格修改
            **(注意，code规则所对应的产品，一定要跟当前所在组的 `productModel` 能对应上。 )**




# MD文档区
## MD文档区域已经定义的变量

 * 变量的格式--{value}
 * {imagesPath} : 图片基础路径
 * {kbUrl} : knowledgebase 定义的通用路径
 * {downloadUrl} : 下载文件 定义的通用路径
 * {[产品model]-price} : 当前产品价格 | example-- {CA-998p-price}

