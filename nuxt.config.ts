const site_name = 'Macaksara';
const host = 'https://adityarahmanda.github.io';
const router_base = '/macaksara/';
const screenshot = 'https://adityarahmanda.github.io/macaksara/screenshot.png';
const description = `Macaksara merupakan website permainan kuis untuk menguji kemampuan membaca aksara Jawa yang didesain secara interaktif dan menyenangkan.`;

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  ssr: false,

  runtimeConfig: {
    public: {
      host: host,
      router_base: router_base
    }
  },

  app: {
    baseURL: router_base,
    head:{
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
        { rel: 'icon', type: 'image/x-icon', href: router_base + 'favicon.ico' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Mulish:wght@300;400;700;900&family=Noto+Sans+Javanese:wght@400;700&display=swap' },
        { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/fontawesome.min.css' },
        { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/solid.min.css' },
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
    },
  },

  css: [
    '@/assets/scss/app.scss'
  ],

  plugins: [
    '~/plugins/macaksara-latintojava',
    '~/plugins/macaksara-utility'
  ],

  modules: ['@vite-pwa/nuxt'],

  pwa: {
    registerType: 'autoUpdate',
    workbox: { 
      clientsClaim: true,
      skipWaiting: true,
      cleanupOutdatedCaches: true,
      offlineGoogleAnalytics: true,
      globPatterns: [
        '**/*.{js,html,css,png,ico,woff2,svg,json,mp3}',
      ],
      runtimeCaching: [
        {
          urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
          handler: 'CacheFirst',
          options: {
            cacheName: 'workbox-google-fonts-cache',
            expiration: {
              maxEntries: 10,
              maxAgeSeconds: 60 * 60 * 24 * 365 // <== 365 days
            },
            cacheableResponse: {
              statuses: [0, 200]
            }
          }
          },
          {
          urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
          handler: 'CacheFirst',
          options: {
            cacheName: 'workbox-gstatic-fonts-cache',
            expiration: {
              maxEntries: 10,
              maxAgeSeconds: 60 * 60 * 24 * 365 // <== 365 days
            },
            cacheableResponse: {
              statuses: [0, 200]
            },
          }
        }
      ]
    },
    manifest: {
      "name": site_name,
      "short_name": site_name,
      "description": description,
      "scope": router_base,
      "start_url": router_base + "?standalone=true",
      "display": "standalone",
      "background_color": "#ffffff",
      "theme_color": "#47311c",
      "icons": [
          {
              "src": "pwa-64x64.png",
              "type": "image/png",
              "sizes": "64x64",
              "purpose": "any"
          },
          {
              "src": "pwa-192x192.png",
              "type": "image/png",
              "sizes": "192x192",
              "purpose": "any"
          },
          {
              "src": "pwa-512x512.png",
              "type": "image/png",
              "sizes": "512x512",
              "purpose": "any"
          },
          {
              "src": "maskable-icon-512x512.png",
              "type": "image/png",
              "sizes": "512x512",
              "purpose": "maskable"
          }
      ],
      "screenshots": [
          {
              "src": "screenshot-narrow.png",
              "type": "image/jpg",
              "sizes": "414x720",
              "form_factor": "narrow"
          },
          {
              "src": "screenshot.png",
              "type": "image/jpg",
              "sizes": "720x354",
              "form_factor": "wide"
          }
      ]
    }
  },
  generate: {
    routes: [
      '/',
      '/konverter',
      '/privacy-policy',
      '/kuis'
    ]
  }
})