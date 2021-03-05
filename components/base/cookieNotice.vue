<template>    
    <b-alert
        v-model="isshow" variant="warning"       
        class="position-fixed fixed-top py-md-4 rounded-0 cookie-notice d-flex justify-content-center mx-auto align-items-center"
        
        fade       
        >
        <div class=" px-4 d-none d-md-block" style="opacity:0.3">
            <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="exclamation-circle" class="svg-inline--fa fa-exclamation-circle fa-w-16 fa-3x" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zm-248 50c-25.405 0-46 20.595-46 46s20.595 46 46 46 46-20.595 46-46-20.595-46-46-46zm-43.673-165.346l7.418 136c.347 6.364 5.609 11.346 11.982 11.346h48.546c6.373 0 11.635-4.982 11.982-11.346l7.418-136c.375-6.874-5.098-12.654-11.982-12.654h-63.383c-6.884 0-12.356 5.78-11.981 12.654z"></path></svg>
        </div>


        <div class="mb-2 mb-md-0 w-md-50 lead" >{{noticeInfo.text}} </div>
        <div class="d-flex  col-md-2">
        <b-button variant="success" class="flex-fill text-center" @click="gotIt">{{noticeInfo.button}} </b-button></div>
      

    </b-alert>
</template>
 
<script>

import { mapState } from "vuex";

export default {
  name: 'cookie-notice',
  data(){
      return{
        isshow:false
      }
  },
  computed: {
    ...mapState({
      noticeInfo: (state) => state.i18n.messages.cookieNotice,
    }),
  },
  methods:{
      gotIt(){
          this.$addCookie('cookieNoticeStatus',1,87600);
          localStorage.cookieNoticeStatus = 1; 
          this.isshow = false
      }
  },
  mounted(){    
      var showed = this.$getCookie('cookieNoticeStatus')||localStorage.cookieNoticeStatus;
      if (showed!=1) {
        this.isshow = true 
      } 
  }
}
</script>