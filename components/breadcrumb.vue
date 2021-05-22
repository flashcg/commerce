
<template> 
  <div class="breadcrumb-wrap bg-dark-optcity-2">    
    <b-breadcrumb class="container justify-content-end mb-0" :items="breadcrumb(data)"></b-breadcrumb> 
  </div> 
       
</template>
 
<script>
export default {
  name: "breadcrumb",
  data() {
    return {
      breadcrumbData: [{ text: "Home", to: "/" }]
    };
  },
  props: ["data"],
  methods: {
    breadcrumb(path) {
      if (path) {
        let pathArray = path.split("/").filter(d => d);
        let rePath;
        let rePathArray = [];
        let currentArray = [];

        pathArray.map((res, index) => {
          rePathArray.push("/" + pathArray[index]+"/");
          rePath = rePathArray.join("");
          let string = this.$retoLower(res, "-")
          
          switch (string) {
            case 'dvd cloner':
              string = 'DVD-Cloner'
              break;  
                     
            case 'blue cloner':
              string = 'Blue-Cloner'
              break;     
            
          }
          string = string.replace('dvd','DVD')
          string = string.replace('uhd','UHD')
          string = string.replace('blu ray','Blu-ray')
          string = string.replace('upgradecode_dc','DVD-Cloner Upgrade')
          string = string.replace('upgradecode_mc','DVD-Cloner for Mac Upgrade')
          string = string.replace('upgradecode_oc2020apr_mask_edm_dcup','DVD-Cloner Upgrade')
          string = string.replace('upgradecode_edm_mcup','DVD-Cloner for Mac Upgrade')
          string = string.replace('upgradecode_edm_dcup','DVD-Cloner Upgrade')
          currentArray.push({ text: string, to: rePath });


        })
        if(this.$route.meta.title) currentArray[currentArray.length-1].text = this.$route.meta.title

        return this.breadcrumbData.concat(currentArray)
      }
    }
  },
  mounted() {
    
  }
};
</script>
