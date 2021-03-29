<template>  
  <div>
   <hero-carousel :heroCarousels="mddata.heroCarousels"/>
   <jumbotron :jumbotronData="$t('jumbotronPromotion')" />   
   <iconBlock :iconData="mddata.advertising" />
   <icon-block  :iconData="mddata.WhyChoose" /> 
   <carousel :data="mddata.carouselRecommend" /> 

  </div>
</template>

<script>

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
  

};
</script>