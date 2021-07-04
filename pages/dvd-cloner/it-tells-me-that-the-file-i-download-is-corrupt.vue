<template>
<nuxt-content class="py-6" :document="mddata" />
</template>
<script>
export default {
async asyncData({app,$content}){
let  mddata = await $content('pages/dvd-cloner/it-tells-me-that-the-file-i-download-is-corrupt').fetch();
 mddata = await app.$initMD(mddata);
 return {mddata}
},
head() {   
 return this.mddata.head
}
};
</script>