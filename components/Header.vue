<template>
    <b-navbar toggleable="md" class="py-3 mb-3 mb-md-4">
        <b-navbar-brand :href="titleLink">{{ title }}</b-navbar-brand>
        <b-navbar-toggle class="d-md-none d-block" target="nav-collapse">
            <template #default="{ expanded }">
                <i v-if="expanded" class="fa fa-solid fa-xmark"></i>
                <i v-else class="fa fa-solid fa-bars"></i>
            </template>
        </b-navbar-toggle>
        <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav class="ml-auto">
                <b-nav-item v-for="item in navItems" :key="item.title" :href="item.link" class="pl-0 pl-md-2">{{ item.title }}</b-nav-item>
            </b-navbar-nav>
        </b-collapse>
    </b-navbar>
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