<template>
<div class="swiper-gallery row">
  <b-col md="2" class="d-none d-md-block">
       <div v-swiper:thumbsSwiper="swiperOptionThumbs" class="gallery-thumbs" ref="swiperThumbs">
        <div class="swiper-wrapper">
          <div class="swiper-slide d-flex align-items-center justify-content-center mb-2" v-for="(slide, index) in data" :key="index" >
                <div v-if="slide.template == 'localVideo'" style="z-index:2" class="position-absolute text-light"><svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="play-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="svg-inline--fa fa-play-circle fa-w-16 fa-2x"><path fill="currentColor" d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm115.7 272l-176 101c-15.8 8.8-35.7-2.5-35.7-21V152c0-18.4 19.8-29.8 35.7-21l176 107c16.4 9.2 16.4 32.9 0 42z" class=""></path></svg></div>  
                <div v-if="slide.template == 'localVideo'" class="position-absolute fill-position bg-dark-transparent" style="margin:0.25rem"></div>             
            <b-img :src="$thumb(slide.imageUrl)" thumbnail fluid class="border rounded-0"/>

          </div>
        </div>
      </div>
 </b-col>
  <b-col md="10">    
        <div v-swiper:swiperGallery="swiperOption" class="gallery-top border bg-white" ref="swiperTop">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(slide, index) in data" :key="index">
            <div v-if="index==0">
              <b-img :src="slide.imageUrl"  fluid/>  
            </div>
              <div v-else>
              <b-link v-if="slide.template == 'localVideo'" @click="showVideo(slide.videoProductUrl)" class="d-flex fb-video align-items-center justify-content-center text-light">
                <div class="position-absolute" style="z-index:2"><svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="play-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="svg-inline--fa fa-play-circle fa-w-16 fa-4x"><path fill="currentColor" d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm115.7 272l-176 101c-15.8 8.8-35.7-2.5-35.7-21V152c0-18.4 19.8-29.8 35.7-21l176 107c16.4 9.2 16.4 32.9 0 42z" class=""></path></svg></div>  
                <div class="position-absolute fill-position bg-dark-transparent"></div> 
                <b-img :src="slide.imageUrl" fluid class="swiper-lazy"/>
              </b-link>              
              <b-img v-else :src="slide.imageUrl" fluid class="swiper-lazy"/> 
              <div class="swiper-lazy-preloader"></div> 
            </div>        
          </div>
        </div>
      </div>
 </b-col> 
<modal-video v-if="isShowVideo" v-model="isShowVideo" :url="videoUrl" type="video" />   
</div>

</template>
 
<script>
import modalVideo from "@/components/widget/modalVideo";
export default {
  name: "swiper-gallery",
  props: ["data"],
  components:{modalVideo},
  data() {
    return {
      isShowVideo:false,
      videoUrl:'',      
      swiperOptionThumbs: {
        direction:"vertical",
        slidesPerView: 4,
        touchRatio: 0.2,
      },
      swiperOption: {
        lazy: true,
        thumbs: {
          swiper: {
            el: ".gallery-thumbs",
            slidesPerView: 4
          }
        }
      }
    };
  },
  computed: {},
  methods:{
    showVideo(url){
      this.isShowVideo = true;
      this.videoUrl = url;
    },      
/*     thumb(imageUrl){    
      let _array = imageUrl.split('/');  
      var array = _array.map((res,index)=>{
        _array.length-1 == index ? res='thumbs/'+res:res=res+'/';
        //console.log(array)
        return res        
      })
      return array.join('')     
    } */
  },
  mounted() {

  }
};
</script>