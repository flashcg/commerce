<template>
<footer class="text-white">
  <div class="bg-dark-opacity-7 py-5 ">
    <b-container><bottomMenu /></b-container>
  </div>
  <div class="bg-dark-opacity-8 py-5">
    <b-container>
        <b-row>
            <b-col sm="10">
              <ul class="nav-normal mb-4">
                <li v-for="(item,itemIndex) in $t('bottomItems')" :key="itemIndex">
                  <b-link :href="item.href" :to="item.path&&(item.path=='index'?'/':'/'+item.path+'/')" class="nav-link"> {{item.name}}</b-link>
                </li>
              </ul>
              <p class="nav-link">Follow Us : <a href="https://www.facebook.com/opencloner" class="text-light mx-4 align-middle"><svg aria-hidden="true" focusable="false" data-prefix="fab" data-icon="facebook" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="svg-inline--fa fa-facebook fa-w-16 fa-3x"><path fill="currentColor" d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z" class=""></path></svg></a><a href="https://twitter.com/opencloner" class="text-light align-middle"><svg aria-hidden="true" focusable="false" data-prefix="fab" data-icon="twitter" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="svg-inline--fa fa-twitter fa-w-16 fa-3x"><path fill="currentColor" d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z" class=""></path></svg></a>   </p>           
            </b-col>
        </b-row>
        <div class="text-right mt-4">
            <p><b-img src="/logo.png" style="max-width:260px" fluid  /></p>
            <p v-html="$t('copyright.textA')+' 2002-'+getYear()+' '+$t('copyright.textB')"></p>
            <!-- <p>{{$t("footerNotice")?$t("footerNotice"):''}} </p> -->
        </div>
    </b-container>
  </div>    
    <div id="backToTop" class="backtoTop text-center">
        <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="caret-up" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" class="svg-inline--fa fa-caret-up fa-w-10 fa-2x"><path fill="currentColor" d="M288.662 352H31.338c-17.818 0-26.741-21.543-14.142-34.142l128.662-128.662c7.81-7.81 20.474-7.81 28.284 0l128.662 128.662c12.6 12.599 3.676 34.142-14.142 34.142z" class=""></path></svg>
    </div>
</footer>
</template>

<script>
import bottomMenu from "@/components/bottomMenu.vue";
export default {
  name: "footer-block",
  data() {
    return { screenHeight: null };
  },
  components: { bottomMenu },
  props: ["className"],
  computed: {},
  methods:{
    getYear(){
      var date = new Date()
      return date.getFullYear()
      
    }
  },
  mounted() {
    // jquery
    $(window).scroll(function() {
      // change scroll event
      var height = $(window).height(), //get window height
        top = $(document).scrollTop(); //get scroll top
      if (top > height) {
        //more than height to show
        $("#backToTop").fadeIn(600);
      } else {
        //less than height to disappear
        $("#backToTop").fadeOut(600);
      }
    });

    /*jquery back to top click*/
    $("#backToTop").click(function() {
      $("html, body").animate(
        {
          // Animation effects --> move
          scrollTop: 0
        },
        500
      );
    });

    //zoho's live chat code
/*     if ($('.zls-sptwndw').length<=0) {
      var $zoho = $zoho || { livedesk: { values: {}, ready: function() {} } };
      var d = document;
      var s = d.createElement("script");
      s.type = "text/javascript";
      s.defer = true;
      s.src =
        "https://salesiq.zoho.com/support.clonerallianceinc/float.ls?embedname=chat";
      var t = d.getElementsByTagName("script")[0];

      t.parentNode.insertBefore(s, t);
    } */
  }
};
</script>