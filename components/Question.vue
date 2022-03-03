<template>
    <div>
        <div v-for="(syllable, index) in syllables" :key="index" class="syllable d-inline-block mx-1 mx-md-2">
            <div class="aksara mb-4" :class="{ 'current' : index === currentSyllable, 'answered' : index < currentSyllable }">
                {{ latinToJava(syllable) }}
            </div>
            <div class="latin mb-4" :class="{ 'current' : index === currentSyllable, 'answered' : index < currentSyllable }">
                <span v-if="questionAnswered || index < currentSyllable">{{ syllable }}</span>
                <span v-else>...</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        currentSyllable: {
            type: Number,
            default: 0
        },
        syllables: {
            type: Array,
            default() {
                return [];
            }
        },
        questionAnswered: {
            type: Boolean,
            default: false
        }
    }
}
</script>