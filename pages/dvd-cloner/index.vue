<template>
  <div :id="$handlify(mddata.handleName)">
    <item-overview :data="mddata.areaTop" :itemInfo="{boxSrc:mddata.box.imageUrl,name:mddata.name,desc:mddata.desc.longText,handleName:mddata.handleName}" />
    <icon-block  :iconData="mddata.screenshot" /> 
    <icon-block  :iconData="mddata.WhyChoose" /> 
    <icon-block  :iconData="mddata.youtubeArea" />
    <div id="Features" class="bg-dark-opacity-8">
    <nuxt-content class="container py-6 text-light" :document="mddata" />
    </div>
    <item-tab :data="mddata.systemReq"></item-tab>
  </div>
</template>
<script>

export default {

  async asyncData({ app, $content }) {
    let mddata = await $content("pages/dvd-cloner").fetch();
    mddata = await app.$initMD(mddata);
    return { mddata };
  },
  head() {
    return this.mddata.head;
  },
  layout: "product",

};
</script>