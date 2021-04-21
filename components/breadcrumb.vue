
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
          currentArray.push({ text: string, to: rePath });
      

        })
       // this.breadcrumbData.push(currentArray);
        return this.breadcrumbData.concat(currentArray)
      }
    }
  },
  mounted() {

  }
};
</script>
