<template>
  <div>
    <jumbotron :jumbotronData="mddata.jumbotronAreasTop" />
    <jumbotron :jumbotronData="$t('jumbotronPromotion')" /> 
    <iconBlock :iconData="mddata.iconBlock_keyFeatures" />
    <productDesBlock :productImages="mddata.productImages" :description="mddata.productDes" :productModel="mddata.jumbotronAreasTop[0].productModel"/>
    <jumbotron :jumbotronData="mddata.jumbotronAreas" />
    <productDetailsBlock :productDetail="mddata.details" />
    <faqList :listData="mddata.faqBlock" />
    <structureData :model="mddata.jumbotronAreasTop[0].productModel" /> 
    <iconBlock  :iconData="mddata.youtubeArea" /> 
    <iconBlock :iconData="$t('product_service')" />    
  </div>
</template>
<script>
import jumbotron from "@/components/jumbotron";
import iconBlock from "@/components/iconBlock";
import newsletter from "@/components/newsletter";
import productDesBlock from "@/components/productDesBlock";
import productDetailsBlock from "@/components/productDetailsBlock";
import faqList from "@/components/faqList";
import structureData from "@/components/structureData";
export default {

  layout: "fluid",
  components: { jumbotron, iconBlock, newsletter, productDesBlock,productDetailsBlock ,faqList,structureData},
  async asyncData({app,$content}){
    let  mddata = await $content('static/locales/en/pages/mp4-cloner').fetch();
     mddata = await app.$initMD(mddata);
     return {mddata}
   },
   head() {   
     return this.mddata.head
   },
    mounted() {
      window.$nuxt.setLayout(this.layout)
    }
};
</script>