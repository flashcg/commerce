import common from "@/plugins/common";
import Vue from 'vue'
Vue.use(common)
export const state = () => ({
  locales: ['en'],
  locale: 'en',
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
    localStorage.localData = JSON.stringify(state.localData);
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

}
export const actions = {
  async shopifyData({
    commit,
    state
  }) {
    //if(state.localData.productData.length<=0)commit('_localDataPush')
    
    let handleSetting = await this.$content('default').only('handleSetting').fetch(),
      productData = new Array;
    handleSetting = handleSetting.handleSetting;
    if (handleSetting) {
      for (let i = 0; i < handleSetting.length; i++) {

        const item = await this.$content('pages/' + handleSetting[i].path).only(['abbrName', 'handleName', 'name', 'type', 'boxes', 'desc']).fetch();

        if (Array.isArray(item)) {
          item = await this.$content('pages/' + handleSetting[i].path + '/index').only(['abbrName', 'handleName', 'name', 'type', 'boxes', 'desc']).fetch();
        }
        const releaseData = await this.$content('release/' + handleSetting[i].path).fetch();

        Object.assign(item, {
          handle: handleSetting[i]
        }, {
          release: releaseData.release && releaseData.release[0]
        });
        productData.push(item)
      }
    }



    productData = await this.app.$initMD(productData, 'base');
    commit('_localData', productData)
  },


}
