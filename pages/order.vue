<template>
  <div>
    <b-overlay :show="!overviewData" rounded="sm">
    <item-overview
      v-if="overviewData && itemDC"
      :data="overviewData"
      :itemInfo="itemDC"
    />
    <iconBlock :iconData="mddata.orderList" />
    </b-overlay>
    <item-tab :data="mddata.bundles">
      <template v-slot="data">
        <b-tab :title="data.items[0].title" title-link-class="rounded-0">
          <div class="row">
          <template v-for="(item,index) in data.items[0].list">
          <widget-item-bundle :key="index" :data="item"></widget-item-bundle>
          </template>
          </div>
        </b-tab>
        <b-tab :title="data.items[1].title" title-link-class="rounded-0">
          <div class="row">
          <template v-for="(item,index) in data.items[1].list">
          <widget-item-bundle :key="index" :data="item"></widget-item-bundle>
          </template>
          </div>
        </b-tab>        
      </template>
    </item-tab>
    <item-bonus :data="mddata.bonus" />
  </div>
</template>
<script>
import { mapState } from "vuex";
import { fetchItem } from "@/assets/script/tools";
export default {
  async asyncData({ app, $content }) {
    let mddata = await $content("pages/order").fetch();
    mddata = await app.$initMD(mddata);
    return { mddata };
  },
  layout: "primary",
  head() {
    return this.mddata.head;
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
      this.mddata.orderList.items = this.softwareInfo.items.filter(
        (res) => res.standard
      );
    this.mddata.orderList.items = this.mddata.orderList.items.filter(
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
    let str =
      "{state:success,code:0215132114885318,email:,orderInfo:{id:1171516534-14885318520A,date:2007-11-10 13:21:00,codeVersion:5.0,expirationDate:2023-04-17,availableVersion:18.30,currentVersion:18.30}}";

    var reg = /([^\:\{\}\[\]\,]+)\:([^\:\,\{\}\[\]]*)/g;
    str = str.replace(reg, "'$1':'$2'");
    str = str.replace(/'/g, '"');
    str = str.replace(/""{"id"/g, '{"id"');
    console.log(str);
    let obj = {
      state: "success",
      code: "0215132114885318",
      email: "",
      orderInfo: {
        id: "1171516534-14885318520A",
        date: "2007-11-10 13:21:00",
        codeVersion: "5.0",
        expirationDate: "2023-04-17",
        availableVersion: "18.30",
        currentVersion: "18.30",
      },
    };
  },

};
</script>