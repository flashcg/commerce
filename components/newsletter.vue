<template>
<div id="newsletter" class="newsletter bg-blue-gray text-center text-white py-5">
    <b-container>
        <h2>{{$t("newsletter.title")}}</h2>
        <hr class="divider">
        <!-- <p v-if="$t('newsletter.textTop')" class="lead mb-4">{{$t('newsletter.textTop')}}</p> -->
        <!--Zoho Campaigns Web-Optin Form Starts Here-->

<div id="sfeb1f021918c962af166e835f2fee2161472676965757f09e" data-type="signupform" style="">
    <div id="customForm">
        <div class="quick_form_9_css" style="overflow: hidden;" name="SIGNUP_BODY">
                <form method="POST" id="zcampaignOptinForm" style="margin:0px;width:100%" action="https://maillist-manage.com/weboptin.zc" target="_zcSignup">
                    <div class="input-group w-50 px-lg-10 my-3 mx-auto">
                        <input type="text" class="form-control"  placeholder="Email" changeitem="SIGNUP_FORM_FIELD" name="CONTACT_EMAIL" id="EMBED_FORM_EMAIL_LABEL">
                        <button name="SIGNUP_SUBMIT_BUTTON" class="btn btn-primary" id="zcWebOptin">{{$t("newsletter.buttonText")}}</button>
                    </div>                  
                    
                    <!-- Do not edit the below Zoho Campaigns hidden tags -->
                    <input type="hidden" id="fieldBorder" value="">
                    <input type="hidden" id="submitType" name="submitType" value="optinCustomView">
                    <input type="hidden" id="emailReportId" name="emailReportId" value="">
                    <input type="hidden" id="formType" name="formType" value="QuickForm">
                    <input type="hidden" name="zx" id="cmpZuid" value="125f6a182">
                    <input type="hidden" name="zcvers" value="3.0">
                    <input type="hidden" name="oldListIds" id="allCheckedListIds" value="">
                    <input type="hidden" id="mode" name="mode" value="OptinCreateView">
                    <input type="hidden" id="zcld" name="zcld" value="185d5cd627ec16da">
                    <input type="hidden" id="document_domain" value="">
                    <input type="hidden" id="zc_Url" value="publ.maillist-manage.com">
                    <input type="hidden" id="new_optin_response_in" value="0">
                    <input type="hidden" id="duplicate_optin_response_in" value="0">
                    <input type="hidden" name="zc_trackCode" id="zc_trackCode" value="ZCFORMVIEW" onload="">
                    <input type="hidden" id="zc_formIx" name="zc_formIx" value="eb1f021918c962af166e835f2fee2161472676965757f09e"><!-- End of the Zoho Campaigns hidden tags -->
                    <input type="hidden" id="scriptless" name="scriptless" value="yes">
                </form>

        </div>        
    </div>
</div>


<!--Zoho Campaigns Web-Optin Form Ends Here-->
<!--           <b-input-group class="w-50 px-lg-10 my-3 mx-auto">
            <b-form-input></b-form-input>
            <b-input-group-append>            
            <b-button variant="primary">{{$t("newsletter.buttonText")}}</b-button>
            </b-input-group-append>
        </b-input-group> -->
        <p v-if="$t('newsletter.textBottom')" class="lead mb-4">{{$t('newsletter.textBottom')}}</p>
    </b-container>
</div>
</template>
 
<script>

export default {
  name: 'newsletter',
  components:{},
  props:['className'],
  computed: {

  }
}
</script>