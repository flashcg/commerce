<template>
  <div
    v-if="data&&data.active"
    :id="$handlify(data.name)"
    :class="`py-lg-8 py-6 bg-dark-opacity-1 ${data.additionClass}`"
  >
    <b-container>
      <h2 v-if="data.title">{{ data.title }}</h2>
      <b-row v-for="(item,i) in data.items" :key="i">
        <template v-if="itemFn(item.handleName)">
        <p class="col-md-12 lead">{{itemFn(item.handleName).desc.shortText}} </p>
        <b-col md="3"><b-img fluid :src="itemFn(item.handleName).boxes[0].imageUrl"></b-img> </b-col>
        <b-col md="9" class="whiteSpace-preline" ><p v-html="itemFn(item.handleName).desc.longText"></p>
        <b-button squared size="lg" :to="`/${itemFn(item.handleName).handle.path}/`">{{$t('globalName.more')}}</b-button>
        </b-col>        
        <hr v-if="!(data.items.length-1<=i)" class="divider divider-fluid">
        </template>
      </b-row>
    </b-container>
  </div>
</template>
 
<script lang="ts">
import {
  defineComponent,
  useStore,
  PropType,
  computed,
} from "@nuxtjs/composition-api";
import { fetchItem } from "@/assets/script/tools";
import { ProductDataConfig } from "@/assets/script/interfaceSet";
interface DataConfig {
  name: string;
  title: string;
  additionClass?: string;
  items: [
    {
      handleName: string;
    }[]
  ];
}

export default defineComponent({
  name: "item-bonus",
  props: { data: { type: Object as PropType<DataConfig>, required: true } },
  setup(props) {
     const {state} = useStore() as any,products = computed((res)=>state.localData.productData as ProductDataConfig[]|undefined);
     const itemFn = (handleName:string)=>{
      return fetchItem(handleName,products.value)
     }
     return{itemFn,products}
  },
});
</script>
<style scoped>
</style>