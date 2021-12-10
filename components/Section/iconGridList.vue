<template>
  <Section-IconGrid :iconData="{...data,textTop}">
    <template #default="{ item }">

      <h5 class="mb-3">{{ item.title }}</h5>
      <ul class="list-details text-left mb-3">
        <li
          v-for="item in item.list"
          :key="item.title"
        >
          <b-link :href="item.kbUrl"> {{ item.title || item.text }} </b-link>
        </li>
      </ul>
      <b-link v-if="item.more" :href="item.more.kbUrl"> {{ item.more.text }} </b-link>
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
import { fetchProduct,dateFormat } from "@/script/common";
import { State } from "@/script/interface";

export default defineComponent({
  props: { data: Object },

  setup(props) {
    const { state } = useStore<State>(),
      defaultData = computed(() => state.localData.defaultData),
      fetchName = (model = "sic") => {
        let item = defaultData.value.handleSetting.find(
          (res) => res.model == model
        );
        return item?.handleName;
      },
      textTop = computed(()=>{
          let sourceSrt = props.data?.textTop as string | undefined
          return sourceSrt?.replace('{time}',dateFormat())
      })
    
    return { defaultData, fetchProduct, fetchName,textTop };
  },
});
</script>
<style lang="scss" scoped>
.list-details{
  list-style: none;
  padding: 0; margin: 0;
  li{ position: relative;
    a{
      margin-left: 1.25rem;
    }
  }
  ::before{
    background: #44ce6f;
    width: .725rem;
    height: .725rem;
    left: 0;
    top: 50%;
    -webkit-transform: translateY(-50%);
    transform: translateY(-50%);
    position: absolute;
    content: "";
  }
}
</style>