<template>
  <div>
    <jumbotron :jumbotronData="mddata.jumbotronAreasTop" />
    <jumbotron :jumbotronData="$t('jumbotronPromotion')" />   
    <div class="container" v-for="(list,listKey) in $t('menuTop1')" :key="listKey">
      <h2 class="mt-8 mb-6 text-center">{{list.name}}</h2>
      
      <div v-if="list.children&&list.type == 'hardware'">
        <div class="row jumbotron-products align-items-center" :class="sublistKey%2==0?'flex-row':'flex-row-reverse'" v-for="(subList,sublistKey) in list.children" :key="sublistKey">
      
          
         <div class="col-lg-6">             
          <b-link :to="'/'+$fetchPath(subList)+'/'"><b-img-lazy fluid :title="getItem(subList)&&getItem(subList).productName" :src="getItem(subList)&&getItem(subList).jumbotronAreasTop[0].imageUrl" /></b-link> 
          </div>     
          <div class="col-lg-6 p-4">             
          <h2>{{getItem(subList)&&getItem(subList).productName}}</h2>
          <hr class="divider">
          <p class="lead">{{getItem(subList)&&getItem(subList).jumbotronAreasTop[0].text}} </p>
          </div>         
        </div>
      </div>

      <div v-if="list.children&&list.type == 'software'">
        <div class="row jumbotron-products align-items-center" :class="sublistKey%2==0?'flex-row':'flex-row-reverse'" v-for="(subList,sublistKey) in list.children" :key="sublistKey">
          <div class="col-lg-6">             
          <b-link :to="'/'+subList.path+'/'"><b-img-lazy :title="subList.name" fluid :src="$getSoftwareData(subList.name)&&$getSoftwareData(subList.name).jumbotronAreasTop[0].imageUrl" /></b-link>
          </div>     
          <div class="col-lg-6 p-4">             
          <h2>{{subList.name}}</h2>
          <hr class="divider">
          <p class="lead">{{$getSoftwareData(subList.name)&&$getSoftwareData(subList.name).jumbotronAreasTop[0].text}} </p>
          </div>             
        </div>
      </div>

    </div>
  </div>
</template>
<script>
import jumbotron from "@/components/jumbotron";
export default {
  async asyncData({ app, $content }) {
    let mddata = await $content("pages/products").fetch();
    let hardwareData = await $content('pages').where({ productType: 'Hardware' }).only(['productType','productName','productDes','productModel','productImages','jumbotronAreasTop','shortText']).fetch();
    mddata = await app.$initMD(mddata);
    hardwareData = await app.$initMD(hardwareData,'block');
    return { mddata,hardwareData };
  },  
  head() {
    return this.mddata.head;
  },
  components: { jumbotron},
  layout:'primary',
  methods:{
    getItem(model){
      let outData = (this.hardwareData&&this.hardwareData.find(res => res.productModel.toLowerCase() == model.toLowerCase()))||{}
      return outData
    }
  }


};
</script>