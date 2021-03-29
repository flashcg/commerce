export {ProductDataConfig,ReleaseItem}
interface ReleaseItem {
  version:string
  date:string
  size:number
  topText:string
  list:string[]
}
interface ProductDataConfig{
    abbrName:string;
    handleName:string;
    name:string;
    type:string;
    boxes:string[];
    desc:{longText:string,shortText?:string};
    handle:{handleName:string,path:string};
    release?:ReleaseItem;
  }
