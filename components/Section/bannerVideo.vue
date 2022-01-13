<template>
  <Section-Default :iconData="data">

          <b-link class="d-flex w-100 align-items-center justify-content-center text-light" :title="data.video.title" @click="isShowVideo = !isShowVideo">          
          <div class="position-reactive my-4" style="z-index:2"><svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="play-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="svg-inline--fa fa-play-circle fa-w-16 fa-4x"><path fill="currentColor" d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm115.7 272l-176 101c-15.8 8.8-35.7-2.5-35.7-21V152c0-18.4 19.8-29.8 35.7-21l176 107c16.4 9.2 16.4 32.9 0 42z" class=""></path></svg></div>  
          
        </b-link>  
          
       <modal-video v-if="isShowVideo" v-model="isShowVideo" :url="data.video.url" type="video" /> 
  </Section-Default>
</template>

<script>
import modalVideo from "@/components/widget/modalVideo";
export default {
  data(){
    return{
      isShowVideo: false
    }
  },
  props: { data: Object },
  components: { modalVideo},
  methods: {
    showVideo(url){
      this.$refs.swiper.showVideo(url);
    }
  }
};
</script>
