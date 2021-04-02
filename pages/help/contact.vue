<template>
<div>
  <jumbotron :jumbotronData="mddata.jumbotronAreasTop" />
  <jumbotron :jumbotronData="$t('jumbotronPromotion')" />   
  <iconBlock :iconData="mddata.iconBlock_download" /> 
  <iconBlock :iconData="mddata.mostPopArea" /> 
  <faqList :listData="mddata.mostPoplist" />

</div>

</template>
<script>
import jumbotron from "@/components/jumbotron";
import iconBlock from "@/components/iconBlock";
import faqList from "@/components/faqList";


export default {
  async asyncData({ app, $content }) {
    let mddata = await $content("pages/help/contact").fetch();
    mddata = await app.$initMD(mddata);
    return { mddata };
  },
  head() {
    return this.mddata.head;
  },
layout:'primary',
  components: { jumbotron, iconBlock ,faqList},


};
</script>