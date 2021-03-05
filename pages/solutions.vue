<template>
  <div>
    <jumbotron :jumbotronData="mddata.jumbotronAreasTop" />
    <jumbotron :jumbotronData="$t('jumbotronPromotion')" />
    <div class="container my-8">
      <p class="lead font-size-md">{{ mddata.description }}</p>
    </div>
    <jumbotron :jumbotronData="mddata.jumbotronBlock" />
    <iconBlock :iconData="mddata.iconBlock_more" />
  </div>
</template>
<script>
import jumbotron from "@/components/jumbotron";
import iconBlock from "@/components/iconBlock";
export default {
  async asyncData({app,$content}){
   let  mddata = await $content('pages/solutions').fetch();
    mddata = await app.$initMD(mddata);
    return {mddata}
  },  
  head() {
    return this.mddata.head;
  },
  layout: "primary",
  components: { jumbotron, iconBlock },

  mounted() {},
};
</script>