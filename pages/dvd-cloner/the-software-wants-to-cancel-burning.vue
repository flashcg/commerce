<template>
<nuxt-content class="py-6" :document="mddata" />
</template>
<script>
export default {
async asyncData({app,$content}){
let  mddata = await $content('pages/dvd-cloner/the-software-wants-to-cancel-burning').fetch();
 mddata = await app.$initMD(mddata);
 return {mddata}
},
head() {   
 return this.mddata.head
}
};
</script>