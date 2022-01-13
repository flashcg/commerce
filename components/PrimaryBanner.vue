<template>
  <!-- Start Main Banner -->
  <div v-if="data" class="main-banner pt-8 pb-6 d-flex " >

        <div class="container" style="z-index:1">
          <div class="row h-100 justify-content-center align-items-center">
            <div class="col-lg-5">
              <div class="hero-content">
                <h1>{{ data.title }}</h1>
                <h4>{{ data.subtitle }}</h4>
                <p>{{ data.text }}</p>

                <p><a :href="data.button.path" class="btn btn-success btn-xl" v-if="data.button"><span v-if="data.button.prefixIcon"><svg aria-hidden="true" class="icon mr-2"><use :xlink:href="`#icon-${data.button.prefixIcon}`"></use></svg></span> {{data.button.text}} </a><br />
                <small v-if="data.button.note" class="d-inline-block mt-2"> {{data.button.note}}</small></p>
              </div>
            </div>

            <div class="col-lg-6 offset-lg-1 d-md-block d-none">
              <div class="banner-image single-banner-image">
                <img :src="data.mainImage.imageUrl" alt="main-pic" class="m-auto" />
              </div>
            </div>
          </div>
    </div>
    <!-- <template v-if="data.shapeLump">
    <div v-for="(item,index) in data.shapeLump" :key="index" :class="item.class"><img :src="item.imageUrl"  style="max-width:80px" /></div>
    </template> -->
          <div v-if="data.bgStyle&&data.bgStyle.imageUrl" :style="{background: `transparent url(${data.bgStyle.imageUrl}) right top/cover`,opacity:data.bgStyle.opacity||1}" class="position-absolute fill-position h-100 mt-7"></div>    
  </div>
  <!-- End Main Banner -->
</template>

<script>
export default {
  name: "MainBanner",
  props: ["data"],
};
</script>