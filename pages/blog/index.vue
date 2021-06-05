<template>
  <div>

    <b-container   class="py-lg-8 py-6">
      <template v-if="listArticles">

    <div v-for="(item,index) in listArticles" :key="index">
      <h5>{{item.title}} </h5>
      <nuxt-content :document="item" class="blog-trimming" />
      <b-button variant="outline-dark" :to="item.path+'/'">Read More</b-button>
      <hr v-if="index+1 != listArticles.length" />
    </div>

     </template>
    </b-container>

  </div>
</template>
<script>
export default {
  async asyncData({ app, $content }) {
    let mddata = await $content("pages/blog/index").fetch(); 
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
      listArticles:null,
      limit: 20
    };
  },
  async fetch(){
    let dataOriginal = await this.$content('pages/blog').where({template:'blog'}).fetch();
    dataOriginal.push(...await this.$content('pages/dvd-cloner/articles').where({template:'blog'}).fetch())
    dataOriginal.push(...await this.$content('pages/dvd-to-ipod-converter/articles').where({template:'blog'}).fetch());
    dataOriginal = await this.$initMD(dataOriginal);
    this.listArticles = dataOriginal.map(res=>{      
      res.body.children = res.body.children.slice(1)
      res.path = res.path.replace( '/pages', '')
     
     return {...res,title:res.title.replace( '| DVD-Cloner', '')}
    })

  },
  computed: {

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