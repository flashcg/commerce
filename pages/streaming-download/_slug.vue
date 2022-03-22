<template>
  <div>
    <Section-BannerTop :data="content.mainBanner" />
    <Section-IconGridShow :data="content.featureShow" />    
    <Section-orderProduct :data="{orderList,model:content.model}" />    
    <icon-block  :iconData="content.youtubeArea" />     
    <Section-Feedback :data="feedback" />
    <Section-Faq :data="faq" /> 
  </div>
</template>

<script>
import { contentPathHandle } from "../../script/common";
import {mapState } from "vuex"
export default {
  async asyncData({ $content, params, route }) {
    let content = await $content('pages'+contentPathHandle(route.path))
      .fetch()
      .catch((err) => console.log(err)),
    {feedback,orderList,faq} = await $content("pages/streaming-download/index")
      .fetch()
      .catch((err) => console.log(err))

    return { content,feedback,orderList,faq };
  },
    name: 'index',
  layout: "fluid",
  data(){
        return {
            isShow: false
        }
    },
  computed:{
    ...mapState({products:(state)=>state.products}),
    product(){
      return this.products.find(res=>res.model == this.content.model)
    }
  }        
};
</script>
<style lang="scss">@import "~assets/css/sic.scss"; </style>