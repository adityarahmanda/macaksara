<template>
    <div class="notification" :class="[{ 'visible' : visible }, variant]">
        <i v-if="icon !== ''" class="fa fa-solid mr-2" :class="'fa-' + icon"></i>
        <span>{{ message }}</span>
    </div>
</template>

<script>
export default {
    props: {
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
    }
}
</script>