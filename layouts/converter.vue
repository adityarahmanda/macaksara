<template>
    <div class="container d-flex flex-column" style="min-height: 100vh;">
        <Header title="Konverter Aksara" title-link="/macaksara/konverter" :nav-items="navItems" />
        <Nuxt class="content" />
        <Footer/>
    </div>
</template>

<script>
export default {
    data() {
        return {
            navItems: [
                { title: "Macaksara", link: '/macaksara' },
                { title: "Belajar Aksara Jawa", link: "#" }
            ]
        }
    }
}
</script>