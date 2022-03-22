<template>
  <Section-IconGrid :iconData="data">
    <template #default="{ item ,index}">
        <Widget-CardShow :data="{...item,index}" />
    </template>
  </Section-IconGrid>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  useStore,
  computed,
} from "@nuxtjs/composition-api";
import { fetchProduct } from "@/script/common";
import { State } from "@/script/interface";

export default defineComponent({
  props: { data: Object },
  setup(props) {
    const { state } = useStore<State>(),
      defaultData = computed(() => state.localData.defaultData),
      items = computed(() => state.localData.productData);

    return { items, defaultData, fetchProduct };
  },
});
</script>