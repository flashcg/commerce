<template>
  <div
    :id="slugify(iconData.name||'')"
    :class="`section position-relative  py-lg-${handlePaddingY} py-${
      handlePaddingY - 2} ${iconData.sectionClass || ''} section-${slugify(iconData.name)}`"
  >
    <div
      :class="`section-body ${iconData.bodyZindex?'zIndex':''} ${textColor(iconData.bgstyle)||''} ${iconData.additionClass||''} ${iconData.container||''}`"
    >
      <div
        v-if="iconData.title || !iconData.title == null"
        class="section-title"
      >
        <template  v-if="iconData.bar !== false">
        <h2>{{ iconData.title }}</h2>
        <div class="bar"></div>
        </template>
        <template v-else>
          <h2 class="mb-3">{{ iconData.title }}</h2>
        </template>
      <p
        v-if="iconData.textTop"
        class="lead mb-4 whiteSpace-preline"
        v-html="iconData.textTop"
      ></p>        
      </div>

      <slot :iconData="iconData"></slot>
    </div>
    <div
      v-if="iconData.bgStyle"
      :class="backgroundClass"
      :style="backgroundStyle"
    ></div>

      <!--背景-->
      <div v-if="iconData.bgStyle&&iconData.bgStyle.overlay" :class="bgStyle(iconData.bgStyle.overlay)+' position-absolute fill-position'"></div>
  </div>
</template>

<script lang="ts">
import { slugify } from "@/script/common";
import {
  defineComponent,
  ref,
  PropType,
  useStore,
  computed,
} from "@nuxtjs/composition-api";
import { State } from "@/script/interface";

export default defineComponent({
  props: { iconData: { type: Object, required: true ,default(){
    return {container:'container',sectionClass:'bg-white'}
  }} },
  setup(props: { iconData: any; }) {
    const { state } = useStore<State>(),
      iconData = props.iconData,
      defaultData = computed(() => state.localData.defaultData),
      handlePaddingY = computed(() => {
        if (iconData.paddingY || typeof iconData.paddingY == "number") {
          return iconData.paddingY;
        } else {
          return 8;
        }
      }),
      bgStyle=(data:{opacity:string,variant:string,mobileVariant:string})=> {
      if (data.opacity) {
        return "bg-" + data.variant;
      } else if (data.mobileVariant) {
        return "bg-md-" + data.mobileVariant + "-transparent";
      } else {
        return "bg-" + data.variant + "-transparent";
      }
    },
      textColor = (bgStyle: string) => {
        if (bgStyle == "dark") {
          return "text-light";
        }
      },
      bgPosition = (data: string) => {
        if (data == "half") {
          return "fill-md-half-position";
        } else {
          return "fill-position";
        }
      },
      backgroundStyle = computed(() => {
        if (iconData.bgStyle && typeof iconData.bgStyle == "object") {
          return {
            backgroundImage: "url(" + iconData.bgStyle.imageUrl + ")",
            backgroundSize: iconData.bgStyle.size||'cover',
            backgroundAttachment: iconData.bgStyle.attachment,
            backgroundPositionY: iconData.bgStyle.positionY,
            backgroundPositionX: iconData.bgStyle.positionX||'center',
            opacity: iconData.bgStyle.opacity,
            backgroundRepeat: 'no-repeat'
          };
        }
      }),
      backgroundClass = computed(() => {
        if (typeof iconData.bgStyle == "string") {
          return (
            "bg-" +
            iconData.bgStyle +
            " position-absolute " +
            bgPosition(iconData.bgPosition)
          );
        } else if (iconData.bgStyle && typeof iconData.bgStyle == "object") {
          return (
            "bg-" +
            iconData.bgStyle.default +
            " position-absolute " +
            bgPosition(iconData.bgPosition)
          );
        }
      });

    return {
      defaultData,
      slugify,bgStyle,
      handlePaddingY,
      textColor,
      backgroundStyle,
      backgroundClass,
    };
  },
});
</script>