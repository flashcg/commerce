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
          <a class="btn btn-success btn-xl paddle_button  mb-3" href="#!" :data-product="item.id" data-theme="none">Buy Now</a>
          
          <template v-if="item.subscriptions&&item.subscriptions.length>1">
            <p class="fs-5">{{data.subscription.separationText}} </p>
          <p v-for="(item,index) in item.subscriptions" :key="index">
            <span class="fs-4 d-inline-block" style="width:80px">${{item.price}}</span> <a href="#!" class="btn btn-outline-secondary btn-lg paddle_button" style="width:180px" :data-product="item.id" data-theme="none">{{item.text}} </a>
          </p>
          </template>
          <template v-else-if="item.subscriptions">
            <p class="fs-5">{{data.subscription.separationText}} </p>
            <div v-for="(item,index) in item.subscriptions" :key="index">
              <h3><span style="font-size:4rem" class="align-middle"><svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-star-vip"></use>
            </svg></span><span class="align-middle">{{item.title}}</span> </h3>
            <span class="fs-4 d-inline-block" style="width:80px">${{item.price}}</span>
            <h5>{{item.subtitle}} </h5>
            </div>
            <a href="#!" class="btn btn-outline-secondary btn-xl paddle_button" :data-product="item.id" data-theme="none">Subscribe</a> 
          </template>
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
  useStore,onMounted,
  computed,
} from "@nuxtjs/composition-api";
import { fetchProduct } from "@/script/common";
import { State } from "@/script/interface";

interface  Window {
  Paddle: any
}
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
      };
      onMounted(()=>{
        window.addEventListener('load',()=>{
          const {Paddle} = window as any;          
            //Paddle.Environment.set('sandbox');
            Paddle.Setup({ vendor: 134375 }) 
        })

      })

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