<template>
  <div>
    <iconBlock :iconData="mddata.supportMovies" />
    <b-overlay :show="!release" rounded="sm">
    <b-container   class="py-lg-8 py-6">
      <template v-if="release">
    <b-form-group label="Please select an option" class="w-md-50 mb-6">
      <b-form-select v-model="selected" :options="options"></b-form-select>
    </b-form-group>
    <div v-for="(item,index) in releaseList" :key="index">
      <h5>{{release.handleName+' V'+item.version}} </h5>
      <p class="muted font-weight-light font-italic">{{item.date}} </p>
      <p v-if="item.topText" v-html="$md.render(item.topText)"> </p>
      <ul v-if="item.list">
        <li v-for="(text,textIndex) in item.list" :key="textIndex" v-html="$md.render(text)"></li>
      </ul>
      <p v-if="item.bottomText" v-html="$md.render(item.bottomText)"> </p>
      <hr v-if="index+1 != releaseList.length" />
    </div>

    <p class="text-center mt-6"><b-button v-if="limit<=releaseItemsLength" @click="limit += 10" variant="outline-dark" size="lg">{{mddata.release.more}}</b-button></p>
     </template>
    </b-container>
    </b-overlay>
  </div>
</template>
<script>
import { mapState } from "vuex";
import { fetchItem } from "@/assets/script/tools";

export default {
  async asyncData({ app, $content }) {
    let mddata = await $content("pages/release").fetch(); 
    mddata = await app.$initMD(mddata);
    
    return { mddata};
  },
  layout: "primary",
  head() {
    return this.mddata.head;
  },
  data() {
    return {
      selected:null,
      releaseOriginal:null,
      limit: 20
    };
  },
  async fetch(){
    this.releaseOriginal = await this.$content('release').fetch();    
    this.releaseOriginal = await this.$initMD(this.releaseOriginal);

  },
  computed: {
    ...mapState({
      items: (state) => state.localData.productData,
    }),
    releaseItemsLength(){
      if (this.release) {
        return this.release.release.length
      }
    },
     releaseItems () {
      let tempData;
      if (this.items&&this.releaseOriginal && this.items.length > 0) {
         tempData = this.items.filter(res=>res.release)
 
         tempData = JSON.parse(JSON.stringify(tempData))
         
         tempData = this.mddata.release.include.map(res=>{
         return tempData.find(resTempData=>resTempData.handleName.toLowerCase() == res.toLowerCase())
         })  
          
         for (let i = 0; i < tempData.length; i++) { 
           tempData[i] = tempData[i]&&fetchItem(tempData[i].handleName,this.releaseOriginal) 
         }             
      }
      return tempData;
    },
    options(){
      if (this.releaseItems) {
      return this.releaseItems.map(res=>{
        return {value:res.handleName,text:res.handleName+' Release'}
      })        
      }
    },
    release(){
      if (this.selected&&this.releaseItems) {
        return fetchItem(this.selected,this.releaseItems)  
      }
    },
    releaseList(){
      if (this.release) {
        return this.release.release.slice(0,this.limit)
      }
    }

  },

  beforeMount(){
    if(this.options) this.selected = this.options[0].value
  },
  methods: {
    
  },
  watch: {
    options(val){
   
      if(val) this.selected = val[0].value
    }
  },
  mounted() {

  },

};
</script>