<template>
  <div  class="container overflow-hide">
    <template  v-for="(item,index) in items" >
  <item-overview v-if="item&&item.saleInfo&&item.listActive!== false" :key="index" :data="{name:item.handleName,additionClass: 'shadow-box p-6 my-6',type: 'spList'}" :itemInfo="{boxSrc:item.boxes[0].imageUrl,name:item.name,desc:item.desc&&item.desc.longText,handleName:item.handleName,saleInfo:item.saleInfo}"  />
</template>
  </div>
</template>
<script>
import { mapState } from "vuex";
import { fetchItem } from "@/assets/script/tools";
export default {
  async asyncData({ app, $content }) {
    let mddata = await $content("pages/products").fetch();
    mddata = await app.$initMD(mddata);

    return { mddata };
  },  
  head() {
    return this.mddata.head;
  },
  computed: {
    ...mapState({
      items: (state) => state.localData.productData,
    })
   

  },
  layout:'primary',



};
</script>