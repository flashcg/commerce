<template>
<nuxt-content class="py-6" :document="mddata" />
</template>
<script>
export default {
async asyncData({app,$content}){
let  mddata = await $content('pages/dvd-cloner/when-i-copy-a-dvd-it-burn-failed-everytime').fetch();
 mddata = await app.$initMD(mddata);
 return {mddata}
},
head() {   
 return this.mddata.head
}
};
</script>