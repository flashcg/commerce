<template>    
    <div></div>
</template>
 
<script lang="ts">
import {
  defineComponent,reactive,
  ref,
  onMounted,
  PropType
} from "@nuxtjs/composition-api";
export default defineComponent({
  name: 'search',
  data(){
      return{
        
      }
  },
  model: {
    prop: 'isShow',
    event: 'change'
  },
  props:['isShow','url','type'],
  computed: {
  },
  methods:{

  },
  mounted(){    

  }

})
</script>