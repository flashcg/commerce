<template>
  <div v-if="iconData" :id="$handlify(iconData.name)" :class="'iconBlock position-relative py-lg-8 py-6 iconBlock-'+$toLower(iconData.name,'-')">  
      <div :class="'iconBlock-body zIndex '+textColor(iconData)+' '+iconData.additionClass+' '+iconData.container">  
        <div v-if="iconData.title || !iconData.title==null">
          <h2>{{iconData.title}}</h2>
          <hr class="divider">
        </div>
        <p v-if="iconData.textTop" class="lead mb-4">{{iconData.textTop}}</p>
        <div class="row justify-content-center">
        <b-col :lg="12/iconData.iconGird" :md="12/iconData.iconGird*2" :class="'mb-4 mb-md-0 '+iconData.iconGirdClass" v-for="(item,index) in iconData.icon" :key="index">
          <div :class="'position-relative  mb-4 mx-auto w-'+iconData.iconWidth">
            
            <b-link v-if="item.youtubeID" @click="showVideo('https://www.youtube.com/embed/'+item.youtubeID)" class="d-flex fb-youtube align-items-center justify-content-center text-light">
            
              <div class="position-absolute" style="z-index:2"><svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="play-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="svg-inline--fa fa-play-circle fa-w-16 fa-4x"><path fill="currentColor" d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm115.7 272l-176 101c-15.8 8.8-35.7-2.5-35.7-21V152c0-18.4 19.8-29.8 35.7-21l176 107c16.4 9.2 16.4 32.9 0 42z" class=""></path></svg></div>  
              <div class="position-absolute fill-position bg-dark-transparent"></div> 
              <b-img v-if="item.iconUrl" :src="item.iconUrl" fluid :class="iconData.iconClass"/>
              <get-youtube :id="item.youtubeID" template="thumbnail" />
            </b-link>

            <b-link v-else-if="item.url&&item.method == 'href'" :href="item.url">
              <b-img :title="item.title" :src="item.iconUrl" fluid :class="iconData.iconClass"/>
              <div v-if="item.type=='overlay'" :class="'bg-'+item.overlayStyle+'-transparent d-flex p-4 position-absolute text-white fill-position'">
                <span class="m-auto lead">{{item.text}}</span><span class="m-auto"><svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="chevron-right" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" class="align-middle svg-inline--fa fa-chevron-right fa-w-10 fa-2x"><path fill="currentColor" d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z" class=""></path></svg></span>
              </div>
            </b-link>

            <b-link v-else-if="item.url" :to="item.url+'/'">
              <b-img :title="item.title" :src="item.iconUrl" fluid :class="iconData.iconClass"/>
              <div v-if="item.type=='overlay'" :class="'bg-'+item.overlayStyle+'-transparent d-flex p-4 position-absolute text-white fill-position'">
                <span class="m-auto lead">{{item.text}}</span><span class="m-auto"><svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="chevron-right" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" class="align-middle svg-inline--fa fa-chevron-right fa-w-10 fa-2x"><path fill="currentColor" d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z" class=""></path></svg></span>
              </div>
            </b-link>            

            <b-link v-else-if="item.kbUrl" :href="item.kbUrl">
              <b-img :title="item.title" :src="item.iconUrl" fluid :class="' '+iconData.iconClass"/>
              <div v-if="item.type=='overlay'" :class="'bg-'+item.overlayStyle+'-transparent d-flex p-4 position-absolute text-white fill-position'">
                <span class="m-auto lead">{{item.text}}</span><span class="m-auto"><svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="chevron-right" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" class="align-middle svg-inline--fa fa-chevron-right fa-w-10 fa-2x"><path fill="currentColor" d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z" class=""></path></svg></span>
              </div>              
            </b-link>
           <b-img v-else :title="item.title" :src="item.iconUrl" fluid :class="'mb-4 '+iconData.iconClass"  />

        </div>
        <h4 v-if="item.title">{{item.title}}</h4> 
           <h6 v-if="item.subTitle">{{item.subTitle}}</h6>
          <p v-if="item.text&&!item.type" class="lead font-size-md" v-html="item.text"></p> 
          <p v-else-if="item.youtubeID" class="lead font-size-md"><get-youtube :id="item.youtubeID" /> </p>
        </b-col></div> 
         <p v-if="iconData.textBottom" class="lead mt-6">{{iconData.textBottom}}</p>     
        <b-button v-if="iconData.button" size="xl" :to="iconData.button.path+'/'" :class="'rounded-0 mt-3 '+iconData.button.additionClass" :variant="iconData.button.variant">{{iconData.button.text}}</b-button>

      </div>
      <div v-if="iconData.bgStyle " :class="backgroundClass" :style="backgroundStyle"></div>  
          
  <modal-video v-if="isShowVideo" v-model="isShowVideo" :url="videoUrl" type="iframe" />  
  </div>
</template>
 
<script>
import getYoutube from '@/components/widget/getYoutube'
import modalVideo from "@/components/widget/modalVideo";
export default {
  name: "iconBlock",
  data() {
    return { 
      isShowVideo:false,
      videoUrl:'',
      pushData: { title: "video", id: 0 } 
      };
  },
  props: ["iconData"],
  components:{getYoutube,modalVideo},
  computed:{
    backgroundStyle(){      
    if (this.iconData.bgStyle&&typeof(this.iconData.bgStyle)=='object') {        
        return {
          backgroundImage:'url('+this.iconData.bgStyle.imageUrl+')',
          backgroundSize: 'cover',
          backgroundAttachment: this.iconData.bgStyle.attachment,
          backgroundPositionY: this.iconData.bgStyle.positionY,
          backgroundPositionX: this.iconData.bgStyle.positionX
        }        
      }
    },
    backgroundClass(){
      if (typeof(this.iconData.bgStyle)=='string') {
        return 'bg-'+this.iconData.bgStyle+' position-absolute '+this.bgPosition(this.iconData.bgPosition)
      } else if (this.iconData.bgStyle&&typeof(this.iconData.bgStyle)=='object') {
        return 'bg-'+this.iconData.bgStyle.default+' position-absolute '+this.bgPosition(this.iconData.bgPosition)
      }        
    }
  },
  methods: {
    showVideo(url){
      this.isShowVideo = true;
      this.videoUrl = url;
    },      
    textColor(data) {
      if (data.bgStyle == "dark") {
        return "text-light";
      }
    },
    bgPosition(data) {
      if (data == "half") {
        return "fill-md-half-position";
      } else {
        return "fill-position";
      }
    },
    push({ id, title }) {
      this.pushData = { id, title };
      console.log(this.pushData);
    },

  },
  mounted() {

  }
};
</script>