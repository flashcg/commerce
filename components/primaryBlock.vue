<template>
  <div v-if="data" :id="$handlify(data.name)" :class="`primary-block position-relative  ${paddingSet} ${data.additionClass} primaryBlock-${$toLower(data.name,'-')}`">
     
      <div :class="`primaryBlock-body position-relative zIndex ${textColor(data)} ${data.rowClass} ${data.container}`">  
        <div v-if="data.title || !data.title==null">
          <h2 v-html="data.title"></h2>
          <hr class="divider">
        </div>
        <p v-if="data.textTop" class="lead mb-4 whiteSpace-preline" v-html="data.textTop"></p>
     
        <div :class="`row justify-content-center ${data.rowClass}`">
            <b-col v-for="(item,index) in data.items" :key="index" :md="item.size" :class="item.additionClass">
                <slot :name="item.type">
                    <template v-if="item.type == 'icon'">
                        <b-img :src="item.iconUrl" fluid />
                    </template>
                    <template v-if="item.type == 'content'">
                        <p class="whiteSpace-preline" v-html="item.text"></p>
                    </template>                    
                </slot>
            </b-col>
        </div> 
         <p v-if="data.textBottom" class="lead mt-6">{{data.textBottom}}</p>     
        <b-button v-if="data.button" size="xl" :to="data.button.path?'/'+data.button.path+'/':''" :class="'rounded-0 mt-3 '+data.button.additionClass" :href="data.button.href?data.button.href:''" :variant="data.button.variant">{{data.button.text}}</b-button>
    
      </div>

      <div v-if="data.bgStyle " :class="backgroundClass" :style="backgroundStyle"></div>  
  </div>
</template>
 
<script>

import { fetchItem } from "@/assets/script/tools";
export default {
  name: "iconBlock",
  data() {
    return { 

      };
  },
  props: ["data"],

  computed:{
    
    paddingSet(){
      if(typeof(this.data.paddingY) == 'number'){
        return  `py-lg-${this.data.paddingY} py-${this.data.paddingY-2}`  
       } else if(typeof(this.data.paddingY) == 'string')  {   
           return this.data.paddingY
      } else  {
        return  `py-lg-8 py-6`  
      }
    },

    backgroundStyle(){      
    if (this.data.bgStyle&&typeof(this.data.bgStyle)=='object') {        
        return {
          backgroundImage:'url('+this.data.bgStyle.imageUrl+')',
          backgroundSize: 'cover',
          backgroundAttachment: this.data.bgStyle.attachment,
          backgroundPositionY: this.data.bgStyle.positionY,
          backgroundPositionX: this.data.bgStyle.positionX
        }        
      }
    },
    backgroundClass(){
      if (typeof(this.data.bgStyle)=='string') {
        return 'bg-'+this.data.bgStyle+' position-absolute '+this.bgPosition(this.data.bgPosition)
      } else if (this.data.bgStyle&&typeof(this.data.bgStyle)=='object') {
        return 'bg-'+this.data.bgStyle.default+' position-absolute '+this.bgPosition(this.data.bgPosition)
      }        
    },
        
  },
  methods: {
    
    textColor(data) {
      if (data.bgStyle == "dark") {
        return "text-light";
      }
    },
    bgPosition(data) {
      if (data == "half") {
        return "fill-md-half-position";
      } else {
        return "fill-position";
      }
    },


  },
  mounted() {

  }
};
</script>