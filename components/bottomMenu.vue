
<template>  
  <ul class="nav-footer d-md-flex">
      <base-tree-list v-for="(item,index) in $t('menuFooter')" :datas="item"  :index="index" :key="index"></base-tree-list>
  </ul>          
</template>
 
<script>
import baseTreeList from "./widget/baseTreeList";

export default {
  name: "bottom-menu",
  props: ["mouseHoverFn"],
  components: {
    baseTreeList
  }
};
</script>
