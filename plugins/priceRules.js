import Vue from 'vue'
// import axios from 'axios'
export default ({ app, store }) => {

  function ruleDate(startDate,endDate) {
    let star = new Date(startDate),
    end = new Date(endDate),
    current = new Date();
    if (current<end&&current>star) {
      return true
    } else{
      return false
    }
  }
  Vue.prototype.$ruleDate=(code)=>{
    if(store.state.shopifyData&&store.state.shopifyData.price_rules){
      let rules = store.state.shopifyData.price_rules;
      let rule = rules.find(res=>res.title==code)
      if (rule) {
        return ruleDate(rule.starts_at,rule.ends_at)
      }
    }
  }  

  Vue.prototype.$discountRule = (data) => {
    // catch discount rule 
    if (data.discount && data.discount.code && store.state.shopifyData&&store.state.shopifyData.price_rules) {
     
     
      let rules = store.state.shopifyData.price_rules.map(res => {
        let rulesVariantId = res.entitled_variant_ids,rulesProductsId = res.entitled_product_ids;
        // variants ID have existed
        let ruleDateValid = ruleDate(res.starts_at,res.ends_at)
        if (data.discount.code == res.title && rulesVariantId.length > 0 &&ruleDateValid) {
          
          return rulesVariantId.map(resId => {
            if (data.variants[0].id == resId) {
              return {
                value_type: res.value_type,
                value: Math.abs(res.value),
               /*  amount: Math.abs(res.value), */
                title: data.discount.title,
                code: data.discount.code
              }
            }
          }).filter(d => d)[0]
          // products Id have existed  
        } else if (data.discount.code == res.title && rulesProductsId.length > 0&&ruleDateValid) {
          
          return rulesProductsId.map(resId => {
            if (data.product_id == resId) {
              
              return {
                value_type: res.value_type,
                value: Math.abs(res.value),
                /* amount: Math.abs(res.value), */
                title: data.discount.title,
                code: data.discount.code
              }
            }
          }).filter(d => d)[0]
/*         } else {
          console.error("Discound Code error,Go to 'Shopify' and Check current code: " + data.discount.code);                 
          return {} */
        } 
      }).filter(d => d)[0]
      return rules
    } else {
      return {}
    }
  }
  Vue.prototype.$getUrlParam  =(name)=> {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg); //匹配目标参数
    if (r != null) return unescape(r[2]);
    return null; //返回参数值
  }
  Vue.prototype.$productCatch  =(model)=> {
    let productsData = store.state.shopifyData.productsMerged
    let shopifyModel=(index)=> productsData[index].productModel||productsData[index].model
   // console.log(model,productsData);
    if (productsData) {
      for (let index = 0; index < productsData.length; index++) {
       // console.log(productsData[index]);
        if (
          model.toLowerCase() ==shopifyModel(index).toLowerCase()
        ) {
          return productsData[index];
        }
      }
    }
  }  

}
