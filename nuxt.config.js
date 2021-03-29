export default {
  /** universal spa*/
  //mode: 'universal',
  target:'static',
  /*
   ** Headers of the page
   */
  head: {
    title: "ClonerAlliance is a Company Specializing in the Hardware and Software Development of Video Recording and Capture.",
  //  titleTemplate: '%s - Cloner-Alliance',
    meta: [{
        charset: 'utf-8'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        name: 'google-site-verification',
        content: '_uwbrKDL4tPuabE-DbGrJ3cfe-o_j_9v-eAcEw20JjY'
      },
      {
        hid: 'description',
        name: 'description',
        content: "ClonerAlliance Provides Standalone Video Recorders, Video Capture Devices, Software. 4K, 1080p, HDMI Input, Passthrough are Supported. For Game Live Stream and Competition."
      },
      {
        hid: 'keywords',
        name: 'keywords',
        content: 'cloneralliance, video, recorder, capture, hdmi, software, 4k, live stream'
      }
    ],

    link: [{
      rel: 'icon',
      type: 'image/x-icon',
      href: '/favicon.ico'
    },
    {rel:"stylesheet",href:"https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,700"}
  ],
    script: [      
      { src: 'https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js' },
      //{ src: 'https://cdn.bootcdn.net/ajax/libs/jquery/3.5.1/jquery.min.js ' }    

  ]
  },
  components: true,
  /*
   ** Customize the progress-bar color
   */
  loading: {
    color: '#00af60'
  },

  /** i18n  */
  router: {

  },
  env: {

  },
  server: {
    port: 3100, // default: 3000
    host: '0.0.0.0', // default: localhost
  },

  /*
   ** Global CSS
   */
  css: [{
    src: '@/assets/css/custom.scss',    
    lang: "scss"
  }],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [{
    src: '@/plugins/common.js'
    },
    {
      src: '@/plugins/i18n.js'
    },
    {
      src: '@/plugins/priceRules'
    },
/*     {
      src: '@/plugins/global-components.js'
    }, */    
    {
      src: '@/plugins/yamlPages'
    },
    {
      src: '@/plugins/axios'
    },
    {
      src: '@/plugins/vueSmoothScroll'
    },    
    {
      src: '@plugins/vueAwesomeSwiper',
      ssr: false
    }
  ],

  /*
   ** Nuxt.js modules
   */
  modules: [
    '@nuxtjs/axios',
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/markdownit',
    '@nuxt/content',
    'bootstrap-vue/nuxt',
    ['@nuxtjs/google-tag-manager', { id: 'GTM-P25NTJQ' }],
    ['nuxt-i18n', {
      locales: [{
        code: 'en',
        iso: 'en-US',
        name: 'english',
        file: 'en.js'
      }],
      lazy: true,
      langDir: './static/locales/',
      defaultLocale: 'en',
      detectBrowserLanguage: {
        useCookie: true,
        cookieKey: 'i18n_redirected'
      },
      vuex:{
        syncLocale: true,
        syncMessages: true,
      },
      vueI18n: {
        fallbackLocale: 'en',
        message: {
          en: {

          }
        }
      }
    }]
  ],
  bootstrapVue: {
    bootstrapCSS: false, // or `css`
    bootstrapVueCSS: false, // or `bvCSS`
    components: ['BIcon','BImg','BBreadcrumb','BAlert','BLink','BButton','BButtonGroup','BBadge','BBtn','BForm','BModal','BEmbed','BContainer','BRow','BCol','BNavbar','BNavbarBrand','BNavbarToggle','BSidebar','BCollapse','BTab','BInputGroup','BInputGroupAppend','BFormInput','BFormGroup','BFormInvalidFeedback','BFormSelect','BFormText','BFormTextarea','BTabs','BFormFile','BSpinner','BIconArrowLeft','BIconArrowRight']
  },
  content:{
    dir:'static/locales/en'
  },
  /*
   ** Axios module configuration
   */
  axios: {
    proxy: true,
    //    baseURL: "https://cloneralliance.myshopify.com/admin/api/2019-04/",
    credentials: true,
    retry: {
      retries: 3
    }
    // See https://github.com/nuxt-community/axios-module#options
  },

  /*
   ** Build configuration
   */
  buildModules: [
    ['@nuxtjs/google-analytics', {
      id: 'UA-60608488-1'
    }],
    ['@nuxt/typescript-build', {
      typeCheck: true, //在不同的程序中启用 TypeScript 的类型检查
      ignoreNotFoundWarnings: true
    }],
    '@nuxtjs/composition-api'
  ],
  build: {
    extractCSS: true,
  },
  generate: {
    // for @nuxtjs/composition-api -- an issue with static site generation and async functions
    interval: 2000,
  }
}
