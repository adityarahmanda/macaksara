<template>
    <nuxt-link v-slot="{ navigate }" :to="'/kuis/' + slug" custom>
        <div class="quiz-card" :class="{ 'is-loading' : isLoading }" style="padding: 1em;" @click="navigate">
            <div class="quiz-card-header">
                <div class="quiz-card-header-title-and-status">
                    <h3 class="quiz-card-header-title" style="margin-top: 0; margin-bottom: 0">
                        <span v-if="!isLoading">{{ title }}</span>
                    </h3>
                    <div class="quiz-card-title-translation" style="margin-top: 0;">
                        <span v-if="!isLoading">{{ description }}</span>
                    </div>
                </div>
                <div class="quiz-card-icon">
                    <!-- <fa :icon="icon" /> -->
                </div>
            </div>
            <div class="quiz-card-content">
                <div class="quiz-card-status">
                    <span v-if="!isCompleted && !isLoading">Level {{ currentLevel }} / {{ maxLevel }}</span>
                    <span v-if="isCompleted && !isLoading">Selesai</span>
                </div>
                <div class="quiz-card-progress-bar">
                    <ProgressBar :height="8" :percentage="progressBarValue"/>
                    <div class="play-icon">
                        <fa icon="play" />
                    </div>
                </div>
            </div>
        </div>
    </nuxt-link>
</template>

<script setup>
const props = defineProps({
    slug: {
        type: String,
        default: ""
    },
    title: {
        type: String,
        default: "Nama Kuis"
    },
    description: {
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
})

const progressBarValue = computed(() => {
  if (props.isCompleted) return 100;

  return ((props.currentLevel - 1) / props.maxLevel) * 100;
})
</script>