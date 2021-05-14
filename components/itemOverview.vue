<template>
<div v-if="data" :id="$handlify(data.name)" class="products-info position-relative " :class="`${data.additionClass||`bg-dark text-light py-8`}`">  
   <b-container class="position-relative zIndex">
      <b-row :class="data.type == 'download'?'flex-row-reverse':''">
        <b-col sm="12"><h2 :class="`mb-4 text-left ${data.type == 'download'?'text-danger':''}`">{{data.title||itemInfo.name}} </h2></b-col>
        <b-col lg="3" align-self="start" class="d-none d-lg-block position-relative">
          <div v-if="itemInfo.discount" class="discount-box text-warning fs-4" style="width:120px;height:120px;left:-40px;top:-20px">
                  <span>{{standard?itemInfo.discount.standard:itemInfo.discount.lifetime}} <br/>OFF</span>
          </div>          
          <b-img :src="itemInfo.boxSrc" fluid />
          <b-img v-if="!standard" class="lifetime-icon" fluid src="~static/images/vip_lifetime.png" />
        </b-col>

        <b-col lg="9" v-if="data.type != 'download'">
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
              <b-button squared :variant="data.type=='order'||data.type=='spList'?'outline-dark':'outline-warning'" :pressed="standard" @click="standard=true">{{$t("globalName.standard")}} </b-button>
              <b-button squared :variant="data.type=='order'||data.type=='spList'?'outline-dark':'outline-warning'" :pressed="!standard" @click="standard=false">{{$t("globalName.lifetime")}}</b-button>
            </b-button-group>
            </div>          
          </template>

          <p class="fs-3" v-if="itemSaleInfo.standard">{{standard?$t('softwareInfo.currency')+itemSaleInfo.standard.price:$t('softwareInfo.currency')+itemSaleInfo.lifetime.price}} <b-link v-if="!standard&&data.type!='spList'" :to="itemInfo.spPath?itemInfo.spPath+'/':'/special-offer/'" class="fs-6 text-red-light" sc>{{$t('globalName.get50off')}} </b-link>          
          </p>
          
          <p v-else-if="itemSaleInfo.years">

            <b-form-group v-if="itemSaleInfo.years.length>1" label="Please choose a option" label-class="fs-5">
              <b-form-radio-group stacked v-model="upgradeYearSelected">
                <template v-for="(option,optionIndex) in upgradeYearOptions">                  
                  <b-form-radio size="md" :value="option.value" :key="optionIndex" >
                    <template >
                      <span v-html="`<span class='text-danger font-weight-bold'>$${option.price} </span> for <span class='font-weight-bold'>${option.text}</span> free upgrade. <span class='text-danger font-weight-bold'>${saveRatio(upgradeYearOptions[0].price,option.price,optionIndex)}</span>`"></span>
                    </template>
                  </b-form-radio>
<!--                    -->
                </template>
              </b-form-radio-group>
            </b-form-group>  
            <span v-else>
              <span v-if="originalSaleInfo.standard" class="text-muted text-line-through fs-4">${{originalSaleInfo.standard.price}}</span> 
              <span class="text-danger fs-4">${{itemSaleInfo.years[0].price}} </span>  </span>        
          </p>

          <p>
            <b-button v-if="itemSaleInfo.standard" squared variant="danger" :size="data.type=='order'?'xl':'lg'" :href="standard?itemSaleInfo.standard.buyLink:itemSaleInfo.lifetime.buyLink" class="mt-2">{{$t("globalName.buy")}} </b-button>
          <template v-if="data.type!='order'">
          <b-button v-if="itemSaleInfo.downloadUrl" squared variant="success" size="lg" :href="itemSaleInfo.downloadUrl" class="mt-2">{{$t("globalName.download")}} </b-button> 
          <b-button v-if="itemSaleInfo.downloadUrl_64bit" squared variant="success" size="lg" :href="itemSaleInfo.downloadUrl_64bit" class="mt-2">{{`${$t("globalName.download")} 64 Bit`}} </b-button>          
          <b-button v-if="itemSaleInfo.upgradeUrl&&data.type!='spList'" squared variant="outline-light" size="lg" :to="`${itemSaleInfo.upgradeUrl}/`" class="mt-2">{{$t("globalName.upgrade")}} </b-button> 
          </template>

          <template v-if="itemSaleInfo.years">
            <b-button v-if="itemSaleInfo.years.length>1" :disabled="!upgradeYearSelected" squared variant="danger" size="lg" :href="upgradeYearSelected" class="mt-2">{{$t("globalName.upgrade")}} </b-button>

           <b-button v-else squared variant="danger" :href="itemSaleInfo.years[0].link" size="lg" class="mt-2">{{$t("globalName.upgrade")}} </b-button> 
          </template>
          </p>
          <p v-if="data.button&&data.button.additionText" class="whiteSpace-preline" v-html="data.button.additionText"></p>
          <p v-if="itemSaleInfo.standard"><b-img fluid src="~static/images/credit_cards.gif" style="max-width:300px"  /> </p>
        </client-only> 
        </b-col>

        <b-col sm="9" v-else-if="itemInfo.release">
          <h3>{{`${itemInfo.name} V${itemInfo.release.version}`}}  </h3>
          <h5 >Size:  <span class="lead">{{itemInfo.currentSize}}MB</span></h5>
          <h5>System Requirements: <span class="lead">{{itemInfo.systemRequirement}}</span> </h5>
          <h5><span class="lead">{{data.button.additionText}}</span> </h5>
          <p><b-button v-if="itemSaleInfo.downloadUrl" squared variant="success" size="xl" :href="itemSaleInfo.downloadUrl" class="mt-2">{{$t("globalName.download")}} </b-button></p>
          <h3>{{`${itemInfo.name} 64Bit V${itemInfo.release.version}`}}  </h3>
          <h5>Size:  <span class="lead">{{itemInfo.currentSize_64bit}}MB</span></h5>  
          <p><b-button v-if="itemSaleInfo.downloadUrl_64bit" squared variant="success" size="xl" :href="itemSaleInfo.downloadUrl_64bit" class="mt-2">{{$t("globalName.download")}} 64BIT</b-button></p>                  
        </b-col>
        <b-col sm="12" v-if="data.button&&data.button.extraItem">

        <hr class="dark-opacity-1" />
        <b-button v-for="(item,index) in data.button.extraItem" :key="index" :to="item.path?`/${item.path}/`:''" :href="item.kbUrl" variant="outline-dark" class="mr-2">{{item.text}} </b-button> 

        </b-col>

      </b-row>      
    </b-container>  
    <div v-if="data.bgStyle " :class="backgroundClass" :style="backgroundStyle"></div>

</div> 
</template>
 
<script lang="ts">
import Vue from 'vue'
import { mapState } from "vuex";
import { fetchItem } from "@/assets/script/tools";
interface ItemInfoSetting {
  boxSrc: string,
  name:string,
  desc:string,
  handleName:string,
  saleInfo?:{[props:string]:any}
}

interface DataSetting {
  bgStyle?: string|{[bgStyleProperty: string]: string;},
  bgPosition?:string,
  imageUrl?:string,  
  handleName:string
}

export default Vue.extend({
  name: "item-overview",
  data() {
    return {
      upgradeYearSelected: null,
      standard: true
    };
  },

  components:{},
  props: {
    data:{type:Object as ()=> DataSetting,required:true},
    itemInfo:{type:Object as ()=> ItemInfoSetting,required:true}
  },
  computed:{
    ...mapState({items: (state:any) => state.localData.productData}),
    originalSaleInfo(){
      return this.items&&fetchItem(this.itemInfo.handleName,this.items)?.saleInfo||{}
    },
    itemSaleInfo(){     
      let outData = this.items&&fetchItem(this.itemInfo.handleName,this.items)?.saleInfo||{}
      if(this.itemInfo.saleInfo) return this.itemInfo.saleInfo
      return outData
    },
    upgradeYearOptions(){
      let _this = this as any;
      if (_this.itemSaleInfo&&_this.itemSaleInfo.years) {
        return _this.itemSaleInfo.years.map((res:any,index:number)=>{
          return {
            text:res.name,
            price:res.price,  
            value:res.link+_this.itemInfo.code
          }
        })
      }
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
  methods:{
    saveRatio(basePrice:number,currentPrice:number,i:number){
      if (i == 0) {
        return ''
      } else if (i == 3) {
        return 'Saving 40%!'
      } else {
        return 'Saving '+Math.ceil(100*(1-currentPrice/(basePrice*(i+1))))+'%!'
      }
      
    }
  },
  mounted() {

    
  }

});
</script>