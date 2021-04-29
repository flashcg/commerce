<template>
 <div>
   <icon-block  :iconData="mddata.products" />
      <icon-block  :iconData="mddata.faq" />

 </div>
</template>
<script>
import {mapState} from 'vuex';
export default {
async asyncData({app,$content}){
let  mddata = await $content('pages/video-guide').fetch();
 mddata = await app.$initMD(mddata);
 return {mddata}
},
head() {   
 return this.mddata.head
},
layout:'primary',
  computed:{
    ...mapState({productData: state=>state.localData.productData}),
    iconList(){
      if (this.productData) {
        let filterData = this.productData.filter(res=>res.youtubeArea),
        out = filterData.map(res=>res.youtubeArea.icon)
        return [].concat(...out)
        
      } else {
        return []
      }

    }
  },
  beforeMount(){
    if (this.iconList.length>0) {
      this.mddata.products.icon = this.iconList
    }
    
  },
  watch:{
    iconList(val){
    if (this.iconList.length>0) {
      this.mddata.products.icon = this.iconList
    }      
    }
  }

};
</script>