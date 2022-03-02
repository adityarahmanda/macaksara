<template>
    <div :class="show ? 'notification visible position-absolute px-4 py-1' : 'notification position-absolute px-4 py-1'" :style="'background-color: ' + notification.color">
        <i v-if="notification.icon !== ''" class="fa-solid" :class="'fa-' + notification.icon"></i>
        {{ notification.message }}
    </div>
</template>

<script>
export default {
    props: {
        show: {
            type: Boolean,
            default: false
        },
        notification: {
            type: Object,
            default() {
                return {
                    icon: "",
                    color: "var(--dark-brown)",
                    message: ""
                }
            }
        },
        
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