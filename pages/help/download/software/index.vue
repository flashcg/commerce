<template>
  <div>
    <jumbotron :jumbotronData="mddata.jumbotronAreasDownloadTop" />
    <jumbotron :jumbotronData="$t('jumbotronPromotion')" />   
  <div class="container my-lg-8 my-6">
    <b-row>
    <b-col md="6" class="mb-4" v-for="(list,listIndex) in mddata.downloadProducts.products" :key="listIndex">
      <div class="border p-3">
        <h4 class="mb-4">{{list.title}} </h4>
        <p><span class="mr-3"><strong>{{mddata.downloadProducts.versionText}} : </strong>{{fetchData(list.title,'version')}} </span>
          <span><strong>{{mddata.downloadProducts.sizeText}} : </strong>{{fetchData(list.title,'size')}} </span>
        </p>
        <b-row align-v="center" class="mb-3">
          <b-col sm="4" class="mb-sm-0 mb-3"><b-img :src="fetchData(list.title,'iconUrl')" fluid /></b-col>
          <b-col sm="8" class="lead">{{fetchData(list.title,'shortText')}}</b-col>
        </b-row>
        <div class="text-right">          
          <b-btn variant="success" class="rounded-0" size="lg" :href="fetchData(list.title,'download','downloadUrl')">{{$t('globalName.download')}}</b-btn>
          <b-btn variant="outline-secondary" class="rounded-0" size="lg" :to="'/help/download/software/'+$toLower(list.title,'-') +'-release/'">{{mddata.downloadProducts.moreLinkText}}</b-btn>
        </div>
      </div>
    </b-col></b-row>
  </div>  
  </div>
</template>
<script>
import jumbotron from "@/components/jumbotron";
import iconBlock from "@/components/iconBlock";
export default {
  async asyncData({ app, $content }) {
    let mddata = await $content("pages/help/download/software/index").fetch();
    let softwareData = await $content('pages/help/download/software').fetch();
    let delIndex = softwareData.findIndex(res=>res.slug == 'index');
    delIndex>0&&softwareData.splice(delIndex,1)
    //console.log(softwareData);
    mddata = await app.$initMD(mddata);
    for (let i = 0; i < softwareData.length; i++) {
      softwareData[i] = await app.$initMD(softwareData[i]);   
    }  
    
    return { mddata,softwareData };
  },
  head() {
    return this.mddata.head;
  },

  layout: "primary",
  components: { jumbotron, iconBlock },

  methods: {
    fetchData(key, option,option1) {
      let item = this.softwareData.find(res=>res.slug == (this.$toLower(key, "-")+'-release'))||{}
      if (option == "shortText") {     
           
         return item[option] 

      } else if(option == "iconUrl"){
        
        return item.releaseBlock[option]; 
      }  else if (option1) {
        return item.releaseBlock.releaseList[0][option][0][option1];        
      } else {
        return item.releaseBlock.releaseList[0][option];

      }
    }
  },

};
</script>