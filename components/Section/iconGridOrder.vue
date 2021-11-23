<template>
  <Section-IconGrid :iconData="data">

    <template #default="{ item, index }">
        <div class="contact-info-box h-100">
          <p><img :src="item.imageUrl" style="max-width:180px" /></p>
          <h4>{{item.name}} </h4>
          <h4 class="text-danger">
            <span style="font-size:4rem" class="align-middle"><svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-star-lifetime"></use>
            </svg></span> <span class="align-middle">USD ${{item.price}}</span> </h4>
          <a class="btn btn-success btn-xl" :href="item.buyLink" >Buy Now</a>
          <p class="fs-5">{{data.subscription.separationText}} </p>
          <p v-for="(item,index) in item.subscriptions" :key="index">
            <span class="fs-4 d-inline-block" style="width:80px">${{item.price}}</span> <a :href="item.buyLink" class="btn btn-outline-secondary btn-lg" style="width:180px">{{item.text}} </a>
          </p>
          <ul class="text-left">
            <li v-for="(item,index) in tipsHanle(item.tips)" :key="index">
              {{item}}
            </li>
          </ul> 
        </div>
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
      items = computed(() => state.localData.productData),
      tipsHanle=(itemTips:string[])=>{
        let tips:string[] = props.data?.subscription.tips 
        if(itemTips)tips = itemTips
        return tips
      }

    return { items, defaultData, fetchProduct,tipsHanle };
  },
});
</script>
<style lang="scss" >
    .icon {
       width: 1em; height: 1em;
       vertical-align: -0.15em;
       fill: currentColor;
       overflow: hidden;
    }
</style>