<template>
<header>
	<b-navbar type="dark" variant="dark" toggleable="lg" :class="isMobile?'mobile-nav '+className:className">
		
		<b-navbar-brand :to="localePath('index')" :title="$t('name')"><img src="/logo.png" width="260" />
    </b-navbar-brand>

		<b-collapse id="nav-collapse" is-nav>
		<ul v-if="!isMobile" class="navbar-nav ml-auto">
			<li class="dropdown" v-for="(object,index) in $t('menuTop1')"  @mouseover="overAction($event,index)" @mouseleave="leaveAction($event,index)" :key="index">
				<a class="level1">{{object.name}}</a>
        <div class="subNavbar-nav position-md-fixed fill-to-up-position">
          <a class="arrow arrow-right align-items-center justify-content-end" href="#" @click="navNext($event)"><b-img fluid src="~static/images/chevron-compact-right.png" /></a>
          <div :ref="'subNav'+index" :style="'transform:translateX('+stepWidth+'px)'" class=" d-flex justify-content-center pt-4 pt-md-9 "> 
            
            <ul class="navbar-nav flex-fill justify-content-center flex-wrap pb-2" v-for="(subList,subIndex) in object.items" :key="subIndex" :ref="'subList'+subIndex">              
              <li class="nav-item flex-fill" v-for="(item,itemIndex) in subList.children" :key="itemIndex">
                <b-link :to="'/'+fetchPath(subList)+'/'" class="nav-link" @click="clickAction($event)">
                  {{item}}
                  <b-img fluid class="d-none d-md-inline-block" :src="$thumb($getItemData(subList,'imgPath'))" />
                  <p>{{$getItemData(subList,'name')}} </p>
                </b-link>							
              </li> 


            <div  v-if="subList.groupButtons" class="w-100">
            <hr style="opacity:0.3" />
              <div class="d-flex align-items-center">      
                <div class="col-12">
                <b-button @click="clickAction($event)" v-for="(groupButton,groupButtonIndex) in subList.groupButtons" :key="groupButtonIndex"   :variant="groupButton.variant?groupButton.variant:'outline-light'" class="rounded-0 mr-2" size="lg" :to="groupButton.hash?'/'+groupButton.path+'/#'+$toLower(groupButton.hash):'/'+groupButton.path+'/'">{{ groupButton.text }} </b-button>
                </div>
              </div> 
            </div>

            </ul>

          </div>
<!-- 				<ul v-if="item.children&&item.type=='software'" :ref="'subNav'+index" class="navbar-nav justify-content-center pt-4 pt-md-9 pb-2"  >
          
					<li class="nav-item mx-4" v-for="(subList,index) in item.children" :key="index" >
						<b-link :to="'/'+subList.path+'/'" class="nav-link" @click="clickAction($event)">	
              <b-img fluid class="d-none d-md-inline-block w-75" :src="$getSoftwareData(subList.name)&&$getSoftwareData(subList.name).details.imageUrl" />
							<p>{{subList.name}}</p>
						</b-link>							
					</li>          
				</ul> -->
        
<!--         <div  v-if="item.groupButtons||item.promotion" class="pb-4 d-none d-md-block">
          <hr style="opacity:0.3" />

          <div v-if="item.groupButtons&&item.promotion"  class="d-flex align-items-center">
            <div class="col-4 border-right border-light-less" v-if="item.promotion">            
            <b-link @click="clickAction($event)" :to="item.promotion.hash?'/'+item.promotion.path+'/#'+$toLower(item.promotion.hash):'/'+item.promotion.path+'/'"><b-img fluid :src="item.promotion.imageUrl" /></b-link>
            </div>          
            <div class="col-8">
            <b-button @click="clickAction($event)" v-for="(groupButton,groupButtonIndex) in item.groupButtons" :key="groupButtonIndex"   :variant="groupButton.variant?groupButton.variant:'outline-light'" class="rounded-0 mr-2" size="lg" :to="groupButton.hash?'/'+groupButton.path+'/#'+$toLower(groupButton.hash):'/'+groupButton.path+'/'">{{ groupButton.text }} </b-button>
            </div>
          </div> 

          <div v-else-if="item.groupButtons"  class="d-flex align-items-center">       
            <div class="col-12">
            <b-button @click="clickAction($event)" v-for="(groupButton,groupButtonIndex) in item.groupButtons" :key="groupButtonIndex"   :variant="groupButton.variant?groupButton.variant:'outline-light'" class="rounded-0 mr-2" size="lg" :to="groupButton.hash?'/'+groupButton.path+'/#'+$toLower(groupButton.hash):'/'+groupButton.path+'/'">{{ groupButton.text }} </b-button>
            </div>
          </div> 

          <div v-else class="d-flex align-items-center justify-content-center">
            <div class="col-4" v-if="item.promotion">
            <b-link @click="clickAction($event)" :to="item.promotion.hash?'/'+item.promotion.path+'/#'+$toLower(item.promotion.hash):'/'+item.promotion.path+'/'"><b-img fluid :src="item.promotion.imageUrl" /></b-link> 
            </div>                 
          </div>
        </div> -->

      </div>
            
			</li>
		</ul>
<!-- 		<ul class="navbar-nav normal-nav ml-xl-5">
      <li :class="item.children?'dropdown':''" v-for="(item,index) in $t('menuTop2')" @mouseover="overAction($event)" @mouseleave="leaveAction($event)" :key="index">
        
<svg v-if="item.children" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="angle-right" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512" class="icon-link d-inline-block d-md-none svg-inline--fa fa-angle-right fa-w-8"><path fill="currentColor" d="M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9 0l-22.6-22.6c-9.4-9.4-9.4-24.6 0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6 0-33.9L54.3 103c9.4-9.4 24.6-9.4 33.9 0l136 136c9.5 9.4 9.5 24.6.1 34z" class=""></path></svg>

        <b-link v-if="item.path" :to="item.path+'/'" :class="item.children?'level1':'nav-link'">{{item.name}}</b-link>
        <a v-else  :class="item.children?'level1':'nav-link'">{{item.name}}</a>
				<ul v-if="item.children" class="navbar-nav flex-column position-md-fixed subNavbar-nav pt-4 pt-md-7 pb-4" >
          <li class="nav-item mx-4" v-for="(subList,index) in item.children" :key="index" >
            <b-link class="nav-link" v-if="subList.method == 'href'" :href="subList.path"><p>{{subList.name}}</p> </b-link> 
            <b-link class="nav-link" v-else :to="subList.path+'/'"><p>{{subList.name}}</p> </b-link> 
          </li>
				</ul>        
      </li>
		</ul> -->
		
		</b-collapse>
	</b-navbar>	
</header>
</template>
 
<script>

import { setTimeout } from "timers";
export default {
  name: "headerNav",
  data() {
    return {
      hover: false,
      hoverTime: null,
      droppedWaiting: false,
      smooth: false,
      isMobile: null,
      screenWidth: null,
      itemWidth: 325,
      stepWidth: 0
    };
  },
  props: ["className"],
  methods: {

    fetchPath(model) {
      let path;
      this.$t("handleSetting").map(res => {
        if (res.model == model) {
          path = res.path;
        }
      });
      return path;
    },
    overAction(event, index) {
      let subNav = event.currentTarget.children[1];
      this.hover = true;
      if (!this.hoverTime) {
        this.hoverTime = new Date();
      } else if (this.droppedWaiting) {
        this.hoverTime = new Date();
      }
      if (subNav) {
        event.currentTarget.classList.add("active");
        setTimeout(() => {
          this.droppedWaiting = true;
        }, 1000);
        /* let addClass = function() {
          
           let x = document.getElementsByClassName("subNavbar-nav");
          for (let i = 0; i < x.length; i++) {
            x[i].classList.add("dropped-prepare");
          } */
      }
      /*         event.currentTarget.children[1].addEventListener(
          "animationend",
          addClass,
          false
        ); */

      //  event.currentTarget.children[1].removeEventListener("animationend",addClass,false)
    },
    leaveAction(event, index) {
      let subNav = event.currentTarget.children[1];

      this.hoverTime = new Date();
      this.hover = false;
      if (subNav) {
        event.currentTarget.classList.remove("active");
      }
      if (event.currentTarget.children[2]) {
        event.currentTarget.children[2].children[1].style.transform = "translateX(0px)";
      }
      
      

      /* else if (subNav) {
        event.currentTarget.classList.remove("active");

        let x = document.getElementsByClassName("subNavbar-nav");

        let removeClass = function() {
          for (let i = 0; i < x.length; i++) {
            x[i].classList.remove("dropped-prepare");
          }
        };
        setTimeout(removeClass, 400);
      } */
    },
    clickAction(event) {
      let currentDom = event.currentTarget;

      while (currentDom.tagName != "BODY") {
        if (currentDom.classList.contains("active"))
          currentDom.classList.remove("active");
          currentDom = currentDom.parentNode;
      }
    },
    navNext(event) {
      let currentDom = event.currentTarget.nextElementSibling,
       translateWidth = Math.abs(Number(currentDom.style.transform.split('(')[1].slice(0,-3))),
       distance = Math.abs(Number(currentDom.style.transform.split('(')[1].slice(0,-3)))+this.itemWidth+48; 


      var outWidth =()=>{
        let hideWidth = currentDom.clientWidth-translateWidth-this.screenWidth;       
        console.log(hideWidth,translateWidth);
        

        if (hideWidth>0 && hideWidth>this.screenWidth/2) {
          
          return (this.screenWidth+translateWidth)*0.75
          
        } else if(hideWidth>0){
          
           return hideWidth+translateWidth+50
        } else if (hideWidth<=0) {
          
        }
      }
      
      currentDom.style.transform = "translateX(" + (-outWidth()) + "px)";
    }
  },
  watch: {
    hover(curVal, oldVal) {
      setTimeout(() => {
        if (!curVal && this.smooth) {
          this.droppedWaiting = false;
        }
      }, 800);
    },
    hoverTime(curVal, oldVal) {
      let a = curVal - oldVal;

      if (a < 4000 && this.droppedWaiting) {
        this.smooth = true;
      } else {
        this.smooth = false;
      }
    }
  },

  mounted() {
    this.isMobile = this.$isMobile();
    this.screenWidth = this.$isMobile("width");
    
    var arrowInit = ()=> {
      for (let i in this.$refs) {
        let element = this.$refs[i][0],
          screenWidth = this.screenWidth;

        if (screenWidth < (element&&element.clientWidth)) {
          let parent = element.parentNode.parentNode;

          parent.classList.add("is-scrollable");
          //console.log(parent.classList);
        } else {
          element&&element.parentNode.classList.remove("is-scrollable");
        }
      } 
    }
    arrowInit()


    window.addEventListener("resize", () => {
      this.isMobile = this.$isMobile();
      this.screenWidth = this.$isMobile("width");
      arrowInit()
    });

    if (this.isMobile) {
      //jquery code
      $(".dropdown").click(function() {
        $(this)
          .children(".subNavbar-nav")
          .toggle(300);
        $(this).toggleClass("dropped");
      });
      //jquery code end
    }
  }
};
</script>