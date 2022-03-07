<template>
    <div v class="d-flex flex-column justify-content-center flex-grow-1" >
        <div class="text-center mb-2">
            <h1 v-if="error.statusCode === 404">Halaman tidak ditemukan</h1>
            <h1 v-else>Terjadi Kesalahan {{ error.statusCode }}</h1>
        </div>
        <div class="text-center">
            <nuxt-link to="/" class="font-weight-normal">Kembali ke beranda</nuxt-link>
        </div>
    </div>
</template>

<script>
  export default {
    props: {
        error: {
            type: Object,
            default() {
                return { }
            }
        }
    },
    head() {
        return {
            title: this.error.statusCode === 404 ? 'Halaman tidak ditemukan - Sinahu Aksara' : 'Terjadi Kesalahan ' + this.error.statusCode + ' - Sinahu Aksara',
        };
    },
  }
</script>