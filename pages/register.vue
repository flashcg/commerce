<!--  Value from server hasn't been verified during Front-end process of verification-->
<template>
<div class="container my-6 mx-auto text-center" style="max-width:500px">
    <b-form @submit="submit(sn)" onsubmit="return false">

     <div v-if="step == 'sn'">
        
        <p><b-img :src="stepInfo.sn.imageUrl" /></p>
        <p><a :href="stepInfo.sn.tips.kbUrl">{{stepInfo.sn.tips.text}} </a></p>
        <b-form-group :label="stepInfo.sn.label.sn+' :'" class="text-left">
        <b-form-input v-model="sn" name="sn" spellcheck="false"></b-form-input> 
        </b-form-group>       

      </div>

      <div v-if="step == 'register' || step == 'verify'">
        <p><b-img :src="$thumb($getItemData(productInfo.model,'imgPath'))" class="w-50" /></p>
        <h3>{{$getItemData(productInfo.model,'name')}} </h3>
        <div class="text-left row">
          <div class="col">
          {{stepInfo.sn.label.sn}} :
          <b-alert variant="primary" show><strong>{{sn}}</strong></b-alert>
          </div>
         <div class="col"> {{stepInfo.register.label.ProductModel}} :
          <b-alert variant="primary" show><strong>{{productInfo.model}}</strong></b-alert></div>
         <div class="col-12"> {{stepInfo.register.label.regCode}} :
          <b-alert variant="primary" show><strong>{{productInfo.code}}</strong></b-alert>  </div>                        
        </div>

        <b-form-group :label="stepInfo.register.label.email.text+' :'" :description="stepInfo.register.label.email.description" class="text-left">
        <b-form-input v-model="email" name="email" spellcheck="false"></b-form-input> 
        </b-form-group>  

        <b-form-group v-if="step == 'verify'" :label="stepInfo.register.label.vcode.text+' :'" :description="stepInfo.register.label.vcode.description" class="text-left">
        <b-form-input v-model="vcode" name="vcode" spellcheck="false"></b-form-input> 
        </b-form-group>          


      </div> 
      <div v-if="step == 'success'" class="py-4 text-success" style="font-size:88px">        
        <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="check-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="align-middle svg-inline--fa fa-check-circle fa-w-16 fa-2x"><path fill="currentColor" d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z"></path></svg>
      </div>
      <div v-if="step == 'register' || step == 'verify'">
        <template v-if="ownedInfo&&ownedInfo.length>0"> 
        <p class="mb-2"><span class="flex-fill">{{$strValTrans(alertInfo.forKBText,$data)}}</span></p> 
        <b-button v-if="currentKBPath" :disabled="isloading"  class="w-100 mb-4" variant="outline-secondary" :href="currentKBPath"><b-spinner v-if="isloading" class="align-middle mr-2" small label="loading..."></b-spinner> {{alertInfo.buttons.getSolutions}} </b-button>
        <template v-if="isRefunded">
          <p class="mb-2">
            <span class="flex-fill">{{alertInfo.refundedText}} </span>
            </p>            
        </template>
        <template v-else-if="productInfo.refund">
            <p class="mb-2">{{alertInfo.refundingText}} </p>

            <b-button  class="w-100 mb-4" variant="outline-secondary"  :to="{ path: '/refund/', query: { sn: productInfo.sn }}" >{{alertInfo.buttons.getRefund}} </b-button>

          </template>
        </template>        
      </div>  
       <b-alert :show="currentMessage!=false" :variant="alertVariant">{{currentMessage}}</b-alert>
        <p v-if="step != 'success'"><b-button variant="success" type="submit" :disabled="isloading" size="lg">
          <b-spinner v-if="isloading" class="align-middle mr-2" small label="loading..."></b-spinner><span class="align-middle">{{currentBottonText}} </span>
        </b-button></p>
        <p v-if="step != 'success'"><a :href="stepInfo.needHelp.kbUrl">{{stepInfo.needHelp.text}} </a></p>


    </b-form>    
</div>

</template>
<script>
import { mapState } from "vuex";
import jumbotron from "@/components/jumbotron";
import iconBlock from "@/components/iconBlock";
export default {
    async asyncData({app,$content}){
   let  mddata = await $content('pages/register').fetch(),
    help = await $content('pages/help/index').fetch();
    mddata = await app.$initMD(mddata);
    help = await app.$initMD(help);
    return {...mddata,knowledge: help.knowledge}
  },    
  head() {
    return this.head;
  },
  layout: "primary",
  components: { jumbotron, iconBlock },
  data() {

    return {
      step: "sn",
      sn: "",
      email: "",
      vcode: "",
      isloading: false,
      alertVariant: "danger",
      currentMessage: false,
      productInfo: {},
      isRefunded:false,
      ownedInfo:[]
    };
  },
  computed: {
    ...mapState({
      alertInfo: (state) => state.i18n.messages.alertSN,
      products: (state) => state.shopifyData.productsMerged
    }),
    currentKBPath(){
      let kbs=[];
      this.knowledge.blocks_1.map(res=>{
        kbs.push(...res.products)
      })
      let kb = kbs.find(res=>res.model==this.productInfo.model)
      
      if (kb) return kb.moreButton.kbUrl    
    },
    currentBottonText: function() {
      if (this.step == "sn") {
        return this.stepInfo.sn.buttonText;
      } else if (this.step == "register") {
        return this.stepInfo.register.buttonText;
      } else if (this.step == "verify") {
        return this.stepInfo.verify.buttonText;
      }
    }
  },
  methods: {

    submit() {
      this.isloading = true;
       
      this.$store
        .dispatch('fetchReg',{
          datas:JSON.stringify({
            sn: this.sn.trim(),
            email: this.email.trim(),
            verifycode: this.vcode.trim()
          }),
          that:this,
          cookieMethod:'addCookie'
        })
        .then(response => {
          //console.log(response);
          response = response.data;
          let currentProduct = this.products.find(res=>response.model==res.model);
          this.isloading = false;
          this.currentMessage = false;
          this.alertVariant = "danger";
          switch (response.status) {
            case "sn":
              this.currentMessage = this.message.sn;
              break;

            case "valid":
              
              if (response.code) {
                this.step = "register";
              } else {
                this.currentMessage = this.message.validNoCode;
              }
              this.productInfo = {
                model: response.model,
                sn: response.sn,
                name: currentProduct&&currentProduct.title, 
                code: response.code
              }              
              this.ownedInit()
              break;

            case "ok":
              this.step = "success";
              this.alertVariant = "success";
              this.currentMessage = this.message.ok;
              break;
            case "snUsed":
              this.currentMessage = this.message.snUsed;
              
              
              break;
            case "email":
              this.currentMessage = this.message.email;
              break;
            case "verify":
              this.step = "verify";
              this.currentMessage = this.message.verify;
              this.currentBottonText = this.stepInfo.verify.buttonText;
              this.alertVariant = "info";
              break;
            case "verify_retry":
              this.currentMessage = this.message.verify_retry;
              break;
            case "error":
            default:
              this.currentMessage = this.message.default;
          }
        })
        .catch(error => console.log(error));
    },
    ownedInit(){
      var data = this.$getCookie("ownedInfo") || localStorage.ownedInfo;
      if (data) {
        this.ownedInfo = JSON.parse(data);
        let currentItem = this.ownedInfo[this.ownedInfo.length-1]      
        
        this.fetchFlag();
      }      
    },
    fetchFlag(){      
      if(this.ownedInfo&&this.ownedInfo.length>0){
        this.isloading = true;
      let applyRefunding = this.ownedInfo.find(res=>res.sn==this.productInfo.sn).applyRefunding
      if (applyRefunding==0) {
        this.$store
          .dispatch("fetchReg", {
            datas: JSON.stringify({
              sn: this.productInfo.sn,
            }),
            that: this,
            cookieMethod: "getCookie",
          })
          .then((res) => {
            this.isloading = false;
            let flags = res.data.flags;
            //let flags = 'back';
            
            this.productInfo.refund = flags.indexOf("b") != -1;          
          })
          .catch((err) => {
            console.log(err);
          });         
      } else {
        this.isRefunded = true;
        this.isloading = false;
      }
      }  

    },
  },
  mounted() {    
    
    let snIndex = location.href.indexOf("#SN");    
    
    if (snIndex > 0) {
      this.sn = location.href.substr(snIndex + 3);
    }
  }
};
</script>