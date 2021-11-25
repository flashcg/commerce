<template>
  <Section-Default :iconData="data">

          <b-link class="d-flex w-100 align-items-center justify-content-center text-light" :title="data.video.title" @click="lightBoxIndex = 0">          
          <div class="position-absolute" style="z-index:2"><svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="play-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="svg-inline--fa fa-play-circle fa-w-16 fa-4x"><path fill="currentColor" d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm115.7 272l-176 101c-15.8 8.8-35.7-2.5-35.7-21V152c0-18.4 19.8-29.8 35.7-21l176 107c16.4 9.2 16.4 32.9 0 42z" class=""></path></svg></div>  
          
        </b-link>  
          <CoolLightBox v-if="data.video&&data.video.url"
          :items="[{src:data.video.url,thumb:data.bgStyle.imageUrl}]" 
          :index="lightBoxIndex"
          @close="lightBoxIndex = null">
        </CoolLightBox> 
  </Section-Default>
</template>

<script>
import CoolLightBox from 'vue-cool-lightbox'
import 'vue-cool-lightbox/dist/vue-cool-lightbox.min.css'
export default {
  data(){
    return{
      lightBoxIndex: null
    }
  },
  props: { data: Object },
  components: { CoolLightBox},
  methods: {
    showVideo(url){
      this.$refs.swiper.showVideo(url);
    }
  }
};
</script>
