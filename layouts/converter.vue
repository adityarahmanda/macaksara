<template>
    <div class="container d-flex flex-column" style="min-height: 100vh;">
        <Header title="Konverter Aksara" title-link="/konverter" :nav-items="navItems" />
        <Nuxt class="content" />
        <Footer/>
    </div>
</template>

<script>
export default {
    data() {
        return {
            navItems: [
                { title: "Macaksara", link: "/" },
                { title: "Belajar Aksara Jawa", link: "https://adityarahmanda.com/2022/04/30/belajar-aksara-jawa-lengkap-beserta-contohnya/" }
            ]
        }
    }
}
</script>