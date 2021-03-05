const fs = require("fs");
const path = require('path');
const yamlFront = require("yaml-front-matter");
var myDate = new Date();
const localesDir = ["en"];
const mdBasePath = "static/locales/";

const templateCodeA =
  `<template>
  <nuxt-content class="container content py-6" :document="mddata" />
</template>
<script>
export default {
  async asyncData({app,$content}){
    let  mddata = await $content('`;
const templateCodeB =
`').fetch();
     mddata = await app.$initMD(mddata);
     return {mddata}
   },
   head() {   
     return this.mddata.head
   },
    mounted() {
      window.$nuxt.setLayout(this.layout)
    }
};
</script>`;
const templateCode_ProductA =
  `<template>
  <div>
    <jumbotron :jumbotronData="mddata.jumbotronAreasTop" />
    <jumbotron :jumbotronData="$t('jumbotronPromotion')" /> 
    <iconBlock :iconData="mddata.iconBlock_keyFeatures" />
    <productDesBlock :productImages="mddata.productImages" :description="mddata.productDes" :productModel="mddata.jumbotronAreasTop[0].productModel"/>
    <jumbotron :jumbotronData="mddata.jumbotronAreas" />
    <productDetailsBlock :productDetail="mddata.details" />
    <faqList :listData="mddata.faqBlock" />
    <structureData :model="mddata.jumbotronAreasTop[0].productModel" /> 
    <iconBlock  :iconData="mddata.youtubeArea" /> 
    <iconBlock :iconData="$t('product_service')" />    
  </div>
</template>
<script>
import jumbotron from "@/components/jumbotron";
import iconBlock from "@/components/iconBlock";
import newsletter from "@/components/newsletter";
import productDesBlock from "@/components/productDesBlock";
import productDetailsBlock from "@/components/productDetailsBlock";
import faqList from "@/components/faqList";
import structureData from "@/components/structureData";
export default {

  layout: "fluid",
  components: { jumbotron, iconBlock, newsletter, productDesBlock,productDetailsBlock ,faqList,structureData},
  async asyncData({app,$content}){
    let  mddata = await $content('`;
const templateCode_primary =
  `<template>
    <div>
      <jumbotron :jumbotronData="mddata.jumbotronAreasTop" />
      <jumbotron :jumbotronData="$t('jumbotronPromotion')" /> 
      <nuxt-content class="container content py-6" :document="mddata" />
      <iconBlock :iconData="$t('product_service')" />
    </div>  
  </template>
  <script>
  import jumbotron from "@/components/jumbotron";
  import iconBlock from "@/components/iconBlock";
  export default {

  layout: "fluid",
  components: { jumbotron, iconBlock},
  async asyncData({app,$content}){
    let  mddata = await $content('`;


localesDir.forEach(function (locale) {

  // write Json file  
  var mdResult, pagesResult, mdDir, mdFiles, pagesDir, pagesFiles; 

  mdFiles = [], mdDir = [];
  var fulPath = "/pages/";
  var deepDir = 0;
  //run();

  function myReadfile(mdPath) {

    fs.readdir(mdPath, (err, files) => {
      if (err) throw err
      files.forEach(file => {

        //拼接获取绝对路径，fs.stat(绝对路径,回调函数)   

        let fPath = path.join(mdPath, file).replace(/\\/g, "/");
        let _pPath = fPath.substr(18);
        let pPath = _pPath.replace(path.extname(_pPath), '');

        fs.stat(fPath, (err, stat) => {
          if (stat.isFile() && path.extname(file).toLowerCase() !== '.json') {
            //stat 状态中有两个函数一个是stat中有isFile ,isisDirectory等函数进行判断是文件还是文件夹            
            filesOperate(file, fPath, pPath + '.vue')
          } else if (path.extname(file).toLowerCase() !== '.json') {
            dirOperate(fPath, pPath);
            myReadfile(fPath)
          }
        })
      })
    })
  }
  
  myReadfile(mdBasePath + locale + fulPath);

  // create VUE fils from MD file and directory  


  function dirOperate(mdPath, pagePath) {


    fs.existsSync(pagePath) ? '' : mkDir(pagePath);
    
  }

  function mkDir(pagePath) {
   // console.log(pagePath)
    fs.mkdirSync(pagePath);
    writeLog('created Directory - ' + pagePath);
  }

  function filesOperate(mdFile, mdPath, pagesFiles) {

    let mdDate = fs.readFileSync(mdPath, 'utf-8');
    let jsonStr = yamlFront.loadFront(mdDate);
    let ishasFile;
    let mdFilePathName = mdPath.replace(path.extname(mdPath), '');

    // 创建新模板 
    var templateCode;
    if (jsonStr.template && jsonStr.template.toLowerCase() == "product") {
      templateCode = templateCode_ProductA + mdFilePathName + templateCodeB;
    } else if (jsonStr.template && jsonStr.template.toLowerCase() == "primary") {
      templateCode = templateCode_primary + mdFilePathName + templateCodeB;
    } else {
      templateCode = templateCodeA + mdFilePathName + templateCodeB;
    }
    
    fs.existsSync(pagesFiles) ? ishasFile = true : ishasFile = false;
    //console.log(path,fileName)
    if (!ishasFile) {
      fs.writeFile(pagesFiles, templateCode, function (err) {
        writeLog('created file - .' + pagesFiles);
        if (err) console.log(err);
      })
    } 
    /*       var mdFilesStr = JSON.stringify(mdFiles);
          //console.log(mdFilesStr)
          fs.writeFile(mdBasePath + locale + path + "/listMD.json", mdFilesStr, (err) => {
            if (err) {
              return console.error(err);
            }
          }) */
  }
});

// Define funtions

function writeLog(data) {
  fs.appendFile("fswrited.log", myDate.toLocaleString() + " --- " + data + "\r\n", (err) => {
    console.log(data)
    console.log("The log has been written to 'fswrited.log'");
    if (err) {
      return console.error(err);
    }
  })
}
