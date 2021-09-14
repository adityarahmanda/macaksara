<template>
    <div class="position-relative" :style="progressBar">
        <div class="progress-bar-fill position-absolute" :style="progressFill"></div>
    </div>
</template>

<script>
export default {
    props: {
        width: {
            type: String,
            default: '100%'
        },
        height: {
            type: String,
            default: '12px'
        },
        percentage: {
            type: String,
            default: '0'
        },
        backgroundColor: {
            type: String,
            default: 'var(--light-brown)'
        },
        colorFill: {
            type: String,
            default: 'var(--dark-brown)'
        }
    },
    computed: {
        progressBar() {
            return {
                'width': this.width,
                'height': this.height,
                'background-color': this.backgroundColor,
                'border-radius': '9999px'
            };
        },
        progressFill() {
            return {
                'width': this.percentage,
                'height': this.height,
                'background-color': this.colorFill,
                'border-radius': '9999px'
            };
        },
    }
}
</script>

<style>
.progress-bar-fill{
    -webkit-transition: .4s;
    transition: .4s;
}
</style>