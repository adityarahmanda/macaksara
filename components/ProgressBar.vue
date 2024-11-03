<template>
    <div class="progress-bar" :style="progressBar">
        <div class="progress-bar-fill" :style="progressFill"></div>
    </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
    width: {
        type: String,
        default: null
    },
    height: {
        type: Number,
        default: 12
    },
    percentage: {
        type: Number,
        default: 0
    },
    backgroundColor: {
        type: String,
        default: null
    },
    colorFill: {
        type: String,
        default: null
    }
})

const progressBar = computed(() => ({
  'width': props.width ? props.width : null,
  'height': props.height >= 0 ? props.height + "px" : '0',
  'background-color': props.backgroundColor ? props.backgroundColor : null,
}))

const progressFill = computed(() => ({
  'width': props.percentage >= 0 && props.percentage <= 100 ? props.percentage + '%' : '0%',
  'height': props.height >= 0 ? props.height + "px" : '0',
  'background-color': props.colorFill ? props.colorFill : null,
}))
</script>