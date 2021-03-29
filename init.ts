const localesDir = ["en"], mdBasePath = "./static/locales/";
  
import {FilesProcess} from './assets/script/newver/vueProcess';
import {ReleaseProcess} from './assets/script/newver/releaseProcess';

localesDir.forEach((locale) => {

  let mdDirPath = mdBasePath + locale + "/pages/",
  releaseDirPath = mdBasePath + locale + '/release/',
  fileSettle = new FilesProcess(mdDirPath),
  releaseSettle = new ReleaseProcess(releaseDirPath, locale);
  fileSettle.fileProcess(mdDirPath)
  releaseSettle.fileProcess()
});