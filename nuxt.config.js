const pkg = require('./package')

const isProd = process.env.NODE_ENV === 'production'

require('dotenv')

module.exports = {
  ssr: false,

  /*
   ** Headers of the page
   */
  head: {
    title: "Wledi Pro - All in One Management Software for Educationals Institutions",
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Gérer votre établissement facilement et transformer votre expérience que vous proposez aux parents et familles !' },
      { hid: 'og:type', property: 'og:type', content: 'website' },
      { hid: 'og:title', property: 'og:title', content: 'Wledi Pro, Le premier outil pour les professionnels de la petite enfance en Tunisie' },
      { hid: 'og:description', property: 'og:description', content: 'Gérer votre établissement facilement et transformer votre expérience que vous proposez aux parents et familles !' },
      { hid: 'og:image', property: 'og:image', content: 'https://res.cloudinary.com/audasoft-technology/image/upload/v1601652407/wledi_pro.png' },
      { hid: 'og:site_name', property: 'og:site_name', content: 'wledi' },
      { hid: 'fb:app_id', property: 'fb:app_id', content: '223683378788569' },
      { property: 'twitter:card', content: 'summary_large_image' },
      { property: 'twitter:description', content: 'Wledi Pro, Le premier outil pour les professionnels de la petite enfance en Tunisie' },
      { property: 'twitter:title', content: 'Wledi Pro, Le premier outil pour les professionnels de la petite enfance en Tunisie' },
      { property: 'twitter:image', content: 'https://res.cloudinary.com/audasoft-technology/image/upload/v1601652407/wledi_pro.png' },
      { name: 'robots', content: 'index,follow' },
      { hid: 'description', name: 'description', content: 'Gérer votre établissement facilement et transformer votre expérience que vous proposez aux parents et familles !' }
    ],
    script: [
      { src: 'https://widget.cloudinary.com/v2.0/global/all.js'
      },
      {
        src:  src="//code.tidio.co/dau6u6rgeknk9bpx8tdfj417vxhtdyct.js", 
        async: true,
      },
    ],

    link: [
      { href: 'https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@900&display=swap', rel: 'stylesheet' },
      { href: 'https://fonts.googleapis.com/css2?family=Comfortaa:wght@700&display=swap', rel: 'stylesheet' },
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://use.fontawesome.com/releases/v5.8.1/css/all.css', integrity: 'sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf', crossorigin: "anonymous"}
    ]
  },

  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },

  /*
   ** Global CSS
   */
   css: [
    // Add Bootstrap CSS if using npm installation
    'bootstrap/dist/css/bootstrap.css',
    'element-ui/lib/theme-chalk/index.css',
    'quill/dist/quill.snow.css',
    'quill/dist/quill.bubble.css',
    'quill/dist/quill.core.css'
  ],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    {src: "~/plugins/veevalidate.js"},
    {src: "~/plugins/vue-json-excel.js"},
    { src: "~plugins/vue-quill-editor.js", ssr: false },
    '~/plugins/element-ui'
  ],

  /*
   ** Nuxt.js modules
   */
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/auth'
  ],

  /*
   ** Axios module configuration
   */
  axios: {
    proxy: false,
    retry: {retries: 3},
    // browserBaseURL: process.env.NUXT_API_URL
    browserBaseURL: 'https://wledi-ecommerce-catalog-api-b3fdac72d7cd.hp.com'
    // See https://github.com/nuxt-community/axios-module#options
  },


  router: {
    middleware: []
  },
  
 

  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    transpile: [/^element-ui/, 'vue-echarts'],
    extend(config, ctx) {
    }
  }
}
