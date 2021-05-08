<template>
  <div>
    <upgrade-block :data="mddata.upgrade" />
    <div class="bg-dark-opacity-1 py-lg-8 py-6">
    <nuxt-content class="container text-center" :document="mddata" />
    </div>
    <faq-list :listData="mddata.faqList"></faq-list>
  </div>
</template>
<script>

export default {

  async asyncData({ app, $content }) {
    let mddata = await $content("pages/dvd-copy-for-mac/upgrade").fetch();
    mddata = await app.$initMD(mddata);
    return { mddata };
  },
  layout:'primary',
  head() {
    return this.mddata.head;
  },
  data() {
    return {

      show: true,
    };
  },

  mounted() {

  },
};
</script>