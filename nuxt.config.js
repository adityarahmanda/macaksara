export default {
  target: 'static',
  
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    htmlAttrs: {
      lang: 'id-ID',
      prefix: 'og:http://ogp.me/ns#'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'robots', content: 'follow, index, max-snippet:-1, max-video-preview:-1, max-image-preview:large' },
      { 'http-equiv':'content-language', content:'id-ID' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'canonical', href: 'https://adityarahmanda.github.io/macaksara' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Mulish:wght@300;400;700;900&family=Noto+Sans+Javanese:wght@400;700&display=swap' },
      { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/fontawesome.min.css' },
      { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/solid.min.css' },      
    ],
    script: [
      { src: 'https://www.googletagmanager.com/gtag/js?id=G-7CCPBZFMXT', async: true },
      { 
        type:'text/javascript', 
        innerHTML: `window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-7CCPBZFMXT');`
      }
    ]
  },

  router: {
    base: '/macaksara/'
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [ '~assets/scss/app.scss' ],

  sitemap: {
    hostname: 'https://adityarahmanda.github.io/',
    gzip: true,
    exclude: [
      '/kuis/**'
    ],
    routes: [
      '/',
      '/konverter',
    ]
  },

  loading: {
    color: '#47311C'
  },

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/vue-bootstrap',
    '~/plugins/macaksara-latintojava',
    '~/plugins/macaksara-javatolatin',
    '~/plugins/macaksara-utility'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  build: {
    extend(config, ctx) {
      config.module.rules.push({
        test: /\.(ogg|mp3|wav|mpe?g)$/i,
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]',
          esModule: false,
        }
      })
    },
  },

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxtjs/style-resources'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/sitemap',
    '@nuxt/content'
  ],

  generate: {
    async routes () {
      const { $content } = require('@nuxt/content')
      const quizzesSlug = await $content('quizzes').only(['slug']).fetch()
      const quizzesRoutes = Object.keys(quizzesSlug).map((key) => {
          return { route: `/kuis/${quizzesSlug[key].slug}` }
      })

      return [
        { route: '/', },
        { route: '/konverter', },
        ...quizzesRoutes
      ]
    },
    fallback: '404.html',
  },

  
}
