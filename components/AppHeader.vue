<template>
    <nav class="navbar py-3 mb-3 mb-md-4 navbar-light navbar-expand-md">
        <a target="_self" :href="titleLink">
            <h1 class="navbar-brand">{{ title }}</h1>
        </a> 
        <button type="button" aria-label="Toggle navigation" class="navbar-toggler d-md-none d-block collapsed" :aria-expanded="expanded" aria-controls="nav-collapse" style="overflow-anchor: none;" @click="toggleExpand">
            <i v-if="expanded" class="fa fa-solid fa-xmark"></i>
            <i v-else class="fa fa-solid fa-bars"></i>
        </button> 
        <div id="nav-collapse" :class="navCollapseClass">
            <ul class="navbar-nav ml-auto">
                <li v-for="item in navItems" :key="item.title" class="nav-item pl-0 pl-md-2">
                    <a :href="item.link" target="_self" class="nav-link">{{ item.title }}</a>
                </li>
            </ul>
        </div>
    </nav>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
    title: {
        type: String,
        default: 'Macaksara'
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