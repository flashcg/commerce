<template>    
    <div>

    <b-button v-if="product&&isimageButton" @click="clickFn()" :title="$t('cart.buynow')" squared size="xl" variant="link"  >
      <b-img-lazy thumbnail rounded="0" class="w-75" fluid :src="product.images[0].src"/>
      </b-button>   
  
    <b-button v-else-if="product" @click="clickFn()" squared size="xl" :variant="variant?variant:'primary'"  >{{$t('cart.buynow')}} </b-button>         
    

  <b-modal  ok-only hide-footer hide-header centered  ref="cartModal" title="Add To Cart" >
    <b-button @click="hideModal('cartModal')" variant="link" class="position-absolute" style="top: 8px;right: 8px;"><svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="times-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="align-middle svg-inline--fa fa-times-circle fa-w-16 fa-2x"><path fill="currentColor" d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm121.6 313.1c4.7 4.7 4.7 12.3 0 17L338 377.6c-4.7 4.7-12.3 4.7-17 0L256 312l-65.1 65.6c-4.7 4.7-12.3 4.7-17 0L134.4 338c-4.7-4.7-4.7-12.3 0-17l65.6-65-65.6-65.1c-4.7-4.7-4.7-12.3 0-17l39.6-39.6c4.7-4.7 12.3-4.7 17 0l65 65.7 65.1-65.6c4.7-4.7 12.3-4.7 17 0l39.6 39.6c4.7 4.7 4.7 12.3 0 17L312 256l65.6 65.1z" class=""></path></svg> </b-button>
    <div v-if="pushCartData" class="text-center mt-4">

      <div v-if="product.available" class="addTocart-success">
        <h5 class="text-success"><svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="check-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="align-middle svg-inline--fa fa-check-circle fa-w-16 fa-2x"><path fill="currentColor" d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z" class=""></path></svg> {{$t('cart.itemHasCart')}} </h5>
        <div class="row pt-2">
          <div class="col-5 text-right">
        <p><img :src="pushCartData.imageUrl" class="img-thumbnail rounded" style="max-width: 120px;"></p>
          </div>
          <div class="col-7 text-left">
        <p>{{pushCartData.name}}</p>
        <p class="lead font-weight-bold">USD: <span class="text-danger" >{{pushCartData.finalPrice}}</span></p>
        </div>
        </div>
        <p><b-button size="xl" variant="success" class="rounded-0" to="/cart">{{$t('cart.goToCart')}} </b-button></p>
        <p><b-link @click="$bvModal.hide('cartModal')">{{$t("cart.continueShopping")}}</b-link></p>
      </div>

      <div v-else class="sold-out">
        <p class="text-success lead font-weight-bold"><svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="info-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="align-middle svg-inline--fa fa-check-circle fa-w-16 fa-2x"><path fill="currentColor" d="M256 8C119.043 8 8 119.083 8 256c0 136.997 111.043 248 248 248s248-111.003 248-248C504 119.083 392.957 8 256 8zm0 110c23.196 0 42 18.804 42 42s-18.804 42-42 42-42-18.804-42-42 18.804-42 42-42zm56 254c0 6.627-5.373 12-12 12h-88c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h12v-64h-12c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h64c6.627 0 12 5.373 12 12v100h12c6.627 0 12 5.373 12 12v24z" class=""></path></svg> {{$t('cart.itemHasNotCart')}} </p>
        <div class="row pt-2">
          <div class="col-5 text-right">
        <p><img :src="pushCartData.imageUrl" class="img-thumbnail rounded" style="max-width: 120px;"></p>
          </div>
          <div class="col-7 text-left">
        <p>{{pushCartData.name}}</p>
        <p class="lead font-weight-bold">USD: <span class="text-danger" >{{pushCartData.finalPrice}}</span></p>
        </div>
        </div>
        <p><b-button disabled variant="success" size="xl"  class="rounded-0" >{{$t('cart.soldOut')}} </b-button></p>
        <p><a class="smooth-scroll" href="#newsletter" v-smooth-scroll @click="$bvModal.hide('cartModal')">{{$t("cart.soldOutMessage")}}</a></p>      
      </div>
    
    <div v-if="ishasBlock">
    <hr />
    <h5>{{$t('cart.buyPartners')}} </h5>
    <p v-if="validPlatformOptions"><span class="small" v-html="ipResultData.auto?locatedInfo($t('buyFromPartner.message.autoPlatform')):locatedInfo($t('buyFromPartner.message.manualPlatform'))"></span> <b-button size="sm" variant="primary" @click="clickChangeModal()">Change</b-button> </p>

    <div class="d-flex align-items-end justify-content-center font-size-sm">
      <div v-for="(value,key,index) in initPlatform" :key="index" class="p-2">
        <p v-if="ishasPlatform(value)">
        <b-link :href="platform(key,value,'link')"><b-img style="max-width:120px" :title="$t('cart.storeAddToCart')" fluid :src="platform(key,value,'logo')" /></b-link>
        <br/>
        <span> {{platform(key,value,'currency')}}: <span class="text-danger ">{{platform(key,value)}}</span></span></p>

      </div>   

    </div></div>
    </div>
  </b-modal>

  <b-modal hide-footer hide-header centered ref="changeRegion">    
  <div class="text-center">
 
    <p><b-form-select v-model="selectContryCode" :options="validPlatformOptions"></b-form-select></p>
    <b-alert show variant="primary">{{$t('buyFromPartner.message.selectionInfo')}}</b-alert>
    <b-button variant="primary" @click="changeRegion()">{{$t('globalName.confirm')}}</b-button>
    <b-button @click="hideModal('changeRegion')">{{$t('globalName.cancel')}}</b-button></div>
  </b-modal> 

    </div>
</template>
 
<script>
import { mapState,mapMutations } from "vuex";

export default {
  name: "buynow",
  data() {
    return {
      pushCartData: null,
      discountCode: null,
      initPlatformData:[],
      cartModalShow: false,
      selectContryCode: 'US'
    };
  },
  props: ["product","discount","variant","isimageButton"],
  computed:{
    ...mapState({
      ipResultData: state => state.ipResultData,
      platformLocales: state => state.i18n.messages.buyFromPartner.locales,
      platformDefaultLogo: state => state.i18n.messages.buyFromPartner.defaultLogo,
    }),
    validPlatformOptions: function () {      
      let regions = this.$t('buyFromPartner.regions'),currentCode = this.ipResultData.countryCode,outData=[];      
      let dataArray = Object.entries(this.initPlatform)||[];
      for (let [regionsKey,region] of Object.entries(regions)) {
        for (let [key,value] of dataArray) {
          
          if(value.hasOwnProperty(regionsKey)&&!outData.find(res=>res.value == regionsKey))
          {outData.push({value:regionsKey,text:region.countryName})}
        };          
      }
      
      outData.length<=1&&outData[0]&&outData[0].value=='US'?outData = false:'';
      return outData
    },
    initPlatform: function() {
        let outDatas = JSON.parse(JSON.stringify(this.product&&this.product.salePlatform||{})),        
        regions = this.$t('buyFromPartner.regions'),optionDatas=[];
        delete outDatas.productModel; 
        let dataArray = Object.keys(outDatas)||[];

        for (let i = 0; i < dataArray.length; i++) {
          let platformData = dataArray[i]&&outDatas[dataArray[i]] 
          
          if (platformData&&platformData.price) {
      
            outDatas[dataArray[i]] = {
              US:platformData
            }
          } else if (platformData&&platformData.buyLink) {
            delete outDatas[dataArray[i]]
          }

        }

        return outDatas

    },
    ishasBlock:function() { 
        let ishasPartners, currentCode = this.ipResultData.countryCode;  
        //console.log(this.pushCartData.salePlatform );    
        let launch = (obj)=>{
        for (let key in obj) {
          // console.log(key);
            if(key=='price'&&obj[key]){ 
              ishasPartners = true
            };
            if (typeof (obj[key]) == 'object') {            
              launch(obj[key]);   
            }        
          } 
        }
        launch(this.product.salePlatform );
        //console.log(ishasPartners);
        return ishasPartners
      },    
  },
  methods: {
    ...mapMutations({
      addToCart: "cart/addToCart",ipManualOperate: "ipManualOperate"
    }), 
    locatedInfo(data){
      let countryName = this.ipResultData.countryName;
      countryName = "<span class='text-primary'>" + countryName +"</span>"
     return data.replace('[country]', countryName) 
    },
    showModal(el) {
        this.$refs[el].show(); 
    },
    hideModal(el) {
        this.$refs[el].hide(); 
    },
      ishasPlatform(obj){
         let outData,validCode;
        let regions = this.$t('buyFromPartner.regions'),currentCode = this.ipResultData.countryCode;
        Object.keys(regions).map(res=>{
          currentCode == res?validCode = res:'';
        });
        Object.keys(obj).map(res=>{          
          if(validCode == res||obj.US&&obj.US.price) {  
            outData = true;   
          }
        }) 
        return true
      },
      platform(platformKey,platform,outType){
  
        let regions = this.$t('buyFromPartner.regions'),defaultCurrency = regions.US.currency,
        currentCode = this.ipResultData.countryCode;        
        let defaultLogo,regionCurrency,regionLogos,regionLogo,regionPrice,regionLink; 
        
         switch (outType) {
          case 'currency':
            regionCurrency = regions[currentCode]&&platform[currentCode]&&regions[currentCode].currency;       
            return regionCurrency=regionCurrency||defaultCurrency;
          case 'logo':              
              for (let [key,value] of Object.entries(platform)) {           
                if (key == currentCode&&value.price) {
                  regionLogos= regions[currentCode]&&regions[currentCode].logos;
                  regionLogo = regionLogos&&regionLogos[platformKey]&&regionLogos[platformKey].imageUrl;
                  break
                }
              };                  
            return regionLogo=regionLogo||regions.US.logos[platformKey].imageUrl;  
          case 'price':
              for (let [key,value] of Object.entries(platform)) {           
                if (key == currentCode&&value.price) {
                  regionPrice = value.price&&value.price;
                  break
                }
              };             
            return regionPrice = regionPrice||platform.US&&platform.US.price;
          case 'link':
              for (let [key,value] of Object.entries(platform)) {           
                if (key == currentCode&&value.price) {
                  regionLink = value.buyLink&&value.buyLink;  
                  break
                }
              };              
            return regionLink = regionLink||platform.US&&platform.US.buyLink;                    
          default:
              for (let [key,value] of Object.entries(platform)) {           
                if (key == currentCode&&value.price) {
                  regionPrice = value.price&&value.price;
                  break
                }
              };              
            return regionPrice = regionPrice||platform.US&&platform.US.price;
        }
      },
      
    pushData(item) {
      if (item) {
      this.discount?item.discount=this.discount:'';
      this.pushCartData = {  
        ...item,      
        id: item.variants[0].id,
        name: item.title,
        imageUrl: this.$thumb(item.images[0].src),
        price: item.variants[0].price,
        finalPrice: this.finalPrice(item),
        inventory: item.variants[0].inventory_quantity,
        itemIsError: false,
        discount: this.$discountRule(item)        
      };         
             
      }
    }, 
    changeRegion(){
      let selectData = this.validPlatformOptions.find(res=>res.value == this.selectContryCode);
      this.ipManualOperate(selectData);  
      this.hideModal('changeRegion'); 
    },
    clickFn(){
      if (this.product.available) {
        this.pushData(this.product);
        this.addToCart(this.pushCartData);
      //  !this.cartModalShow?this.cartModalShow = true:'';
        this.$refs['cartModal'].show(); 
       // this.$bvModal.show('cartModal')

      } else {
        this.pushData(this.product);
      //  !this.cartModalShow?this.cartModalShow = true:'';
       this.$refs['cartModal'].show(); 
       // this.$bvModal.show('cartModal') 
      }    

    },
    clickChangeModal(){
      this.$refs['changeRegion'].show();
    },    
    finalPrice(item) {
      let price = item.variants[0].price,
          value = this.$discountRule(item).value,
          value_type=this.$discountRule(item).value_type,
         ruleDateValid = this.$ruleDate(this.$discountRule(item).code);
      if (item.discount && item.discount.code && value_type == 'fixed_amount'&&ruleDateValid) { 
              
        return (price - value).toFixed(2)
      } else if (item.discount && item.discount.code && value_type == 'percentage'&&ruleDateValid) {       
        return (price - price*(value/100)).toFixed(2)

      } else {
        return item.variants[0].price;
      }        
    },  
  },
  mounted(){  
  //ip-api.com ssl serve need get member   
  //this.$store.dispatch('ipLookUp');    
    
    //fetch url params 
    if (this.$getUrlParam('discountCode')) {
      this.discountCode = this.$getUrlParam('discountCode')
    }    
  }
};
</script>