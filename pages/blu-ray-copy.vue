<template>
<div>
 <icon-block  :iconData="mddata.listGroup" />
 </div>
</template>
<script>
export default {
async asyncData({app,$content}){
let  mddata = await $content('pages/blu-ray-copy').fetch();
 mddata = await app.$initMD(mddata);
 return {mddata}
},
head() {   
 return this.mddata.head
},
layout:"primary"
};
</script>