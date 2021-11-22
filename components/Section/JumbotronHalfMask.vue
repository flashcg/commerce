<template>
  <div v-if="data" :id="data.name" class="jumbotron-half position-relative" :class="{'reverse':data.reverse}">
    <div class="gradient d-none d-lg-block"></div>
    <div class="container-fluid">
      <div class="row align-items-center" :class="{'flex-row-reverse':data.reverse}">
        <div class="col-lg-7 col-md-12">
          <div class="newsletter-image">
            <img :src="data.imageUrl" fluid />
          </div>
        </div>

        <div class="gradient-md col-lg-5 col-md-12 p-4">
          <div class="jumbotron-content" :class="{'text-right':data.reverse}">
            <h3>{{ data.title }}</h3>
            <p v-html="data.text"></p>
            <p v-if="data.button">
              <b-link class="more_button" :to="data.button.path"
                >{{ data.button.text }}
              </b-link>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "JumbotronHalfMask",
  props: ["data"],
};
</script>