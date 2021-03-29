import { newverCode } from './template';
import { dirOperate, writeLog } from './other';
import { FileCreator, FilesProcess } from './vueProcess';

const fs = require('fs'), archiver = require('archiver'), request = require('request'),
  path = require('path'), myDate = new Date(), mdBasePath = "./static/locales/",
  yamlFront = require("yaml-front-matter"), xml2js = require('xml2js');

interface DefaultData {
  handleSetting: { [prop: string]: string }[];
  [propName: string]: any;
}

const defaultData: DefaultData = yamlFront.loadFront((fs.readFileSync(mdBasePath + 'en/default.md', 'utf-8')))


interface ProductDataConfig {
  boxSrc: string,
  name: string,
  abbrName: string,
  handleName: string,
  size?: number,
  path: string,
}
interface NewverData extends ProductDataConfig {
  fontColor: string,
  bgColor: string
  link: {
    download?: string,
    web?: string
    more?: string
  }
  version: string,
  date: string,
  size?: number,
  topText: string,
  list: string[]
}
interface mdDataConfig {
  handleName: string;
  newver: {
    active: boolean,
    source?: string,
    size?: number
    [propName: string]: any;
  };
  [propName: string]: any;
}
/**
 * release process (extends FilesProcess class)
 */
class ReleaseProcess extends FilesProcess {
  locale: string;
  constructor(mdDirPath: string, locale: string) {
    super(mdDirPath)
    this.locale = locale
  }
  /**
   * product data
   * @param handleName require product handleName
   * @returns product data for newver.html
   */
  productData(handleName: string): ProductDataConfig | undefined {
    //fetch default.md handleName and path
    let item = defaultData.handleSetting.find(res => (res.handleName.toLowerCase() == handleName.toLowerCase())), itemData, boxSrc: string = 'defaultBox.png';

    if (item) {
      let itemPath = mdBasePath + this.locale + '/pages/' + item.path,
        //取得产品盒子图片
        itemSrc = (itemData: { boxes: { imageUrl: string; }[]; }) => {
          if (itemData.boxes[1]) {
            boxSrc = itemData.boxes[1] && itemData.boxes[1].imageUrl
          } else {
            boxSrc = itemData.boxes[0] && itemData.boxes[0].imageUrl
          }
        };

      //判断是否存在和是否为目录  
      if (fs.existsSync(itemPath) && fs.statSync(itemPath).isDirectory()) {
        itemData = yamlFront.loadFront((fs.readFileSync(itemPath + '/index.md', 'utf-8')));
        itemSrc(itemData)
      } else {
        itemData = yamlFront.loadFront((fs.readFileSync(itemPath + '.md', 'utf-8')));
        itemSrc(itemData)
      }
      return {
        boxSrc: defaultData.imagesPath + boxSrc,
        name: itemData.name || 'OpenCloner',
        abbrName: itemData.abbrName,
        handleName: itemData.handleName,
        path: item.path
      }
    }

  }
  /**
   * 根据 当前build 日期与 release MD文件日期 间隔 判断是否生成压缩文件
   */
  isToArchive(fileName: string) {
    let mdTime: Date = fs.statSync(mdBasePath + this.locale + '/release/' + fileName).mtime, hourDiff = (myDate.getTime() - mdTime.getTime()) / (1000 * 3600);

    return hourDiff > 72 ? false : true
  }
  /**
   * reWrite original -FilesProcess- fileProcess
   */
  fileProcess() {

    fs.readdirSync(this.mdDirPath).forEach((resFileName: string) => {

      let mdFileFullPath = this.mdFileFullPath({ mdDirPath: this.mdDirPath, fileName: resFileName }),
        mdJson: mdDataConfig = new FileCreator({ mdPath: mdFileFullPath }).jsonData;
      if (this.isToArchive(resFileName) && mdJson.newver.source) {

        let handleName = mdJson.newver.source
        //取item 对应的path

        let handleSetting = defaultData.handleSetting.find(res => res.handleName.toLowerCase() == handleName.toLowerCase());
        //生成全路径
        handleSetting ? mdFileFullPath = this.mdFileFullPath({ mdDirPath: this.mdDirPath, fileName: handleSetting.path + '.md' }) : '';
        //取source 的数据
        let sourceJson = new FileCreator({ mdPath: mdFileFullPath }).jsonData;
        //处理数据
        delete sourceJson.handleName;
        sourceJson.newver.size = mdJson.newver.size;
        Object.assign(mdJson, sourceJson);
        //console.log(mdJson);

      }

      //stat 状态中有两个函数一个是stat中有isFile ,isisDirectory 判断是文件还是文件夹     
      if (this.isToArchive(resFileName) && fs.statSync(mdFileFullPath).isFile()) {

        let newverDataToFiles = () => {

          let newverData: NewverData = mdJson.release[0], productData = this.productData(mdJson.handleName);

          if (mdJson.newver.size) newverData.size = mdJson.newver.size;

          mdJson.newver.release && Object.assign(newverData, mdJson.newver.release);
          Object.assign(newverData, productData, { link: mdJson.newver.link }, mdJson.newver.style);

          const newverCreator = new NewverZipCreator(newverData);
          newverCreator.launch()
          newverCreator.xmlUpdate()
        }

        mdJson.newver && mdJson.newver.active && newverDataToFiles()
      }

    })
  }
}


class NewverZipCreator {
  data: NewverData;
  cachePath: string;
  constructor(data: NewverData) {
    this.data = data;
    this.cachePath = './static/cache'
  }
  get newverData() {
    let outData = '';
    for (let i = 0; i < this.data.list.length; i++) {
      outData += '<li>' + this.data.list[i] + '</li>';
    }
    return `<ul style="padding-left: 10px;">${outData}</ul>`
  }
  /**
   * Updata XML files
   */
  xmlUpdate() {
    const xmlPath = './static/xml/'+this.data.path + '.xml',
      xmlData = fs.readFileSync(xmlPath, 'utf8');

    xml2js.parseString(xmlData.replace(/&(?!(?:apos|quot|[gl]t|amp);|#)/g, '&amp;'),
      (err: any, res: any) =>{
        let outData = res,time = new Date(this.data.date)
        outData.XML_DIZ_INFO.Program_Info[0].Program_Name = this.data.name;
        outData.XML_DIZ_INFO.Program_Info[0].Program_Version = this.data.version;
        outData.XML_DIZ_INFO.Program_Info[0].Program_Release_Day = time.getDay();
        outData.XML_DIZ_INFO.Program_Info[0].Program_Release_Month = time.getMonth()+1;
        outData.XML_DIZ_INFO.Program_Info[0].Program_Release_Year = time.getFullYear();
        outData.XML_DIZ_INFO.Program_Info[0].File_Info[0].File_Size_MB = this.data.size;
        outData.XML_DIZ_INFO.Program_Info[0].File_Info[0].File_Size_K = this.data.size&&this.data.size*1024;
        outData.XML_DIZ_INFO.Program_Info[0].File_Info[0].File_Size_Bytes = this.data.size&&this.data.size*1024*1024;
        
        const builder = new xml2js.Builder(),xml = builder.buildObject(outData);

        fs.writeFileSync(xmlPath,xml);
        writeLog('Updata '+xmlPath)
        
      });

  }
  /**
   * create zip file
   */
  zipCreator() {
    const cachePath = this.cachePath, itemDirName = this.data.path;
    /* 建立压缩文件 */
    const archive = archiver('zip');
    let zipPath: string;

    if (this.data.handleName == 'DVD-Cloner') {
      zipPath = './static/newver.zip';
    } else {
      zipPath = './static/newver-' + this.data.abbrName.toLowerCase() + '.zip';
    }

    // 创建文件输出流
    let output = fs.createWriteStream(zipPath);

    // 存档出错
    archive.on('error', function (err: any) {
      throw err
    })

    // 文件输出流结束
    output.on('close', function () {
      console.log(`file size - ${archive.pointer()} byte`);
      writeLog('created file ' + zipPath)
    })

    // 通过管道方法将输出流存档到文件
    archive.pipe(output);
    // 从目录追加文件,false为不命名目录
    //console.log(path.join(cachePath,itemDirName));    
    archive.directory(path.join(cachePath, itemDirName), false)
    // 完成归档
    archive.finalize()
  }
  launch() {
    let cachePath = this.cachePath, itemDirName = this.data.path,
      zipTargetDir = './static';
    const imgFilename = 'box.png';
    //建立缓存目录
    dirOperate(cachePath);
    dirOperate(path.join(cachePath, itemDirName));
    //建立缓存文件
    fs.writeFileSync(path.join(cachePath, itemDirName, 'index.html'), newverCode(this.data, this.newverData))

    //存储图片文件 建立zip文件
    request
      .get(this.data.boxSrc)
      .on('response', (res: any) => {
        let outStream = fs.createWriteStream(path.join(cachePath, itemDirName, imgFilename));
        res.pipe(outStream)
        outStream.on('close', () => {
          this.zipCreator()
        })
      })
  }
}

export { ReleaseProcess, NewverZipCreator }