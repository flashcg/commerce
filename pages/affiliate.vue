<template>
<div>
  <jumbotron :jumbotronData="mddata.jumbotronAreasTop" />
  <jumbotron :jumbotronData="$t('jumbotronPromotion')" />   
</div>
</template>
<script>
import jumbotron from "@/components/jumbotron";
export default {
  async asyncData({ app, $content }) {
    let mddata = await $content("pages/affiliate").fetch();
    mddata = await app.$initMD(mddata);
    return { mddata };
  },
  head() {
    return this.mddata.head;
  },
layout:'primary',
components: { jumbotron,},


};
</script>