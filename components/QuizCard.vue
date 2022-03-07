<template>
    <nuxt-link v-slot="{ navigate }" :to="'quiz/' + quizId" custom>
        <div class="quiz-card px-4 py-4" :class="{ 'is-loading' : isLoading }" @click="navigate">
            <div class="quiz-card-header">
                <div class="quiz-card-header-title-and-status">
                    <h3 class="quiz-card-header-title">
                        <span v-if="!isLoading">{{ title }}</span>
                    </h3>
                    <p class="quiz-card-header-status">
                        <span v-if="!isCompleted && !isLoading" >{{ questionTotal }} kata</span>
                        <span v-if="isCompleted && !isLoading">Terselesaikan</span>
                    </p>
                </div>
                <div class="quiz-card-header-level">
                    <div class="shield-icon">
                        <i class="fa-solid fa-shield-blank"></i>
                        <div class="text-level">
                            <span v-if="!isLoading">{{ currentLevel }}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="quiz-card-content">
                <ProgressBar :height="8" :percentage="progressBarValue"/>
                <div class="play-icon">
                    <i class="fa-solid fa-play"></i>
                </div>
            </div>
        </div>
    </nuxt-link>
</template>

<script>
export default {
    props: {
        quizId: {
            type: String,
            default: ""
        },
        title: {
            type: String,
            default: "Nama Kuis"
        },
        questionTotal: {
            type: Number,
            default: 0
        },
        currentLevel: {
            type: Number,
            default: 0
        },
        progressBarValue: {
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
    }
}
</script>