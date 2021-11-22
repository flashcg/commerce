<template>
      <Section-default :iconData="iconData">
      
            <ul class="row list-details text-left">
                <li class="col-lg-6 lead mb-2" v-for="item in iconData.list" :key="item.title">
                    <b-link :to="item.path" >
                    {{item.title||item.text}} </b-link>
                </li>
            </ul>

        
      </Section-default>

</template>
 
<script>


export default {

  props: ["iconData"],

};
</script>