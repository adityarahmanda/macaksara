<template>
    <nuxt-link v-slot="{ navigate }" :to="'/' + slug" custom>
        <div class="quiz-card px-4 py-4" :class="{ 'is-loading' : isLoading }" @click="navigate">
            <div class="quiz-card-header">
                <div class="quiz-card-header-title-and-status">
                    <h3 class="quiz-card-header-title mb-0">
                        <span v-if="!isLoading">{{ title }}</span>
                    </h3>
                    <div class="quiz-card-title-translation">
                        <span v-if="!isLoading">{{ titleTranslation }}</span>
                    </div>
                </div>
                <div class="quiz-card-icon">
                    <i class="fa fa-solid" :class="icon"></i>
                </div>
            </div>
            <div class="quiz-card-content">
                <div class="quiz-card-status mb-1">
                    <span v-if="!isCompleted && !isLoading">Level {{ currentLevel }} / {{ maxLevel }}</span>
                    <span v-if="isCompleted && !isLoading">Terselesaikan</span>
                </div>
                <div class="quiz-card-progress-bar">
                    <ProgressBar :height="8" :percentage="progressBarValue"/>
                    <div class="play-icon">
                        <i class="fa fa-solid fa-play"></i>
                    </div>
                </div>
            </div>
        </div>
    </nuxt-link>
</template>

<script>
export default {
    props: {
        slug: {
            type: String,
            default: ""
        },
        title: {
            type: String,
            default: "Nama Kuis"
        },
        titleTranslation: {
            type: String,
            default: "Terjemahan Nama Kuis"
        },
        icon: {
            type: String,
            default: ""
        },
        questionTotal: {
            type: Number,
            default: 0
        },
        currentLevel: {
            type: Number,
            default: 0
        },
        maxLevel: {
            type: Number,
            default: 0
        },
        isCompleted: {
            type: Boolean,
            default: false
        },
        isLoading: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        progressBarValue() {
            return (this.currentLevel / this.maxLevel) * 100;
        }
    }
}
</script>