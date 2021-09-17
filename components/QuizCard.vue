<template>
    <nuxt-link tag="div" :to="'quiz/' + quiz.id" class="quiz-card col-12 d-flex flex-column px-4 py-4">
        <div class="header d-flex flex-row justify-content-between">
            <div class="container px-0">
                <h3 class="theme">{{ quiz.theme }}</h3>
                <span v-if="!quizProgress.completed" >{{ quiz.level[quizProgress.level].questions.length }} kata</span>
                <span v-if="quizProgress.completed" >Terselesaikan</span>
            </div>
            <div class="d-flex flex-row justify-content-center align-items-center">
                <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" class="shield" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                    <g>
                        <path fill="none" d="M0 0h24v24H0z"></path>
                        <path d="M3.783 2.826L12 1l8.217 1.826a1 1 0 0 1 .783.976v9.987a6 6 0 0 1-2.672 4.992L12 23l-6.328-4.219A6 6 0 0 1 3 13.79V3.802a1 1 0 0 1 .783-.976z"></path>
                    </g>
                </svg>
                <div class="level position-absolute">{{ quiz.level[quizProgress.level].value }}</div>
            </div>
        </div>
        <div class="quiz-progress d-flex align-items-end mt-auto">
            <ProgressBar width="100%" height="8px" :percentage="quizProgress.completed ? '100%' : ((quizProgress.level / quiz.level.length) * 100) + '%'" background-color="var(--light-brown)" color-fill="#876741"/>
            <div class="d-flex justify-content-end" style="width: 36px; font-size: 16px; margin-bottom: -4px;">
                <fa icon="play" />
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
    }
}
</script>

<style>
.quiz-card {
    cursor: pointer;
    height: 160px;
    background-color: var(--brown);
    color: var(--light-brown);
    border-radius: 20px;
}

.quiz-card .header .theme {
    font-size: 18px;
    color: #ffffff;
}

.quiz-card .header .level {
    color: #47311C;
    font-size: 24px;
    font-weight: 900;
}

.quiz-card .header .shield {
    font-size: 48px;
    color: #876741;
}
</style>