<template>
<div>
    <item-overview
      v-if="overviewData && itemDC"
      :data="overviewData"
      :itemInfo="itemDC"
    />
    <iconBlock :iconData="mddata.downloadList" />
    <iconBlock :iconData="mddata.antivirusReport" />
    <iconBlock :iconData="mddata.getFreeDC" />
</div>
</template>
<script>
import { mapState } from "vuex";
import { fetchItem } from "@/assets/script/tools";
export default {
async asyncData({app,$content}){
let  mddata = await $content('pages/download').fetch();
 mddata = await app.$initMD(mddata);
 return {mddata}
},
layout: "primary",
head() {   
 return this.mddata.head
},
  data() {
    return {
      overviewData: null,
    };
  },
  computed: {
    ...mapState({
      softwareInfo: (state) => state.i18n.messages.softwareInfo,
      items: (state) => state.localData.productData,
    }),
    itemDC() {
      let item = null;
      if (this.items && this.items.length > 0) {
        item = fetchItem("DVD-Cloner", this.items);
        item.boxSrc = item.boxes[1].imageUrl || item.boxes[0].imageUrl;
        delete item.desc;
      }
      return item;
    },
  },
  beforeMount() {
    if (this.softwareInfo.items)
      this.mddata.downloadList.items = this.softwareInfo.items.filter(
        (res) =>  (res.downloadUrl_64bit || res.downloadUrl)
      );
    this.mddata.downloadList.items = this.mddata.downloadList.items.filter(
      (res) => res.handleName.toLowerCase() != "DVD-Cloner".toLowerCase()
    );

  },  
    methods: {
    async adjusted() {
      this.overviewData = await this.$content("pages/dvd-cloner/index").fetch();
      this.overviewData = this.overviewData.areaTop;
      Object.assign(this.overviewData, this.mddata.areaTop);

      delete this.overviewData.bgStyle;
    },
  },
  watch: {
    items(val) {
      if (val) {
        this.adjusted();
      }
    },
  },
mounted() {
  this.adjusted();
}
};
</script>