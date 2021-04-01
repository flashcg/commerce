<template>
<div v-if="data" :id="$handlify(data.name)" class="products-info position-relative py-lg-8 py-6 bg-dark text-light">  
   <b-container class="position-relative zIndex">
      <b-row>
        <b-col sm="12"><h2 class="mb-4 text-left">{{data.title||itemInfo.name}} </h2></b-col>
        <b-col sm="3" align-self="start">
          <b-img :src="itemInfo.boxSrc" fluid />
          <b-img v-if="!standard" class="lifetime-icon" fluid src="~static/images/vip_lifetime.png" />
        </b-col>
        <b-col sm="9">
          <client-only>    
          <p v-if="data.topAdditionText"  class="whiteSpace-preline" v-html="data.topAdditionText"></p>
          <p v-html="itemInfo.desc"  class="whiteSpace-preline"></p>
          <p v-if="data.bottomAdditionText"  class="whiteSpace-preline" v-html="data.bottomAdditionText"></p>
          
          <template v-if="itemSaleInfo.lifetime">
            <div class="mb-2">
            <span class="text-orange">{{standard?
              $t("globalName.standard")+' '+$t("globalName.license")
              :$t("globalName.lifetime")+' '+$t("globalName.license")}} </span><br />
            <b-button-group size="md" >
              <b-button squared variant="outline-warning" :pressed="standard" @click="standard=true">{{$t("globalName.standard")}} </b-button>
              <b-button squared variant="outline-warning" :pressed="!standard" @click="standard=false">{{$t("globalName.lifetime")}}</b-button>
            </b-button-group>
            </div>          
          </template>
          
          <p class="fs-4" v-if="itemSaleInfo.standard">{{standard?$t('softwareInfo.currency')+itemSaleInfo.standard.price:$t('softwareInfo.currency')+itemSaleInfo.lifetime.price}} <b-link v-if="!standard" href="/special-offer/" class="fs-6 text-red-light" sc>{{$t('globalName.get50off')}} </b-link>
          
          </p>
          <p>
          <b-button v-if="itemSaleInfo.standard" squared variant="danger" size="lg" :href="standard?itemSaleInfo.standard.buyLink:itemSaleInfo.lifetime.buyLink" class="mt-2">{{$t("globalName.buy")}} </b-button>
          <b-button v-if="itemSaleInfo.downloadUrl" squared variant="success" size="lg" :href="itemSaleInfo.downloadUrl" class="mt-2">{{$t("globalName.download")}} </b-button>
          <b-button v-if="itemSaleInfo.download_64Bit" squared variant="success" size="lg" :href="itemSaleInfo.download_64Bit.downloadUrl" class="mt-2">{{`${$t("globalName.download")} 64 Bit`}} </b-button>          
          <b-button v-if="itemSaleInfo.upgradeUrl" squared variant="outline-light" size="lg" :to="itemSaleInfo.upgradeUrl" class="mt-2">{{$t("globalName.upgrade")}} </b-button>          
          </p>
          <p v-if="data.button&&data.button.additionText" v-html="data.button.additionText"></p>
          <p v-if="itemSaleInfo.standard"><b-img fluid src="~static/images/credit_cards.gif" style="max-width:300px"  /> </p>
        </client-only> 
        </b-col>
      </b-row>      
    </b-container>  
    <div v-if="data.bgStyle " :class="backgroundClass" :style="backgroundStyle"></div>
</div> 
</template>
 
<script lang="ts">
import Vue from 'vue'
import { mapState } from "vuex";

interface ItemInfoSetting {
  boxSrc: string,
  name:string,
  desc:string,
  handleName:string,
}

interface DataSetting {
  bgStyle?: string|{[bgStyleProperty: string]: string;},
  bgPosition?:string,
  imageUrl?:string,  
}

export default Vue.extend({
  name: "item-overview",
  data() {
    return {
      standard: true
    };
  },

  components:{},
  props: {
    data:{type:Object as ()=> DataSetting,required:true},
    itemInfo:{type:Object as ()=> ItemInfoSetting,required:true}
  },
  computed:{
    ...mapState({softwareInfo: (state:any) =>state.i18n.messages.softwareInfo}),
    itemSaleInfo(){
      let outData = this.softwareInfo.items.find((res: { handleName: string; })=>res.handleName.toLowerCase() == this.itemInfo.handleName.toLowerCase())||{}  
      return outData
    },
    backgroundStyle():object|void{      
    if (this.data.bgStyle&&typeof(this.data.bgStyle)=='object') {        
        return {
          backgroundImage:'url('+this.data.bgStyle.imageUrl+')',
          backgroundSize: 'cover',
          backgroundAttachment: this.data.bgStyle.attachment,
          backgroundPositionY: this.data.bgStyle.positionY,
          backgroundPositionX: this.data.bgStyle.positionX
        }        
      }
    },
    backgroundClass():string|void{
      let bgPosition = (data:string|undefined) :string=>{
      if (data == "half") {
        return "fill-md-half-position";
      } else {
        return "fill-position";
      }
    }
      if (typeof(this.data.bgStyle)=='string') {
        return 'bg-'+this.data.bgStyle+' position-absolute '+bgPosition(this.data.bgPosition)
      } else if (typeof(this.data.bgStyle)=='object') {
        return 'bg-'+this.data.bgStyle.default+' position-absolute '+bgPosition(this.data.bgPosition)
      }        
    }    
  },
  mounted() {

    
  }
});
</script>