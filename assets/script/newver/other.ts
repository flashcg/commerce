const fs = require('fs'),myDate = new Date();
/**
 * create to a directory that does not exist
 * @param path dir path 
 */
function dirOperate(path: string) {
    if (!fs.existsSync(path)) {
      fs.mkdirSync(path);
      writeLog('created Directory - ' + path);
    }
  }
  
  
  
  function writeLog(data: string) {
    fs.appendFile("fswrited.log", myDate.toLocaleString() + " --- " + data + "\r\n", (err: any) => {
      console.log(data)
      console.log("The log has been written to 'fswrited.log'");
      if (err) {
        return console.error(err);
      }
    })
  }

export {dirOperate,writeLog}