<template>
    <div class="question container px-0 text-center">
        <div v-for="(syllable, index) in syllables" :key="index" class="syllable d-inline-block ml-4">
            <div :class="generateClass('aksara', index, 'mb-4')">{{ toJavaneseScript(syllable) }}</div>
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

<style>
.question .syllable:first-child {
    margin-left: 0 !important;
}

.question .syllable {
    -webkit-transition: .4s;
    transition: .4s;
}

.aksara, .latin {
    color: var(--gray);
}

.aksara {
    font-family: 'Noto-Sans-Javanese', 'Mulish', sans-serif;
    font-size: 42px;
}

.latin {
    font-size: 18px;
    height: 24px;
}

.current, .answered {
    color: var(--dark-brown);
}
</style>