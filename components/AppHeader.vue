<template>
    <nav class="nav" style="height: 96px; margin-bottom: 1em;">
        <div class="nav-left">
            <a class="brand" :href="titleLink">{{ title }}</a>
        </div>
        <div class="nav-right">
            <a v-for="item in navItems" :key="item.title" :href="item.link" target="_self">{{ item.title }}</a>
        </div>
    </nav>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
    title: {
        type: String,
        default: 'macaksara'
    },
    titleLink: {
        type: String,
        default: '/macaksara'
    },
    navItems: {
        type: Array,
        default() {
            return [
                { title: 'Belajar Aksara Jawa', link: 'https://adityarahmanda.github.io/artikel/belajar-aksara-jawa' },
                { title: 'Alih Aksara', link: 'https://adityarahmanda.github.io/alih-aksara' },
            ]
        }
    }
})

const expanded = ref(false)
const navCollapseClass = ref('navbar-collapse collapse')

const toggleExpand = () => {
    expanded.value = !expanded.value
    navCollapseClass.value = expanded.value ? 'navbar-collapse collapse show' : 'navbar-collapse collapse'
}
</script>