<template>
<div class="py-6">
<client-only >
  <h3>{{mddata.from.title}} </h3>
  <p class="lead">{{mddata.from.text}}</p>
  <iframe id="zohoTicket" style="border:0;overflow: hidden;min-height:900px" width="100%"  src="/zohoTicket.html"></iframe>
  </client-only>
  </div>
</template>
<script> 
export default {
async asyncData({app,$content}){
let  mddata = await $content('pages/create-ticket').fetch();
 mddata = await app.$initMD(mddata);
 return {mddata}
},
head() {   
 return this.mddata.head
},
mounted(){
      function setIframeHeight(iframe) {
      if (iframe) {
        var iframeWin =
          iframe.contentWindow || iframe.contentDocument.parentWindow;
        if (iframeWin.document.body) {
          iframe.height =
            iframeWin.document.documentElement.scrollHeight+100 ||
            iframeWin.document.body.scrollHeight+100;
        }
      }
    }

    window.onload = function() {
      setIframeHeight(document.getElementById("zohoTicket"));
    };
}
};
</script>
