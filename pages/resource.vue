<template>
<div>
  <jumbotron :jumbotronData="mddata.jumbotronAreasTop" />
  <jumbotron :jumbotronData="$t('jumbotronPromotion')" />   
  <div class="py-6 bg-gray-light">
    <p class="lead container font-size-lg">{{mddata.describeText}} </p>
  </div>
    <div class="container py-6 resource-content content">

  
    <b-tabs content-class="mt-3 ">
    <b-tab :title="item.title" class="" v-for="(item,index) in mddata.resource.contents" :key="index">
      <div v-if="item.template == 'image'" class="row">
        <div class="col-sm-6 mb-6" v-for="(list,listindex) in item.lists" :key="listindex">
          <div class="bg-gray p-4">
            <b-img fluid :src="list.imageUrl"/>
          </div> 
          <h3>{{list.title}} </h3>         
        </div>
      </div>
      <div v-if="item.template == 'download'" >
        <div class="mb-6" v-for="(list,listindex) in item.lists" :key="listindex">
          <div class="bg-gray p-4 d-inline-block">
            <a :href="list.manualUrl"><b-img fluid :src="list.imageUrl"/></a>
          </div> 
          <h3>{{list.title}} </h3>         
        </div>
      </div>    
      <div v-if="item.template == 'list'" class="content" >
        <ul>
        <li v-for="(list,listindex) in item.lists" :key="listindex">

            <a v-if="list.kbUrl" :href="list.kbUrl">{{list.title}} </a>
            <a v-if="list.manualUrl" :href="list.manualUrl">{{list.title}} </a>

        </li> </ul>
      </div>                     
    </b-tab>
    </b-tabs>
    
</div>
<nuxt-content class="content" :document="mddata" />
</div>
  
</template>
<script>
import jumbotron from "@/components/jumbotron";
import iconBlock from "@/components/iconBlock";
export default {
    async asyncData({app,$content}){
   let  mddata = await $content('pages/resource').fetch();
    mddata = await app.$initMD(mddata);
    return {mddata}
  },    
  head() {     
    return this.mddata.head;
  },
  layout: "primary",
  components: { jumbotron, iconBlock },
};
</script>