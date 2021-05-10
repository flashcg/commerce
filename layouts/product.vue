<template>
<div id="Page">
  <headerNav className="fixed-top" template="product"/>
  <main>
    <nuxt />
    <item-tab :data="$t('productRecommend')"></item-tab>
  </main>
  <footer-block />
</div>

</template>

<script>
import headerNav from "@/components/headerNav";
import itemTab from "@/components/itemTab";
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
    footerBlock, itemTab   
  },  
  beforeMount() {
    this.$store.dispatch('settledData')  

  }
};
</script>