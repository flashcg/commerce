<template>
    <b-container v-if="productImages" fluid class="product-description py-lg-8 py-6 bg-gray-light text-center">
      <b-row align-v="center">
        <b-col sm="6">
          <swiperGallery :data="productImages"/>
        </b-col>
        <b-col sm="6">
         <p class="lead">{{description}}</p>
          
         <buynow v-if="productModel&&typeof(productModel)=='string'" :product="$productCatch(productModel)" />

        </b-col>
      </b-row>      
    </b-container>   
</template>
 
<script>
import swiperGallery from "@/components/widget/swiperGallery.vue";
export default {
  name: "productDesBlock",
  data() {
    return {};
  },
  components:{swiperGallery},
  props: ["productImages","description","productModel","button"],

  methods: {

  }
};
</script>