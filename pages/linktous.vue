<template>
<div>
<nuxt-content class="container py-6" :document="mddata" />
<primary-block :data="mddata.link" />
</div>
</template>
<script>
export default {
async asyncData({app,$content}){
let  mddata = await $content('pages/linktous').fetch();
 mddata = await app.$initMD(mddata);
 return {mddata}
},
head() {   
 return this.mddata.head
},

layout:"primary",
mounted(){

}
};
</script>