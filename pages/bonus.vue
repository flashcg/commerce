<template>
<iconBlock :iconData="mddata.entrances" />
</template>
<script>
import { fetchItem } from "@/assets/script/tools";
export default {
  
async asyncData({app,$content}){
let  mddata = await $content('pages/bonus').fetch();
 mddata = await app.$initMD(mddata);
 return {mddata}
},
layout:'primary',
head() {   
 return this.mddata.head
}

};
</script>