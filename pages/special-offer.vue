<template>
<div style="overflow:hidden;">
<hero-carousel :heroCarousels="mddata.heroCarousels" class="d-none d-lg-block">

  <template #swiper0>
    
    <div class="position-relative zIndex w-100" v-if="banner_boxes" >

      <b-img :src="banner_boxes[3]" class="position-absolute" style="width:16%;left:18%;bottom:-15%;" />
      <b-img :src="banner_boxes[4]" class="position-absolute" style="width:16%;left:62%;bottom:-15%;" />              
      <b-img :src="banner_boxes[1]" class="position-absolute" style="width:16%;left:32%;bottom:-15%;" />
      <b-img :src="banner_boxes[2]" class="position-absolute" style="width:16%;left:55%;bottom:-15%;" />
      <b-img :src="banner_boxes[0]" class="position-absolute" style="width:18%;left:40%;bottom:-10%;" />
      <b-img :src="mddata.heroCarousels.block[0].imageUrl" class="position-absolute" style="width:100%; bottom:0;" /> 
      
      <div v-if="mddata.listProduct.standardDiscount" class="discount-box text-warning fs-1" style="width:160px;height:160px;left:20%;bottom:-5%">
              <span>{{mddata.listProduct.standardDiscount}} <br/>OFF</span>
      </div>
    </div>
  </template>
  <template #swiper1>    
    <a :href="mddata.heroCarousels.block[1].href" class="position-relative zIndex w-100" v-if="banner_boxes2" >

      <b-img :src="banner_boxes2[0]" class="position-absolute" style="width:16%;left:60%;bottom:-10%;" />         
      <b-img :src="banner_boxes2[1]" class="position-absolute" style="width:18%;left:72%;bottom:-15%;" />
  
    </a>
  </template>
</hero-carousel>
<div  v-for="(item,index) in list" :key="index" class="container">

  <item-overview v-if="item" :data="mddata.listProduct" :itemInfo="{boxSrc:item.boxes[0].imageUrl,name:item.name,desc:item.desc&&item.desc.longText,handleName:item.handleName,saleInfo:item.saleInfo,discount:{standard:mddata.listProduct.standardDiscount,lifetime:mddata.listProduct.lifetimeDiscount}}"  />
</div>
</div>
</template>
<script>
import { mapState } from "vuex";
import { fetchItem } from "@/assets/script/tools";

export default {
async asyncData({app,$content}){
let  mddata = await $content('pages/special-offer').fetch();
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

  banner_boxes(){
    if(this.items.length>0){
     return this.mddata.heroCarousels.block[0].boxes.map(res=>{
        return fetchItem(res,this.items).boxes[0].imageUrl
      })
    }
  },
  banner_boxes2(){
    if(this.items.length>0){
     return this.mddata.heroCarousels.block[1].boxes.map(res=>{
        return fetchItem(res,this.items).boxes[0].imageUrl
      })
    }
  },  
  list(){
    if(this.items.length>0){
     return this.mddata.listProduct.products.map(res=>{
       
        let item = fetchItem(res.handleName,this.items);
        item = JSON.parse(JSON.stringify(item))
        let saleInfo = item.saleInfo;

        Object.assign(saleInfo,res)

        return item
      })
    }
  }
},
mounted(){

}


};
</script>