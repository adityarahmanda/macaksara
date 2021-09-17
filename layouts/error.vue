<template>
    <div v class="d-flex flex-column justify-content-center align-items-center flex-grow-1" >
        <div class="mb-2">
            <h5 v-if="error.statusCode === 404">Halaman tidak ditemukan</h5>
            <h5 v-else>Terjadi Kesalahan {{ error.statusCode }}</h5>
        </div>
        <div>
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
            title: this.error.statusCode === 404 ? 'Halaman tidak ditemukan - Sinahu Aksara' : 'Terjadi Kesalahan' + this.error.statusCode + ' - Sinahu Aksara',
        };
    },
  }
</script>