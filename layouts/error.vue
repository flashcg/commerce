<template>


  <div style="min-height:600px" class="text-center pt-8">
    <p><svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="info-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="align-middle svg-inline--fa fa-info-circle fa-w-16" style="font-size: 16rem; opacity: 0.3;"><path fill="currentColor" d="M256 8C119.043 8 8 119.083 8 256c0 136.997 111.043 248 248 248s248-111.003 248-248C504 119.083 392.957 8 256 8zm0 110c23.196 0 42 18.804 42 42s-18.804 42-42 42-42-18.804-42-42 18.804-42 42-42zm56 254c0 6.627-5.373 12-12 12h-88c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h12v-64h-12c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h64c6.627 0 12 5.373 12 12v100h12c6.627 0 12 5.373 12 12v24z" class=""></path></svg></p>
    
    <h2 v-if="error.statusCode === 404" class="my-3">{{$t('globalName.pageNotFound')}} </h2>
    <h4 v-else >{{error.message}}</h4>
        <b-btn size="xl" variant="outline-dark" :to="localePath('index')" class="rounded-0">
          <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="chevron-left" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" class="mr-3 svg-inline--fa fa-chevron-left fa-w-10"><path fill="currentColor" d="M34.52 239.03L228.87 44.69c9.37-9.37 24.57-9.37 33.94 0l22.67 22.67c9.36 9.36 9.37 24.52.04 33.9L131.49 256l154.02 154.75c9.34 9.38 9.32 24.54-.04 33.9l-22.67 22.67c-9.37 9.37-24.57 9.37-33.94 0L34.52 272.97c-9.37-9.37-9.37-24.57 0-33.94z" class=""></path></svg>{{$t('globalName.backHome')}}</b-btn>
    <b-btn size="xl" variant="primary" :to="localePath('store')+'/'" class="rounded-0">{{$t('cart.goToShopping')}}</b-btn>

    
  </div>  
    
</template>

<script>

export default {

  props:['error']

};
</script>