<template>
    <nav class="nav">
        <div class="nav-left nav-brand">
            <a class="brand" :href="titleLink">{{ title }}</a>
            <button class="toggler" @click="toggleExpand">
                <fa v-if="expanded" icon="xmark" />
                <fa v-else icon="bars" />
            </button>
        </div>
        <div class="nav-right nav-collapse nav-collapse-md" :class="[{'show' : expanded}]" style="width: 100%; flex-basis: auto;">
            <div>
                <a v-for="item in navItems" :key="item.title" :href="item.link" target="_self" style="padding: 1rem 1rem;">{{ item.title }}</a>
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
                { title: 'Alih Aksara', link: 'https://adityarahmanda.github.io/alih-aksara' }
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