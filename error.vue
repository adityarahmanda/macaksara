<template>
    <div class="container d-flex flex-column" style="min-height: 100vh;">
        <AppHeader />
            <div v class="d-flex flex-column justify-content-center flex-grow-1" >
                <div class="text-center mb-2">
                    <h1 v-if="error.statusCode === 404">Halaman tidak ditemukan</h1>
                    <h1 v-else>Terjadi Kesalahan {{ error.statusCode }}</h1>
                </div>
                <div class="text-center">
                    <nuxt-link to="/" class="font-weight-normal">Kembali ke beranda</nuxt-link>
                </div>
            </div>
        <AppFooter />
    </div>
</template>

<script setup>
const props = defineProps({
    error: {
        type: Object,
        default() {
            return { }
        }
    }
})

useHead({
    title: props.error.statusCode === 404 ? 'Halaman tidak ditemukan — Macaksara' : 'Terjadi Kesalahan ' + props.error.statusCode + ' - Macaksara',
});
</script>