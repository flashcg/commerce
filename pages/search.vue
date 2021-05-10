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
       <p>{{$t('globalName.totalResults')}} <span class="text-danger font-italic">{{(results&&results.length||0)}}</span></p>
    <ul>
      <li v-for="(item, i) in results" :key="i">
         <p><b-link :to="pathInit(item.path)" class="fs-6">{{ item.title }}</b-link>
         <br />
       <span  class="text-gray-light font-italic pl-3">- {{getDate(item.updatedAt)}}</span></p>
      </li>
    </ul>
  </div>
</template>
 
<script lang="ts">
import {
  useRoute,
  defineComponent,
  ref,
  useContext,
  watch,
  reactive,
} from "@nuxtjs/composition-api";
import { sortFn ,getDate} from "@/assets/script/tools";

export default defineComponent({
  setup() {
    let results = ref(),sortKey=ref('updatedAt'),
      query = ref<string|null>('');
    const { $content } = useContext() as any,route = useRoute(),
    search = async () => {
        if (query.value) {
          let arrayNotSort:{[propName:string]:any}[]|{[propName:string]:any} = await $content("pages", { deep: true })
            .search(query.value)
            .fetch()
          
          results.value = sortFn(arrayNotSort,sortKey.value,'desc');          
        } else {
          results.value = []
        }
      },
      pathInit = (path:string)=>{
       let pathInit = path.replace('index','');
       
       pathInit = pathInit.replace('/pages','')

       if(pathInit.substr(-1) != '/')pathInit = pathInit+'/' ;      
       
        return pathInit
      }
      if(route.value.query.searchKey) query.value = route.value.query.searchKey as string|null
      search()
    
    watch(query, search);
    return { results, query ,getDate,pathInit};
  },
});
</script>