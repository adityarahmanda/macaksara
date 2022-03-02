<template>
    <div class="container d-flex flex-column" style="min-height: 100vh;">
        <Header title="Konverter Aksara" title-link="/konverter" :nav-items="navItems" />
        <Nuxt />
        <Footer/>
    </div>
</template>

<script>
export default {
    data() {
        return {
            navItems: [
                { title: "Sinahu Aksara", link: "/" },
                { title: "Tentang Aksara Jawa", link: "/aksara-jawa" }
            ]
        }
    }
}
</script>