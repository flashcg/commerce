## Build Setup

``` bash


# serve with hot reload at localhost:3100
$ npm run dev

# 初始化网站，新建md页面或发布新release时，本地测试使用
$ npm run init

# 生成静态网站，部署或者本地静态测试使用
$ npm run generate
```
-------------------

# Release 功能，

zip xml 和网站的release更新根据 static\locales\en\release目录下的md文件来完成

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


* 通用模板 默认
* 产品页模板 - 根据 变量 *template* - [product] 生成
* 制作新页面可借鉴 `dvd-cloner-gold.md [product]` 或者 `privary.md [default]`

* imageUrl iconUrl kbUrl downloadUrl 为定义好的变量，都会被加上default.md里定义好的路径前缀

* 导航菜单：内容在default.md - menuTop 中的设置
   - （待更新）





# MD文档区
## MD文档区域已经定义的变量

 * 变量的格式--{value}
 * {imagesUrl} : 图片基础路径
 * {kbUrl} : knowledgebase 定义的通用路径
 * {downloadUrl} : 下载文件 定义的通用路径

