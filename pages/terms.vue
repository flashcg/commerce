<template>
  <div>{{data}} </div>
</template>
<script lang="ts">
import { defineComponent,ref,reactive } from '@nuxtjs/composition-api'
export default defineComponent({
/*     async asyncData({app,$content}){
   let  mddata = await $content('pages/terms').fetch();
    mddata = await app.$initMD(mddata);
    return {mddata}
  },
  head() {   
    return this.mddata.head
  },
  layout: "primary",
  components: { jumbotron, iconBlock }, */
  setup(){
    const data = ref({mm:"55"});

    console.log(data);
    return{
      data
    }
  }


});
</script>