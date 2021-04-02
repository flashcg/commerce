<template>
<div id="Page">
  <headerNav className="fixed-top"/>
  <main>
    <nuxt />
  </main>
  <footer-block />
</div>

</template>

<script>

export default {
  head() {
    return {
      htmlAttrs: {
        lang: this.$i18n.locale
      }
    };
  },
  mounted() {
    this.$store.dispatch('shopifyData') 

  }
};
</script>