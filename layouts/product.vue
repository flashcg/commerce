<template>
<div id="Page">
  <headerNav className="fixed-top" template="product"/>
  <main>
    <nuxt />
  </main>
  <footer-block />
      <cookie-notice />
</div>

</template>

<script>
import headerNav from "@/components/headerNav";
import footerBlock from "@/components/footerBlock.vue";
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
  },
  mounted() {
    this.$store.dispatch('shopifyData')

  }
};
</script>