<template>
  <div>

  </div>
</template>
<script>

export default {

  async asyncData({ app, $content }) {
    let mddata = await $content("pages/dvd-cloner/upgrade").fetch(),
    {upgrade} = await $content("pages/dvd-cloner/upgrade").fetch();
    mddata = await app.$initMD(mddata);
    return { mddata ,apiUrl:upgrade.apiUrl};
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
    beforeMount(){
        console.log(this.$route.query.code);
    },
    methods:{

    },
  mounted() {
      console.log(this.apiUrl);
  },
};
</script>