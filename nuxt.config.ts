const site_name = 'Macaksara';
const host = 'https://adityarahmanda.github.io';
const site_base = 'https://adityarahmanda.github.io/macaksara';
const router_base = '/macaksara';
const screenshot = 'https://adityarahmanda.github.io/macaksara/screenshot.png';
const description = `Macaksara merupakan website permainan kuis untuk menguji kemampuan membaca aksara Jawa yang didesain secara interaktif dan menyenangkan.`;

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  // Global page headers: https://go.nuxtjs.dev/config-head
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
    },
  },
  css: [
    '@/assets/scss/app.scss'
  ],
  plugins: [
    '~/plugins/macaksara-latintojava',
    '~/plugins/macaksara-javatolatin',
    '~/plugins/macaksara-utility'
  ],
})
