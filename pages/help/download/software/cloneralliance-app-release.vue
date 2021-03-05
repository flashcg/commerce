<template>
  <div>
    <jumbotron :jumbotronData="mddata.jumbotronAreasDownloadTop" />
    <jumbotron :jumbotronData="$t('jumbotronPromotion')" />   
    <div class="container my-6">
      <softwareRelease :releaseData="mddata.releaseBlock" />
    </div>    
    <nuxt-content class="container content py-6" :document="mddata" />
  </div>  
  
</template>
<script>
import jumbotron from "@/components/jumbotron";
import softwareRelease from "@/components/softwareRelease";
export default {
  async asyncData({ app, $content }) {
    let mddata = await $content("pages/help/download/software/cloneralliance-app-release").fetch();
    mddata = await app.$initMD(mddata);
    return { mddata };
  },
  head() {
    return this.mddata.head;
  },
layout:'primary',
components: {jumbotron,softwareRelease},

};
</script>