<template>
<div>
  <primary-block :data="mddata.myCommerce" /> 
  <primary-block :data="mddata.regNow" /> 
  <primary-block :data="mddata.contact" /> 
</div>
</template>
<script>
export default {
async asyncData({app,$content}){
let  mddata = await $content('pages/affiliate').fetch();
 mddata = await app.$initMD(mddata);
 return {mddata}
},
head() {   
 return this.mddata.head
},
layout:"primary",
mounted() {

}
};
</script>