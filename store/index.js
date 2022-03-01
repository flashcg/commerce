import common from "@/plugins/common";
import Vue from 'vue'
Vue.use(common)
export const state = () => ({
  locales: ['en'],
  locale: 'en',
  upgradeInfo:null,
  modalStatus: {

  },
  ipResultData: {
    auto: true,
    countryName: 'United States',
    countryCode: 'US',
  },
  localData: {
    productData: []
  },
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
  ownedInfo: [],
  counter: 0,
})
export const getters = {

}
export const mutations = {
  _localData(state, data) {
    state.localData.productData = data
    //localStorage.localData = JSON.stringify(state.localData);
  },
  _localDataPush(state) {
    state.localData.productData.push(JSON.parse(localStorage.localData).productData)
    console.log('local data has stored to state');
    console.log(state.localData.productData);
  },
  youtubeDataToState(state, data) {
    state.youtubeData.find(res => res.id == data.id) ? '' : state.youtubeData.push(data)

  },
  youtubeDataPush(state) {
    state.youtubeData = JSON.parse(localStorage.youtubeData)
  },
  toUpgradeInfo(state,data){
    console.log(data);
    state.upgradeInfo = data
  }

}
export const actions = {
  async settledData({
    commit,
    state
  }) {
    //if(state.localData.productData.length<=0)commit('_localDataPush')

    let handleSetting = await this.$content('default').only('handleSetting').fetch(),
      productData = new Array;
    const releaseState = await this.$content('releaseState').fetch().catch(err=>{
      console.log(err);
    });  

    handleSetting = handleSetting.handleSetting;    
    if (handleSetting) {
      for (let i = 0; i < handleSetting.length; i++) {

        let item = await this.$content('pages/' + handleSetting[i].path).only(['model', 'handleName', 'name', 'type', 'logo', 'boxes','listActive','desc','youtubeArea']).fetch(),
          saleData = await this.$content('salePlatform').fetch();

        if (Array.isArray(item)) {
          item = await this.$content('pages/' + handleSetting[i].path + '/index').only(['model', 'handleName', 'name', 'type', 'logo', 'boxes','listActive','desc','youtubeArea']).fetch();
        }
        const releaseFn = (path =handleSetting[i].path ) => {
          return new Promise((resolve, reject) => {
            let data = this.$content('release/' + path).fetch()
            
            data?resolve(data):reject();            
          })
        };

        let ishasRelease = releaseState.data.some(res=>handleSetting[i].path == res.path)
        ,releaseData,
        saleItem = saleData.softwareInfo.items.find(res=>res.handleName.toLowerCase() == handleSetting[i].handleName.toLowerCase())

        if(ishasRelease)releaseData = await releaseFn().then(res => {          
          return res
        }).catch(err => undefined);
        
        const releaseTransfer = async (data)=> {          
          if(data&&data.newver&&data.newver.source){
          let sourceHandle =  handleSetting.find(res=>res.handleName.toLowerCase() == data.newver.source.toLowerCase()),
          sourceItem = await releaseFn(sourceHandle.path)
          data.currentVer =  sourceItem.release[0].version
          } else if (data&&data.release) {
            data.currentVer =  data.release[0].version
          }
        }

        await releaseTransfer(releaseData);
        
        Object.assign(item, {
          handle: handleSetting[i]
        }, {
          release: releaseData && releaseData.release && releaseData.release[0]
        });
        
        if(releaseData){
          
          item.currentVer = releaseData.currentVer;
          if(releaseData.currentSize) item.currentSize = releaseData.currentSize
          if(releaseData.currentSize_64bit) item.currentSize_64bit = releaseData.currentSize_64bit
          if(releaseData.systemRequirement) item.systemRequirement = releaseData.systemRequirement
        }

        if(saleItem) item.saleInfo = saleItem
        if(!item.handleName)item.handleName = item.handle.handleName
        productData.push(item)
      }

    }



    productData = await this.app.$initMD(productData, 'base');
    commit('_localData', productData)
  },
  async nuxtServerInit({dispatch}){
    await dispatch('settledData');
  }

}
