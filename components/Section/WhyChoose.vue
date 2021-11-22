<template>
  <Section-default :iconData="data">
    <div class="row align-items-start">
        <div v-if="data.mainImage" class="position-relative col-lg-6 text-center">
            <img :src="data.mainImage.imageUrl" class="d-lg-inline-block d-none" style="max-height:480px" />
            <template v-if="data.widget&&data.widget.images">
              <img v-for="(item,index) in data.widget.images" :key="index" 
                  :src="item.imageUrl" :class="`wow ${item.wow.fade} position-absolute`" :style="`width:80px;right: 50px;${item.style||''}`"              />
            </template>
            <div>
            <b-link
      v-if="data.button"
      :to="data.button.path"
      class="btn btn-primary btn-xl mt-3"
      >{{ data.button.text }}</b-link><br />  
      <small v-if="data.button.note" class="d-inline-block mt-2"> {{data.button.note}}</small>
      </div>  
        </div>
        <div class="col-lg-6">
          <div v-if="data.items" class="row">
            <div v-for="(item,index) in data.items" :key="index" class="col-6 p-4">
              <div class="contact-info-box" style="height:100%">
                <img :src="item.imageUrl" style="max-width:80px;" />
                <h3>{{item.title}}</h3>
                <p>{{item.text}} </p>
                </div>              
            </div>
          </div>
        </div>
    </div>
  </Section-default>
</template>
 
<script>

export default {
  props: ["data"],
  mounted(){
    // const WOW = require ("wow.js/dist/wow.min.js");
    // new WOW().init();
  }
};
</script>