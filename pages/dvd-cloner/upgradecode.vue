<template>
<div class="bg-white">
  <template v-if="upgradeInfo">
  <div class="container py-6">

    <h3 class="text-center">{{mddata.orderInfo.text.success}} </h3>
    <b-row>
     <b-col sm="12"> 
    {{mddata.orderInfo.name.orderNo}}
    <b-alert show>{{upgradeInfo.orderNo}} </b-alert></b-col>
    <b-col sm="4">
    {{mddata.orderInfo.name.codeVersion}}
    <b-alert show>{{upgradeInfo.codeVersion}} </b-alert>
    </b-col>
    <b-col sm="4">
    {{mddata.orderInfo.name.orderDate}}
    <b-alert show>{{upgradeInfo.orderDate}} </b-alert>
    </b-col>      
    <b-col sm="4">
    {{mddata.orderInfo.name.expirationDate}}
    <b-alert show>{{upgradeInfo.expirationDate}} </b-alert>
    </b-col>   
    
    </b-row>
    <p class="text-center">Your code version is <strong>{{upgradeInfo.codeVersion}}</strong>, current software version is V<strong>{{upgradeInfo.currentVersion}}</strong>.
Your code can register any version released before <strong>{{upgradeInfo.expirationDate}}</strong>.
Currently you can register V<strong>{{upgradeInfo.currentVersion}}</strong> or later versions.</p>
<p class="text-center"><b-img :src="mddata.orderInfo.guarantee.imageUrl" /></p>
  </div>
  <div class="bg-dark-opacity-1 py-6">
<nuxt-content class="container" :document="mddata" />
</div>
  <div class="container">
    <template  v-for="(item,index) in list">
  <item-overview :key="index" v-if="item" :data="mddata.upgradeItems" :itemInfo="{boxSrc:item.boxes[0].imageUrl,name:item.name,desc:item.desc&&item.desc.longText,handleName:item.handleName,saleInfo:item.saleInfo,code:upgradeInfo.keyCode}"  />
  </template>
  </div>
  </template>
  
  <div v-else class="container py-6">
    <b-overlay :show="isloading" rounded="sm">
    <b-alert show variant="danger">{{invalidInfo}} </b-alert>
    </b-overlay>
  </div>
  <faq-list :listData="mddata.faqList"></faq-list>
</div> 

</template>
<script>
import { mapState } from "vuex";
import { fetchItem,stringToObj } from "@/assets/script/tools";
export default {
  
async asyncData({app,$content}){
let  mddata = await $content('pages/dvd-cloner/upgradecode').fetch(),{upgrade} = await $content('pages/dvd-cloner/upgrade').fetch();
 mddata = await app.$initMD(mddata);
 return {mddata,apiUrl:upgrade.apiUrl}
},
head() {   
 return this.mddata.head
},
data(){
  return{
    isloading: false,
    invalidInfo: ''
  }
},
layout:"primary",
computed:{
  ...mapState({items: (state) => state.localData.productData,upgradeInfo: state=>state.upgradeInfo}),
  list(){
    if(this.items.length>0){
     return this.mddata.upgradeItems.items.map(res=>{
        let item = fetchItem(res.handleName,this.items);
        item = JSON.parse(JSON.stringify(item))
        Object.assign(item,{saleInfo:res})
        return item
      })
    }
  }
},
beforeMount(){
  this.invalidInfo = this.mddata.orderInfo.text.error
  this.checkState()
},
watch:{
  upgradeInfo(val){
    if(val)this.checkState()
  }
},
methods:{
  
  checkState(){
  if (!this.upgradeInfo) {
    this.isloading = true
    if(this.$route.query.code||this.$route.query.email){
      this.getApi(this.$route.query.code,this.$route.query.email)
    } else {
      this.isloading = false
    }
  } else if(this.mddata.handleName != this.upgradeInfo.handleName){
    this.getApi(this.$route.query.code,this.$route.query.email)
  }

  },
  getApi(code,email){
    let data;
    if (!email && !code) {
      this.invalidInfo = this.mddata.orderInfo.text.error
    } else {
      this.isloading = true;
      this.$axios
        .get(this.apiUrl,{params: {code,email}
        })
        .then((res) => {
          this.isloading = false;  
          data = stringToObj(res.data);
          console.log(data);
          switch (data.state) {
            case 'wrong':

              this.invalidInfo = data.text
              break;              
            case 'unfound':  
                           
              this.invalidInfo = data.text
              break;
            case 'refunded':              
              this.invalidInfo = data.text
              break  
            case 'success':
              data.handleName = this.mddata.handleName;
              this.$store.commit('toUpgradeInfo',data)              
              break                          
            default:              
              invalidInfo = data.toString()
              break;
          }
        })
        .catch((err) => {
          console.log(err);
          this.isloading = false;
          this.invalidInfo = err
        });
      }
  }
},
mounted() {

}
};
</script>