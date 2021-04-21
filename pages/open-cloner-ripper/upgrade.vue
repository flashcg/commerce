<template>
  <div>
    <b-container class="py-lg-8 py-6">
      <b-row class="justify-content-center">
        <b-col md="auto" class="text-center mb-3 mb-md-0">
          <div v-if="item" class="position-relative" style="font-size: 10rem">
            <b-icon
              style="right: 10px; bottom: 0"
              class="position-absolute"
              icon="arrow-up-circle-fill"
              variant="success"
            ></b-icon>
            <b-img :src="item.boxes[1].imageUrl" class="pr-md-7"></b-img>
          </div>
        </b-col>
        <b-col md="4">
          <h3>{{ mddata.upgrade.title }}</h3>
          <p class="lead">{{ mddata.upgrade.formItems.title }}</p>
          <div class="form-group">
            <label for="code-input">Registration code:</label>
            <input
              v-model="code"
              type="text"
              class="form-control"
              id="code-input"
              aria-describedby="codeHelp"
              :disabled="disabled"
            />
            <small id="codeHelp" class="form-text text-muted"
              >You may find it in your order confirmation Email</small
            >
          </div>
          <div v-if="info" :class="'alert  alert-' + infoVariant" role="alert">
            {{ info }}
          </div>
          <div class="form-info">
            <div v-if="step == 'check'">
              <button
                id="checkBtn"
                :disabled="isLoading"
                @click="launch()"
                type="submit"
                class="btn btn-lg btn-primary"
              >
                <div v-if="isLoading" class="spinner-border" role="status">
                  <span class="sr-only">Loading...</span>
                </div>
                <span class="d-inline-block">Check Now</span>
              </button>
            </div>
            <div v-else-if="step == 'success'">
              <div v-if="outData" id="success-info">
                <p class="font-weight-bold">Found your code!</p>
                <p>
                  Code version : <span>{{ outData.codeversion }} </span><br />
                  Expire date: <span>{{ outData.expdate }} </span>
                </p>
              </div>

              <a
                id="upgradeBtn"
                :href="
                  'https://order.shareit.com/cart/add?vendorid=200278181&PRODUCT[300960733]=1&ADD[300960733][ADDITIONAL1]=' +
                  code
                "
                class="btn btn-lg btn-primary"
                :class="isUpgrading ? 'disabled' : ''"
                :aria-disabled="isUpgrading"
                @click="upgradeNow()"
              >
                <div v-if="isUpgrading" class="spinner-border" role="status">
                  <span class="sr-only">Loading...</span>
                </div>
                Upgrade Now
              </a>
            </div>
            <div v-if="step == 'buy'">
              <a
                id="upgradeBtn"
                href="https://order.shareit.com/cart/add?vendorid=200278181&PRODUCT[300960728]=1"
                class="btn btn-lg btn-success rounded-0"
                >Buy Now</a
              >
            </div>
          </div>
        </b-col>
      </b-row>
    </b-container>
        <div class="bg-dark-opacity-1 py-lg-8 py-6">
    <nuxt-content class="container text-center" :document="mddata" />
    </div>
  </div>
</template>
<script>
import { fetchItem } from "@/assets/script/tools";
import { mapState } from "vuex";
export default {
  async asyncData({ app, $content }) {
    let mddata = await $content("pages/open-cloner-ripper/upgrade").fetch();
    mddata = await app.$initMD(mddata);
    return { mddata };
  },
  layout: "primary",
  head() {
    return this.mddata.head;
  },
  data() {
    return {
      step: "check",
      isLoading: false,
      code: null,
      outData: null,
      upgradeData: null,
      disabled: false,
      infoVariant: "info",
      info: null,
      isUpgrading: false,
    };
  },
  computed: {
    ...mapState({
      productData: (state) => state.localData.productData,
    }),
    item() {
      return fetchItem(this.mddata.upgrade.handleName, this.productData);
    },
  },
  methods: {
    launch() {
     const _this = this;
      if (!this.code) {
        this.infoVariant = "warning";
        this.info = "The code can not be empty.";
        return false;
      }
      this.isLoading = true;
      this.$axios
        .get("https://www.dvd-cloner.com/db/db_getcodeinfo.php?code=" + this.code)
        .then(response=> {
          _this.outData = adjusting(response.data);
          console.log(_this.outData);
          if (_this.outData && !_this.outData.pastDue) {
            _this.info = "You can upgrade the code for one more year.";
            _this.step = "success";
            _this.infoVariant = "info";
            _this.disabled = true;
            _this.isLoading = false;
            console.log(_this.step);
          } else if (_this.outData && _this.outData.pastDue) {
            _this.info =
              "Your code has been expired more than one year.  We can't upgrade the code. You may buy the latest version  of  the software now.";
            _this.step = "buy";
            _this.infoVariant = "info";
            _this.disabled = true;
            console.log(_this.step);
          } else {
            _this.infoVariant = "warning";
            _this.disabled = false;
            _this.isLoading = false;
            _this.info =
              "Can not find the register code! Please input rigth code and try again.";
            console.log(_this.step);
          }
        })
        .catch(function (error) {
          // handle error
          _this.disabled = false;
          _this.isLoading = false;
          _this.infoVariant = "danger";
          _this.info = error;
        });
    },
    upgradeNow() {
      this.visibilityChange();
      this.isUpgrading = true;
    },
    visibilityChange() {
      const _this = this;
      var hidden, state, visibilityChange;
      if (typeof document.hidden !== "undefined") {
        hidden = "hidden";
        visibilityChange = "visibilitychange";
        state = "visibilityState";
      } else if (typeof document.mozHidden !== "undefined") {
        hidden = "mozHidden";
        visibilityChange = "mozvisibilitychange";
        state = "mozVisibilityState";
      } else if (typeof document.msHidden !== "undefined") {
        hidden = "msHidden";
        visibilityChange = "msvisibilitychange";
        state = "msVisibilityState";
      } else if (typeof document.webkitHidden !== "undefined") {
        hidden = "webkitHidden";
        visibilityChange = "webkitvisibilitychange";
        state = "webkitVisibilityState";
      }
      // 添加网页标签切换监听器，

      document.addEventListener(
        visibilityChange,
        function () {
          if (document[state] == "visible") {
            axios
              .get("https://www.dvd-cloner.com/db/db_getcodeinfo.php?code=" + _this.code)
              .then(function (response) {
                _this.upgradeData = adjusting(response.data);
                if (_this.upgradeData.expdate != _this.outData.expdate) {
                  _this.isUpgrading = false;
                  _this.outData.expdate = _this.upgradeData.expdate;
                  _this.infoVariant = "success";
                  _this.info = "Upgrade completed";
                } else {
                }
              })
              .catch(function (error) {
                // handle error
                console.log(error);
              });
          }
        },
        false
      );
    },
  },
  mounted() {
    if (this.$route.query.code) this.code = this.$route.query.code;
  },
};
function adjusting(data) {
  if (data && data.search("code") != -1) {
    return initData(data);
  } else {
    return false;
  }
}

function initData(data) {
  console.log(data);
  var getDate = data.replace(/\ +/g, ""),
    outData;
  // getDate=getDate.replace(/[\r\n]/g,"");

  outData = getDate.replace(/[ ]/g, "").match(/code(\S*)/)[0];
  outData = outData.split(",");
  var outArray = outData.map((res) => {
    var resArray = res.split(":").map((resChild) => {
      return '"' + resChild + '"';
    });
    return resArray.join(":");
  });
  outData = outArray.join(",");
  outData = JSON.parse("{" + outData + "}");

  // 日期比较
  var regDate = new Date(outData.expdate.replace(/-/, "/")),
    currentDate = new Date();
  var outYear = regDate.getFullYear(),
    outMonth = regDate.getMonth() + 1,
    currentYear = currentDate.getFullYear(),
    currentMonth = currentDate.getMonth() + 1;

  var diffDay = parseInt((currentDate - regDate) / (1000 * 3600 * 24));

  if (
    (outMonth <= 2 && outYear % 4 == 0 && outYear % 100 !== 0) ||
    outYear % 400 == 0
  ) {
    diffDay = diffDay - 1;
  } else if (
    (currentMonth >= 2 && currentYear % 4 == 0 && currentYear % 100 !== 0) ||
    currentYear % 400 == 0
  ) {
    diffDay = diffDay - 1;
  }

  if (diffDay < 0) {
    outData.pastDue = false;
  } else if (diffDay > 365) {
    outData.pastDue = true;
  } else if (diffDay <= 365) {
    outData.pastDue = false;
  }

  return outData;
}
</script>