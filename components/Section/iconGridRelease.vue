<template>
  <Section-IconGrid :iconData="iconData">
    <template #default="{ item }">
      <div class="single-blog-post-box text-left   h-100">
        <div class="entry-post-content d-flex   h-100"  style="flex-direction: column">
          <p class="entry-meta mb-1"><ul><li>{{ fetchName(item.model) }} {{ item.version }}</li></ul>
          <time class="mb-2">{{ item.date }} </time></p>

          <div style="flex:1 1 auto;">
            <p v-for="item in item.list" :key="item" >{{item}} </p>
          </div>
          <a href="#" class="learn-more-btn">{{defaultData.globalName.moreRelease}}<i data-v-4d521fc4="" data-name="plus" data-tags="add,new" data-type="plus" class="feather feather--plus"><svg data-v-4d521fc4="" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-plus feather__content"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg></i></a>
        </div>
      </div>
    </template>
  </Section-IconGrid>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  useFetch,
  useStore,
  computed,
  reactive,
} from "@nuxtjs/composition-api";
import { fetchProduct } from "@/script/common";
import { State } from "@/script/interface";

export default defineComponent({
  props: { iconData: Object },

  setup(props) {
    const { state } = useStore<State>(),
      defaultData = computed(() => state.localData.defaultData),
      fetchName = (model = "sic") => {
        let item = defaultData.value.handleSetting.find(
          (res) => res.model == model
        );
        return item?.handleName;
      };

    return { defaultData, fetchProduct, fetchName };
  },
});
</script>