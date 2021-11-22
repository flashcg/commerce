<template>
  <Section-IconGrid :iconData="data">
    <template #default="{ item, index }">
        <div class="contact-info-box">
            <p v-if="item.imageUrl"><img :src="item.imageUrl" /></p>
        <h3 class="text-primary">{{item.title}} </h3>
        <p class="fs-7">{{item.text}} </p>
        </div>
    </template>
  </Section-IconGrid>
</template>

<script>
export default {

  props: ["data"],

  data() {
    return {};
  },
  methods: {

  },
  mounted() {
  
  },
};
</script>