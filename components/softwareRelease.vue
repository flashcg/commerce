<template>
    <div>
        <b-img class="mr-md-4" :src="releaseData.iconUrl"  :title="releaseData.title" style="width:80px" />
       <h3 class="d-md-inline font-size-md align-middle">{{releaseData.title}}</h3>
       
       <b-table class="mt-4" striped hover :items="releaseData.releaseList" :fields="fields">           
        <template v-slot:cell(description)="data">         
         <ol><li v-for="(list,listIndex) in data.value" :key="listIndex" v-html="list"></li></ol>
        </template>
        <template v-slot:cell(download)="data">   
          <p v-for="(list,listIndex) in data.value" :key="listIndex">
         <b-btn class="rounded-0" variant="success" :href="list.downloadUrl?list.downloadUrl:list.externalUrl">{{list.text?list.text:$t('globalName.download')}}</b-btn>
          </p>
        </template>
       </b-table>
    </div>
</template> 
<script>

export default {
  name: "softwareRelease",
  data() {
    return {
      fields: ['version', 'releaseDate','size', 'description','download']
    }
  },
  layout:'primary',
  props: ["releaseData"],
    
  methods: {
    textColor(data){
      if (data.bgStyle == "dark") {
        return "text-light"
      }
    }
  }
};
</script>