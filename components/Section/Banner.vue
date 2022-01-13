<template>
  <Section-default :iconData="data">
    <b-link
      v-if="data.button"
      :to="data.button.path"
      :class="`btn btn-lg btn-${data.button.variant||'secondary'}`"
      >{{ data.button.text }}</b-link>
  </Section-default>
</template>

 
<script>
export default {
  props: ["data"],
};
</script>