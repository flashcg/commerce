<template>
  <div v-if="data&&data.items" :id="$handlify(data.name)" :class="`container-fluid swpier-normal  ${data.additionClass?data.additionClass:''} py-lg-8 py-6 text-center`">
      <template v-if="data.title">
      <h2>{{data.title}} </h2>
      <hr class="divider">
      </template>
    <div class="swiper-container" v-swiper:swiperGallery="swiperOption">
      <!-- Additional required wrapper -->
      <div class="swiper-wrapper">
        <!-- Slides -->
        <client-only>
        <template v-for="(item,itemIndex) in  data.items">
        <div class="swiper-slide"  :key="itemIndex" >
            <div :class="data.itemContainer">
                <p v-if="data.imageLink == 'self'"><b-link @click="lightBoxIndex = itemIndex"><b-img :src="item.imageUrl" fluid></b-img></b-link> </p>              
                <p v-else-if="item.html" v-html="item.html"></p>
                <p v-else-if="item.text">{{item.text}} </p>

                <p v-else-if="item.imageUrl"><b-img :src="item.imageUrl" fluid></b-img> </p>
            </div>
        </div>
      </template>       
      </client-only>
      
      </div>
      <!-- If we need pagination -->
      <div class="swiper-pagination" slot="pagination"></div>

      <!-- If we need navigation buttons -->
      <div class="swiper-button-prev" slot="button-prev"></div>
      <div class="swiper-button-next" slot="button-next"></div>
    </div>

      <b-button v-if="data.button" size="xl" :href="data.button.href" :to="data.button.path+'/'" :class="'rounded-0 mt-3 '+data.button.additionClass" :variant="data.button.variant">{{data.button.text}}</b-button>
        <CoolLightBox v-if="data.imageLink == 'self'"
          :items="images" 
          :index="lightBoxIndex"
          @close="lightBoxIndex = null">
        </CoolLightBox>     
  </div>
</template>
 
<script >
import CoolLightBox from 'vue-cool-lightbox'
import 'vue-cool-lightbox/dist/vue-cool-lightbox.min.css'
export default {
  data() {
    return {
      lightBoxIndex:null,
      swiperOption: {
        autoplay: {
          delay:5000
        },
        pagination: {
          el: ".swiper-pagination",
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      },
    };
  },
  components: { CoolLightBox},
  props: {data:{type:Object,require:true}},
  computed:{
    images(){
      return this.data.items.map(res=> res.imageUrl || res.iconUrl)
    }
  },
  methods: {},
};
</script>