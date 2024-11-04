<template>
    <div class="notification" :class="[{ 'visible' : visible, 'invisible' : !visible }, variant]">
        <i v-if="icon !== ''" class="fa fa-solid" :class="'fa-' + icon" style="margin-right: .5em;"></i>
        <span>{{ message }}</span>
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