<template>
    <div class="notification" :class="[{ 'visible' : visible, 'invisible' : !visible }, variant]">
        <fa v-if="icon !== ''" :icon="icon" style="margin-right: .5em;" />
        <b>{{ message }}</b>
    </div>
</template>

<script setup>
const props = defineProps({
    visible: {
        type: Boolean,
        default: false
    },
    icon: {
        type: String,
        default: ''
    },
    variant: {
        type: String,
        default: "primary"
    },
    message: {
        type: String,
        default: "Notification Message"
    },
})
</script>