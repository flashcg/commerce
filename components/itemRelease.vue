<template>
  <div id="release" v-if="data&&productData&&productData.release" class="py-lg-8 py-6 bg-dark-opacity-2">
    <div class="container">
    <h3>{{title}} </h3>
    <p class="lead">{{productData.name+' V'+productData.release.version}} </p>
    <p class="font-weight-light">{{productData.release.date}} </p>
    <ul>
      <li v-for="(item,itemIndex) in productData.release.list" :key="itemIndex">
        {{item}}
      </li>
    </ul>
    <b-button squared variant="outline-secondary" to="/release/">{{$t('globalName.moreRelease')}} </b-button>
    </div>
  </div>
</template>
 
<script lang="ts">
import {
  defineComponent,
  useStore,useContext,
  PropType,
  computed,
} from "@nuxtjs/composition-api";
import { toLower } from "@/assets/script/tools";
import { ProductDataConfig } from "@/assets/script/interfaceSet";
interface DataConfig {
    handleName: string;
    name: string;
}
export default defineComponent({
  name: "itemRelease",
  props: { data: { type: Object as PropType<DataConfig>, required: true } },
  setup(props) {
    
    const {state} = useStore() as any,
    productData =computed(()=>{
      let outData = state.localData.productData.find((res:ProductDataConfig)=>res.handleName == props.data.handleName);
      return outData
    }),
    title = computed(()=>state.i18n.messages.globalName.release);
    
    
    return { productData ,toLower,title};
  },
});
</script>