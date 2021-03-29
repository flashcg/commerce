<template>
<header>
	<b-navbar id="headNav" type="dark" ref="nav" variant="dark" toggleable="lg" :class="isMobile?'mobile-nav '+className:className" :style="'transition:0.2s;top:'+-topHeight+'px'">
		
		<b-navbar-brand :to="localePath('index')" :title="$t('name')"><b-img src="/logo.png" style="max-width:260px" fluid  />
    </b-navbar-brand>
    <b-navbar-toggle v-if="isMobile" id="switch" target="sidebar" v-b-toggle.sidebar> </b-navbar-toggle>
    <b-sidebar v-if="isMobile" id="sidebar" title="" backdrop shadow body-class="bg-dark-opacity-8" header-class="bg-dark-opacity-8" :class="'bg-dark-opacity-9'" bg-variant="transparent" text-variant="light">
      <div class="px-3 py-2">
        <ul class="navbar-nav">
          <li v-for="(object,objectIndex) in $t('menuTop')" :key="objectIndex" >
            
           <b-link v-if="object.path" v-b-toggle="'subList-'+objectIndex" class="d-flex" :to="object.path?'/'+object.path+'/':object.path"> {{object.name}} </b-link>

           <b-link v-else v-b-toggle="'subList-'+objectIndex"><span>{{object.name}}</span> 
           <i class="d-flex align-items-center" >
             <svg v-if="!menuState['item'+objectIndex+'_isVisible']" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="plus" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="svg-inline--fa fa-plus fa-w-14 fa-md"><path fill="currentColor" d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" class=""></path></svg>

             <svg v-else aria-hidden="true" focusable="false" data-prefix="fas" data-icon="plus" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="svg-inline--fa fa-plus fa-w-14 fa-md"><path fill="currentColor" d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" class=""></path></svg>             
           </i>             
           </b-link>



            <b-collapse v-model="menuState['item'+objectIndex+'_isVisible']" :id="'subList-'+objectIndex" v-if="object.items" accordion="mobileNav" role="tabpanel">
              <ul  v-for="(subList,subIndex) in object.items" :key="subIndex">
                <li v-for="(item,itemIndex) in subList.children" :key="itemIndex" >
                  <template v-if="typeof(item)=='string'">
                  <b-link v-if="$fetchItem(item)" :to="'/'+$fetchItem(item).handle.path+'/'"> {{$fetchItem(item).handleName}}
                  </b-link>
                  </template>
                  <template v-else-if="typeof(item)=='object'">
                    <b-link v-if="item.path" :to="'/'+item.path+'/'">                  
                      {{item.name}}
                    </b-link>	
                    <b-link v-else :href="item.href">                  
                      {{item.name}}
                    </b-link>                     
                  </template>
                  </li>
              </ul>
            </b-collapse>
          </li>
        </ul>
      </div>
    </b-sidebar>
		<b-collapse  is-nav>
		<ul v-if="!isMobile" class="navbar-nav ml-auto">
			<li :class="`dropdown ${object.additionClass?object.additionClass:''}`" v-for="(object,index) in $t('menuTop')"  @mouseover="overAction($event,index)" @mouseleave="leaveAction($event,index)" :key="index">
				<b-link class="level1" :to="object.path?'/'+object.path+'/':object.path">{{object.name}}</b-link>
        <div class="subNavbar-nav position-md-fixed fill-to-up-position">
          <a class="arrow arrow-right align-items-center justify-content-end" href="#" @click="navNext($event)"><b-img fluid src="~static/images/chevron-compact-right.png" /></a>
          <div v-if="object.items" :ref="'subNav'+index" :style="'transform:translateX('+stepWidth+'px)'" class=" d-flex justify-content-center pt-4 pt-md-9 "> 
            
            <ul class="navbar-nav text-light flex-fill justify-content-center flex-wrap pb-2" v-for="(subList,subIndex) in object.items" :key="subIndex" :ref="'subList'+subIndex">              
              <li :class="object.template == 'product'?'nav-item flex-fill':'nav-item'" v-for="(item,itemIndex) in subList.children" :key="itemIndex" >
                
                <template v-if="typeof(item)=='string'">
                  
                <b-link v-if="$fetchItem(item)" :to="'/'+$fetchItem(item).handle.path+'/'" class="nav-link" @click="clickAction($event)">                  
                  <p><b-img fluid class="d-none d-md-inline-block" :src="$fetchItem(item).boxes[0].imageUrl" style="max-height:180px" /></p>
                  <p>{{$fetchItem(item).handleName}}</p>
                </b-link>	
                </template>

                <template v-else-if="typeof(item)=='object'">
                  <b-link v-if="item.path" :to="'/'+item.path+'/'" class="nav-link" @click="clickAction($event)">                  
                    <p><b-img fluid class="d-none d-md-inline-block" :src="item.iconUrl" style="max-height:180px" /></p>
                    <p>{{item.name}}</p>
                  </b-link>	
                  <b-link v-else :href="item.href" class="nav-link" @click="clickAction($event)">                  
                    <p><b-img fluid class="d-none d-md-inline-block" :src="item.iconUrl" style="max-height:180px" /></p>
                    <p>{{item.name}}</p>
                  </b-link>                  
                </template>
                <p v-if="subList.text" v-html="subList.text"></p>                
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
      </div>            
			</li>
		</ul>
		
		</b-collapse>
	</b-navbar>
  
</header>
</template>
 
<script>
import {mapState} from 'vuex'
import { setTimeout } from "timers";
export default {
  name: "headerNav",
  data() {
    const menuTop = this.$store.state.i18n.messages.menuTop
    let menuState = {};
    for (let i = 0; i < menuTop.length; i++) {
      if (menuTop[i].items&& menuTop[i].items.length >0) menuState['item'+[i]+'_isVisible'] = false
    }
    return {
      hover: false,
      hoverTime: null,
      droppedWaiting: false,
      smooth: false,
      isMobile: null,
      screenWidth: null,
      itemWidth: 325,
      stepWidth: 0,
      topHeight:0,
      menuState
    };
  },
  props: {className:String,
  template:{
    type:String,
    default:'default'
  }},
  computed:{
    ...mapState({product:(state)=>state.localData.productData})

  },
  methods: {

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

      }

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
    let nav = document.getElementById('headNav')
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

    //如果是产品页，nav下拉时收起
    let navFold=()=>{
      this.template=='product'&&window.scrollY>120?this.topHeight = nav.offsetHeight:this.topHeight = 0
    }    
    navFold();
    window.addEventListener('scroll',()=>{
      navFold()
    })    


    
    

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