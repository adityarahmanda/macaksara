export default {
  target: 'static',
  
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    htmlAttrs: {
      lang: 'id'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Mulish:wght@300;400;700;900&family=Noto+Sans+Javanese:wght@400;700&display=swap' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Noto+Sans+Javanese:wght@400;700&display=swap' },
      { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/fontawesome.min.css' },
      { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/solid.min.css' }

    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [ '~assets/scss/app.scss' ],

  loading: {
    color: '#47311C'
  },

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/vue-bootstrap',
    '~/plugins/sinahubasa-latintojava',
    '~/plugins/sinahubasa-javatolatin',
    '~/plugins/sinahubasa-utility'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    '@nuxtjs/style-resources',
    'nuxt-use-sound'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    // 'bootstrap-vue/nuxt',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxt/content'
  ],

  generate: {
    async routes () {
      const { $content } = require('@nuxt/content')
      const quizzesSlug = await $content('quizzes').only(['slug']).fetch()
      const quizzesRoutes = Object.keys(quizzesSlug).map((key) => {
          return { route: `/${quizzesSlug[key].slug}` }
      })

      return [
        { route: '/' },
        ...quizzesRoutes
      ]
    },
    fallback: '404.html',
  },

  /*
  ** Sounds
  */
  sound: {
    correct: {
      src: "/sounds/correct.mp3",
      options: {
        volume: 1
      }
    },
    wrong: {
      src: "/sounds/wrong.mp3",
      options: {
        volume: 1
      }
    },
    tada: {
      src: "/sounds/tada.mp3",
      options: {
        volume: 1
      }
    },
  }

}
