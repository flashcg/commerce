<template>  
  <div>
   <heroCarousel :heroCarousels="mddata.heroCarousels"/>
   <jumbotron :jumbotronData="$t('jumbotronPromotion')" />   
   <iconBlock :iconData="mddata.iconBlock_productIdea" />

   <jumbotron :jumbotronData="mddata.jumbotronAreas" />
   
   <iconBlock :iconData="mddata.iconBlock_service" />
   

  </div>
</template>

<script>
import heroCarousel from "@/components/heroCarousel";
import jumbotron from "@/components/jumbotron";
import iconBlock from "@/components/iconBlock";

export default {
  async asyncData({ app, $content }) {
    let mddata = await $content("pages/index").fetch();
    mddata = await app.$initMD(mddata);
    return { mddata };
  },
  head() {
    return this.mddata.head;
  },
  layout: "fluid",
  components: { heroCarousel, jumbotron, iconBlock },

};
</script>