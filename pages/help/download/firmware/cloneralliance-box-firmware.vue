<template>
  <div>
    <jumbotron :jumbotronData="mddata.jumbotronAreasDownloadTop" />
    <jumbotron :jumbotronData="$t('jumbotronPromotion')" />   
    <div v-if="mddata.howToUpgrade" class="bg-gray-light" >
      <div class="container text-center py-5"><a :href="mddata.howToUpgrade.kbUrl" :title="$t('globalName.howToUpgrade')" ><b-img  :src="mddata.howToUpgrade.imageUrl" fluid  /></a></div>
    </div>    
    <firmwareDownload :firmwareData="mddata.firmwareBlock" class="container my-lg-8 my-6" />
  </div>
</template>
<script>
import jumbotron from "@/components/jumbotron";
import firmwareDownload from "@/components/firmwareDownload";
export default {
  async asyncData({ app, $content }) {
    let mddata = await $content("pages/help/download/firmware/cloneralliance-box-firmware").fetch();
    mddata = await app.$initMD(mddata);
    return { mddata };
  },
  head() {
    return this.mddata.head;
  },
  layout: "primary",
  components: { jumbotron, firmwareDownload },

};
</script>