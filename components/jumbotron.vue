<template>
<div v-if="jumbotronData" class="jumbotron-block whiteSpace-preline">
<div v-for="(item,index) in jumbotronData" :key="index" :class="item.name?'jumbotron-'+$toLower(item.name,'-'):''">
<div v-if="item.template=='overlay'&&(item.active===undefined||item.active)" class="jumbotron-overlay">
  
  <div :class="'jumbotron d-flex position-relative overflow-hidden rounded-0 h-md-auto whiteSpace-preline jumbotron-'+item.handleName+' mb-'+item.blockSpacing" :style="{backgroundImage:'url('+dataChecked(item.imageUrl,item.bgStyle.video)+')',backgroundPositionY:item.bgStyle.positionY+'%',backgroundPositionX:item.bgStyle.positionX+'%',backgroundSize: 'cover',height:jHeight(item.height)}">
   
    <!-- 全屏 jumbotron overlay left/right 样式-->

      <div v-if="item.overlayBody&&(item.overlayBody.template == 'left'|| item.overlayBody.template == 'right')"
      :class="'jumbotron-body w-lg-50 position-relative md-100 py-10 px-3 '+addClass(item)+' text-'+item.overlayBody.template+' '+textColor(item)+' '+item.additionClass">
        
        <h2>{{item.title}}</h2>
        <hr v-if="item.title&&item.text" class="divider">
        
        <p class="lead fs-5">{{item.text}}</p>
        <div v-if="item.button&&item.button.template == 'softwareForBuy'">
          <b-button v-if="item.button.buy" size="xl" :href="item.button.buy.buyLink+'/'" :class="'rounded-0 mt-3 '+item.button.additionClass" :variant="item.button.buy.variant">{{$t('globalName.buy')}}</b-button>
          <b-button v-if="item.button.download" size="xl" :to="item.button.download.path+'/'" :class="'rounded-0 mt-3 '+item.button.download.additionClass" :variant="item.button.download.variant">{{$t('globalName.download')}}</b-button>          
        </div>          
        <b-button v-else-if="item.button" size="xl" :to="item.button.path+'/'" :class="'rounded-0 mt-3 '+item.button.additionClass" :variant="item.button.variant">{{item.button.text}}</b-button>
       
      </div>

    <!-- 全屏 jumbotron search 样式-->

      <div v-else-if="item.overlayBody&&item.overlayBody.template == 'search'"
      :class="'jumbotron-body position-relative w-md-50 py-10 px-3 mx-auto '+addClass(item)+' text-'+item.overlayBody.template+' '+textColor(item)+' '+item.additionClass">
       
        <h2>{{item.title}}</h2>
        <hr class="divider">        
            <b-input-group class="px-lg-10 my-3 mx-auto">
            <b-form-input v-model="kb_keyWord"></b-form-input>
            <b-input-group-append>            
            <b-button variant="primary" @click="searchKb(kb_keyWord)">{{item.overlayBody.searchButtonText}}</b-button>
            </b-input-group-append>
            
        </b-input-group>
        <div v-if="item.overlayBody.quickSearch" class="fs-5">
         <b-badge v-for="(list,listKey) in item.overlayBody.quickSearch" :key="listKey" variant="dark" :href="searchKb(list,'href')" class="mr-2">{{list}}</b-badge>
        </div>
        
      </div>  

    <!-- 全屏 jumbotron half 样式-->

      <div v-else-if="item.overlayBody&&item.overlayBody.template == 'half'" :style="'height:'+item.overlayBody.height+'%'"
      :class="'jumbotron-bod position-relative w-100 px-3 py-6 '+ halfPosition(item.overlayBody.postion)+' '+addClass(item)+' text-'+item.overlayBody.template+' '+textColor(item)+' bg-'+item.bgStyle.color+'-transparent1 '+item.additionClass">
         <div class="w-md-50 mx-auto">
        <h2  class="fs-1" v-html="item.title"></h2>
        <hr v-if="item.text"  class="divider">        
        <p v-if="item.text" class="lead fs-5 ">{{item.text}}</p> 
        <b-button v-if="item.button" size="xl" :to="'/'+item.button.path+'/'" :class="'rounded-0 mt-3 '+item.button.additionClass" :variant="item.button.variant">{{item.button.text}}</b-button>        
        </div> 
      </div> 

      <div v-else-if="item.overlayBody&&item.overlayBody.template == 'half-right-slant'"
      :class="'jumbotron-body  w-100 px-4 py-6 my-auto '+addClass(item)+' text-'+item.overlayBody.align+' '+textColor(item)+' ' +item.additionClass">
         <div class="w-md-50 mt-md-8 pr-md-4 position-relative" :class="item.overlayBody.align=='right'?'ml-auto':'mr-auto'" style="z-index:2">
        <h2  class="fs-1" v-html="item.title"></h2>
        <hr v-if="item.text"  class="divider">
        <p v-if="item.text" class="lead fs-5 ">{{item.text}}</p> 
        <b-button v-if="item.button" size="xl" :to="item.button.path+'/'" :class="'rounded-0 mt-3 '+item.button.additionClass" :variant="item.button.variant">{{item.button.text}}</b-button>        
        </div>
        <div :class="'position-absolute rotate30-right-md-position bg-'+item.bgStyle.color+'-transparent1 '+slantClass(item.overlayBody.border,item.overlayBody.align)"></div>
      </div>                  

    <!-- 全屏 jumbotron contact 样式-->

      <div v-else-if="item.overlayBody&&item.overlayBody.template == 'contact'"
      :class="'jumbotron-body position-relative w-md-50 py-10 px-3 mx-auto '+addClass(item)+' text-'+item.overlayBody.template+' '+textColor(item)+' '+item.additionClass">
       
        <h2>{{item.title}}</h2>
        <hr class="divider"> 
        <h3 class="mb-4">{{item.overlayBody.phone.name}}: {{item.overlayBody.phone.number}} </h3>
        
          <b-button variant="outline-light" size="xl" class="rounded-0 mr-sm-2" :to="item.overlayBody.liveChat.url+'/'">{{item.overlayBody.liveChat.text}}</b-button>
          <b-button variant="outline-light" size="xl" class="rounded-0" :to="item.overlayBody.ticket.url+'/'">{{item.overlayBody.ticket.text}}</b-button>
        
      </div> 
    
          <!-- title 数组 -->
      <div v-else-if="Array.isArray(item.title)" :class="'jumbotron-body position-relative w-100 py-md-10 mt-auto '+textColor(item)+' '+item.additionClass">        
        <div class="row text-center">
          <b-col v-for="(title,titleIndex) in item.title" :key="titleIndex" :md="12/item.title.length" >
          <h2 class="bg-blue-transparent inline px-4 py-2"> {{title}} </h2>
          <hr v-if="item.title&&item.text" class="divider">
          <p class="lead fs-5">{{item.text}}</p>
          <b-button v-if="item.button" size="xl" :to="item.button.path+'/'" :class="'rounded-0 mt-3 '+item.button.additionClass" :variant="item.button.variant">{{item.button.text}}</b-button>        
          </b-col>
        </div>
      </div>

    <!-- 全屏 jumbotron promotion 样式-->

      <div v-else-if="item.overlayBody&&item.overlayBody.template == 'promotion'"
      :class="'jumbotron-body position-relative mt-2 w-100 '+textColor(item)+' '+item.additionClass">  
        <b-link v-if="item.overlayBody.path" :to="item.overlayBody.hash?'/'+item.overlayBody.path+'/#'+$toLower(item.overlayBody.hash):'/'+item.overlayBody.path+'/'">
        <b-img :src="item.overlayBody.imageUrl" fluid />
        </b-link>
      </div>      

<!-- 全屏 jumbotron 默认样式-->
      <div v-else :class="'jumbotron-body position-relative w-100 py-10 px-3 mx-auto '+textColor(item)+' '+item.additionClass">      

        <h2 :class="item.titleClasss">{{item.title}}</h2>
        <hr v-if="item.title&&item.text" class="divider">
        <p class="lead fs-5">{{item.text}}</p>
        <buynow class="d-inline-block mb-sm-0 mb-3" v-if="item.button&&item.button.template == 'addToCart'" :product="$productCatch(item.productModel)" :discount="item.discount"/>
        
        <b-button v-else-if="item.button" size="xl" :to="'/'+item.button.path+'/'" :class="'rounded-0 mt-3 '+item.button.additionClass" :variant="item.button.variant">{{item.button.text}}</b-button>
        <b-button v-if="item.localVideo&&item.localVideo.button" size="xl" @click="showVideo(item.localVideo.button.videoProductUrl)" :class="'rounded-0 '+item.button.additionClass" :variant="item.localVideo.button.variant">{{$t("globalName.videoGuide")}} <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="play-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="ml-2 svg-inline--fa fa-play-circle fa-w-16"><path fill="currentColor" d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm115.7 272l-176 101c-15.8 8.8-35.7-2.5-35.7-21V152c0-18.4 19.8-29.8 35.7-21l176 107c16.4 9.2 16.4 32.9 0 42z" class=""></path></svg></b-button> 
             
      </div>

      <!--  jumbotron video 样式-->
      <div v-if="item.bgStyle&&item.bgStyle.video" id="videoTag" class="position-absolute fill-position">
        
        <video muted :src="item.bgStyle.video.videoUrl" autoplay loop :poster="item.bgStyle.video.poster.imageUrl"></video>
      </div>

      <!-- 全屏 jumbotron 背景-->
      <div v-if="item.overlayBody&&(item.overlayBody.template == 'half'||item.overlayBody.template == 'half-right-slant')"></div>
      <div v-else-if="item.bgStyle&&item.bgStyle.color" :class="bgStyle(item.bgStyle)+' position-absolute fill-position'"></div>
      <div v-else-if="item.bgStyle&&item.bgStyle.mobileColor" :class="bgStyle(item.bgStyle)+' position-absolute fill-position'"></div>
  </div>
</div>

<!-- jumbotron 左右结构样式-->
<div else v-if="item.template=='left' || item.template=='right'" :class="'jumbotron-'+item.template">
  <b-row :class="'jumbotron position-relative rounded-0 h-md-auto jumbotron-'+item.handleName+' mb-'+item.blockSpacing" >  
      <b-col :md="item.imageGird?12-item.imageGird:4" :class="textColor(item)+' '+order(item)+' '+item.additionClass">
        <div :class="'jumbotron-body px-4 py-6 h-100 m'+horizontalAbbr(item)+'-md-'+item.blockSpacing+' bg-'+item.bgStyle.color">  
        <h2>{{item.title}}</h2>
        <hr class="divider">
        <p class="lead">{{item.text}}</p>
        <b-button v-if="item.button" size="xl" :to="item.button.path+'/'" :class="'rounded-0 mt-3 '+item.button.additionClass" :variant="item.button.variant">{{item.button.text}}</b-button>
        </div> 
      </b-col>
      <!-- 判断图片是否为背景 -->
      <b-col v-if="item.bgStyle.template&&item.bgStyle.template=='image'" :md="item.imageGird?item.imageGird:8" class="overflow-hidden"  :style="{backgroundImage:'url('+dataChecked(item.imageUrl)+')',backgroundSize: 'cover',backgroundPosition: item.bgStyle.position||'center'}">
      </b-col>      
      <b-col v-else :md="item.imageGird?item.imageGird:8" class="overflow-hidden">
        <b-img :src="item.imageUrl" class="w-md-auto h-md-100 w-xl-100 w-100 h-auto" :title="item.title"/>
      </b-col>
  </b-row>
</div>

</div>

<div>

</div>  
<modal-video v-if="isShowVideo" v-model="isShowVideo" :url="videoUrl" type="video" />      
</div>

</template>
 
<script>
import modalVideo from "@/components/widget/modalVideo";
export default {
  name: "jumbotron",
  data() {
    return {
      kb_keyWord:'',
      isShowVideo:false,
      videoUrl:'',
      screenHeight: null,
      screenWidth:null,
      videoWidth: null,
      videoHeight: null
    };
  },

  props: ["jumbotronData"],
  components: { modalVideo },
  methods: {

    showVideo(url){
      this.isShowVideo = true;
      this.videoUrl = url;
    },    
    dataChecked(data,dataB){  
     let defaultData = ''
      if (dataB) {        
        return defaultData
      } else if (data){
        return data
      } else {
        return defaultData
      }
    },
    halfPosition(param){
      
      if (param == "center") {
        return "my-auto"
      } else {
        return "mt-auto"
      }
    },
    searchKb(keyWord,method){
      let path = this.$t("KB_basePath")+'search.html?q='+keyWord;
      if (method=='href') {
        return path
      } else {
        window.location.href = path
      }
      
    },
    addClass(data) {
      if (data.overlayBody.template == "right") {
        return " pr-xl-10 ml-auto ";
      } else if (data.overlayBody.template == "left") {
        return " pl-xl-10 mr-auto ";
      }
    },
    bgStyle(data) {
      if (data.opacity) {
        return "bg-" + data.color;
      } else if (data.mobileColor) {
        return "bg-md-" + data.mobileColor + "-transparent";
      } else {
        return "bg-" + data.color + "-transparent";
      }
    },
    secureData(data) {
      if (data) {
        return data;
      }
    },
    textColor(data) {
      if (data.bgStyle && data.bgStyle.color == "dark") {
        return "text-light";
      }
    },
    order(data) {
      /* jumbotron 为左右结构样式时，返回显示顺序class */
      if (data.template == "right") {
        return "order-md-last";
      }
    },
    horizontalAbbr(data) {
      if (data.template == "right") {
        return "l";
      } else if (data.template == "left") {
        return "r";
      }
    },
    jHeight(height) {
      if (height == "screen") {
        return this.screenHeight;
      } else {
        return height+"px";
      }
    },
    slantClass(borderData, alignData) {
      if (borderData) {
        return (
          "border-md-" +
          alignData +
          "-20solid-dark-transparent rotate30-" +
          alignData +
          "-md-position"
        );
      } else {
        return "rotate30-" + alignData + "-md-position";
      }
    },
    videoRespondSize(sourceEl,targetEl){

      let h = sourceEl.clientHeight;
      let w = sourceEl.clientWidth;

      let videoW = ((h * 0.9 * 16) / 9).toFixed(2),
        videoH = ((w * 0.9 * 9) / 16).toFixed(2);

/*       if (w - videoW > 0 && h - videoH > 0) {
        this.videoWidth = videoW + "px";
        this.videoHeight = ((videoW * 9) / 16).toFixed(2) + "px";
      } else if (w - videoW > 0 && h - videoH < 0) {
        this.videoWidth = videoW + "px";
        this.videoHeight = ((videoW * 9) / 16).toFixed(2) + "px";
      } else if (w - videoW < 0 && h - videoH > 0) {
        this.videoWidth = videoH + "px";
        this.videoHeight = ((videoH * 16) / 9).toFixed(2) + "px";
      } */
      
    }
  },
  watch: {

  },
  mounted() {
    this.screenHeight = document.documentElement.clientHeight+'px';
    this.screenWidth = document.documentElement.clientWidth+'px';  
    
    let el  = document.getElementById('videoTag');

    let _this = this;

    window.addEventListener('resize',()=>{      
        _this.screenHeight = document.documentElement.clientHeight+'px';
        _this.screenWidth = document.documentElement.clientWidth+'px';        
        videoRespondSize(el)     
    })

/*     window.onresize = ()=> { 
      
      return (()=>{
        this.screenHeight = document.documentElement.clientHeight+'px';
        this.screenWidth = document.documentElement.clientWidth+'px';        
        videoRespondSize(el)
      })()
    } */

    setTimeout(() => {videoRespondSize(el)}, 300);     
    
    

    function videoRespondSize(sourceEl) {
      if(sourceEl){
      let h = sourceEl.clientHeight;
      let w = sourceEl.clientWidth;     
           
      
      if ((w/h).toFixed(2)>(16/9).toFixed(2)) {
        
        sourceEl.firstChild.style.width=w+'px'
        sourceEl.firstChild.style.height='auto'
      } else {
        
        sourceEl.firstChild.style.width='auto'
        sourceEl.firstChild.style.height=h+'px'
      }
    }}

   // this.videoRespondSize('videoTag');
  }
};
</script>