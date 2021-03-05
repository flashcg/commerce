<template>  
  <div>
    <jumbotron :jumbotronData="jumbotronAreasTop" />
    <jumbotron :jumbotronData="$t('jumbotronPromotion')" />   
    <div v-if="unboxing" id="unboxing" class="container-fluid pt-lg-8 pt-6 ">
      <div class="d-flex">
      <div class="col-lg-5 d-lg-block d-none align-self-end">
        <b-img fluid :src="unboxing.iconUrl" />
      </div>
      <div class="mb-6 col-lg-7  align-self-center" >
      <h2 class="mb-5">
        {{unboxing.text}}
      </h2>
      <div class="row justify-content-md-start">
        <div v-for="(article,articleIndex) in unboxing.articleLists"  :key="articleIndex" :class="article.variant?'w-100':''" >
        <b-alert show :variant="article.variant?article.variant:'primary'" class="rounded-0 text-left mr-2 d-inline-block"><a :href="article.kbUrl">{{article.title}}</a></b-alert>
        </div>


      </div>
      </div>
      </div>
    </div>


    <iconBlock :iconData="iconBlock_help" />
    <iconBlock :iconData="iconBlock_download" />
    <iconBlock :iconData="iconBlock_contact" /> 
    <alert-sn />

  </div>
</template>
<script>
import jumbotron from "@/components/jumbotron";
import iconBlock from "@/components/iconBlock";
import newsletter from "@/components/newsletter";

export default {
  async asyncData({ app, $content }) {
    let mddata = await $content("pages/help/index").fetch();
    mddata = await app.$initMD(mddata);
    return  mddata;
  },
  head() {
    return this.head;
  },
  layout: "fluid",
  components: { jumbotron, iconBlock, newsletter },
  data() {
    
    return { activeTabName: "", currentPath1: "",currentPath2: "" };
  },
  methods: {

    fetchPath(model) {
      let path;
      this.$t("handleSetting").map(res => {
        if (res.model == model) {
          path = res.path;
        }
      });
      return path;
    },
    randomVariant() {
      let variant = ["primary", "success", "info", "warning"];
      let r = Math.floor(Math.random() * 4);
      return variant[r];
    },
    handleClick1(tab, event) {
      let path = this.$toLower(tab.label, "-");
      this.currentPath1 = path
    },
    handleClick2(tab, event) {
      let path = this.$toLower(tab.label, "-");
      this.currentPath2 = path
    },    
    productIcon(model,path) {
      let _this = this
      
       return this.$thumb(_this.$getItemData(model,'imgPath'))       

      
    }
  },

  mounted() {}
};
</script>