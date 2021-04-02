<template>
  <div id="search" class="py-5">
      <b-input-group class="w-md-50 mb-4"
        >
        <b-form-input class="rounded-0" :placeholder="$t('globalName.searchPlaceholder')" v-model="query"></b-form-input>
        <b-input-group-append>
          <b-button squared variant="primary">{{
            $t("globalName.search")
          }}</b-button>
        </b-input-group-append>
      </b-input-group>
    <ul>
      <li v-for="(item, i) in resolut" :key="i">
        {{ item.title }} <b-link>{{ item.path }}</b-link>
       {{getDate(item.updatedAt)}}
      </li>
    </ul>
  </div>
</template>
 
<script lang="ts">
import {
  defineComponent,
  ref,
  useContext,
  watch,
} from "@nuxtjs/composition-api";
import { sortFn ,getDate} from "@/assets/script/tools";

export default defineComponent({
  setup() {
    let resolut = ref(),sortKey=ref('updatedAt'),
      query = ref("");
    const { $content } = useContext(),
      search = async () => {
        if (query.value) {
          let arrayNotSort:{[propName:string]:any}[]|{[propName:string]:any} = await $content("pages", { deep: true })
            .search(query.value)
            .fetch()
          
          resolut.value = sortFn(arrayNotSort,sortKey.value,'desc');          
        } else {
          resolut.value = []
        }
      };

    watch(query, search);
    return { resolut, query ,getDate};
  },
});
</script>