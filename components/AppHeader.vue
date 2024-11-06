<template>
    <nav class="nav">
        <div class="nav-left nav-brand">
            <a class="brand" :href="titleLink">{{ title }}</a>
            <button class="toggler" @click="toggleExpand">
                <i v-if="expanded" class="fa fa-solid fa-xmark"></i>
                <i v-else class="fa fa-solid fa-bars"></i>
            </button>
        </div>
        <div class="nav-collapse nav-collapse-md" :class="[{'show' : expanded}]" style="width: 100%;">
            <div>
                <a v-for="item in navItems" :key="item.title" :href="item.link" target="_self">{{ item.title }}</a>
            </div>
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