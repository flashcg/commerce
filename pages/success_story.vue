<template>
<div>
  <jumbotron :jumbotronData="mddata.jumbotronAreasTop" />
  <jumbotron :jumbotronData="$t('jumbotronPromotion')" />   
  <iconBlock :iconData="mddata.iconBlock" /> 
</div>

</template>
<script>
import jumbotron from "@/components/jumbotron";
import iconBlock from "@/components/iconBlock";

export default {
  async asyncData({ app, $content }) {
    let mddata = await $content("pages/success_story").fetch();
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