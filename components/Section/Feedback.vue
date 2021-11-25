<template>
  <Section-IconGrid :iconData="data">
    <template #default="{ item }">
      <div class="single-feedback-box">
        <div class="feedback-desc">
          <p>
            {{item.text}}
          </p>
        </div>

        <div class="client-info">
          <img :src="item.iconUrl"  />
          <h3>{{item.name}}</h3>
        </div>
      </div>
    </template>
  </Section-IconGrid>
</template>

<script lang="ts">
import {
  defineComponent,
} from "@nuxtjs/composition-api";

export default defineComponent({
  props: { data: Object },

});
</script>