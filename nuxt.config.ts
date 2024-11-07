const site_name = 'Macaksara';
const host = 'https://adityarahmanda.github.io';
const router_base = '/macaksara/';
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
      link: [
        { rel: 'icon', type: 'image/x-icon', href: router_base + 'favicon.ico' }
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
    '@/assets/css/chota.min.css',
    '@/assets/scss/app.scss'
  ],

  plugins: [
    '~/plugins/macaksara-latintojava',
    '~/plugins/macaksara-utility'
  ],

  modules: [
    '@vite-pwa/nuxt',
    '@vesp/nuxt-fontawesome'
  ],

  pwa: {
    registerType: 'autoUpdate',
    workbox: { 
      clientsClaim: true,
      skipWaiting: true,
      cleanupOutdatedCaches: true,
      offlineGoogleAnalytics: true,
      globPatterns: [
        '**/*.{js,ts,html,css,png,ico,woff2,svg,json,mp3}',
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
  fontawesome: {
    component: 'fa',
    icons: {
      solid: ['play', 'user-group', 'hand', 'horse', 'dog', 'tree', 'spa', 'leaf', 'xmark', 'bars', 'volume-up', 'volume-mute', 'thumbs-up', 'check', 'sad-tear', 'fire'],
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