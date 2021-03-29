<template>
  <div
    v-if="showData"
    id="main-nav"
    class="container-fluid clearfix text-light bg-dark-opacity-9"
  >
    <ul
      id="touchEl"
      class="text-nowrap text-capitalize fs-6"
      :style="'transform: translateX(' + -translateX + 'px)'"
    >
       <template v-for="(item, itemIndex) in showData">
        <li :key="itemIndex">
          
          <a class="text-light" v-smooth-scroll :class="{active:item.active}" :href="'#' + toLower(item.name, '-')">{{
            item.name
          }}</a>
        </li>
      </template>
    </ul>
  </div>
</template>
 
<script lang="ts">
import {
  defineComponent,reactive,
  ref,computed,useStore,
  onMounted,
  PropType,
  ComputedRef,
  watch
} from "@nuxtjs/composition-api";
import { toLower } from "@/assets/script/tools";
import { ProductDataConfig } from "@/assets/script/interfaceSet";
interface DataAny{
  active?:boolean
  [prop: string]: any
}
interface ShowItem{
  name:string
  active:boolean
}
interface DataConfig {
  handleName:string;
  screenshot?: DataAny;
  WhyChoose?: DataAny;
  youtubeArea?: DataAny;
  body: DataAny;
  systemRequirements?: DataAny;
}


export default defineComponent({
  name: "itemNav",
  props: { data: { type: Object as PropType<DataConfig>,required:true } },
  setup(props) {
    const data = props.data,translateX = ref(0),{state} = useStore() as any,
    productData =computed(()=>{
      let outData:ProductDataConfig = state.localData.productData.find((res:ProductDataConfig)=>res.handleName == props.data.handleName);
      return outData
    }),releaseTitle = computed(()=>state.i18n.messages.globalName.release as string);
    //初始化 nav list  
    let showData:Array<ShowItem> = reactive([]) 
    if (data.screenshot && data.screenshot.active) showData.push({name:data.screenshot.name,active:false})
    if(data.youtubeArea && data.youtubeArea.active) showData.push({name:data.youtubeArea.name,active:false})
    if(data.body.children.length > 0) showData.push({name:'Features',active:false})
    if(data.systemRequirements && data.systemRequirements.active) showData.push({name:data.systemRequirements.name,active:false})

    const releaseFn = ()=>{
      if(productData.value && productData.value.release) { 
        let ishasRelease = showData.find(res=>res.name == releaseTitle.value) 
        !ishasRelease&&showData.push({name:releaseTitle.value,active:false})
      }      
    }
    releaseFn();
    watch(productData,releaseFn)
    onMounted(() => {
      let touchEl = document.getElementById("touchEl") as HTMLElement,windowH= window.innerHeight,
        touchElWarp = touchEl.parentElement as HTMLElement;
      touchFn(touchEl, touchElWarp);

      const touchElInitX = touchElWarp.previousElementSibling?.clientHeight;
      /**
       * 初始化showData active
       */
      const initNav = ()=>{
        showData.map(res=>res.active = false)
      }
      // 滚动时判断是否吸顶和回到初始位置
      window.addEventListener("scroll", () => {
        if (touchElInitX && window.scrollY < touchElInitX) {
          touchElWarp.style.position = "relative";
        }
        if (touchElWarp.getBoundingClientRect().top < 0) {
          touchElWarp.style.position = "fixed";
        }
        for (let i = 0; i < showData.length; i++) {
          let showStatus = handleNav(showData[i],windowH);
          
          if (showStatus) {
            initNav()
            showData[i].active =  showStatus;            
          }
        }        
      });

    });
    return { showData, toLower, translateX,productData };

    /**
     * computed a touchMove distance,listening to event
     */
    function touchFn(el: HTMLElement, parentEl: HTMLElement) {
      let isActive = parentEl.offsetWidth <= el.offsetWidth,
        maxDistance = el.offsetWidth - parentEl.offsetWidth;

      let distance: number = 0,
        startX: number = 0,
        endX: number = 0,
        moveX: number = 0;

      if (isActive) {
        el.addEventListener("touchstart", (event) => {
          startX = event.changedTouches[0].clientX;
        });

        el.addEventListener("touchend", (event) => {
          endX = event.changedTouches[0].clientX;
          translateX.value += startX - endX;

          el.addEventListener("transitionend", (e) => {
            if (translateX.value < 0) {
              translateX.value = 0;
            } else if (translateX.value > maxDistance) {
              translateX.value = maxDistance;
            }
          });
        });
      }
    }
    /**
     * 在导航处标记 active
     */
    function handleNav(item:ShowItem,windowH:number) {  
      let elToTop = document.getElementById(toLower(item.name,'-') as string)?.getBoundingClientRect().top as number;
      
      if (elToTop<(windowH/4)) {
        return true
      } else {
        return false
      }
        
    }    
  }
});
</script>