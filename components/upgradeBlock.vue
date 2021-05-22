<template>
  <b-container class="py-lg-8 py-6">
    <b-row class="justify-content-center">
      <b-col md="auto" class="text-center mb-3 mb-md-0">
        <div v-if="item" class="position-relative" style="font-size: 10rem">
          <b-icon
            style="right: 10px; bottom: 0"
            class="position-absolute"
            icon="arrow-up-circle-fill"
            variant="success"
          ></b-icon>
          <b-img :src="item.boxes[1].imageUrl" class="pr-md-7"></b-img>
        </div>
      </b-col>
      <b-col md="4">
        <h3>{{ data.title }}</h3>
        <p class="lead">{{ data.formItems.title }}</p>
        <b-form @submit="onSubmit">
          <b-form-group
            id="input-group-1"
            label="Registration Email:"
            label-for="input-1"
            description="We'll never share your email with anyone else."
          >
            <b-form-input
              spellcheck="false"
              id="input-1"
              v-model="form.email"
              type="email"
              placeholder="Enter email"
            ></b-form-input>
          </b-form-group>
          <span class="text-danger fs-4">Or</span>
          <b-form-group
            id="code"
            label="Registration code:"
            label-for="code-input"
          >
            <b-form-input
              id="code-input"
              spellcheck="false"
              name="code"
              v-model="form.code"
              placeholder="Enter Code"
            ></b-form-input>
            <b-form-invalid-feedback class="mt-3" :state="isValid">
              <div class="alert alert-danger">{{
                  invalidInfo
              }}</div>
            </b-form-invalid-feedback>
          </b-form-group>

          <b-button
            type="submit"
            variant="primary"
            size="lg"
            :disabled="isloading"
            ><b-spinner v-if="isloading" label="loading" ></b-spinner
            > {{ $t("globalName.upgrade") }}
          </b-button>
        </b-form>
      </b-col>
    </b-row>
  </b-container>
</template>
 
<script lang="ts">
import Vue from 'vue'
import {
  defineComponent,
  reactive,
  ref,
  useRoute,useRouter,
  computed,
  useStore,
  useContext,
  onMounted,
  PropType,
  ComputedRef,
  watch,
} from "@nuxtjs/composition-api";
import { fetchItem,stringToObj } from "@/assets/script/tools";
import { ProductDataConfig } from "@/assets/script/interfaceSet";

interface DataConfig {
  name: string;
  title: string;
  handleName: string;
  apiUrl:string;
  formItems: {
    title: string;
    code: boolean;
    email: boolean;
  };
}


export default defineComponent({
  name: "upgradeBlock",
  props: { data: { type: Object as PropType<DataConfig>, required: true } },
  setup(props) {      
    const data = props.data,
      route = useRoute(),router =useRouter(),
      store = useStore() as any,
      isValid = ref(true),invalidInfo=ref(''),
      isloading = ref(false),
      { $axios } = useContext() as any,
      form = reactive({ code: "", email: "" }),
      products = computed(
        () => store.state.localData.productData as ProductDataConfig[] | undefined
      ),formInfo = computed(
        () => store.state.i18n.messages.formInfo
      ),
      item = ref<ProductDataConfig>(),
      itemFn = (handleName = props.data.handleName) => {
        item.value = fetchItem(handleName, products.value);
      };
    itemFn();
    watch(products, () => itemFn()); 
   
    const queryCode = route.value.query.code as string,
      queryEmail = route.value.query.email as string;
    if (queryCode) form.code = queryCode;
    if (queryEmail) form.email = queryEmail;

    const onSubmit = (event: Event) => {
      let data:{[props:string]:string};
      event.preventDefault();
      if (!form.email && !form.code) {
        isValid.value = false;
        invalidInfo.value = formInfo.value.fillOut
      } else {
        isValid.value = true;
        isloading.value = true;
        $axios
          .get(props.data.apiUrl,{params: {code: form.code,email:form.email}
          })
          .then((res: any) => {
            isloading.value = false;  
            data = stringToObj(res.data);
            console.log(data);
            switch (data.state) {
              case 'wrong':
                isValid.value = false; 
                invalidInfo.value = data.text
                break;              
              case 'unfound':  
                isValid.value = false;              
                invalidInfo.value = data.text
                break;
              case 'refunded':
                isValid.value = false; 
                invalidInfo.value = data.text
                break  
              case 'success':
                data.handleName = props.data.handleName;
                store.commit('toUpgradeInfo',data) 
                router.push({ path: '/upgrade/upgradecode_'+item.value?.model.toLowerCase()+'/', query: {  }})                
                break                          
              default:
                isValid.value = false; 
                invalidInfo.value = data.toString()
                break;
            }
          })
          .catch((err: any) => {
            isloading.value = false;
            isValid.value = false;
            invalidInfo.value = err
          });
      }

      //alert(JSON.stringify(this.form));
    };
    return { form, onSubmit, item, isValid, isloading ,invalidInfo};
  },
});
</script>