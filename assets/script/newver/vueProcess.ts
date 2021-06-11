import {templateDefault,templateCode_primary,templateProduct} from './template';
import {dirOperate,writeLog} from './other'
const fs = require('fs'),
  path = require('path'),
  yamlFront = require("yaml-front-matter");

interface fileSetting {
    mdPath: string;
    pagesFiles?: string;
  }
  
  class FileCreator {
    mdPath: string; pagesFiles?: string;
  
    constructor(data: fileSetting) {
      this.mdPath = data.mdPath; this.pagesFiles = data.pagesFiles;
    }
  
    private get mdFilePathName() {
      let outdata = this.pagesFiles?.replace(path.extname(this.pagesFiles), '');     
      return outdata
    }
    //get .md file of yaml-Front data 
    get jsonData() {
      return yamlFront.loadFront((fs.readFileSync(this.mdPath, 'utf-8')));
    }
    private get templateCode() {
      let jsonData = this.jsonData, path = this.mdFilePathName||'', templateCode: string;
      if (jsonData.template && jsonData.template.toLowerCase() == "product") {
        templateCode = templateProduct(path);
      /* } else if (jsonData.template && jsonData.template.toLowerCase() == "primary") {
        templateCode = templateCode_primary + mdFilePathName ; */
      } else {
        templateCode = templateDefault (path) ;
      }
      return templateCode
    }
  
    /**
     * create vue file
     */
    writeVueFile() {
      let ishasFile: boolean = false,pagify:boolean = true,pagesFilesFit:string|undefined = this.pagesFiles;
      
      fs.existsSync(this.pagesFiles) ? ishasFile = true : ishasFile = false;
      if(this.jsonData.pagify === false) pagify = false;     
      
      if (!ishasFile&&pagify) {
        if (this.pagesFiles?.search('/dvd-cloner/articles/')!=-1) {
          pagesFilesFit = this.pagesFiles?.replace('/dvd-cloner/articles/','/dvd-cloner/')

         } else if (this.pagesFiles?.search('/blu-ray-to-dvd/articles/')!=-1) {
          pagesFilesFit = this.pagesFiles?.replace('/blu-ray-to-dvd/articles/','/blu-ray-to-dvd/') 
        }
        fs.writeFile(pagesFilesFit, this.templateCode, (err: any) => {
          writeLog('created file - .' + this.pagesFiles);
          if (err) console.log(err);
        })
      }
    }
  }

  interface MdDirFullPath {
    mdDirPath?: string;
    fileName?: string;
  }
  
  class FilesProcess {
    mdDirPath: string;
    constructor(mdDirPath: string) {
      this.mdDirPath = mdDirPath;
    }
    mdFileFullPath(data: MdDirFullPath) {
      return path.join(data.mdDirPath, data.fileName).replace(/\\/g, "/") as string;
    }
    relativePagePath(data: MdDirFullPath) {
      let pPath = this.mdFileFullPath(data).substr(18);
      return pPath.replace(path.extname(pPath), '');
    }
  
    fileProcess(mdPath: string) {
      
      fs.readdirSync(mdPath).forEach((resFileName: string) => {
  
        let mdFileFullPath = this.mdFileFullPath({ mdDirPath: mdPath, fileName: resFileName }),
          relativePagePath = this.relativePagePath({ mdDirPath: mdPath, fileName: resFileName });
  
  
        if (fs.statSync(mdFileFullPath).isFile()) {
  
          let fileSettle = new FileCreator({ mdPath: mdFileFullPath, pagesFiles: relativePagePath + '.vue' })
          //console.log(fileSettle);
          fileSettle.writeVueFile()
  
        } else {
          dirOperate(relativePagePath);
          this.fileProcess(mdFileFullPath);
        }
  
      });
    }
  }

export {FileCreator,FilesProcess}