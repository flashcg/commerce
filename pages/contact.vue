<template>
<div>
  <primary-block :data="mddata.liveChat" >
      <template #content>
          <div class="text-center"><h2>{{mddata.liveChat.items[1].title}}</h2>
        <p class="fs-4">​
          <b-icon icon="clock"></b-icon>  
        </p>

        <p class="whiteSpace-preline" v-html="mddata.liveChat.items[1].workingTime"></p>

        <h5>{{mddata.liveChat.items[1].text}} </h5>
        </div>
      </template>
  </primary-block>
  <primary-block :data="mddata.ticketSystem" />
</div>
</template>
<script>
export default {
  async asyncData({ app, $content }) {
    let mddata = await $content("pages/contact").fetch();
    mddata = await app.$initMD(mddata);
    return { mddata };
  },
  head() {
    return this.mddata.head;
  },
layout:'primary',

};
</script>