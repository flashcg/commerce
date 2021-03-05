<template>

   <div id="video">
     <div class="position-relative">
        <div id="videoLoaded" v-if="!iscanplaythrough" class="text-light text-center position-absolute fill-position">
          <div class="d-flex flex-column justify-content-center h-100">
            <div style="margin: auto 0 ;z-index: 11;">
            <h3 class="lead font-size-xxxl font-md-size-md">{{videoBlock.video.loadingInfo}} </h3>
            </div>            
            <div style="margin: auto 0 ;z-index: 11;">
            <b-spinner label="Spinning" style="width: 3rem; height: 3rem;"></b-spinner>
            </div>
          </div>          
        </div>
          <div id="videoPoster" v-if="!iscanplaythrough" class="position-absolute fill-position" :style="{backgroundSize:'cover', backgroundImage:'url('+videoBlock.video.poster.imageUrl+')'}"></div>
          <div id="videoReplay" v-if="isvideoEnded"  class="text-center position-absolute fill-position text-white" style="z-index:9;overflow:hide">
            <div  class="d-flex flex-column justify-content-center h-100">
              <div style="margin: auto 0 ;z-index:3">
                <h3 class="lead font-size-xxxl font-md-size-md">{{videoBlock.video.endedInfo}} </h3>
              </div>                     
              <div style="margin: auto 0;z-index:3">
                <span @click="videoPlay()" class=" play-btn"><svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="play-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="svg-inline--fa fa-play-circle fa-w-16"><path fill="currentColor" d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm115.7 272l-176 101c-15.8 8.8-35.7-2.5-35.7-21V152c0-18.4 19.8-29.8 35.7-21l176 107c16.4 9.2 16.4 32.9 0 42z" class=""></path></svg></span>               
              </div>              
            </div>  
            <div class="bg-md-dark-transparent position-absolute fill-position"></div>          
          </div> 

     <video id="videoPlayer" muted :style="{width:'100%',display: 'block', backgroundSize:'cover', backgroundImage:'url('+videoBlock.video.poster.imageUrl+')'}" :src="videoBlock.video.videoUrl" poster="https://static.cloner-alliance.com/image/web/transparency.png"></video>
     </div>

   </div>

</template>
 
<script>

export default {
  name: 'videoPlayer',
  data(){
      return {isvideoEnded:false,isloaded:false,iscanplaythrough:false,isfirstPlayed:false,iswaiting:false}
  },
  components:{},
  props:['videoBlock'],
  methods: {
    videoPlay(){
      document.getElementById('videoPlayer').play();
      this.isvideoEnded = false
    }
  },
  mounted() {

    setTimeout(() => {
      videoControl();
    }, 300);

    window.addEventListener("scroll", () => {
      
      videoControl();
    });
    let videoDom =  document.getElementById("video")
    let videoPoster = document.getElementById("videoPoster"),videoPlayer = document.getElementById("videoPlayer"),
    videoReplay = document.getElementById("videoReplay"),videoLoaded = document.getElementById("videoLoaded"); 
    
    let videoDuration
    let _this = this;
    videoPoster.style.height = document.documentElement.clientWidth*(9/16)+'px';

    if (videoPlayer) {
      videoPlayer.addEventListener("ended", function() {        
        _this.isvideoEnded = true 
           });
      videoPlayer.addEventListener("canplaythrough", function() {
        _this.iscanplaythrough = true 
        videoDuration = videoPlayer.duration     
      });
      videoPlayer.addEventListener("waiting", function() {
        _this.iswaiting = true 
      });      
    }

    function videoControl() {      
      
      let visibleBottom =
        window.scrollY + document.documentElement.clientHeight;
      let visibleTop = window.scrollY;
      let elCenterY = videoDom.offsetTop + videoDom.offsetHeight / 2;
      
      if (
        videoPlayer &&
        !_this.isvideoEnded &&  
        _this.iscanplaythrough&&    
        elCenterY > visibleTop &&
        elCenterY < visibleBottom
      ) {    
        _this.isfirstPlayed = true
        videoPlayer.play();
        
        
        
      }else if (videoPlayer) { 
                 
        if (videoDuration&&_this.isfirstPlayed) {
          _this.isvideoEnded = true ;
          videoPlayer.currentTime = videoDuration;
        }        
        videoPlayer.pause()
      }
    }
  }
}
</script>