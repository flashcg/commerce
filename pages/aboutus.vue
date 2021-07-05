<template>
<div>
  <primary-block :data="mddata.desc" /> 
  <div class="container py-lg-8 py-6">
    <h3>{{mddata.aboutus.title}} </h3>
    <div v-for="(item,index) in list" :key="index" class="mb-4">
      <p v-html="item.desc.longText"></p> <br/>
      <b-link :to="item.handle.path?'/'+item.handle.path+'/':''"><b-img fluid style="max-width:600px" :src="item.logo.imageUrl" /></b-link>
    </div>
  </div>
</div>
</template>
<script>
import {mapState} from 'vuex';
export default {
  
async asyncData({app,$content}){
let  mddata = await $content('pages/aboutus').fetch();
 mddata = await app.$initMD(mddata);
 return {mddata}
},
head() {   
 return this.mddata.head
},
layout:"primary",
  computed:{
    ...mapState({productData: state=>state.localData.productData}),
    list(){
      if (this.productData.length>0) {
        return this.productData.filter(res=>res.logo&&res.logo.imageUrl)              
      } else {
        return []
      }

    }
  }
};
</script>