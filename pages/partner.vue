<template>
<div>
  <jumbotron :jumbotronData="mddata.jumbotronAreasTop" />
  <jumbotron :jumbotronData="$t('jumbotronPromotion')" />   

<nuxt-content class="container content py-6" :document="mddata" />
<iconBlock :iconData="mddata.iconBlock_partners" />
</div>
  
</template>
<script>
import jumbotron from "@/components/jumbotron";
import iconBlock from "@/components/iconBlock";
export default {
  async asyncData({ app, $content }) {
    let mddata = await $content("pages/partner").fetch();
    mddata = await app.$initMD(mddata);
    return { mddata };
  },
  head() {
    return this.mddata.head;
  },
  components: { jumbotron,iconBlock },
  layout: 'primary',

};
</script>