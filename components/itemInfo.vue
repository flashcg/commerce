<template>
  <span v-if="outString">{{ outString }} </span>
</template>
 
<script lang="ts">
import {
  defineComponent,
  useStore,
  ref,
  PropType,
  computed,
  watch,
} from "@nuxtjs/composition-api";
import { fetchItem } from "@/assets/script/tools";
import { ProductDataConfig } from "@/assets/script/interfaceSet";

export default defineComponent({
  name: "itemInfo",
  props: {
    handlename: { type: String, default: "DVD-Cloner" },
    type: { type: String, default: "name" },
  },
  setup(props) {
    const { state } = useStore() as any,
      outString = ref<string>(),
      products = computed(
        (res) => state.localData.productData as ProductDataConfig[] | undefined
      ),
      item = ref<ProductDataConfig>(),
      itemFn = (handleName: string) => {
        item.value = fetchItem(handleName, products.value);
        switch (props.type) {
          case "name":
            outString.value = item.value?.name;
            break;
        }
      };
    itemFn(props.handlename);
    watch(products, () => itemFn(props.handlename));
    return { outString };
  },
});
</script>