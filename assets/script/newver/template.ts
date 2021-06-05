const templateDefault= (path:string) =>{
return `<template>
<nuxt-content class="py-6" :document="mddata" />
</template>
<script>
export default {
async asyncData({app,$content}){
let  mddata = await $content('${path}').fetch();
 mddata = await app.$initMD(mddata);
 return {mddata}
},
head() {   
 return this.mddata.head
}
};
</script>`},
templateProduct=(path:string) =>{
  return `<template>
<div v-if="mddata" :id="$handlify(mddata.handleName)">
  <item-overview :data="mddata.areaTop" :itemInfo="{boxSrc:(mddata.boxes[1]&&mddata.boxes[1].imageUrl)||mddata.boxes[0].imageUrl,name:mddata.name,desc:mddata.desc.longText,handleName:mddata.handleName,spPath:mddata.spPath}" />
  <item-nav :data="mddata" />
  <carousel :data="mddata.screenshot" /> 
  <icon-block  :iconData="mddata.WhyChoose" /> 
  <icon-block  :iconData="mddata.youtubeArea" />
  <div id="features" class="bg-dark-opacity-8">
  <nuxt-content class="container py-6 text-light" :document="mddata" />
  </div>
  <item-tab :data="mddata.systemRequirements" />
  <item-bonus :data="mddata.bonus" />
  <item-release :data="{handleName:mddata.handleName,name:mddata.name}" />
</div>
</template>
<script>
export default {
async asyncData({ app, $content }) {
  let mddata = await $content("${path}").fetch();
  mddata = await app.$initMD(mddata);    
  return { mddata };
},
head() {
  return this.mddata.head;
},
computed: {
},
layout: "product",  
};
</script>`},
templateCode_primary: string =
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

interface ProductDataConfig {
    boxSrc: string,
    name: string,
    model: string,
    handleName: string,
    path:string,
  }
  interface NewverData extends ProductDataConfig {
    fontColor: string,
    bgColor: string
    link: {
      download?: string,
      web?: string
      more?:string
    }  
    version: string,
    date: string,
    topText: string,
    list: string[]
  
  }
const newverCode = (data: NewverData,listCode?:string) => {
    return `
  <!DOCTYPE html>
  <html>
    <head><meta http-equiv="Content-Type" content="text/html; charset=utf-8" /><title>${data.name}</title>
    <style type="text/css">
    body{background-color:${data.bgColor};color:${data.fontColor};font-size:12px;margin:0;padding:0;line-height:14px}img{border:0}a{text-decoration:underline}a:hover{text-decoration:none}.box{width:100%;font-family:Tahoma;overflow:hidden}.box_h{height:270px}.box_l{width:150px;float:left}.box_r{width:227px;float:left}.clear{clear:both}.button{width:395px;padding-top:12px;text-align:center}.button a{display:inline-block;font-size:14px;font-weight:bolder;color:#FFF;padding-top:6px;padding-right:20px;padding-bottom:6px;padding-left:20px;text-decoration:none;margin-right:12px}a.download{background-color:#464646}a.buy{background-color:#921614}a.web{background-color:#005177}a.download:hover{background-color:#595959}a.buy:hover{background-color:#ad1512}a.web:hover{background-color:#006ea2}ul li{margin-bottom:4px}
    </style>
    </head><body scroll="no" border="0"><div class="box"><div class="box_l" align="center" style="padding-top:10px;text-align: left;"><img src="box.png" width="140" alt="" /></div><div class="box_h"><div class="box_r"><div class="list" style="margin-top: 10px;">	<p><span style="font-weight: bolder;"> ${data.name} V${data.version} released.</span>		<br />		<span style="opacity: 0.5;">Release Date: ${data.date}</span></p>
            ${data.topText?'<p style="margin-top: 10px;">' + data.topText + '</p>':''}      		
        ${listCode}
    </div></div><div class="clear"></div></div><div class="button">
    ${data.link&&data.link.download?'<a href='+data.link.download+' target="_blank" class="buy">Download Now</a>':''} 
    ${data.link&&data.link.web?'<a href='+data.link.web+' target="_blank" class="web">Web</a>':''}
    </div></div></body>
  </html>`  }

export {templateDefault,templateCode_primary,templateProduct,newverCode}