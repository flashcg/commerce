<template>
  <div>
    <jumbotron :jumbotronData="mddata.jumbotronAreasDownloadTop" /> 
    <jumbotron :jumbotronData="$t('jumbotronPromotion')" />    
    <iconBlock :iconData="mddata.downloadBlock" /> 
    <nuxt-content class="content" :document="mddata" />
  </div>
  
</template>
<script>
import jumbotron from "@/components/jumbotron";
import iconBlock from "@/components/iconBlock";
export default {
  async asyncData({ app, $content }) {
    let mddata = await $content("pages/help/download/index").fetch();
    mddata = await app.$initMD(mddata);
    return { mddata };
  },
  head() {
    return this.mddata.head;
  },
layout:'primary',
components: { jumbotron, iconBlock},

};
</script>