<template>
    <div class="progress-bar" :style="progressBar">
        <div class="progress-bar-fill" :style="progressFill"></div>
    </div>
</template>

<script>
export default {
    props: {
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
    },
    computed: {
        progressBar() {
            return {
                'width': this.width ? this.width : null,
                'height': this.height >= 0 ? this.height + "px" : '0',
                'background-color': this.backgroundColor ? this.backgroundColor : null,
            };
        },
        progressFill() {
            return {
                'width': this.percentage >= 0 && this.percentage <= 100 ? this.percentage + '%' : '0%',
                'height': this.height >= 0 ? this.height + "px" : '0',
                'background-color': this.colorFill ? this.colorFill : null,
            };
        },
    }
}
</script>