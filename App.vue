<template>
    <NuxtLayout />
</template>

<script setup>
const title = 'Macaksara';
const description = 'Macaksara merupakan website permainan kuis untuk menguji kemampuan membaca aksara Jawa yang didesain secara interaktif dan menyenangkan.';
const screenshot = 'https://adityarahmanda.github.io/macaksara/screenshot.png';

useSeoMeta({
    charset: 'utf-8',
    title: title,
    keywords: 'macaksara, aksara, jawa, kuis, membaca, latihan, interaktif',
    viewport: {
        width: 'device-width',
        initialScale: '1',
        viewportFit: 'cover'
    },
    ogLocale: 'id_ID',
    description: description,
    ogTitle: title,
    ogDescription: description,
    ogImage: screenshot,
    ogImageAlt: title,
    ogImageWidth: 720,
    ogImageHeight: 354,
    ogImageType: 'image/png',
    twitterCard: 'summary_large_image',
    twitterDescription: description,
    twitterImage: screenshot,
    twitterImageAlt: title,
    mobileWebAppCapable: 'yes',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'default',
    themeColor: '#47311c',
})
</script>