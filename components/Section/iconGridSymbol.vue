<template>
  <Section-IconGrid :iconData="data">

    <template #default="{ item }">
        <div v-if="data.iconShell" class="p-3 rounded-lg bg-gray-light h-100">
        <svg class="icon mb-3" aria-hidden="true" style="font-size:6rem">
            <use :xlink:href="'#icon-'+item.name"></use>
        </svg>
        <p class="lead">{{item.title}} </p>
        </div>

        <template v-else>
        <svg class="icon mb-3" aria-hidden="true" style="font-size:6rem">
            <use :xlink:href="'#icon-'+item.name"></use>
        </svg>
        <h4>{{item.title}} </h4>
        </template>

        <small v-if="item.tip" class="muted text-right py-2">{{item.tip}} </small>
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