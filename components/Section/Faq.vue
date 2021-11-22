<template>
  <Section-Default :iconData="data">
    <div class="faq-accordion">
      <!-- <VueFaqAccordion :items="data.items" /> -->
      <ul class="ul-style-none">
        <li v-for="(item, index) in data.items" :key="index" class="mb-2">
          <a class="d-block p-3 fs-7 border" v-b-toggle="`detail${index}`" style="cursor: pointer">
          <span class="text-success fs-5 mr-2"
            >+</span
          >{{ item.title }}
          </a>
          <b-collapse :id="`detail${index}`" class="border border-top-0">
            <div class="p-3"> 
            {{ item.value }}
            </div>
          </b-collapse>
        </li>
      </ul>
    </div>
  </Section-Default>
</template>

<script>

export default {
  props: { data: Object },

};
</script>
<style lang="scss" scoped>
.faq-accordion{
  a{
    &:hover{text-decoration: none; background: #ececec;}
  }
}
</style>