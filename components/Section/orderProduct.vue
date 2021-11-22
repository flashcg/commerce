<template>
  <Section-default :iconData="data">
    <div class="row align-items-center mb-4">
      <div class="col-lg-3 col-md-5 col-6 mb-2 mb-md-0 text-left">
        <img :src="data.boxes && data.boxes[0].imageUrl" style="max-width: 80%" />
      </div>
      <div class="col-lg-9 col-md-7 col-12">
        <h3 class="fs-4">{{ data.name }}</h3>
        <ul class="fs-7">
          <li v-for="(item, index) in data.orderInfo.product" :key="index">
            {{ item }}
          </li>
        </ul>
        <h4 class="text-danger">USD ${{data.base_price}}</h4>
        <p>
          <a href="#" class="btn btn-danger">{{ globalName.buy }} </a>
        </p>
      </div>
    </div>
    <div class="row justify-content-center">
      <h4 class="col-12 text-center mb-4">More Choices</h4>
      <template v-for="(item,index) in data.subscriptions">
        <div :key="index" class="col-lg-3 col-md-6 mb-3">
          <div class="contact-info-box h-100">
            <h3>$ {{item.recurring_price.USD}} </h3>
            <h4>
              {{subscriptionTitle(item.billing_type,item.billing_period)}}
            </h4>
            <ul class="text-left">
              <li v-for="(string,stringIndex) in data.orderInfo.subscription.orderDesc" :key="stringIndex">
                {{periodHandle(item.billing_type,item.billing_period,string)}}
              </li>
            </ul>
            <div><a href="#" class="btn btn-outline-secondary">subscription</a></div>
          </div>
          
        </div>
      </template>
    </div>
  </Section-default>
</template>
 
<script lang="ts">
import {
  defineComponent,
  ref,
  useStore,
  computed,
} from "@nuxtjs/composition-api";
import { State } from "@/script/interface";
export default defineComponent({
  props: { data: Object },
  setup(props) {
    const { state }: { state: State } = useStore(),
      { globalName } = state.localData.defaultData,
    subscriptionTitle =(type:string,period:number)=>{      
      if (type == 'year') {
        let outData = ''
        switch (period) {
          case 70:
            outData = props.data?.orderInfo.subscription.unlimitedTitle
            break;        
          default:
            outData = props.data?.orderInfo.subscription.planNames.yearly
            break;
        }        
        return outData
      } else if (type == 'month') {
        let outData = '';
        switch (period) {
          case 1:            
            outData = props.data?.orderInfo.subscription.planNames['monthly']
            break;
          case 3:
            outData = props.data?.orderInfo.subscription.planNames['3months']
            break;     
          case 6:
            outData = props.data?.orderInfo.subscription.planNames['6months']
            break;     
                           
          default:
            break;
        }
        return outData
      }
    },
    periodHandle=(type:string,period:number,str:string)=>{
      period>1?type=type+'s':''
      
      let periodStr:string = period+' '+type
      str = str.replace('{period}',period != 70 ?periodStr:props.data?.orderInfo.subscription.planNames['unlimite'])
      return str
    }
    return { globalName,subscriptionTitle,periodHandle };
  },
});
</script>