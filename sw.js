if(!self.define){let e,n={};const r=(r,i)=>(r=new URL(r+".js",i).href,n[r]||new Promise((n=>{if("document"in self){const e=document.createElement("script");e.src=r,e.onload=n,document.head.appendChild(e)}else e=r,importScripts(r),n()})).then((()=>{let e=n[r];if(!e)throw new Error(`Module ${r} didn’t register its module`);return e})));self.define=(i,s)=>{const u=e||("document"in self?document.currentScript.src:"")||location.href;if(n[u])return;let l={};const o=e=>r(e,u),d={module:{uri:u},exports:l,require:o};n[u]=Promise.all(i.map((e=>d[e]||o(e)))).then((e=>(s(...e),l)))}}define(["./workbox-a9919d05"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"_nuxt/B9K5rw8f.js",revision:null},{url:"_nuxt/BciU-0MC.js",revision:null},{url:"_nuxt/Bmxv4p--.js",revision:null},{url:"_nuxt/builds/latest.json",revision:"3e783c8fb9b87fac5518dde1a125d31d"},{url:"_nuxt/builds/meta/e0de48e8-ece8-4057-847e-180db3e71101.json",revision:null},{url:"_nuxt/Ck3MBdHB.js",revision:null},{url:"_nuxt/D_ZNhnqQ.js",revision:null},{url:"_nuxt/D31_rQWa.js",revision:null},{url:"_nuxt/D4c6mE3O.js",revision:null},{url:"_nuxt/DGVnGjUO.js",revision:null},{url:"_nuxt/entry.Cs_rZFEx.css",revision:null},{url:"_nuxt/mulish.D4u9DX0e.woff2",revision:null},{url:"_nuxt/noto-javanese.kaVH-UFi.woff2",revision:null},{url:"_nuxt/T8m_0-Gu.js",revision:null},{url:"_nuxt/VFszMIRn.js",revision:null},{url:"_nuxt/YodewJAv.js",revision:null},{url:"200",revision:"326ad784f6debd9823ebd07653e16223"},{url:"404",revision:"7071bbe9f067910b55b4577a1a371542"},{url:"favicon.ico",revision:"383011e32098bb10c1c3f8ec44b240b0"},{url:"/macaksara/",revision:"7071bbe9f067910b55b4577a1a371542"},{url:"konverter",revision:"326ad784f6debd9823ebd07653e16223"},{url:"kuis",revision:"326ad784f6debd9823ebd07653e16223"},{url:"maskable-icon-512x512.png",revision:"7657285d83cf7a46e0dbae07479a9eb2"},{url:"privacy-policy",revision:"326ad784f6debd9823ebd07653e16223"},{url:"pwa-192x192.png",revision:"cdaa439e7664662d7221005107ba4ec3"},{url:"pwa-512x512.png",revision:"c159e69b92015aaf0bbdb875e311abcb"},{url:"pwa-64x64.png",revision:"1869e2d7f38da183df7c051fdac3528c"},{url:"quizzes.json",revision:"dda6b65f75c1c0482579fe0a0375401c"},{url:"screenshot-narrow.png",revision:"282e1f24525fa425fbd6477198451c1a"},{url:"screenshot.png",revision:"6edc08bda26c7557a6163bb797ba827d"},{url:"sounds/correct.mp3",revision:"c999f7d100f91cfeaf3e23546c3f3981"},{url:"sounds/tada.mp3",revision:"633ec0c9ae3ed7f16a1e4da13d88d827"},{url:"sounds/wrong.mp3",revision:"8ff93e005530a39ddfc9b295fc93dd01"},{url:"manifest.webmanifest",revision:"b58317ee4d3d4305d8a6c7a58d56da16"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("/macaksara/"))),e.initialize({})}));
