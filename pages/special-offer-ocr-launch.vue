<template>
  <div>
      <primary-block :data="mddata.banner" > 
         <template #content>
           
           <div class="row justify-content-center">
            <b-link @click="lightBoxIndex = 0" class="d-flex fb-youtube align-items-center justify-content-center text-light">
            
              <div class="position-absolute" style="z-index:2"><svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="play-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="svg-inline--fa fa-play-circle fa-w-16 fa-4x"><path fill="currentColor" d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm115.7 272l-176 101c-15.8 8.8-35.7-2.5-35.7-21V152c0-18.4 19.8-29.8 35.7-21l176 107c16.4 9.2 16.4 32.9 0 42z" class=""></path></svg></div>  

              <b-img :src="mddata.banner.items[0].imageUrl" fluid />
              
            </b-link>
           </div>
              <div class="position-absolute fill-position bg-dark-transparent"></div>            
      </template> 
      
  </primary-block>
  <primary-block :data="{...mddata.desc,title:spTime(mddata.desc.title)}" />
  <carousel :data="{...ocrMddata.screenshot,...mddata.screenshot}" />
    <div class="container overflow-hide">
    <nuxt-content class="my-6" :document="mddata" />
    <template  v-for="(item,index) in list">
    <item-overview v-if="item" :key="index" :data="mddata.listProduct" :itemInfo="{boxSrc:item.boxes[0].imageUrl,name:item.name,desc:item.desc&&item.desc.longText,handleName:item.handleName,saleInfo:item.saleInfo,discount:{standard:mddata.listProduct.standardDiscount,lifetime:mddata.listProduct.lifetimeDiscount}}"  />
    </template>
  </div>
          <CoolLightBox 
          :items="['https://www.youtube.com/embed/'+mddata.banner.items[0].youtubeID]" 
          :index="lightBoxIndex"
          @close="lightBoxIndex = null">
        </CoolLightBox>   
  </div>
</template>
<script>
import {mapState} from 'vuex';
import CoolLightBox from "vue-cool-lightbox";
import "vue-cool-lightbox/dist/vue-cool-lightbox.min.css";
import { fetchItem } from '~/assets/script/tools';
export default {
  async asyncData({ app, $content }) {
    let mddata = await $content("pages/special-offer-ocr-launch").fetch(),
    ocrMddata = await $content("pages/open-cloner-ripper/index").only(['screenshot']).fetch();
    mddata = await app.$initMD(mddata);ocrMddata = await app.$initMD(ocrMddata);
    return { mddata ,ocrMddata};
  },
  head() {
    return this.mddata.head;
  },
  layout: "primary",
  data() {
    return {
      lightBoxIndex: null,
    };
  },
  components: { CoolLightBox },
  computed:{
    ...mapState({items: state=>state.localData.productData}),

    list(){
    if(this.items.length>0){
     return this.mddata.listProduct.products.map(res=>{
        let item = fetchItem(res.handleName,this.items),saleInfo;        
        item = JSON.parse(JSON.stringify(item))
        saleInfo = item.saleInfo;
        Object.assign(saleInfo,res)
        Object.assign(item,{saleInfo:saleInfo})
        return item
      })
    }
  }
  },  
  methods:{
    spTime(string){
        let date = new Date(),
         d = date.toDateString().split(" ")[2],
         y = date.toDateString().split(" ")[3];

        if (date.toDateString().split(" ")[2] < 15) 
        {
            var m = date.toDateString().split(" ")[1];
        } 
        else if( date.getMonth() == 11 )
        {
        	date.setMonth(0);
        	date.setFullYear(date.getFullYear()+1);
            var m = date.toDateString().split(" ")[1];
            y = date.toDateString().split(" ")[3];
        }
        else
        {
        	
            date.setMonth(date.getMonth() + 1);
            var m = date.toDateString().split(" ")[1];
        }
        let time =m + "." + 15 + ", " + y;
      return string.replace(/{time}/,`<span class='text-danger'>${time}</span>`)
                  
    }
  },

  watch:{
    list(val){

      if(val)this.mddata.screenshot.button.href = val[0].saleInfo.downloadUrl_64bit
    }
  },
  mounted() {

    if (this.list)this.mddata.screenshot.button.href = this.list[0].saleInfo.downloadUrl_64bit
  },
};
</script>