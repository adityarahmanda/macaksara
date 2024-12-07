const site_name = 'Macaksara';
const host = 'https://adityarahmanda.github.io';
const router_base = '/macaksara/';
const screenshot = 'https://adityarahmanda.github.io/macaksara/screenshot.png';
const description = `Macaksara merupakan website permainan kuis untuk menguji kemampuan membaca aksara Jawa yang didesain secara interaktif dan menyenangkan.`;

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },

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
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1, viewport-fit=cover' },
        { name:"mobile-web-app-capable", content:"yes" },
        { name:"apple-mobile-web-app-capable", content:"yes" },
        { name:"apple-mobile-web-app-status-bar-style", content:"default" },
        { name:"theme-color", content:"#47311c" },
        { name:"google-site-verification", content:"f1-0Yi6e3RKJjV4zbh94coGiNGf9aze04uLuILtGI00" },
        { hid: 'title', name: 'title', content: site_name },
        { hid: 'description', name: 'description', content: description },
        { name:'keyword', content:'macaksara, aksara, jawa, kuis, membaca, latihan, interaktif' },
        { property: 'og:title', content: site_name },
        { property: 'og:url', content: host + router_base },
        { property: 'og:description', content: description },
        { property: 'og:locale', content: 'id_ID' },
        { property: 'og:image', content: screenshot },
        { property: 'og:image:secure_url', content: screenshot },
        { property: 'og:image:width', content: '720' },
        { property: 'og:image:height', content: '354' },
        { property: 'og:image:alt', content: site_name },
        { property: 'og:image:type', content: 'image/png' },
        { property: 'fb:admins', content: '100005745649451' },
        { name: 'twitter:title', content: site_name },
        { name: 'twitter:url', content: host + router_base },
        { name: 'twitter:description', content: description },
        { name: 'twitter:site', content: '@arahmanda21' },    
        { name: 'twitter:creator', content: '@arahmanda21' },
        { name: 'twitter:card', content:'summary_large_image' },
        { name: 'twitter:image', content: screenshot },
        // { name: 'yandex-verification', content: 'xxxx' },
        // { name: 'p:domain_verify', content: 'xxxx' },
        // { name: 'norton-safeweb-site-verification', content: 'xxxx' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: router_base + 'favicon.ico' },
		    { rel:"mask-icon", href: router_base + 'maskable-icon-512x512.png', color:'#FFFFFF' }
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