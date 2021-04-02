<template>
  <div v-if="cardData&&cardData.active" :id="handleName(cardData.name)" :class="'cardBlock cardBlock-'+handleName(cardData.name)+' overflow-hidden position-relative bg-'+cardData.bgStyle">  
      <div :class="'cardBlock-body '+textColor(cardData)+' '+cardData.additionClass+' '+cardData.container">
        <div v-if="cardData.title" class="pt-6">
          <h3 class="fs-3 ">{{cardData.title}}</h3>
          <hr class="divider">
        </div>
        <div v-if="cardData.topArea" :class="'row pt-6 bg-'+cardData.topArea.bgStyle"><b-img class="mx-auto" fluid v-if="cardData.topArea.imageUrl" :src="cardData.topArea.imageUrl" /></div>
        <p class="bg-warning d-inline-block lead mt-4 p-2" v-if="giftValid&&cardData.giftSubTitle" >
        <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="play-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="ml-2 svg-inline--fa fa-play-circle fa-w-16 fa-2x"><path fill="currentColor" d="M32 448c0 17.7 14.3 32 32 32h160V320H32v128zm256 32h160c17.7 0 32-14.3 32-32V320H288v160zm192-320h-42.1c6.2-12.1 10.1-25.5 10.1-40 0-48.5-39.5-88-88-88-41.6 0-68.5 21.3-103 68.3-34.5-47-61.4-68.3-103-68.3-48.5 0-88 39.5-88 88 0 14.5 3.8 27.9 10.1 40H32c-17.7 0-32 14.3-32 32v80c0 8.8 7.2 16 16 16h480c8.8 0 16-7.2 16-16v-80c0-17.7-14.3-32-32-32zm-326.1 0c-22.1 0-40-17.9-40-40s17.9-40 40-40c19.9 0 34.6 3.3 86.1 80h-86.1zm206.1 0h-86.1c51.4-76.5 65.7-80 86.1-80 22.1 0 40 17.9 40 40s-17.9 40-40 40z"></path></svg>
        <span v-html="templateModelPath(cardData.giftSubTitle)"></span>
        
        </p>
        <div class="row justify-content-center">
        <div :class="'col-md-'+12/cardData.iconGird+' bg-'+item.bgStyle+' '+item.additionClass" v-for="(item,index) in cardData.block" :key="index" >
        <div :class="'py-6 '+blockSpacing(cardData,index)+' text-md-'+item.aligned">          

          <div v-if="cardData.template=='storeA'" class="position-relative row" :class="item.aligned=='left'?'flex-row-reverse':''" style="z-index:7">
            <div class="col-md-6 text-center" style="margin-left:-15px">
              <b-link variant="link" v-if="productsData.length>0" :to="'/'+pathCatch(item.productModel)+'/'"><b-img fluid style="max-height:400px" :src="item.imageUrl||$getItemData(item.productModel,'imgPath')" /></b-link>
            </div>
            <div class="col-md-6" :class="item.aligned=='right'?'pr-md-6':'pl-md-6'">
              <div v-if="item.productModel">
               <h2>{{item.title}}</h2>               
              <hr class="divider">              
              <h3  class="fs-1">{{item.productName?item.productName:$getItemData(item.productModel,'name')}}</h3>
              </div>

  <!--          <p v-if="priceCatch(item.productModel)" class="fs-5">        
                <span class="text-light text-line-through">${{priceCatch(item.productModel,'compare')}}</span> 
                <span class="text-warning">${{priceCatch(item.productModel)}}</span>
              </p> -->
              <p class="lead">{{item.text}}</p>

                <buynow :product="$productCatch(item.productModel)" :discount="item.discount" :variant="item.bottonVariant"/>
<!--                 <p v-if="inventoryCatch(item.productModel) == 0" class="mt-3"><a class="smooth-scroll" href="#newsletter" v-smooth-scroll>{{$t("cart.soldOutMessage")}}</a></p> -->
             </div>  
          </div>


          <div v-else-if="cardData.template=='storeB'" class="position-relative" style="z-index:7">
            <div v-if="item.productModel">
            <h3>{{item.productName?item.productName:$getItemData(item.productModel,'name')}}</h3>

               <p v-if="priceCatch(item)&&item.discount.code" class="fs-5">       
                {{$t('cart.price')}}: <span class=" text-line-through">${{priceCatch(item,'compare')}}</span><br /> 
                {{$t('cart.discount_salePrice')}}: <span class="text-danger">${{priceCatch(item,'discount') }}</span>
              </p>

               <p v-else-if="priceCatch(item)" class="fs-5">        
                {{$t('cart.price')}}: <span class=" text-line-through">${{priceCatch(item,'compare')}}</span><br /> 
                {{$t('cart.salePrice')}}: <span class="text-danger">${{priceCatch(item) }}</span>
              </p>              
            <!-- <hr class="divider"> -->
                <b-button variant="link" v-if="productsData.length>0" :to="'/'+pathCatch(item.productModel)+'/'"><b-img fluid :style="'max-height:'+(cardData.iconMaxWidth||400)+'px'" :src="item.imageUrl||$thumb($getItemData(item.productModel,'imgPath'))" class="border" /></b-button>
            </div>
    
          <p>{{item.text}}</p>
          <p><b-badge class="fs-7" v-if="item.badge" pill :variant="item.badge.variant||'primary'">{{item.badge.text}}</b-badge></p>
                <buynow :product="$productCatch(item.productModel)" :discount="item.discount" :variant="cardData.bottonVariant"/>
               <!-- <p v-if="inventoryCatch(item.productModel) == 0" class="mt-3"><a class="smooth-scroll" href="#newsletter" v-smooth-scroll>{{$t("cart.soldOutMessage")}}</a></p> -->
          </div>

          <div v-else-if="cardData.template=='storeC'" class="position-relative" style="z-index:7">
            <div v-if="item.productName&&$getSoftwareData(item.productName)">            

                <b-button variant="link" :to="'/'+$toLower(item.productName, '-')+'/'"><b-img fluid :style="'max-width:'+(cardData.iconMaxWidth||400)+'px'" :src="$getSoftwareData(item.productName).details.imageUrl" class="border p-2" /></b-button>           
            <h3>{{item.productName}}</h3> 
            <p>{{$getSoftwareData(item.productName).shortText}}</p>
            
            <p v-if="item.price" class="fs-5">       
                {{$t('cart.price')}}: <span class="text-danger">${{item.price}}</span>
              </p>   
            <p v-if="item.badge"><b-badge class="fs-7"  pill :variant="item.badge.variant||'primary'">{{item.badge.text}}</b-badge></p>
            <b-button v-if="$getSoftwareData(item.productName).jumbotronAreasTop[0].button.buy" squared size="xl" :href="$getSoftwareData(item.productName).jumbotronAreasTop[0].button.buy.buyLink" :variant="cardData.bottonVariant">{{$t('globalName.buy')}} </b-button>
            </div>
          </div>

          <div v-if="item.bgStyle" :class="blockSpacing(cardData,index)+' bg-'+item.bgStyle+'-transparent position-absolute fill-position'"></div> 
        </div>
         
        </div>
        </div> 
      </div>
  </div>
</template>
 
<script>
import { mapState, mapMutations, mapActions } from "vuex";

export default {
  name: "cardBlock",

  async fetch({app}){
   let  mddata = await $content('pages/cart').fetch();
    this.mddata = await app.$initMD(mddata);
    return {mddata}    
  },
  data() {
    return {
      mddata:null
    };
  },
  props: ["cardData", "pushCartData"],
  computed: {
    ...mapState({
      productsData: state => state.shopifyData.productsMerged,
      softwareData: state => state.localData&&state.localData.software
    }),
    giftValid(){
      let active = this.mddata&&this.mddata.giftItem.active,
      giftItem = this.productsData.find(res=>res.productModel.toLowerCase()==(this.mddata&&this.mddata.giftItem.productModel.toLowerCase()))
      if (active&&giftItem&&giftItem.available) {
        return true
      } else{
        return false
      }
      return false
    },    
  },
  methods: {
    ...mapMutations({
      addToCart: "cart/addToCart"
    }),
    templateModelPath(str){
        let outdata = str,regex = /{(.*?)}/g,
        resultArray = str&&str.match(regex);
        if (resultArray) {
          resultArray.map(res=>{
            let model = res.substring(1, res.length - 1);
            let item = this.productsData.find(res=>res.productModel.toLowerCase()==model.toLowerCase())
            
            if(item){
            outdata = outdata.replace(new RegExp(res),
            `<a href="/`+item.path+`/" >`+item.title+`</a>`
            );
            }
          })
        }
        
        return outdata
           
    },
    isdiscountStatus(item) {
      item.discount.code ? true : false;
    },

    pathCatch(model) {
      let outData;
      this.$t("handleSetting").map(res => {
        if (res.model == model) {
          return (outData = res.path);
        }
      });
      if (outData) {
        return outData;
      }
    },

    textColor(data) {
      if (data.bgStyle == "dark") {
        return "text-light";
      }
    },

    priceCatch(item, type) {
      let shopifyModel = index => this.productsData[index].productModel;
      let _this = this
      
      
      if (this.productsData.length > 0) {
        for (let index = 0; index < this.productsData.length; index++) {
          if (this.$toLower(item.productModel) == this.$toLower(shopifyModel(index)) && type == "compare" ) {

            return this.productsData[index].variants[0].compare_at_price;

          } else if (this.$toLower(item.productModel) == this.$toLower(shopifyModel(index)) &&type == "discount") {

            let price =this.productsData[index].variants[0].price,discountRule =_this.$discountRule(_this.mergeProduct(item));           
            
            let ruleDateValid =  this.$ruleDate(discountRule.code);
            
            if (discountRule.value_type == 'fixed_amount'&&ruleDateValid) {
              return (price - discountRule.value).toFixed(2)
            } else if(ruleDateValid) {
              return (price - price * (_this.$discountRule(_this.mergeProduct(item)).value / 100)).toFixed(2)
            } else{
              return this.productsData[index].variants[0].price;
            }
            
          } else if (this.$toLower(item.productModel) == this.$toLower(shopifyModel(index))) {
            return this.productsData[index].variants[0].price;
          }
        }
      }
    },

    inventoryCatch(model) {
      var _this = this;

      if (this.productsData.length > 0) {
        return this.productCatch(model, _this.productsData, _this).variants[0]
          .inventory_quantity;
      }
    },
    productCatch(model, productsData, _this) {
      let shopifyModel = index => productsData[index].productModel;
      if (productsData.length > 0) {
        for (let index = 0; index < productsData.length; index++) {
          if (_this.$toLower(model) == _this.$toLower(shopifyModel(index))) {
            return productsData[index];
          }
        }
      }
    },
    mergeProduct(data) {
      var _this = this;
      let product = this.productCatch(
        data.productModel,
        _this.productsData,
        _this
      );
      return {
        ...product,
        ...data
      };
    },
    handleName(name) {
      let _name = name.replace(/\s/g, "-");
      return _name.toLowerCase();
    },
    blockSpacing(data, index) {
      if (index === data.block.length - 1 && data.blockSpacing) {
        return "ml-md-" + data.blockSpacing / 2 + " mb-md-" + data.blockSpacing;
      } else if (index === 0 && data.blockSpacing) {
        return "mr-md-" + data.blockSpacing / 2 + " mb-md-" + data.blockSpacing;
      } else if (data.blockSpacing) {
        return "mx-md-" + data.blockSpacing / 2 + " mb-md-" + data.blockSpacing;
      }
    },
    jHeight(height) {
      if (height == "screen") {
        return this.screenHeight;
      } else {
        return height;
      }
    }
  },
  mounted() {

  }
};
</script>