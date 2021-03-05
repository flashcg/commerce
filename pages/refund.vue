<template>
  <b-container fluid="md" class="my-6 mx-auto py-5 border text-center" style="max-width:800px" v-if="isCallback">

      <h4 class="text-center mb-4" v-if="mddata.formInfo.title">{{mddata.formInfo.title}}</h4>

      <b-alert
        :show="(mddata.formInfo.detail?true:false)&&!isSuccessed"
        class="whiteSpace-preline text-left mb-4"        
      >{{mddata.formInfo.detail}} </b-alert>

      <b-form v-if="!isSuccessed" id="refundForm" ref="refundForm" class="text-center">
        <div class="row">
          <div class="col-md-6">
            <b-form-group :label="mddata.formInfo.firstName.name" label-for="firstname" class="text-left">
              <b-form-input
                v-model="formData.firstName"
                id="firstname"
                name="firstname"
                spellcheck="false"
                maxlength="20"
              ></b-form-input>
            </b-form-group>
          </div>
          <div class="col-md-6">
            <b-form-group :label="mddata.formInfo.lastName.name" label-for="lastname" class="text-left">
              <b-form-input
                v-model="formData.lastName"
                id="lastname"
                name="lastname"
                spellcheck="false"
                maxlength="20"
              ></b-form-input>
            </b-form-group>
          </div>
        </div>

        <b-form-group label-for="email" class="text-left">
          <template v-slot:label>
            {{mddata.formInfo.email.name}}
            <b-badge variant="danger">{{$t('globalName.requested')}}</b-badge>
          </template>
          <b-form-input
            v-model="formData.email"
            id="email"
            name="email"
            :state="formStatus.email"
            spellcheck="false"
            maxlength="50"
          ></b-form-input>
          <b-form-invalid-feedback
            :force-show="formStatus.email===null?false:!formStatus.email"
          >{{mddata.formInfo.errorInfo.email }}</b-form-invalid-feedback>
        </b-form-group>

        <b-form-group label-for="subject" class="text-left">
          <template v-slot:label>
            {{mddata.formInfo.subject.name}}
            <!-- <b-badge variant="danger">{{$t('globalName.requested')}}</b-badge> -->
          </template>          
          <b-form-text>{{mddata.formInfo.subject.text}}</b-form-text>
          <b-form-input
            v-model="formData.subject"
            id="subject"
            name="subject"
            :state="formStatus.subject"
            spellcheck="false"
            maxlength="50"
          ></b-form-input>
          <b-form-invalid-feedback
            :force-show="formStatus.subject===null?false:!formStatus.subject"
          >{{mddata.formInfo.errorInfo.subject }}</b-form-invalid-feedback>          
        </b-form-group>

        <b-form-group label-for="description" class="text-left">
          <template v-slot:label>
            {{mddata.formInfo.description.name}}
            <b-badge variant="danger">{{$t('globalName.requested')}}</b-badge>
          </template>

          <b-form-textarea
            id="description"
            name="description"
            v-model="formData.description"
            placeholder="Enter description..."
            rows="3"
            :state="formStatus.description"
            max-rows="6"
            maxlength="500"
          ></b-form-textarea>
          <b-form-invalid-feedback
            :force-show="formStatus.description===null?false:!formStatus.description"
          >{{mddata.formInfo.errorInfo.description }}</b-form-invalid-feedback>
        </b-form-group>

        <div class="row">
          <div class="col-md-6">
            <b-form-group
              :label="mddata.formInfo.deviceInfo.name"
              label-for="deviceInfo"
              class="text-left"
            >
              <b-form-input
                v-model="formData.deviceInfo"
                id="deviceInfo" disabled
                name="deviceInfo"
              ></b-form-input>
            </b-form-group>
          </div>
          <div class="col-md-6">
            <b-form-group
              :label="mddata.formInfo.attachment.name"
              label-for="attachment"
              class="text-left"
            >
              <b-form-file
                :state="formStatus.attachment===null?null:formStatus.attachment"
                v-model="formData.attachment"
                id="attachment"
                name="attachment"
                placeholder="Choose a file or drop it here..."
                drop-placeholder="Drop file here..."
              ></b-form-file>
              <b-form-text
                v-if="formStatus.attachment===null?true:formStatus.attachment"
              >{{mddata.formInfo.attachment.extLimit+' '+mddata.formInfo.attachment.extinfo+' '+mddata.formInfo.attachment.sizeInfo+' '+mddata.formInfo.attachment.sizeLimit+'KB'}}</b-form-text>
              <b-form-invalid-feedback
                :force-show="formStatus.attachment===null?false:!formStatus.attachment"
              >{{formStatus.attachmentType=='ext'?mddata.formInfo.errorInfo.attachment.ext:mddata.formInfo.errorInfo.attachment.size}}</b-form-invalid-feedback>
            </b-form-group>
          </div>
        </div>

        <p>
          <b-button
            :disabled="isloading"
            variant="success"
            type="submit"
            size="xl"
            @click="onSubmit"
          >
            <b-spinner v-if="isloading" class="align-middle mr-2" small label="loading..."></b-spinner>
            <span class="align-middle">{{$t('globalName.submit')}}</span>
          </b-button>
        </p>
        <b-alert :show="errorInfo?true:false" variant="danger">{{errorInfo}}</b-alert>
      </b-form>
      <div v-else class="py-4 text-success text-center">
        <span style="font-size:88px">
          <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="check-circle" role="img"
            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="align-middle svg-inline--fa fa-check-circle fa-w-16 fa-2x">
            <path fill="currentColor" d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z"/>
          </svg>
        </span>
        <p class="font-size-md mt-4">{{mddata.formInfo.successed}}</p>
          <b-btn size="xl" variant="outline-dark" to="/help/" class="rounded-0">
          <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="chevron-left" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" class="mr-3 svg-inline--fa fa-chevron-left fa-w-10"><path fill="currentColor" d="M34.52 239.03L228.87 44.69c9.37-9.37 24.57-9.37 33.94 0l22.67 22.67c9.36 9.36 9.37 24.52.04 33.9L131.49 256l154.02 154.75c9.34 9.38 9.32 24.54-.04 33.9l-22.67 22.67c-9.37 9.37-24.57 9.37-33.94 0L34.52 272.97c-9.37-9.37-9.37-24.57 0-33.94z" class=""></path></svg>{{$t('globalName.backToHelp')}}</b-btn>
      </div>

  </b-container>
</template> 
<script>
import { mapState } from "vuex";
import axios from "axios";
export default {
  async asyncData({app,$content}){
   let  mddata = await $content('pages/refund').fetch();
    mddata = await app.$initMD(mddata);
    return {mddata}
  },  
  head() {
    return this.mddata.head;
  },

  layout: 'primary',  
  data() {

    return {

      ownedInfo:[],
      isCallback: false,
      isloading: false,
      isSuccessed: false,
      callbackSN: null,
      formData: {
        email: "",
        firstName: "",
        lastName: "",
        subject: "",
        description: "",
        deviceInfo: "",
        attachment: [],
      },
      formStatus: {
        email: null,
        description: null,
        subject: null,
        attachment: null,
        attachmentType: null,
      },
      errorInfo: "",
    };
  },
  props: ["listData"],
  computed: {
    ...mapState({

      products: (state) => state.shopifyData.productsMerged,
    }),
  },

  created(){
    this.callbackSN = this.$route.query.sn;
  },
  methods: {
    returnError(){
      this.$nuxt.error({statusCode:500,message:'Unauthorized access'})
    },
    onSubmit(e) {
      e.preventDefault();

      let formData = new FormData();

      if (this.formData.firstName || this.formData.lastName) {
        formData.append("name",this.formData.firstName.trim() + " " + this.formData.lastName.trim()
        );
      } else {
        formData.append("name", "unknown");
      }

      formData.append("email", this.formData.email.trim());
      formData.append("subject",this.formData.subject||'No Subject');
      formData.append("description", this.formData.description);
      formData.append("attachment", this.formData.attachment);


        formData.set(
          "description",
          this.formData.deviceInfo +
            "\r\n-------\r\n" +
            this.formData.description
        );


      this.formStatus.email = this.$isEmail(this.formData.email.trim());
      this.formStatus.description = this.formData.description ? true : false;
      //this.formStatus.subject = this.formData.subject ? true : false;

      if (formData.get("attachment")) {
        let file = formData.get("attachment");
        let sizeLimit = this.mddata.formInfo.attachment.sizeLimit;
        let extLimit = this.mddata.formInfo.attachment.extLimit;
        this.formStatus.attachment = this.$isFileValid(file,extLimit,sizeLimit).value;
        this.formStatus.attachmentType = this.$isFileValid(file,extLimit,sizeLimit).type;
      } else {
        this.formStatus.attachment = true;
      }

      //验证提交
      if (!this.formStatus.email) {
        console.log("email error");
      } else if (!this.formStatus.description) {
        console.log("description error");
/*       } else if (!this.formStatus.subject) {
        console.log("subject error");  */       
      } else if (!this.formStatus.attachment) {
        console.log("attachment error");
      } else {
        this.errorInfo = false;
        this.isloading = true;

        this.$axios
          .post("https://api.cloner-alliance.com/feedback", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
              //  'Accept':'multipart/form-data'
            },
          })
          .then((res) => {
            this.isloading = false;
            this.isSuccessed = true;
            this.setCookie(this.ownedInfo);
            this.setOwnedInfo(this.ownedInfo)
          })
          .catch((err) => {
            console.log(err);
            this.isloading = false;
            this.errorInfo = err.message;
          });
      }
    },
    setCookie(ownedInfo) {
      if (ownedInfo.length>0) {

        let currentIndex = ownedInfo.findIndex(
          (res) => res.sn == this.callbackSN
        );
        if (currentIndex != -1) {
          let currentItem = ownedInfo.splice(currentIndex, 1);
          currentItem[0].applyRefunding = 1;
          ownedInfo.push(...currentItem);
        }
        this.$addCookie(
          "ownedInfo",
          JSON.stringify(ownedInfo),
          (this.mddata.formInfo && this.mddata.formInfo.expiresHours) || 8760
        );
        //localStorage.ownedInfo = JSON.stringify(ownedInfo);
      }
    },

    setOwnedInfo(){
      var data = this.$getCookie("ownedInfo") || localStorage.ownedInfo;
      if (data) {
        this.ownedInfo = JSON.parse(data);
        let index = this.ownedInfo.findIndex(res=>res.sn==this.callbackSN)
        if (index!=-1) {
          this.isCallback = true
          this.formData.deviceInfo = this.ownedInfo[index].model+' - '+this.ownedInfo[index].sn;
        } else {
          this.isCallback = false;
          this.returnError()
        }        
      }      
    }
  },

  mounted() {
    this.setOwnedInfo()

  }

};
</script>