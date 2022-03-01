<template>
  <Section-IconGrid :iconData="data">
    <template #default="{ item, index }">
      <div class="funfact text-center" ref="box">
        <h2 class="text-success ">
          <ICountUp
            :ref="'count' + index"
            class="count-up"
            :delay="-1"
            :endVal="item.value"
          />{{ data.numUnit && data.numUnit }} +
        </h2>
        <p class="lead">{{ item.name }}</p>
      </div>
    </template>
  </Section-IconGrid>
</template>

<script>
import ICountUp from "vue-countup-v2";
export default {
  name: "CountUP",
  props: ["data"],
  components: {
    ICountUp,
  },
  data() {
    return { screenHeight: 800,initDate:'2022-2-28' };
  },
  methods: {
    handleScroll() {
      const box = this.$refs.box;

      if (box) {
        const triggerVal = this.screenHeight / 3-box.getBoundingClientRect().top
        if (triggerVal <0 && triggerVal >-this.screenHeight) {
          for (const key in this.$refs) {
            if (Object.hasOwnProperty.call(this.$refs, key)) {
              const element = this.$refs[key];

              if (element.$el && element.$el.className == "count-up") {
                element.start();
              }
            }
          }
        }
      }
    },
  },
  mounted() {
    this.screenHeight = document.documentElement.clientHeight;
    this.handleScroll();
    window.addEventListener("scroll", this.handleScroll, true);
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll, true);
  },
};
</script>