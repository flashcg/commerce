<template>
<div v-if="mddata" :id="$handlify(mddata.handleName)">
  <item-overview :data="mddata.areaTop" :itemInfo="{boxSrc:(mddata.boxes[1]&&mddata.boxes[1].imageUrl)||mddata.boxes[0].imageUrl,name:mddata.name,desc:mddata.desc.longText,handleName:mddata.handleName,spPath:mddata.spPath}" />
  <item-nav :data="mddata" />
  <carousel :data="mddata.screenshot" /> 
  <icon-block  :iconData="mddata.WhyChoose" /> 
  <icon-block  :iconData="mddata.youtubeArea" />
  <div id="features" class="bg-dark-opacity-8">
  <nuxt-content class="container py-6 text-light" :document="mddata" />
  </div>
  <item-tab :data="mddata.systemRequirements" />
  <item-bonus :data="mddata.bonus" />
  <item-release :data="{handleName:mddata.handleName,name:mddata.name}" />
</div>
</template>
<script>
export default {
async asyncData({ app, $content }) {
  let mddata = await $content("pages/blu-ray-to-dvd/index").fetch();
  mddata = await app.$initMD(mddata);    
  return { mddata };
},
head() {
  return this.mddata.head;
},
computed: {
},
layout: "product",  
};
</script>