<template>
<div style="overflow:auto">
<div  v-for="(item,index) in list" :key="index" class="container">
  <item-overview v-if="item" :data="mddata.listProduct" :itemInfo="{boxSrc:item.boxes[0].imageUrl,name:item.name,desc:item.desc&&item.desc.longText,handleName:item.handleName,saleInfo:item.saleInfo}"  />
</div>
</div>
</template>
<script>
import { mapState } from "vuex";
import { fetchItem } from "@/assets/script/tools";

export default {
async asyncData({app,$content}){
let  mddata = await $content('pages/dvd-cloner/bonus').fetch();
 mddata = await app.$initMD(mddata);
 return {mddata}
},
head() {   
 return this.mddata.head
},
layout:'primary',
computed:{
  ...mapState({
      items: (state) => state.localData.productData,
    }), 
  list(){
    if(this.items.length>0){
     return this.mddata.listProduct.products.map(res=>{
       
        let item = fetchItem(res.handleName,this.items);

        
      
        return item
      })
    }
  }
},
mounted(){

}


};
</script>