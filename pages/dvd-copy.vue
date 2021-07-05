<template>
<div>
 <icon-block  :iconData="mddata.listGroup" />
 <nuxt-content class="container py-6" :document="mddata" />
 </div>
</template>
<script>
export default {
async asyncData({app,$content}){
let  mddata = await $content('pages/dvd-copy').fetch();
 mddata = await app.$initMD(mddata);
 return {mddata}
},
head() {   
 return this.mddata.head
},
layout:"primary"
};
</script>