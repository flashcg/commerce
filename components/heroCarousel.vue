<template>

        <div :id="$handlify(heroCarousels.name)" v-swiper:swiperGallery="swiperOption" ref="swiperTop" :style="'overflow:'+heroCarousels.overflow">
        <div class="swiper-wrapper bg-dark">
          <div class="swiper-slide d-flex justify-content-center" v-for="(item,index) in heroCarousels.block" :key="index" :class="item.handleName" :style="{height: jHeight(item.height)}">
                    
            
            
             <div :class="'slide-body w-100 mt-10 px-md-5 px-3 '+item.additionClass" style="z-index:2">
               <div>
              <h2 v-if="item.title">{{item.title}}</h2>
              <hr v-if="item.title" class="divider">
              <h4 v-if="item.subtitle">{{item.subtitle}}</h4>

              <div v-if="item.icons&&item.icons.length>0" class="d-flex justify-content-md-end"><p v-for=" (icon,iconIndex) in item.icons" :key="iconIndex" class="d-inline-block" style="max-width:120px"><b-img :src="icon.imageUrl" fluid ></b-img></p></div>
                           
              <b-button v-if="item.button" size="xl" :to="'/'+item.button.path+'/'" class="rounded-0 mt-4 ml-md-4" :variant="item.button.variant">{{item.button.text}}</b-button>
              </div>
            </div>
            <div class="position-absolute fill-position" :style="{backgroundImage:'url(' + item.bgStyle.imageUrl + ')',backgroundPositionY:item.bgStyle.positionY+'%',backgroundSize:'cover',zIndex:item.bgStyle.video&&item.bgStyle.video.layout&&item.bgStyle.video.layout=='bottom'?'1':'auto'}"></div>

            <div v-if="item.bgStyle&&item.bgStyle.video" class="d-xxl-block d-none position-absolute fill-position"> 
        
              <video muted :src="item.bgStyle.video.videoUrl" class="videoPlayer" autoplay :poster="item.bgStyle.video.poster&&item.bgStyle.video.poster.imageUrl" style="width:100%"></video>
            </div>

            
            <div v-if="item.productInfo" class="col-6 col-xl-4 mt-auto d-lg-block d-none" style="z-index:2"><b-img style="margin-bottom:-150px" fluid :src="item.productInfo.imageUrl" /> </div>   


            <div v-if="item.bgStyle" :class="'bg-'+item.bgStyle.color+'-transparent position-absolute fill-position'" style="z-index:1"></div>
            <div v-if="item.bgMobileStyle == 'dark'" class="bg-md-dark-transparent position-absolute fill-position"  style="z-index:1"></div>
            <div v-else-if="item.bgMobileStyle == 'light'" class="bg-md-light-transparent position-absolute fill-position"  style="z-index:1"></div> 
          </div>
        </div>
          <div class="swiper-pagination" slot="pagination"></div>
          <div class="swiper-button-prev text-light" slot="button-prev" ><svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="chevron-left" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" class="svg-inline--fa fa-chevron-left fa-w-10 fa-2x"><path fill="currentColor" d="M34.52 239.03L228.87 44.69c9.37-9.37 24.57-9.37 33.94 0l22.67 22.67c9.36 9.36 9.37 24.52.04 33.9L131.49 256l154.02 154.75c9.34 9.38 9.32 24.54-.04 33.9l-22.67 22.67c-9.37 9.37-24.57 9.37-33.94 0L34.52 272.97c-9.37-9.37-9.37-24.57 0-33.94z" class=""></path></svg></div>
          <div class="swiper-button-next text-light" slot="button-next" ><svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="chevron-right" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" class="svg-inline--fa fa-chevron-right fa-w-10 fa-2x"><path fill="currentColor" d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z" class=""></path></svg></div>
      </div>


</template> 
<script>
import { mapMutations, mapActions } from "vuex";

export default {
  name: "heroCarousel",
  data() {

    return {
      screenHeight: 800,
      currentCode: null,
      currentCodeErrorMessage:null,
      swiperOption: {
        // autoplay: {
        //   delay:5000
        // },
        pagination: {
          el: ".swiper-pagination"
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        }
      }
    };
  },
  props: ["heroCarousels", "productsData", "pushCartData"],

  methods: {
    ...mapMutations({
      addToCart: "cart/addToCart"
    }),    
    jHeight(height) {
      if (height == "screen") {
        return this.screenHeight + "px";
      } else {
        return height + "px";
      }
    },

    videoControl(el) {
      if (el) {
        el.currentTime = 0;
        el.play();
      }
    },
    

  },

  mounted() {
    this.screenHeight = document.documentElement.clientHeight;

    window.addEventListener("resize", () => {
      this.screenHeight = document.documentElement.clientHeight;
    });

    let _this = this;
    let videoPlayers = document.querySelectorAll(".videoPlayer");
    let currentVideoPlayer = document.querySelector(
      ".swiper-slide-active .videoPlayer"
    );
    let mySwiper = document.querySelector(".swiper-container").swiper;

    mySwiper.on("slideChangeTransitionEnd", function() {
      currentVideoPlayer = document.querySelector(
        ".swiper-slide-active .videoPlayer"
      );
      _this.videoControl(currentVideoPlayer);
    });
    
    mySwiper.allowTouchMove= this.heroCarousels.allowTouchMove;
    if (videoPlayers) {
      for (let i = 0; i < videoPlayers.length; i++) {
        let el = videoPlayers[i];
        el.addEventListener("ended", function() {
          setTimeout(() => {
            mySwiper.isEnd ? mySwiper.slidePrev(500) : mySwiper.slideNext(500);
          }, 1000);
        });
      }
    }



  }
};
</script>