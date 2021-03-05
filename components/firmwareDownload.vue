<template>
    <div>
      <h3 class="mb-2" v-html="firmwareData.title"></h3>
      <p v-if="firmwareData.productModel" class="lead mb-4"><strong>{{$t('globalName.productModel')}} :</strong> <span>{{firmwareData.productModel}}</span></p>

      <div v-for="(list,listIndex) in firmwareData.lists" :key="listIndex" class="row">
        <h4 class="col-12" v-if="list.title">{{list.title}} </h4>  
        <div class="col-md-4">
          <b-img class="mr-md-4" :src="list.imageUrl" fluid  :title="firmwareData.title" />
        </div>
        <div class="col-md-8">          
          <p v-if="list.firmwareVersion" class="lead"><strong>{{$t('globalName.firmwareVersion')}} :</strong> <span>{{list.firmwareVersion}}</span></p>
          <p v-if="list.buildVersion" class="lead">            
            <a style="cursor: pointer" v-if="firmwareData.buildVersionHelp" @click="push(firmwareData.buildVersionHelp.imageUrl)" v-b-modal.modal-buildVersionHelp><strong>{{$t('globalName.buildVersion')}}
            <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="question-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="svg-inline--fa fa-question-circle fa-w-16"><path fill="currentColor" d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zM262.655 90c-54.497 0-89.255 22.957-116.549 63.758-3.536 5.286-2.353 12.415 2.715 16.258l34.699 26.31c5.205 3.947 12.621 3.008 16.665-2.122 17.864-22.658 30.113-35.797 57.303-35.797 20.429 0 45.698 13.148 45.698 32.958 0 14.976-12.363 22.667-32.534 33.976C247.128 238.528 216 254.941 216 296v4c0 6.627 5.373 12 12 12h56c6.627 0 12-5.373 12-12v-1.333c0-28.462 83.186-29.647 83.186-106.667 0-58.002-60.165-102-116.531-102zM256 338c-25.365 0-46 20.635-46 46 0 25.364 20.635 46 46 46s46-20.636 46-46c0-25.365-20.635-46-46-46z" class=""></path></svg> :</strong></a> 
            <a v-else><strong>{{$t('globalName.buildVersion')}}:</strong></a> 
            <span>{{list.buildVersion}}</span></p>
          <p v-if="list.size" class="lead"><strong>{{$t('globalName.size')}} :</strong> <span>{{list.size}}</span></p>
          <p v-if="list.releaseDate" class="lead"><strong>{{$t('globalName.releaseDate')}} :</strong> <span>{{list.releaseDate}}</span></p>
          <ol v-if="list.description">
            <li v-for="(description,descriptionIndex) in list.description" :key="descriptionIndex">{{description}} </li>
          </ol>
          <p class="bg-gray-light p-3"><strong class="text-danger">{{$t('globalName.warning')}} :</strong> <span v-html="$t('globalName.firmwareWarningText')"></span></p>
             
            <b-form-checkbox :ref="'checkbox'+listIndex" v-model="list.checkboxStatus" :id="'checkbox'+listIndex"><strong>{{$t('globalName.firmwareIAmSureText')}}</strong></b-form-checkbox>         
            <b-btn class="mt-4" :href="list.downloadUrl" :disabled="!list.checkboxStatus" variant="success" size="lg">{{$t('globalName.firmwareDownload')}}</b-btn>
        </div>
        <div class="col-12" v-if="firmwareData.lists.length-1 !== listIndex"><hr class="my-6"></div>      
      </div>
        <b-modal size="lg" id="modal-buildVersionHelp" hide-footer :title="$t('globalName.buildVersion')">
          <b-img :src="pushData" fluid />
        </b-modal>
    </div>
</template> 
<script>

export default {
  name: "firmwareDownload",
  data() {
    return {
      fields: ['version', 'size', 'description','download'],
      pushData:null
    }
  },
  layout:'primary',
  props: ["firmwareData"],
    
  methods: {
    textColor(data){
      if (data.bgStyle == "dark") {
        return "text-light"
      }
    },
    push(data){
      this.pushData = data
    }
  }
};
</script>