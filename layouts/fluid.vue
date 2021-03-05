<template>
<div id="Page">
  <headerNav className="fixed-top"/>
  <main>
    <nuxt />
  </main>
  <newsletter />
  <footer-block />
      <cookie-notice />
</div>

</template>

<script>
import headerNav from "@/components/headerNav";
import footerBlock from "@/components/footerBlock.vue";
import newsletter from "@/components/newsletter";
export default {
  head() {
    return {
      htmlAttrs: {
        lang: this.$i18n.locale
      }
    };
  },
  components: {
    headerNav,
    footerBlock,
    newsletter
  },
  mounted() {
    this.$store.dispatch('shopifyData') 

  }
};
</script>