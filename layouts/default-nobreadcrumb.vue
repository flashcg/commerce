<template>
<div id="Page">
  <headerNav /> 
  <main>
    <b-container class="my-6"><nuxt /></b-container>
  </main>
  <footer-block />
  <cookie-notice />
</div>

</template>

<script>
import headerNav from "@/components/headerNav";
import footerBlock from "@/components/footerBlock";
import breadcrumb from "@/components/breadcrumb";
export default {
  head() {
    return {
      htmlAttrs: {
        lang: this.$i18n.locale
      }
    };
  },
  data(){
    return{
      currentPath:null
    }
  },
  components: {
    headerNav,footerBlock,breadcrumb
  },
  mounted() {
    this.$store.dispatch('shopifyData')  
  } 
};
</script>