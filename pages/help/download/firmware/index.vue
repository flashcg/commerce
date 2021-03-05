<template>
  <div>
    <jumbotron :jumbotronData="mddata.jumbotronAreasDownloadTop" />
    <jumbotron :jumbotronData="$t('jumbotronPromotion')" />   
  <div class="container my-lg-8 my-6">
    <b-row>
    <b-col md="6" class="mb-4" v-for="(list,listIndex) in mddata.downloadFirmware.firmwares" :key="listIndex">
      <div class="border p-3 text-center">
        <h4 class="mb-4">{{list.title}} </h4>
          <div class="w-md-50 mx-auto"><b-img :src="$getItemData(list.productModel, 'imgPath')" fluid /></div>          
          <b-btn variant="success" class="rounded-0" size="xl" v-b-modal.confirm @click="sendData(list.title)"><svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="arrow-alt-circle-up" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="align-middle mr-3 svg-inline--fa fa-arrow-alt-circle-up fa-w-16 fa-2x"><path fill="currentColor" d="M8 256C8 119 119 8 256 8s248 111 248 248-111 248-248 248S8 393 8 256zm292 116V256h70.9c10.7 0 16.1-13 8.5-20.5L264.5 121.2c-4.7-4.7-12.2-4.7-16.9 0l-115 114.3c-7.6 7.6-2.2 20.5 8.5 20.5H212v116c0 6.6 5.4 12 12 12h64c6.6 0 12-5.4 12-12z" class=""></path></svg><span class="align-middle">{{ mddata.downloadFirmware.updateButtonText}}</span></b-btn>
        
      </div>
    </b-col></b-row>
  </div>
    <b-modal ref="confirm" id="confirm" hide-header hide-footer>
      <p class="lead" v-html="mddata.downloadFirmware.areYouSureTextA+'  <b>'+productData+'</b> '+mddata.downloadFirmware.areYouSureTextB"></p>
      <p class="text-center">
        <b-button v-if="productData" size="lg" class="rounded-0 w-25" variant="success"  :to="'/help/download/firmware/'+$toLower(productData,'-')+'-firmware/'">{{$t('globalName.yes')}}</b-button>
        <b-button class="rounded-0" size="lg" variant="secondary" @click="hideModal">{{$t('globalName.no')}}</b-button></p>
    </b-modal>    
  </div>
</template>
<script>
import jumbotron from "@/components/jumbotron";
import iconBlock from "@/components/iconBlock";
export default {
  async asyncData({ app, $content }) {
    let mddata = await $content(
      "pages/help/download/firmware/index"
    ).fetch();
    mddata = await app.$initMD(mddata);
    return { mddata };
  },
  head() {
    return this.mddata.head;
  },
    data() {

    return { productData: null };
  },
  layout: "primary",
  components: { jumbotron, iconBlock },

  methods: {

    sendData(data) {
      this.productData = data;
    },
    toPath(path){

    },
    showModal() {
      this.$refs["confirm"].show();
    },
    hideModal() {
      this.$refs["confirm"].hide();
    }
  }
};
</script>