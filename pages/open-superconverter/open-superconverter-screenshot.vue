<template>
<nuxt-content class="py-6" :document="mddata" />
</template>
<script>
export default {
async asyncData({app,$content}){
let  mddata = await $content('pages/open-superconverter/open-superconverter-screenshot').fetch();
 mddata = await app.$initMD(mddata);
 return {mddata}
},
head() {   
 return this.mddata.head
},
mounted() {
  window.$nuxt.setLayout(this.mddata.layout)
}
};
</script>