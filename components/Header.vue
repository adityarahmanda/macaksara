<template>
    <header id="header" class="row navbar navbar-expand-md py-3 mb-3 mb-md-4">
        <input id="navbar-toggler-checkbox" type="checkbox" class="d-none" />
        <div class="navbar-brand">
            <nuxt-link :to="titleLink">{{ title }}</nuxt-link>
        </div>
        <label for="navbar-toggler-checkbox" class="navbar-toggler" aria-label="Toggle navigation">
            <i class="fa-solid fa-bars"></i>
        </label>
        <nav class="navbar-collapse">
            <ul class="navbar-nav ml-auto">
                <li v-for="item in navItems" :key="item.title" class="menu-item pl-0 pl-md-2">
                    <nuxt-link :to="item.link" class="nav-link">{{ item.title }}</nuxt-link>
                </li>
            </ul>
        </nav>
    </header>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            default: 'Macaksara'
        },
        titleLink: {
            type: String,
            default: '/'
        },
        navItems: {
            type: Array,
            default() {
                return [
                    { title: 'Belajar Aksara Jawa', link: '/aksara-jawa' },
                    { title: 'Konverter Aksara', link: '/konverter' },
                ]
            }
        }
    }
}
</script>