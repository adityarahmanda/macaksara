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
            type: String,
            default: null
        },
        percentage: {
            type: Number,
            default: null
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
                'height': this.height ? this.height : null,
                'background-color': this.backgroundColor ? this.backgroundColor : null,
            };
        },
        progressFill() {
            return {
                'width': this.percentage ? this.percentage + '%' : '5%',
                'height': this.height ? this.height : null,
                'background-color': this.colorFill ? this.colorFill : null,
            };
        },
    }
}
</script>