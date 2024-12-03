<template>
    <div>
        <div class="row">
            <div class="col-12" style="margin-bottom: 2em;">
                <div 
                    v-for="(syllable, i) in syllables"
                    :key="i" 
                    ref="aksaraSyllables"
                    class="aksara-syllable"
                    style="display: inline-block"
                    :class="{ 
                        'current' : i === currentSyllable,
                        'answered' : i < currentSyllable
                    }"
                >
                    <span>{{ latinToJava(syllable, true, isMurda) }}</span>
                </div>
            </div>
            <div class="col-12" style="margin-bottom: 0;">
                <div
                    v-for="(syllable, i) in syllables" 
                    :key="i"
                    ref="latinSyllables"
                    class="latin-syllable" 
                    style="display: inline-block"
                    :class="{ 
                        'current' : i === currentSyllable,
                        'answered' : i < currentSyllable
                    }"
                >
                    <span v-if="questionAnswered || i < currentSyllable">{{ syllable }}</span>
                    <span v-else>...</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const props = defineProps({
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
    },
    isMurda: {
        type: Boolean,
        default: true
    },
    isLoading: {
        type: Boolean,
        default: true
    }
})

const spacer = ref(10)
const mobileBreakpoint = ref(768)
const mobileSpacer = ref(5)

const latinSyllables = ref(null)
const aksaraSyllables = ref(null)

const isMobile = () => {
  return screen.width <= mobileBreakpoint.value
}

const adjustStyle = () => {
    if(props.questionAnswered) {
        for(let i = 0; i < props.syllables.length; i++) {
            latinSyllables.value[i].style.transition = 'all .4s ease-out';
            aksaraSyllables.value[i].style.width = aksaraSyllables.value[i].firstChild.offsetWidth  + 1 + 'px';

            aksaraSyllables.value[i].style.transition = 'all .4s ease-out';
            latinSyllables.value[i].style.width = latinSyllables.value[i].firstChild.offsetWidth + 1 + 'px';
        }
    }

    if(!props.questionAnswered) {
        for(let i = 0; i < props.syllables.length; i++) {
            aksaraSyllables.value[i].style.transition = 'none';
            aksaraSyllables.value[i].style.width = (aksaraSyllables.value[i].firstChild.offsetWidth + 1 + spacer.value) + 'px';

            latinSyllables.value[i].style.transition = 'none';
            latinSyllables.value[i].style.width = aksaraSyllables.value[i].offsetWidth + 1 + 'px';
        }
    }
}

watch(() => props.questionAnswered, () => {
  nextTick(() => { adjustStyle(); })
})

watch(() => props.isLoading, (newValue) => {
  if (!newValue) {
    nextTick(() => { adjustStyle(); })
  }
})

onMounted(() => {
  if (isMobile()) {
    spacer.value = mobileSpacer.value
  }
})
</script>