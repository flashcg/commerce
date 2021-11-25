<template>
  <div v-if="data" :id="data.name" class="jumbotron-half position-relative" :class="{'reverse':data.reverse}">
    <div class="gradient d-none d-lg-block"></div>
    <div class="container-fluid">
      <div class="row align-items-center" :class="{'flex-row-reverse':data.reverse}">
        <div class="col-lg-7 col-md-12">
          <div class="newsletter-image">
            <b-img :src="data.imageUrl" fluid />
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
<style lang="scss" scoped>
$white-color: #ffffff;
$gradient-color3:linear-gradient(135deg, #43e794 0%, #23bdb8 100%);
$black-color: #0e314c;$transition: .5s;

@import "assets/css/custom.scss";

.jumbotron-half {
  .gradient {
    position: absolute;
    right: 0;
    width: 55%;
    height: 100%;
    bottom: 0;
    z-index: 1;
    clip-path: polygon(20% 0%, 100% 0, 100% 100%, 0% 100%);
    background: $gradient-color3;
  }  
  &.reverse{
    .gradient{
      right: auto;
      left: 0;
      clip-path: polygon(0% 0%, 80% 0, 100% 100%, 0% 100%);
    }
  }
}

  @include media-breakpoint-down(lg) { 
  .gradient-md{background: $gradient-color3;}
}
.jumbotron-content {
  position: relative;
  z-index: 2;
  color: $white-color;
  h3 {
    color: $white-color;
    margin-bottom: 0;
    line-height: 1.5;
    font: {
      size: 1.25rem;
      weight: 600;
    }
  }

  .more_button {
    height: 50px;
    border: none;
    display: inline-block;
    padding: 0 30px;
    line-height: 50px;
    background-color: $white-color;
    border-radius: 30px;
    transition: $transition;
    color: $black-color;
    font: {
      size: 1rem;
      weight: 600;
    }
    &:hover {
      background-color: $black-color;
      color: white;
    }
  }
}
</style>