<template>
  <Section-IconGrid :iconData="iconData">
    <template #default="{ item }">
      <h5>{{ fetchProduct(items, item.model).name }}</h5>
      <p>{{ fetchProduct(items, item.model).desc.shortText }}</p>
      <p>
        <b-link :to="fetchProduct(items, item.model).handle.slug">
          <img class="border rounded" style="border: dashed #c4c9ce  !important"
            :src="fetchProduct(items, item.model).productImages[0].imageUrl"
        /></b-link>
      </p>
      <button class="btn btn-danger">{{ defaultData.globalName.buy }}</button>
    </template>
    <template #appendage="{ appendage }"><div class="col-12 mt-5">
      <div class="row">
        <div v-for="item in appendage.items" :key="item.text" :class="`col-md-${12/appendage.items.length}`">
          <div class="single-box">
          <p><img :src="item.imageUrl" style="max-height:60px" /></p>
          <p class="lead">{{item.text}} </p>
          </div>
        </div>
      </div>
      </div></template>
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
  props: { iconData: Object },
  setup(props) {
    const { state } = useStore<State>(),
      defaultData = computed(() => state.localData.defaultData),
      items = computed(() => state.localData.productData);

    return { items, defaultData, fetchProduct };
  },
});
</script>