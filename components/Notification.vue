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