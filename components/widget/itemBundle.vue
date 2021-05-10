<template>
  <div :class="`item-bundle mb-3 ${data.additionClass}`">
      <div class="d-flex flex-wrap position-relative bg-gray-light p-2 mb-3" :style="`cursor: pointer;background:url(${$t('imagesPath')}bundle-bg.jpg) no-repeat;background-size:cover`" @click="jumpUrl(data.url)"> 
        <template v-if="data.type != 'ultimate'">
          <div class="col-md-4 d-none d-md-block" style="z-index:2;">
      <template v-for="(item,index) in data.handleName"> 
      <b-img v-if="itemFn(item)" :src="itemFn(item).boxes[0].imageUrl" fluid style="width:50%"  :key="index"></b-img>
      </template>
        </div>
      <div class="pt-2 col-md-8 col-9" style="z-index:2"> 
      <h4 class="text-danger">{{data.title}} </h4>
      <h5>Market Pirce:<span style="text-decoration: line-through;">{{`$${data.initialPrice}`}}</span> 
      <span class="text-danger ">Now Only:<span class="fs-4">{{`$${data.price}`}}</span> </span></h5>
      </div> 
        </template>
        <template v-else>
          <div class="col-12">
                <h4 class="text-danger d-inline-block mr-2">{{data.title}} </h4>
                <h5 class="d-inline-block">Market Pirce:<span style="text-decoration: line-through;">{{`$${data.initialPrice}`}}</span> 
      <span class="text-danger ">Now Only:<span class="fs-4">{{`$${data.price}`}}</span> </span></h5>
          </div>
           <div>     
           <template v-for="(item,index) in data.handleName"> 
           <b-img v-if="itemFn(item)" :src="itemFn(item).boxes[0].imageUrl" fluid style="height:120px"  :key="index"></b-img>
          </template>
           </div>
        </template>
      <div class="position-absolute" :style="`top:0;right:0;width:80px`">
        <span class="text-warning fs-5 font-weight-bold position-absolute w-100 text-center" style="line-height:normal; ">{{data.discountRate}} <br />OFF</span>
        <b-img :src="`${$t('imagesPath')}flag.png`" fluid></b-img>
      </div>         
      <div class=" position-md-absolute flex-fill text-right bg-dark-opacity-3" style="bottom: 0;left: 0;right: 0;z-index:1"><span class="d-inline-block bg-red-dark p-2 text-light">Click here to buy</span> 
      </div>  
 
      </div>
      <p>{{data.text}}</p>
  </div>
</template>
 
<script lang="ts">
import {
  defineComponent,
  useStore,
  PropType,
  computed,onMounted
} from "@nuxtjs/composition-api";
import { fetchItem } from "@/assets/script/tools";
import { ProductDataConfig } from "@/assets/script/interfaceSet";

interface DataConfig {
  title: string;
  handleName: string[];
  initialPrice: number;
  price: number;
  discountRate: string;
  text: string;
}

export default defineComponent({
  name: "item-bundle",
  props: { data: { type: Object as PropType<DataConfig>,required:true } },
  setup(props) {
    
    const { state } = useStore() as any,
      products = computed(
        (res) => state.localData.productData as ProductDataConfig[] | undefined
      );
    const itemFn = (handleName: string) => {        
      return fetchItem(handleName, products.value);
    },
    jumpUrl =  (url:string)=>{
        window.location.href = url      
    };

    return { itemFn ,jumpUrl};
  },
});
</script>