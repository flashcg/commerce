<template>
  <!-- Start Main Banner -->
  <div :class="`main-banner position-relative  ${data.sectionClass}`">

        <div class="container position-relative zIndex mt-6">
          <div class="row h-100 justify-content-center align-items-center">
            <div :class="data.mainImage?'col-lg-5':'col-lg-12'">
              <div class="hero-content">
                <h4 v-if="data.toptitle">{{ data.toptitle }}</h4>
                <h1 v-if="data.title" v-html="data.title"></h1>
                <h4 v-if="data.subtitle">{{ data.subtitle }}</h4>
                <p v-if="data.text">{{ data.text }}</p>
                <template v-if="data.button">
                <BaseLink :to="data.button.path" class="btn btn-success btn-xl"><span v-if="data.button.prefixIcon"><svg aria-hidden="true" class="icon mr-2"><use :xlink:href="`#icon-${data.button.prefixIcon}`"></use></svg></span>{{data.button.text}} </BaseLink><br />
                <small v-if="data.button.note">{{data.button.note}} </small>
                </template>
              </div>
            </div>

            <div v-if="data.mainImage" class="col-lg-6 offset-lg-1 d-md-block d-none">
              <div class="banner-image single-banner-image">
                <img :src="data.mainImage.imageUrl" alt="main-pic" class="m-auto" />
              </div>
            </div>
          </div>

    </div>
    <template v-if="data.shapeLump">
    <div v-for="(item,index) in data.shapeLump" :key="index" :class="item.class"><img :src="item.imageUrl"  style="max-width:80px" /></div>
    </template>
    <div
      v-if="data.bgStyle"
      :class="backgroundClass"
      :style="backgroundStyle"
    ></div>    
    <div v-if="data.bgStyle&&data.bgStyle.overlay" :class="'bg-dark-transparent position-absolute fill-position'"></div>    
  </div>
  <!-- End Main Banner -->
</template>

<script lang='ts'>
import {
  defineComponent,
  ref,
  PropType,
  useStore,
  computed,
} from "@nuxtjs/composition-api";

export default defineComponent({
  name: "MainBanner",
  props: { data: { type: Object, required: true } },
  setup(props){
    const data = props.data,
        backgroundStyle = computed(() => {
        if (data.bgStyle && typeof data.bgStyle == "object") {
          return {
            backgroundImage: "url(" + data.bgStyle.imageUrl + ")",
            backgroundSize: data.bgStyle.size||'cover',
            backgroundAttachment: data.bgStyle.attachment,
            backgroundPositionY: data.bgStyle.positionY,
            backgroundPositionX: data.bgStyle.positionX||'center',
            opacity: data.bgStyle.opacity,
            backgroundRepeat: 'no-repeat'
          };
        }
      }),
      backgroundClass = computed(() => {
        if (typeof data.bgStyle == "string") {
          return (
            "bg-" +
            data.bgStyle +
            " position-absolute " +
            bgPosition(data.bgPosition)
          );
        } else if (data.bgStyle && typeof data.bgStyle == "object") {
          return (
            "bg-" +
            data.bgStyle.default +
            " position-absolute " +
            bgPosition(data.bgPosition)
          );
        }
      }),
      bgPosition = (data: string) => {
        if (data == "half") {
          return "fill-md-half-position";
        } else {
          return "fill-position";
        }
      }
    return {backgroundStyle,backgroundClass}  
  }
})
</script>