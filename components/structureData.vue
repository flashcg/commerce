<template>
<div>
    <script v-html="jsonld(model)" type="application/ld+json"></script>     
</div>
</template> 
<script>
import { mapState } from "vuex";
export default {
  name: "structure-data",
  data() {
    return {
    };
  },
  computed: {
    ...mapState({
      products: (state) => state.shopifyData.productsMerged,
    }),
  },
  props: ["model"],  
  methods: {
    jsonld(model) {     
      
      let product = this.products.find(res=>model.toLowerCase()==res.productModel.toLowerCase()) 
      
      if (product) {
          return {
            "@context": "https://schema.org/",
            "@type": "Product",
            sku: 'shopify_US_'+product.product_id+'_'+product.variants[0].id,
            image: product.images[0].src,
            name: product.title,
            brand: {
            "@type": "Thing",
            name: "ClonerAlliance",
            },
            offers: {
            "@type": "Offer",
            itemCondition: "new",
            availability: product.available?'InStock':'SoldOut',
            price: product.variants[0].price,
            priceCurrency: "USD",
            },
        }      
      }

    },
    
  },
  
  mounted() {

  }
};
</script>