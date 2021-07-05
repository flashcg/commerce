<template>
<div style="max-width:600px" class="py-6">
<h3>Online Register</h3>
        <b-form action="https://www.dvd-cloner.com/cgi-bin/onlinereg_dc.cgi" id="form0" method="post" name="form0">
          <b-form-group
            label="Registration Code/Email:"
            label-for="code"
            description="Please input your correct registration code or registration email (The information can be found in your order confirmation Email)."
          >
            <b-form-input
              spellcheck="false"
              id="code"
              name="code"
            ></b-form-input>
          </b-form-group>

          <b-form-group  
            label="Machine ID:"
            label-for="id"
            description="Please input your Machine ID."

          >
            <b-form-input
              id="id"
              spellcheck="false"
              name="id"
            ></b-form-input>

          </b-form-group>
            <b-form-text class="mb-3">
              Make sure you have input the correct information and then click on "Register". We will make a key file for you and send it to you by EMAIL. Please follow the instructions in the EMAIL to register DVD-Cloner manually.
            </b-form-text>            
          <b-button
            type="submit"
            variant="primary"
            size="lg"
            >Register!
          </b-button>
        </b-form>
        <nuxt-content class="container my-4" :document="mddata" />

</div>
</template>
<script>
export default {
async asyncData({app,$content}){
let  mddata = await $content('pages/online_register').fetch();
 mddata = await app.$initMD(mddata);
 return {mddata}
},
head() {   
 return this.mddata.head
},
mounted(){

}
};
</script>