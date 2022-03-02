<template>
    <nuxt-link tag="div" :to="'quiz/' + quiz.id" class="quiz-card text-light bg-secondary cursor-pointer col-12 d-flex flex-column px-4 py-4">
        <div class="header d-flex flex-row justify-content-between">
            <div class="container px-0">
                <h3 class="text-white">{{ quiz.theme }}</h3>
                <div class="status">
                    <span v-if="!quizProgress.completed" >{{ quiz.level[quizProgress.level].questions.length }} kata</span>
                    <span v-if="quizProgress.completed" >Terselesaikan</span>
                </div>
            </div>
            <div class="d-flex flex-row justify-content-center align-items-center">
                <i class="shield-icon fa-solid fa-shield-blank"></i>
                <div class="level font-weight-bold text-primary position-absolute">
                    {{ quiz.level[quizProgress.level].value }}
                </div>
            </div>
        </div>
        <div class="quiz-progress d-flex align-items-end mt-auto">
            <ProgressBar height="8px" :percentage="progressBarValue"/>
            <div class="play-icon d-flex justify-content-end">
                <i class="fa-solid fa-play"></i>
            </div>
        </div>
    </nuxt-link>
</template>

<script>
export default {
    props: {
        quiz: {
            type: Object,
            default() {
                return {};
            }
        },
        quizProgress: {
            type: Object,
            default() {
                return {};
            },
        },
    },
    computed: {
        progressBarValue() {
            if(this.quizProgress.completed) return 100;
            return this.quizProgress.level / this.quiz.level.length * 100;
        }
    }
}
</script>

<style lang="scss">
.quiz-card {
    height: 160px;
    cursor: pointer;
    border-radius: 20px;

    .level {
        font-size: 24px;
    }

    .shield-icon {
        color: $light-brown;
        font-size: 48px;
    }

    .play-icon {
        width: 36px;
        margin-bottom: -4px;
    }
}
</style>