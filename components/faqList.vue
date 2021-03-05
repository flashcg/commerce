<template>
  <div v-if="listData" :class="'listBlock position-relative py-lg-8 py-6 listBlock-'+$toLower(listData.name,'-')+' bg-'+listData.bgStyle">  
      <div :class="'listBlock-body '+textColor(listData)+' '+listData.additionClass+' '+listData.container">  
        <div v-if="listData.title || !listData.title==null">
          <h2>{{listData.title}}</h2>
          <hr class="divider">
        </div>
        
        <ul class="font-size-sm text-left">
            <li v-for="(item,index) in listData.lists" :key="index" class="mb-2">
                <a :href="item.kbUrl" >{{item.title}}</a>
            </li>
        </ul>                     
        <b-button v-if="listData.button" size="xl" :href="listData.button.kbUrl" :class="'rounded-0 mt-3 '+listData.button.additionClass" :variant="listData.button.variant">{{listData.button.text}}</b-button>      
  </div></div>
</template> 
<script>

export default {
  name: "faqList",
  data() {
    return {};
  },
  props: ["listData"],

  methods: {
    textColor(data){
      if (data.bgStyle == "dark") {
        return "text-light"
      }
    }
  }
};
</script>