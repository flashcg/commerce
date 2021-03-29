<template>
<div :class="$toLower(productDetail.name,'-')+' py-lg-8 py-6 text-center '+textColor(productDetail)+' bg-'+productDetail.bgStyle.color">
    <b-container >        
        <b-row>
            <b-col md="6" class="d-none d-md-block">                
               <b-img-lazy fluid :src="productDetail.imageUrl" /> 
            </b-col>
        <b-col  md="6">
          <div v-swiper:swiperGallery="swiperOption">
              <div class="swiper-pagination product-detail"></div>
              <hr>
              <div class="swiper-wrapper">
                <div class="swiper-slide" v-for="(item, index) in productDetail.contents" :key="index">
                  <div v-if="item.template == 'table'">
                    <b-table blue-gray striped hover :items="tableData(item.datas)" :fields="tablefields" :class="textColor(productDetail)" ></b-table>  
                  </div>
                  <div else v-if="item.template == 'list'" class="text-left lead p-3">
                      <ol>
                        <li v-for="(part, index) in item.datas" :key="index">{{part}}</li>  
                      </ol>
                  </div>    
                </div>
              </div>
            </div>
        </b-col>
        </b-row>
    </b-container>  </div> 
</template>
 
<script>
export default {
  name: "productDetailsBlock",
  data() {
    var tablefields = [
      { key: "name", label: this.$t("productDesTable.name") },
      { key: "data", label: this.$t("productDesTable.data") }
    ];
    var controlName = this.productDetail.contents;
    return {
      tablefields,
      swiperOption: {
        pagination: {
          el: ".swiper-pagination",
          type:"bullets",
          clickable: true,
          renderBullet(index, className) {
            return `<span class="${className} fs-6 py-2 px-3 swiper-pagination-custom">${controlName[index].name}</span>`;
          }
        }
      }
    };
  },
  components: {},
  props: ["productDetail"],
  methods: {
    tableData(data) {        
      return Object.keys(data).map(key => ({
        name: key,
        data: data[key]
      }));
    },
    textColor(data){
      if (data.bgStyle.color == "dark"|| data.bgStyle.color == "blue-gray") {
        return "text-light"
      }
    },
  }
};
</script>