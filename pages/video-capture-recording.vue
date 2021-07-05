<template>

<div>
    <jumbotron :jumbotronData="mddata.jumbotron" />
<nuxt-content class="container py-6" :document="mddata" />

</div>
</template>
<script>
export default {
async asyncData({app,$content}){
let  mddata = await $content('pages/video-capture-recording').fetch();
 mddata = await app.$initMD(mddata);
 return {mddata}
},
head() {   
 return this.mddata.head
},
layout:"primary"
};
</script>