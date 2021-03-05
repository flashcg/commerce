<template>

        <div v-swiper:swiperGallery="swiperOption" ref="swiperTop" :style="'overflow:'+heroCarousels.overflow">
        <div class="swiper-wrapper">
          <div class="swiper-slide d-flex justify-content-center" v-for="(item,index) in heroCarousels.block" :key="index" :class="item.handleName" :style="{backgroundImage:'url(' + item.bgStyle.imageUrl + ')',backgroundPositionY:item.bgStyle.positionY+'%',backgroundSize:'cover',height: jHeight(item.height)}">

             <div v-if="item.template == 'store'" :class="'slide-body my-auto px-md-5 px-3 '+item.additionClass" style="z-index:2">
              <h2 class="font-size-xxxl font-sm-size-lg"><span class="text-green-yellow">{{item.title}} </span> <span class="text-blue-green text-nowrap"> 
                {{$getItemData(item.productModel,'name')}} </span></h2>
              <hr class="divider">
              <h4 v-if="item.subtitle">{{item.subtitle}}</h4> 
              
                <div>
                  <!-- <h4>{{$t('cart.couponCode')}} : {{item.discount.code}}</h4> -->
                <!-- <b-input-group class="mb-2"> -->
                  <buynow :product="$productCatch(item.productModel)" :discount="item.discount" />                 
                  <!-- <b-form-input :placeholder="$t('cart.couponCode')" v-model="currentCode" size="lg" class="rounded-0 col-sm-3" style="background:rgba(255,255,255,0.5);color:black"></b-form-input>    -->               
                <!-- </b-input-group> -->
                <!-- <b-alert fade :show="currentCodeErrorMessage" class="d-inline-block rounded-0" variant="danger">{{currentCodeErrorMessage}}</b-alert> -->

                </div>  
                  <div v-if="item.anchor" class="position-md-absolute col-md-4 col-xs-3 col-5 mx-auto mt-md-7 mt-3">
                    <a v-smooth-scroll :href="'#'+item.anchor.target"><b-img fluid :title="item.anchor.title?item.anchor.title:''" :src="item.anchor.imageUrl" style="max-width:200px" /> </a>
                  </div>          
            </div>
                    
            
            
             <div v-else :class="'slide-body w-100 mt-10 px-md-5 px-3 '+item.additionClass" style="z-index:2">
              <h2>{{item.title}}</h2>
              <div><hr class="divider"></div>
              <h4 v-if="item.subtitle">{{item.subtitle}}</h4>
              <b-button v-if="item.button" size="xl" :to="'/'+item.button.path+'/'" class="rounded-0 mt-4 ml-md-4" :variant="item.button.variant">{{item.button.text}}</b-button>
            </div>


            <div v-if="item.bgStyle&&item.bgStyle.video" class="position-absolute fill-position"> 
        
              <video muted :src="item.bgStyle.video.videoUrl" class="videoPlayer" autoplay :poster="item.bgStyle.video.poster.imageUrl"></video>
            </div>
            
            <div v-if="item.productInfo" class="col-6 col-xl-4 mt-auto d-lg-block d-none" style="z-index:2"><b-img style="margin-bottom:-150px" fluid :src="item.productInfo.imageUrl" /> </div>   


            <div v-if="item.bgStyle" :class="'bg-'+item.bgStyle.color+'-transparent position-absolute fill-position'"></div>
            <div v-if="item.bgMobileStyle == 'dark'" class="bg-md-dark-transparent position-absolute fill-position"></div>
            <div v-else-if="item.bgMobileStyle == 'light'" class="bg-md-light-transparent position-absolute fill-position"></div> 
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