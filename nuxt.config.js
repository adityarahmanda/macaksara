const site_name = 'Macaksara';
const host = 'https://adityarahmanda.github.io';
const site_base = 'https://adityarahmanda.github.io/macaksara';
const router_base = '/macaksara';
const screenshot = 'https://adityarahmanda.github.io/macaksara/screenshot.png';
const description = `Macaksara merupakan website permainan kuis untuk menguji kemampuan membaca aksara Jawa yang didesain secara interaktif dan menyenangkan.`;

export default {
  target: 'static',
  
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    htmlAttrs: {
      lang: 'id-ID',
      prefix: 'og:http://ogp.me/ns#'
    },
    meta: [
      { hid: 'description', name: 'description', content: description },
      { name:'keyword', content:'macaksara, aksara, jawa, kuis, membaca, latihan, interaktif' },
      { property: 'og:description', content: description },
      { property: 'og:locale', content: 'id_ID' },
      { property: 'og:image', content: screenshot },
      { property: 'og:image:secure_url', content: screenshot },
      { property: 'og:image:width', content: '720' },
      { property: 'og:image:height', content: '354' },
      { property: 'og:image:alt', content: site_name },
      { property: 'og:image:type', content: 'image/png' },
      { property: 'fb:admins', content: '100005745649451' },
      { name: 'twitter:description', content: description },
      { name: 'twitter:site', content: '@arahmanda21' },    
      { name: 'twitter:creator', content: '@arahmanda21' },
      { name: 'twitter:card', content:'summary_large_image' },
      { name: 'twitter:image', content: screenshot },
      { name: 'twitter:image', content: screenshot },
      // { name: 'google-site-verification', content: 'xxxx' },
      // { name: 'yandex-verification', content: 'xxxx' },
      // { name: 'p:domain_verify', content: 'xxxx' },
      // { name: 'norton-safeweb-site-verification', content: 'xxxx' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: router_base + '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Mulish:wght@300;400;700;900&family=Noto+Sans+Javanese:wght@400;700&display=swap' },
      { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/fontawesome.min.css' },
      { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/solid.min.css' },
      { rel: 'manifest', href: router_base + '/manifest.json' }
    ],
    script: [
      { src: 'https://www.googletagmanager.com/gtag/js?id=G-J57JE933K5', async: true },
      { 
        type:'text/javascript', 
        innerHTML: `window.dataLayer = window.dataLayer || [];
  function gtag(){window.dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-J57JE933K5');`
      }
    ],
    __dangerouslyDisableSanitizers: ['script']
  },

  router: {
    base: router_base
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [ '~assets/scss/app.scss' ],

  sitemap: {
    hostname: host,
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

  pwa: {
    icon: false,
    manifest: false,
    meta: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1, viewport-fit=cover',
      mobileApp: true,
      mobileAppIOS: true,
      appleStatusBarStyle: 'default',
      theme_color: '#47311C',
      lang: 'id',
      ogHost: site_base,
      ogUrl: false,
      ogTitle: false,
      ogDescription: false,
      ogImage: false,
    },
    workbox: {
      offlineAnalytics: true,
      cleanupOutdatedCaches: true,
      offlineAssets: [
        'https://fonts.googleapis.com/css2?family=Mulish:wght@300;400;700;900&family=Noto+Sans+Javanese:wght@400;700&display=swap',
        'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/fontawesome.min.css',
        'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/solid.min.css',
        router_base + '/',
        router_base + '/konverter',
        router_base + '/manifest.json',
        router_base + '/quizzes.json',
        router_base + '/_nuxt/assets/sounds/correct.mp3',
        router_base + '/_nuxt/assets/sounds/tada.mp3',
        router_base + '/_nuxt/assets/sounds/wrong.mp3',
      ],
      cachingExtensions: '@/plugins/workbox-range-request.js'
    }
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
    '@nuxtjs/style-resources',
    '@nuxtjs/pwa'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/sitemap',
    '@nuxtjs/axios'
  ],

  generate: {
    fallback: '404.html',
  },
}
