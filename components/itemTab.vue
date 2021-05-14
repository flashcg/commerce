<template>
  <div
    v-if="data"
    :id="$handlify(data.name)"
    :class="'py-lg-8 py-6 ' + data.additionClass">
    <div
      v-if="data.title || !data.title == null"
      class="mb-4"
      :class="data.container"
    >
      <h2>{{ data.title }}</h2>
    </div>
    <b-tabs
      nav-class="border-gray"
      active-nav-item-class="border-gray font-weight-bold"
      content-class="mt-3"
      :class="data.container"
    ><slot :items="Array.isArray(data)?data:data.items">
      <b-tab
        :title="item.title"
        title-link-class="border-bottom-colorNone bg-transparent rounded-0"
        :active="itemIndex == 0"
        v-for="(item, itemIndex) in data.items"
        :key="itemIndex"
      > <b-row>
        <b-col :md="col.md||'auto'" :class="col.additionClass"         
          v-for="(col, colIndex) in item.cols"
          :key="colIndex"         
        >
        <template v-if="col.imageUrl&&col.path">
        <b-link :to="col.path"><b-img v-if="col.imageUrl" :src="col.imageUrl" fluid></b-img></b-link>
        </template>
        <template v-else-if="col.imageUrl">
          <b-img v-if="col.imageUrl" :src="col.imageUrl" fluid></b-img>
        </template>
        <div v-html="col.text"></div>
        </b-col>
        </b-row>
      </b-tab>
      </slot>
    </b-tabs>
  </div>
</template>
 
<script lang="ts">
import Vue from "vue";
interface DataSetting {
  name: string;
  title: string;
  items: [
    {
      title: string;
      cols: { text?: string; imageUrl?: string; additionClass?: string }[];
    }[]
  ];
  [propName: string]: any;
}

export default Vue.extend({
  name: "item-tab",
  data() {
    return {};
  },
  components: {},
  props: { data: { type: Object as () => DataSetting|undefined } },
  computed: {},
  methods: {},

  mounted() {
    let node = document.querySelector(
      "#" + (this as any).$handlify(this.data?.name)
    );

    //traversal current element parents are used for confirming bg color
    function findBgColor(el: Element | null) {
      if (el) {
        let bgColor = getComputedStyle(el).backgroundColor;

        if (bgColor == "rgba(0, 0, 0, 0)") {
          findBgColor(el.parentNode as Element);
        } else if (node) {
          nodeHandle(node.querySelector(".nav-tabs"), bgColor);
        }
      }
    }

    // nav handle code
    function nodeHandle(nav: Element | null, bgColor: string) {
      if (nav) {
        let MutationObserver = window.MutationObserver;

        let observer = new MutationObserver(function (mutations) {
          mutations.forEach(function (mutation) {
            let node = nav.querySelector(".active") as HTMLElement,
              nodeAll = nav.querySelectorAll(
                ".nav-link"
              ) as NodeListOf<HTMLElement>;
            //set border-bottom-color to rgba(0,0,0,0) without "active" element
            for (let i = 0; i < nodeAll.length; i++) {
              if (nodeAll[i].className.indexOf("active") == -1)
                nodeAll[i].style.setProperty(
                  "border-bottom-color",
                  "rgba(0,0,0,0)"
                );
            }
            if (node) {
              // set "active" element border-bottom-color
              node.style.setProperty(
                "border-bottom-color",
                bgColor,
                "important"
              );
            }
          });
        });
        node &&
          observer.observe(node, {
            attributes: true,
            childList: true,
            subtree: true,
          });
      }
    }

    findBgColor(node);
  },
});
</script>
<style scoped>
</style>