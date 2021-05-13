<template>
  <div :class="`col-xl-${12/data.iconGird} col-lg-${12/data.iconGird+1} col-md-${12/data.iconGird+3}`" v-if="item && item.saleInfo && item.listActive !== false" style="margin-bottom:30px"> 
    <div class="shadow-box" v-if="data.type=='upgrade' && item.saleInfo.upgradeUrl">
      
    <b-card-header class="bg-transparent border-0">
      <b-card-title>{{ item.handleName }} </b-card-title>
    </b-card-header>
    <b-card-body>
      <p>
        <b-link :to="`${item.saleInfo.upgradeUrl}/`">
          <b-img-lazy style="max-height:320px" :src="              
              item.boxes[0].imageUrl" fluid
          ></b-img-lazy
        ></b-link>
      </p>
      </b-card-body>
      <b-card-footer class="bg-transparent  border-0">
        <b-button
          :to="`${item.saleInfo.upgradeUrl}/`"
          variant="primary"
          size="xl"
        >
          {{ $t("globalName.upgrade") }}
        </b-button>
      </b-card-footer>
    </div>

    <div class="shadow-box" v-else-if="data.type=='order' && item.saleInfo.standard">
      <b-card-body class="pb-0">
        <p class="position-relative">
          <b-link :to="`/${item.handle.path}/`">
            <b-img style="max-height:220px" :src="               
                item.boxes[0].imageUrl" fluid
            ></b-img>       
            </b-link>
              <b-img v-if="!standard" class="lifetime-icon" style="width:200px" fluid src="~static/images/vip_lifetime.png" />             
        </p>
        <b-card-title>{{ item.name }} </b-card-title>
          <template v-if="item.saleInfo.lifetime">
            <div class="mb-2">
            <span class="d-inline-block muted mb-2">{{standard?
              $t("globalName.standard")+' '+$t("globalName.license")
              :$t("globalName.lifetime")+' '+$t("globalName.license")}} </span><br />
            <b-button-group size="md" >
              <b-button squared variant="outline-dark" :pressed="standard" @click="standard=true">{{$t("globalName.standard")}} </b-button>
              <b-button squared variant="outline-dark" :pressed="!standard" @click="standard=false">{{$t("globalName.lifetime")}}</b-button>
            </b-button-group>
            </div>          
          </template>

          <p class="fs-3 text-danger" v-if="item.saleInfo.standard">{{standard?$t('softwareInfo.currency')+item.saleInfo.standard.price:$t('softwareInfo.currency')+item.saleInfo.lifetime.price}}<br /><b-link v-if="!standard" to="/special-offer/" class="fs-6 text-red-light">{{$t('globalName.get50off')}} </b-link>          
          </p>

        </b-card-body>
        <b-card-footer class="bg-transparent pt-0 border-0">
          <b-button
            :href="standard?item.saleInfo.standard.buyLink:item.saleInfo.lifetime.buyLink"
            variant="danger"
            size="xl"
          >
            {{ $t("globalName.buy") }}
          </b-button>
        </b-card-footer>      
    </div>
  
    <div class="shadow-box" v-else-if="data.type=='download' && (item.saleInfo.downloadUrl||item.saleInfo.downloadUrl_64bit) && item.active !== false">

      <b-card-body class="pb-0">
        <b-card-title>{{ item.name }} </b-card-title>
        <p class="position-relative">
          <b-link :to="`/${item.handle.path}/`">
            <b-img style="max-width:35%" :src="                 
                item.logo&&item.logo.iconUrl" fluid
            ></b-img>       
            </b-link>         
        </p>
     
           <h6 v-if="item.currentVer">Version: <span class="font-weight-light">{{`${item.currentVer}`}}</span>  </h6>
          <h6 v-if="item.currentSize">Size: <span class="font-weight-light">{{item.currentSize}}MB</span></h6> 
          <p class="font-weight-light">{{item.desc&&item.desc.shortText}} </p>
        </b-card-body>
        <b-card-footer class="bg-transparent pt-0 border-0">
          <b-button v-if="item.saleInfo.downloadUrl"
            :href="item.saleInfo.downloadUrl" class="mb-2"
            variant="success" squared
            size="lg"
          >
            {{ $t("globalName.download") }}
          </b-button>
          <b-button v-if="item.saleInfo.downloadUrl_64bit"
            :href="item.saleInfo.downloadUrl_64bit"
            variant="success" squared
            size="lg"
          >
            {{ $t("globalName.download")+' 64Bit' }}
          </b-button>          
        </b-card-footer>      
    </div>

    <div class="shadow-box" v-else-if="data.type=='release' && (item.release && item.active !== false)">

      <b-card-body class="pb-0">
        <b-row>
        <div class="col-md-4 d-none d-md-block">
          <b-link :to="`/${item.handle.path}/`">
            <b-img :src="                
                item.boxes[0].imageUrl" fluid
            ></b-img>       
            </b-link>         
        </div>
        <div  class="col-md-8 text-left">
           <h6 v-if="item.currentVer">{{`${item.name} V${item.release.version}`}} </h6>
           <p class="text-muted font-weight-light font-italic">{{item.release.date}} </p>
           <ul>
            <li v-for="(text,textIndex) in item.release.list" :key="textIndex" v-html="text"></li>
           </ul>
        </div>
        </b-row>
        </b-card-body>
    </div>    

  </div>
</template>
 
<script lang="ts">
import {
  defineComponent,
  useStore,
  ref,
  PropType,
  computed,
  watch,
} from "@nuxtjs/composition-api";
import { fetchItem } from "@/assets/script/tools";
import { ProductDataConfig } from "@/assets/script/interfaceSet";
interface DataConfig {
  handleName: string;
  iconGird:string;
  type: string;
  reWriteitem:{active:boolean,[propName:string]:any}[]
}
export default defineComponent({
  name: "card",
  props: { data: { type: Object as PropType<DataConfig>, required: true } },
  setup(props) {
    const { state } = useStore() as any,standard = ref(true),
      products = computed(
        (res) => state.localData.productData as ProductDataConfig[] | undefined
      ),
      item = ref<object>(),
      itemFn = (handleName: string) => {
        let items  = JSON.parse(JSON.stringify(products.value))        
        item.value = fetchItem(handleName, items);
        if(props.data.reWriteitem&&item.value)Object.assign(item.value,props.data.reWriteitem)
       
      };
    itemFn(props.data.handleName||props.data.handleName);
    watch(products, () => itemFn(props.data.handleName));
    return { item,standard };
  },
});
</script>