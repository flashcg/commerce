var yamlFront = require("yaml-front-matter");
import common from "@/plugins/common";
import Vue from 'vue'
Vue.use(common)
export const state = () => ({
  locales: ['en'],
  locale: 'en',
  localData: null,
  shopifyData: {
    productsMerged: [],
    collectionsMerged: [],
    productsData: null,
    price_rules: null,
    collections: null,
    collects: null,
    isLoaded: false,
    price_rulesGot: false,
    collectionsGot: false,
    productsGot: false,
    collectsGot: false,
  },
  youtubeData: [],
  ownedInfo:[],
  counter: 0,
})
export const getters = {
  collectionsFit: state => {
    if (state.shopifyData.collections) {
      let reWrite = [];
      state.shopifyData.collections.forEach(res => {
        reWrite.push(res)
      });
      reWrite.unshift({
        title: "All"
      });
      return reWrite
      //state.shopifyData.collections.unshift({ title: "All" }) 
    }
  }
}
export const mutations = {

  increment(state) {
    state.counter++
  },
  _ipLookUp(state,data){  
     
    state.ipResultData.countryCode = data.countryCode;
    state.ipResultData.countryName = data.country;
    state.ipResultData.auto = true;
    localStorage.ipResultData = JSON.stringify(state.ipResultData);
    console.log('IP datas has stored.');
    
  },
  ipManualOperate(state,data){
    state.ipResultData.countryCode = data.value;
    state.ipResultData.countryName = data.text;
    state.ipResultData.auto = false;
    localStorage.ipResultData = JSON.stringify(state.ipResultData);
  },
  SET_LANG(state, locale) {
    if (state.locales.indexOf(locale) !== -1) {
      state.locale = locale
    }
  },
  _localData(state,{target,data}){
    
    if(state.localData){       
    state.localData[target] = data
    } else {
      state.localData = {}
      state.localData[target] = data
    }
  },
  _shopifyData(state, {
    target,
    source,
    loaded
  }) {
    state.shopifyData[target] = source;
    state.shopifyData[loaded] = true;
    state.localData&&state.shopifyData.collectionsGot && state.shopifyData.productsGot && state.shopifyData.collectsGot ? state.shopifyData.isLoaded = true : state.shopifyData.isLoaded = false;
    console.log("isLoaded = " + state.shopifyData.isLoaded);

    
    if (state.shopifyData.isLoaded) {
      let collects = state.shopifyData.collects,
        productsData = state.shopifyData.productsData,
        collections = state.shopifyData.collections

        //delete  wand 
        // collects.splice(collects.findIndex(item => item.product_id === 1949538549809), 1)
        // productsData.splice(productsData.findIndex(item => item.id === 1949538549809), 1)

        
      // 
     // console.log(productsData);
      
      let productsMerged = productsData.map(resdata => {
        return collects
          .map(resCollect => {
            if (resCollect.product_id === resdata.product_id) {
              return {
                collection_id: resCollect.collection_id,
                sort_value: resCollect.sort_value,
                ...resdata
              };
            }
          })
          .filter(d => d)[0];
      });
      //console.log(productsMerged);
      
      //添加 其它平台链接


      productsMerged.map((resProduct, resProductIndex) => {
        let shopifyModel = resProduct.variants[0].sku.replace(/-SHOPIF-US/g, "");

        productsMerged[resProductIndex].productModel = shopifyModel // 添加产品model
        state.i18n.messages.buyFromPartner.product.forEach(resPartner => {
          if (shopifyModel == resPartner.productModel) {
            
            productsMerged[resProductIndex] = Object.assign({
              ...{salePlatform :{...resPartner}}
            }, resProduct)
          }
        })
      })

      //添加 path
      productsMerged.map((resProduct, resProductIndex) => {

        state.i18n.messages.handleSetting.forEach(resPath => {
          if (resPath.model == resProduct.productModel) {
            productsMerged[resProductIndex] = Object.assign({
              ...resPath
            }, resProduct)

          }
        })
      })

      //mix local data and shopify data
      productsMerged.map((res,i)=>{
        
        let item = state.localData.hardware.find(resFind=>{
          return res.productModel.toLowerCase()==resFind.productModel.toLowerCase()
        })

        if (item) {
          productsMerged[i].images[0].src = item.productImages[0].imageUrl
          
        }
      })
      console.log(productsMerged);
      state.shopifyData.productsMerged = productsMerged;

      let collectionsMerged = collections.map(
        resCollection => {
          return {
            name: resCollection.title,
            id: resCollection.id,
            active: false,
            products: productsMerged
              .map(resProductsMerged => {
                if (resCollection.id == resProductsMerged.collection_id) {
                  return {
                    ...resProductsMerged
                  };
                }
              })
              .filter(d => d)
          };
        }
      );

      // 排序
      let compare = (p)=>{ //compare function
        return function(m,n){
            var a = m[p];
            var b = n[p];
            return a - b; //升序
        }
    }  
   
   collectionsMerged.map(res=>{
     res.products.sort(compare("sort_value"))
   })
// 排序 -end

      state.shopifyData.collectionsMerged = collectionsMerged.reverse()

      sessionStorage.shopifyData = JSON.stringify(state.shopifyData);
    }
  },
  cookieToOwnedStore(state,data){    
    state.ownedInfo = data
  },
  shopifyDataPush(state) {
    state.shopifyData = JSON.parse(sessionStorage.shopifyData)
  },
  youtubeDataToState(state, data) {    
      
      
      state.youtubeData.find(res => res.id == data.id)?'':state.youtubeData.push(data)

  },
  youtubeDataPush(state) {
    state.youtubeData = JSON.parse(localStorage.youtubeData)
  },
  ipDataPush(state) {
    state.ipResultData = JSON.parse(localStorage.ipResultData)
  },

}
export const actions = {
  ipLookUp({commit}){
    if (localStorage.ipResultData) {
      commit("ipDataPush")
    } else {
      //ip-api.com ssl serve need to buy member
/*       this.$axios.get('http://ip-api.com/json/').then(res=>{
        console.log(res.data);
        
      commit("_ipLookUp",res.data)
      })
    .catch(err=>console.log(err)) */

    }
  },
  async shopifyData({
    commit,
    state
  }) {
    let hardwareData = await this.$content('pages').where({ productType: 'Hardware' }).only(['productType','productName','productDes','productModel','productImages','shortText']).fetch();
      
    let softwareData = await this.$content('pages').where({ productType: 'Software' }).only(['productType','productName','productDes','productModel','details','jumbotronAreasTop','shortText']).fetch();

    hardwareData = await this.app.$initMD(hardwareData,'base');
    softwareData = await this.app.$initMD(softwareData,'base');   
    //console.log(hardwareData,softwareData);
    commit('_localData',{target:'hardware',data:hardwareData})
    commit('_localData',{target:'software',data:softwareData})    


  },
  fetchReg({state,commit},{datas,that,cookieMethod}){
      
    return new Promise((resolve,reject)=>{
      this.$axios
      .post(
         "https://api.cloner-alliance.com/v2/sn/register",datas, 
        {headers: {"Content-Type": "application/json"}},
      ).then(res=>{        

        if (res.data.status=='valid'&&cookieMethod=='addCookie') {          
        /* if sn is valid - set cookie  */    
          let ownedInfo = that.$getCookie('ownedInfo');
          let currentData = {sn:res.data.sn,model:res.data.model};
          let refundInfo = state.i18n.messages.modalRefund           
          if (ownedInfo) {            
            ownedInfo = JSON.parse(ownedInfo);
          //  console.log(ownedInfo,currentData);
            pushData(ownedInfo)

          }else if (localStorage.ownedInfo) {
            let localDatas = JSON.parse(localStorage.ownedInfo);
            pushData(localDatas)
      
          } else {                 
            pushData()
          }

          function pushData (dataArray){                  
            if(dataArray) {
              let isHas = dataArray.findIndex(res=>res.sn==currentData.sn) 
              if (isHas ==-1) dataArray.push({...currentData,applyRefunding:0});
                  
              that.$addCookie('ownedInfo',JSON.stringify(dataArray),(refundInfo&&refundInfo.expiresHours)||8760);
              //localStorage.ownedInfo = JSON.stringify(dataArray);
            //  console.log(that.$getCookie('ownedInfo'));  
            } else {
              that.$addCookie('ownedInfo',JSON.stringify([{...currentData,applyRefunding:0}]),(refundInfo&&refundInfo.expiresHours)||8760);
              //localStorage.ownedInfo = JSON.stringify([{...currentData,applyRefunding:0}]);                    
            }               
          } 
        //end set cookie  
      }
      resolve(res)
        
      }).catch(err=>{
        console.log(err);
        reject(err)
      })
    })

  }

}
