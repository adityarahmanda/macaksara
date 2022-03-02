<template>
    <div class="question container px-0 text-center">
        <div v-for="(syllable, index) in syllables" :key="index" class="syllable d-inline-block mx-1 mx-md-2">
            <div :class="generateClass('aksara', index, 'mb-4')">{{ latinToJava(syllable) }}</div>
            <div :class="generateClass('latin', index, 'mb-5')">{{ generateAnswer(index, syllable) }}</div>
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
    },
    methods: {
        generateClass(base, index, optional = '') {
            let generatedClass = base;
            
            if(index === this.currentSyllable) {
                generatedClass += " current";
            }
            
            if(index < this.currentSyllable) {
                generatedClass += " answered";
            }

            if(optional !== '') {
                generatedClass += " " + optional;
            }
            
            return generatedClass;
        },
        generateAnswer(index, syllable) {
            if(this.questionAnswered || index < this.currentSyllable) {
                return syllable;
            }
            return '...';
        }
    }
}
</script>