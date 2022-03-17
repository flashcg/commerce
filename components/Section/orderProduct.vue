<template>
  <Section-default :iconData="orderItem">

    <div class="row align-items-center mb-4">
      <div class="col-lg-3 col-md-5 col-6 mb-2 mb-md-0 text-left">
        <img :src="orderItem.imageUrl" style="max-width: 80%" />
      </div>
      <div class="col-lg-9 col-md-7 col-12">
        <h3 class="fs-4">{{ orderItem.name }}</h3>
        
        <ul v-if="orderItem.tips" class="fs-7">
          <li v-for="(item, index) in orderItem.tips" :key="index">
            {{ item }}
          </li>
        </ul>
        <h4 class="text-danger">USD ${{orderItem.price}}</h4>
        <p>
          <a href="#!" class="btn btn-danger btn-xl paddle_button" :data-product="orderItem.id" data-theme="none">{{ globalName.buy }} </a>
        </p>
      </div>
    </div>
    <div v-if="orderItem.subscriptions" class="row justify-content-center">
      <h4 class="col-12 text-center mb-4">More Choices</h4>
      <template v-for="(item,index) in orderItem.subscriptions">
        <div :key="index" class="col-lg-3 col-md-6 mb-3">
          <div class="contact-info-box h-100">
            <h3>$ {{item.price}} </h3>
            <h4>
              {{item.text}}
            </h4>
            <div class="mb-3">              
              <a href="#!" class="btn btn-outline-secondary  paddle_button" :data-product="item.id" data-theme="none">{{globalName.subscribe}} </a> 
            </div>
            <ul v-if="orderItem.tips" class="text-left">
              <li v-for="(string,stringIndex) in item.tips" :key="stringIndex">
                {{string}}
              </li>
            </ul>            
          </div>
          
        </div>
      </template>
    </div>
    
  </Section-default>
</template>
 
<script lang="ts">
import {
  defineComponent,
  ref,useFetch,
  useStore,useContext,
  computed,onMounted,
  reactive,
} from "@nuxtjs/composition-api";
import { State } from "@/script/interface";
import { OrderItems } from "../type/sic";
import { IContentDocument } from "@nuxt/content/types/content";

interface Content extends IContentDocument{
  iconIntro:object
}

export default defineComponent({
  props: { data: Object },
  setup(props) {
    const { state }: { state: State } = useStore(),{ $content} =useContext(),
      { globalName } = state.localData.defaultData,    
    orderItem = computed(()=>{
      const orderList:OrderItems = props.data?.orderList,model:string = props.data?.model,
        item = orderList?.items.find(res=>res.model == model)
      if(!item!.tips) item!.tips = orderList.subscription.tips
      item!.container = 'container'
      item!.sectionClass = 'bg-light'
      item?.subscriptions?.map(res=>{
        res.tips = item!.tips
      })
      return item
    })
    onMounted(()=>{
      window.addEventListener('load',()=>{
        const {Paddle} = window as any;          
          //Paddle.Environment.set('sandbox');
          Paddle.Setup({ vendor: 134375 }) 
      })
    })
    useFetch(async () => {
      let data = await $content('pages/order').fetch() as unknown as Content;
      
    })
    
    return { globalName,orderItem };
  },
});
</script>

