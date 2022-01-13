export default {
  /** universal spa*/
  //mode: 'universal',
  target:'static',
  /*
   ** Headers of the page
   */
  head: {
    title: "DVD Copy software - Copy DVD movie to DVD R/RW easily",
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
        content: "DVD Copy becomes easier with DVD-Cloner now. The new burning engine can make perfect 1:1 DVD copy"
      },
      {
        hid: 'keywords',
        name: 'keywords',
        content: 'DVD copy, DVD copy software, copy DVD, DVD Cloner'
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
    middleware: ['breadcrumbTitle','redirect'],
    trailingSlash:true
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

/*     {
      src: '@/plugins/global-components.js'
    }, */    
    {
      src: '@/plugins/yamlPages'
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
    //['@nuxtjs/google-tag-manager', { id: 'AW-1068142190' }],
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
    }],
    '@nuxtjs/sitemap' 
  ],
  markdownit: {
    html: true,
    runtime: true // Support `$md()`
  },
  sitemap: {
    hostname: 'https://www.dvd-cloner.com',
    gzip: true,
    exclude: [
      '/zohoTicket.html',
      '/404'    
    ],
    filter ({ routes }) {
      return routes.map(route => {
        route.url = `${route.url}/`
        return route
      })
    }
  },

  bootstrapVue: {
    bootstrapCSS: false, // or `css`
    bootstrapVueCSS: false, // or `bvCSS`
     components: ['BIcon','BBreadcrumb','BAlert','BLink','BButton','BButtonGroup','BBadge','BBtn','BEmbed','BContainer','BRow','BCol','BNavbar','BNavbarBrand','BNavbarToggle','BCollapse','BTab','BTabs','BSpinner','BIconArrowLeft','BIconArrowRight','BIconClock','BIconSearch','BIconArrowUpCircleFill','BCollapse'],
    componentPlugins: [
      'ModalPlugin','ListGroupPlugin','VBTogglePlugin','CardPlugin','FormPlugin','FormInputPlugin','InputGroupPlugin','FormGroupPlugin','SidebarPlugin','FormSelectPlugin','ImagePlugin','PaginationPlugin','FormRadioPlugin','OverlayPlugin','CollapsePlugin' 
    ], 
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
      id: 'UA-7547467-1'
    }],
    ['@nuxt/typescript-build', {
      typeCheck: true, //在不同的程序中启用 TypeScript 的类型检查
      ignoreNotFoundWarnings: true
    }],
    '@nuxtjs/composition-api/module'
  ],
  build: {
    extractCSS: true,
  },
  generate: {
    // for @nuxtjs/composition-api -- an issue with static site generation and async functions
    interval: 2000,
  }
}
