<template>
  <div>
    <jumbotron :jumbotronData="mddata.jumbotronAreasDownloadTop" />
    <jumbotron :jumbotronData="$t('jumbotronPromotion')" />   
  <div class="container my-lg-8 my-6">
    <b-row>
    <b-col md="6" class="mb-4" v-for="(list,listIndex) in mddata.downloadManual.manuals" :key="listIndex">
      <div class="border p-3 text-center">
        <h4 class="mb-4">{{list.title}} </h4>
        <p v-if="list.version">
          <strong>{{mddata.downloadManual.versionText}} : </strong>{{list.version}}
        </p>
          <p><b-img style="max-width:360px" :src="list.imageUrl" fluid /></p> 
          <b-btn variant="success" class="rounded-0" size="xl" :href="list.manualUrl"><svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="eye" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" class="align-middle mr-3 svg-inline--fa fa-eye fa-w-18 fa-2x"><path fill="currentColor" d="M572.52 241.4C518.29 135.59 410.93 64 288 64S57.68 135.64 3.48 241.41a32.35 32.35 0 0 0 0 29.19C57.71 376.41 165.07 448 288 448s230.32-71.64 284.52-177.41a32.35 32.35 0 0 0 0-29.19zM288 400a144 144 0 1 1 144-144 143.93 143.93 0 0 1-144 144zm0-240a95.31 95.31 0 0 0-25.31 3.79 47.85 47.85 0 0 1-66.9 66.9A95.78 95.78 0 1 0 288 160z" class=""></path></svg><span class="align-middle">{{mddata.downloadManual.viewButtonText}}</span></b-btn>
        
      </div>
    </b-col></b-row>
  </div>    
  </div>
</template>
<script>
import jumbotron from "@/components/jumbotron";
import iconBlock from "@/components/iconBlock";
export default {
  async asyncData({ app, $content }) {
    let mddata = await $content(
      "pages/help/download/manual/index"
    ).fetch();
    mddata = await app.$initMD(mddata);
    return { mddata };
  },
  head() {
    return this.mddata.head;
  },
  layout: "primary",
  components: { jumbotron, iconBlock },



};
</script>