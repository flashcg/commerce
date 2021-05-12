<template>
<div id="Page">
  <headerNav /> 
  <breadcrumb :data="$route.path" />
  <main class="bg-light">
    <b-container><nuxt /></b-container>
  </main>
  <footer-block />
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
  beforeMount() {
this.$store.dispatch('settledData')  
  } 
};
</script>