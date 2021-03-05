<template>
  <div>
    <jumbotron :jumbotronData="mddata.jumbotronAreasTop" />
    <jumbotron :jumbotronData="$t('jumbotronPromotion')" />
    <nuxt-content class="container content py-6" :document="mddata" />
  </div>
</template>
<script>
import jumbotron from "@/components/jumbotron";
import iconBlock from "@/components/iconBlock";
export default {
  async asyncData({ app, $content }) {
    let mddata = await $content("pages/refund_policy").fetch();
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