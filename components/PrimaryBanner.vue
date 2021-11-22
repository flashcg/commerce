<template>
  <!-- Start Main Banner -->
  <div v-if="data" class="main-banner pt-8" :style="{background: `transparent url(${data.bgStyle&&data.bgStyle.imageUrl}) right top/cover no-repeat`}">

        <div class="container">
          <div class="row h-100 justify-content-center align-items-center">
            <div class="col-lg-5">
              <div class="hero-content">
                <h1>{{ data.title }}</h1>
                <h4>{{ data.subtitle }}</h4>
                <p>{{ data.text }}</p>

                <a href="#" class="btn btn-success btn-xl">Get Started</a>
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
  </div>
  <!-- End Main Banner -->
</template>

<script>
export default {
  name: "MainBanner",
  props: ["data"],
};
</script>