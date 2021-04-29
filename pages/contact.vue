<template>
<div>
  <primary-block :data="mddata.liveChat" >
      <template #content>
          <div class="text-center"><h2>{{mddata.liveChat.items[1].title}}</h2>
        <p class="fs-4">​
          <b-icon icon="clock"></b-icon>  
        </p>

        <p class="whiteSpace-preline" v-html="mddata.liveChat.items[1].workingTime"></p>

        <h5>{{mddata.liveChat.items[1].text}} </h5>
        </div>
      </template>
  </primary-block>
  <primary-block :data="mddata.ticketSystem" />
  <primary-block :data="mddata.registrationRecovery" > 
         <template #content>
        <p class="whiteSpace-preline" v-html="mddata.registrationRecovery.items[0].text"></p>
        <b-form action="https://www.dvd-copy-all.com/cgi-bin/lostcode_dca.cgi" method="post" name=form0 >
        <b-form-group>
       <b-form-input class="mobile-input w-md-50 m-auto" name="email" placeholder="Please input your registration Email." size="40" type="text"> </b-form-input></b-form-group>
        <b-button variant="success" size="xl" squared type="submit">{{mddata.registrationRecovery.items[0].button.text}} </b-button>
        </b-form>
      </template> 
  </primary-block>
  <primary-block :data="mddata.supportEmail" > 
    <template #content>
      <b-row class="justify-content-center mb-5">
      <b-col sm="2" md="1" cols="3"  v-for="(icon,index) in iconList" :key="index"><b-img :src="icon" fluid /> </b-col>
      </b-row>
      <p v-html="mddata.supportEmail.items[0].text" class="lead"></p>
    </template>
  </primary-block>
  <primary-block :data="mddata.affiliateProgram" /> 
</div>
</template>
<script>
import {mapState} from 'vuex';
export default {
  async asyncData({ app, $content }) {
    let mddata = await $content("pages/contact").fetch();
    mddata = await app.$initMD(mddata);
    return { mddata };
  },
  head() {
    return this.mddata.head;
  },
layout:'primary',
  computed:{
    ...mapState({productData: state=>state.localData.productData}),
    iconList(){
      if (this.productData) {
        let filterData = this.productData.filter(res=>res.logo&&res.logo.iconUrl)
        return filterData.map(res=>res.logo.iconUrl)       
      } else {
        return []
      }

    }
  }
};
</script>