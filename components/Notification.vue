<template>
    <div :class="show ? 'notification visible position-absolute px-4 py-1' : 'notification position-absolute px-4 py-1'" :style="'background-color: ' + color">
        <fa v-if="icon !== ''" :icon="icon" class="mr-2" />{{ message }}
    </div>
</template>

<script>
export default {
    props: {
        show: {
            type: Boolean,
            default: false
        },
        icon: {
            type: String,
            default: ""
        },
        color: {
            type: String,
            default: "var(--dark-brown)"
        },
        message: {
            type: String,
            default: ""
        }
    }
}
</script>

<style>
.notification {
    color: #ffffff;
    font-size: 16px;
    font-weight: 700;
    background-color: var(--dark-brown);
    border-radius: 15px;
    bottom: 52px;
    animation: notification;
    visibility: hidden;
    opacity: 0;
    -webkit-transition: .4s;
    transition: .4s;
}

.notification.visible {
    visibility: visible;
    opacity: 1;
    transform: translateY(-12px);
}
</style>