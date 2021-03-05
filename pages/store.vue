<template>
<div v-if="Object.keys(mddata).length>0">
  <div id="business-days" class="bg-warning text-center p-2" :style="isshowBusinessDay?'top:73px':'top:'+-businessBlockHeight+'px'" > 
    <small v-html="$t('cart.businessDay')"></small>
  </div>
  <heroCarousel :heroCarousels="mddata.heroCarousel" :productsData="productsMerged" :pushCartData="pushCartData" />
  <iconBlock :iconData="mddata.iconRow" />
  
    <div :id="collection.name" v-for="collection in collectionSettled(mddata.topTimeLimited.collections)" :key="collection.index" class="my-5 text-center overflow-hidden" >   
    <h3 class="font-size-xxl">{{collection.name}}</h3>
    <hr class="divider">
    <p v-if="topTimeLimited.tips&&topTimeLimited.tips.title"><b-link id="tips" class="text-secondary" >{{topTimeLimited.tips.title}} </b-link> </p>
      <b-tooltip custom-class="policy-tips" variant="light" v-if="topTimeLimited.tips" target="tips" triggers="hover">
        <ul>
        <li v-for="(list,listIndex) in topTimeLimited.tips.lists" :key="listIndex" v-html="list"></li>
      </ul>
      </b-tooltip>

    <p class="lead">{{topTimeLimited.subtitle}} </p>

    <b-row align-h="center">
    <b-col v-for="product in collection.products" :key="product.index" class="mb-4" sm="6" md="4">
      <div  class="px-2 pr-md-6 h-100">        
        <p><buynow :product="$productCatch(product.productModel)" :discount="product.discount" :isimageButton="true" /></p>
        <p><b-badge variant="warning" v-if="product.variants[0].inventory_quantity != 0">{{$t("cart.orderSoon")}} </b-badge> 
        <b-badge variant="warning" v-if="product.variants[0].inventory_quantity == 0">{{$t("cart.soldOut")}} </b-badge>
        </p>
        <p>{{$t("cart.inventory")}}: {{product.variants[0].inventory_quantity}}</p> 
        <p class="font-size-md">{{$t('cart.price')}}: <span v-if="product.variants[0].compare_at_price" class="text-muted text-line-through">${{product.variants[0].compare_at_price}}</span> 
         {{$t('cart.salePrice')}}: <span class="text-danger">${{product.variants[0].price}}</span></p>
         <p class="font-size-md">{{product.title}}</p>
<!--         <p  v-if="cartBtnDisable(product)"><a href="#newsletter" v-smooth-scroll>{{$t("cart.soldOutMessage")}}</a></p> 
         <b-button size="xl" variant="danger" class="rounded-0" @click="pushData(product)" 
        :disabled='cartBtnDisable(product.variants[0].inventory_quantity)'>{{cartBtnDisable(product.variants[0].inventory_quantity) == 0 ?$t("cart.buynow"):$t("cart.soldOut")}}</b-button> -->
      </div>      
    </b-col>    
    </b-row> 
  </div>

  <cardBlock :cardData="mddata.cardRowPromo"  :pushCartData="pushCartData"  />
  <cardBlock :cardData="mddata.cardRow1"  :pushCartData="pushCartData"  />
  <cardBlock :cardData="mddata.cardRow2"  :pushCartData="pushCartData"  />
  <cardBlock :cardData="mddata.softwareRow"/>
  <b-container fluid class="text-center my-6" >
  <div>    
      <b-button size="lg"
        v-for="(btn, idx) in collectionSettled(mddata.collectionsSort)"
        :key="idx"
        :pressed.sync="btn.active"
        @click="collectionsFilter(btn.id)"
        variant="link" class="mx-1 rounded-0">
        {{ btn.name }}       
      </b-button>
  </div>
  
  <div v-for="collection in collectionsResult" :key="collection.index" id="All-product" class="mt-5" >   
    <h3>{{collection.name}}</h3>
    <hr class="mb-4">
    <b-row align-h="center">
    <b-col v-for="product in collection.products" :key="product.index" class="mb-4" sm="6" md="4" xl="3">
      <div  class="px-2 py-4 h-100">   
            
        <p><b-button v-if="product.path"  variant="link"  :to="'/'+product.path+'/'" ><b-img-lazy :title="product.title" thumbnail rounded="0" class="w-75" fluid :src="product.path?$thumb(product.images[0].src) : product.images[0].src" />
        </b-button>
        <b-img-lazy v-else :title="product.title" thumbnail rounded="0" class="w-75" fluid :src="product.images[0].src"/>
        </p>
        <p class="lead">{{product.title}}</p>
        <!-- <p>{{$t("cart.inventory")}}: {{product.variants[0].inventory_quantity}}</p>  -->
        <p class="font-size-md"><span  v-if="product.variants[0].compare_at_price">{{$t('cart.price')}}:  <span class="text-muted text-line-through">${{product.variants[0].compare_at_price}}</span> </span>
        {{$t('cart.salePrice')}}: <span class="text-danger">${{product.variants[0].price}}</span></p>

        <buynow :product="$productCatch(product.productModel)"  :variant="'outline-dark'"/>
        <!-- <p  v-if="cartBtnDisable(product)" class="mt-3"><a href="#newsletter" v-smooth-scroll>{{$t("cart.soldOutMessage")}}</a></p>   -->   
      </div>      
    </b-col>    
    </b-row>
  </div>
  
  </b-container>

  <b-container class="bg-gray-light py-6" fluid>
    <b-container><b-row align-v="center">
      <div class="col-md-3">
        <b-img-lazy fluid :src="mddata.moneyBackRow.imageUrl" />
      </div>
      <div class="col-md-9">
        <p class="lead">{{mddata.moneyBackRow.title}}</p>
        <p>{{mddata.moneyBackRow.text}}</p>
      </div>
      </b-row></b-container>
  </b-container>
  <iconBlock :iconData="$t('product_service')" />

<!--    <div v-for="product in data" :key="product.index">
    <h2>{{product.title}}</h2>
    <p><img :src="product.image.src" style="width:300px"/></p>
    <p>{{product.variants[0].price}}</p>
    <p>Inventory: {{product.variants[0].inventory_quantity}}</p> 
    <b-button variant="primary" @click='addToCart(pushData(product))' :disabled='cartBtnDisable(product.variants[0].inventory_quantity)'>{{$t("cart.addToCart")}}</b-button>   
  </div>  -->

</div>
  
</template>
<script>
import jumbotron from "@/components/jumbotron";
import cardBlock from "@/components/card";
import iconBlock from "@/components/iconBlock";
import heroCarousel from "@/components/heroCarousel";
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";

export default {
  async asyncData({app,$content}){
   let  mddata = await $content('pages/store').fetch();
    mddata = await app.$initMD(mddata);
    return {mddata}
  },
  head() {
    return this.mddata.head;
  },
  layout: "fluid",
  components: { jumbotron, cardBlock, iconBlock, heroCarousel },
  data() {   

    return {
      currentId: null, //当前标签的ID
      collectionsResult: null,
      pushCartData: false, //当前要推送购物车的产品的数据
      isshowBusinessDay: false,
      businessBlockHeight: 255
    };
  },

  computed: {
    ...mapState({
      productsMerged: state => state.shopifyData.productsMerged,
      productsData: state => state.shopifyData.productsData,
      price_rules: state => state.shopifyData.price_rules,
      collections: state => state.shopifyData.collections,
      collects: state => state.shopifyData.collects,
      productsGot: state => state.shopifyData.productsGot,
      isLoaded: state => state.shopifyData.isLoaded,
      collectionsGot: state => state.shopifyData.collectionsGot,
      collectsGot: state => state.shopifyData.collectsGot,
      isLoaded: state => state.shopifyData.isLoaded
    }),
    ...mapGetters({ totalNum: "cart/totalNum", collections: "collectionsFit" }),

    collectionsMerged() {
      let outDate = this.$store.state.shopifyData.collectionsMerged.map(res => {
        return {
          ...res,
          active: false
        };
      });
      outDate.unshift({ name: "All", active: true, products: [] });
      return outDate;
    }

  },

  methods: {
    ...mapMutations({
      addToCart: "cart/addToCart"
    }),

    collectionSettled(data) {
      if (data && this.isLoaded) {
        return data.map((resOrder, index) => {
          return {
            order: index,
            ...this.collectionsMerged
              .map(resCollection => {
                if (
                  this.$toLower(resOrder, "") ==
                  this.$toLower(resCollection.name, "")
                ) {
                  return resCollection;
                }
              })
              .filter(d => d)[0]
          };
        });
      }
    },
    isDataOK() {
      if (this.isLoaded) {
        this.currentId = this.collectionsMerged[0].id;
        this.buttons = this.collectionsMerged;
        return true;
      } else {
        return false;
      }
    },

    finalPrice(item) {
      let discountItem = this.$discountRule(item);
      let price = item.variants[0].price,
          value = discountItem.value,
          value_type=discountItem.value_type,
         ruleDateValid = this.$ruleDate(discountItem.code);
      if (item.discount && item.discount.code && value_type == 'fixed_amount'&&ruleDateValid) { 
              
        return (price - value).toFixed(2)
      } else if (item.discount && item.discount.code && value_type == 'percentage'&&ruleDateValid) {       
        return (price - price*(value/100)).toFixed(2)

      } else {
        return item.variants[0].price;
      }        
    }, 

    collectionsFilter(id) {
      //点击标签所的响应的方法，过滤出当前分类
      if (this.isLoaded) {
        for (let index = 0; index < this.collectionsMerged.length; index++) {
          id == this.collectionsMerged[index].id
            ? (this.collectionsMerged[index].active = true)
            : (this.collectionsMerged[index].active = false);
        }
        if (id) {
          this.collectionsResult = this.collectionsMerged
            .map(res => (id == res.id ? res : false))
            .filter(d => d);
        } else {
          this.collectionsResult = this.collectionsMerged
            .map(res =>
              res.name !== "All"
                ? res.name != "Time-limited Giveaway"
                  ? res
                  : false
                : false
            )
            .filter(d => d);
        }
      }
    },
 
    cartBtnDisable(data) {
      if (data.variants[0].inventory_quantity == 0) {
        return true;
      } else {
        return false;
      }
    },

  },

  mounted() {
    let _this = this;

    this.collectionsFilter(this.currentId);

    //监听异步数据，初始化产品数据
    this.$watch(
      function() {
        return [this.collectionsGot, this.collectsGot, this.productsGot];
      },
      function() {
        this.isDataOK();
        this.collectionsFilter(this.currentId);
      }
    );

    //
    this.businessBlockHeight = document.getElementById('business-days')&&document.getElementById('business-days').clientHeight;
    
    
    window.addEventListener("scroll", () => {
      if (document.documentElement.scrollTop > 500) {
        _this.isshowBusinessDay = true;
      } else {
        _this.isshowBusinessDay = false;
      }
    });
  }
};
</script>