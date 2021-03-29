<template>
<nuxt-content class="container content py-6" :document="mddata" />
</template>
<script>
export default {
async asyncData({app,$content}){
let  mddata = await $content('pages/terms').fetch();
 mddata = await app.$initMD(mddata);
 return {mddata}
},
head() {   
 return this.mddata.head
},
mounted() {
  window.$nuxt.setLayout(this.layout)
}
};
</script>