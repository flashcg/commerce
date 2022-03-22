<template>
  <div>
    <Primary-Banner :data="content.mainBanner" class="bg-white" />
    <Section-bannerVideo :data="content.bannerVideo" />
    <Section-CountUP :data="content.funFacts"  />
    <Section-BoxList :data="content.videoPlatforms" />
    <Section-Banner :data="content.banner" />
    <Section-iconGridList :data="content.topVideo" />
    <Section-IconGridOrder :data="content.orderList" />
    <!-- <Section-Swiper :data="content.easyToUse" /> -->
    <Section-WhyChoose :data="content.whyChoose" />
    <Section-Feedback :data="content.feedback" />
    <icon-block  :iconData="content.youtubeArea" />
    <Section-Faq :data="content.faq" />
    <Section-JumbotronHalfMask :data="content.contactUs" />
  </div>
</template>

<script>
export default {
  async asyncData({app, $content }) {
    let content = await $content("pages/streaming-download/index").fetch()
    content = await app.$initMD(content);
    return { content };
  },
  layout: "fluid",
  head() {   
    return this.content.head
    },
};
</script>

<style lang="scss">@import "~assets/css/sic.scss"; </style>