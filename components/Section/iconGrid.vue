<template>
      <Section-default :iconData="iconData">
      
        <div v-if="iconData" :class="`row justify-content-center ${iconData.rowClass}`">
        <div :class="`col-lg-${12/(iconData.iconGird||(iconData.icon||iconData.list||iconData.items).length)} col-md-${12/(iconData.iconGird||(iconData.icon||iconData.list||iconData.items).length)*2} col-${(iconData.iconGirdMObile?12/iconData.iconGirdMObile:'')||((iconData.iconGird||(iconData.icon||iconData.list||iconData.items).length)>2?6:'')} mb-4 mb-lg-0 ${iconData.iconGirdClass} ${item.additionClass}`" v-for="(item,index) in (iconData.icon||iconData.list||iconData.items)" :key="index">
          
          <slot :item="item" :index="index">
          <div :class="`position-relative  mb-4 mx-auto w-${iconData.iconWidth}`">          

            
            <b-link v-if="item.href" :to="item.url">
              <img :title="item.title" :src="item.iconUrl" fluid :class="iconData.iconClass"/>
              <div v-if="item.type=='overlay'" :class="'bg-'+item.overlayStyle+'-transparent d-flex p-4 position-absolute text-white fill-position'">
                <span class="m-auto lead">{{item.text}}</span><span class="m-auto"><svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="chevron-right" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" class="align-middle svg-inline--fa fa-chevron-right fa-w-10 fa-2x"><path fill="currentColor" d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z" class=""></path></svg></span>
              </div>
            </b-link>

            <b-link v-else-if="item.path" :to="{path:item.path+'/',hash:item.hash}">
              <img :title="item.title" :src="item.iconUrl" fluid :class="iconData.iconClass"/>
              <div v-if="item.type=='overlay'" :class="'bg-'+item.overlayStyle+'-transparent d-flex p-4 position-absolute text-white fill-position'">
                <span class="m-auto lead">{{item.text}}</span><span class="m-auto"><svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="chevron-right" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" class="align-middle svg-inline--fa fa-chevron-right fa-w-10 fa-2x"><path fill="currentColor" d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z" class=""></path></svg></span>
              </div>
            </b-link>            

            <b-link v-else-if="item.kbUrl" :href="item.kbUrl">
              <img :title="item.title" :src="item.iconUrl" fluid :class="' '+iconData.iconClass"/>
              <div v-if="item.type=='overlay'" :class="'bg-'+item.overlayStyle+'-transparent d-flex p-4 position-absolute text-white fill-position'">
                <span class="m-auto lead">{{item.text}}</span><span class="m-auto"><svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="chevron-right" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" class="align-middle svg-inline--fa fa-chevron-right fa-w-10 fa-2x"><path fill="currentColor" d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z" class=""></path></svg></span>
              </div>              
            </b-link> 

            <b-link v-else-if="iconData.iconLink == 'self'" @click="lightBoxIndex = index" >
              <img :title="item.title" :src="item.iconUrl" fluid :class="' '+iconData.iconClass"/>         
            </b-link>  
                      
           <img v-else :title="item.title" :src="item.iconUrl" fluid :class="'mb-4 '+iconData.iconClass"  />
            
        </div>
        <h4 v-if="item.title">{{item.title}}</h4> 
           <h6 v-if="item.subTitle">{{item.subTitle}}</h6>

          <p v-if="item.text&&!item.type" class="lead" v-html="item.text"></p> 
          <p v-else-if="item.youtubeID" class="fs-5"><get-youtube :id="item.youtubeID" /> </p>
        </slot>
        </div>
        <template v-if="iconData.appendage">
        <slot  name="appendage" :appendage="iconData.appendage"></slot>
        </template>
        
        </div> 
         <p v-if="iconData.textBottom" class="lead mt-6">{{iconData.textBottom}}</p> 

        <b-link v-if="iconData.button"  :to="iconData.button.path+'/'" :class="`btn mt-3 btn-${iconData.button.variant}`">{{iconData.button.text}}</b-link>
        
      </Section-default>

</template>
 
<script>
import { slugify } from "@/script/common";


export default {
  data() {
    return { 
      isShowVideo:false,
      lightBoxToggler: false,
      lightBoxIndex:null,
      videoUrl:'',
      pushData: { title: "video", id: 0 } 
      };
  },
  props: ["iconData"],

  computed:{  


    /**
     * for template 'card'
     */
      groups(){
    let index =0;
    let count = this.iconData.iconGird||3;
    let arrTemp = [];
    let array = this.iconData.items;
    console.log(array);
    for(let i=0;i<array.length;i++){
      index = parseInt(i/count);
      if (arrTemp.length <= index) {
          arrTemp.push([]);
      }
      arrTemp[index].push(array[i])
    }
    return arrTemp
  }
        
  },
  methods: {

    slugify(string){
      return slugify(string)
    },    
    showVideo(url){
      this.isShowVideo = true;
      this.videoUrl = url;
    },      


    push({ id, title }) {
      this.pushData = { id, title };
      console.log(this.pushData);
    },

  },
  mounted() {
  }
};
</script>