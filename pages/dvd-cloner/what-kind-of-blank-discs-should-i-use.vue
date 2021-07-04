<template>
<nuxt-content class="py-6" :document="mddata" />
</template>
<script>
export default {
async asyncData({app,$content}){
let  mddata = await $content('pages/dvd-cloner/what-kind-of-blank-discs-should-i-use').fetch();
 mddata = await app.$initMD(mddata);
 return {mddata}
},
head() {   
 return this.mddata.head
}
};
</script>