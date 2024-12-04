<template>
    <div>
        <div class="row">
            <div class="col-12" style="margin-bottom: 2em;">
                <div 
                    v-if="isLearningAngka"
                    ref="angkaPrefix"
                    class="aksara-syllable answered"
                    style="display: inline-block"
                >
                    <span>꧇</span>
                </div>
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
                    <span>{{ $convert(syllable, true, isMurda, isDipthong) }}</span>
                </div>
                <div 
                    v-if="isLearningAngka"
                    ref="angkaPostfix"
                    class="aksara-syllable answered"
                    style="display: inline-block"
                >
                    <span>꧇</span>
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
const { $convert } = useNuxtApp()

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
    isLearningAngka: {
        type: Boolean,
        default: false
    },
    isMurda: {
        type: Boolean,
        default: false
    },
    isDipthong: {
        type: Boolean,
        default: false
    },
    isLoading: {
        type: Boolean,
        default: true
    }
})

const spacer = ref(10)
const mobileBreakpoint = ref(768)
const mobileSpacer = ref(5)
const angkaPrefix = ref(null)
const angkaPostfix = ref(null)
const latinSyllables = ref(null)
const aksaraSyllables = ref(null)

const isMobile = () => {
  return screen.width <= mobileBreakpoint.value
}

const adjustStyle = () => {
    if(props.questionAnswered) {
        if (angkaPrefix.value)
        {
            angkaPrefix.value.style.transition = 'all .4s ease-out';
            angkaPrefix.value.style.width = angkaPrefix.value.firstChild.offsetWidth  + 1 + 'px';
        }

        if (angkaPostfix.value)
        {
            angkaPostfix.value.style.transition = 'all .4s ease-out';
            angkaPostfix.value.style.width = angkaPostfix.value.firstChild.offsetWidth  + 1 + 'px';
        }
            
        for(let i = 0; i < props.syllables.length; i++) {
            aksaraSyllables.value[i].style.transition = 'all .4s ease-out';
            aksaraSyllables.value[i].style.width = aksaraSyllables.value[i].firstChild.offsetWidth  + 1 + 'px';

            latinSyllables.value[i].style.transition = 'all .4s ease-out';
            latinSyllables.value[i].style.width = latinSyllables.value[i].firstChild.offsetWidth + 1 + 'px';
        }
    }

    if(!props.questionAnswered) {
        if (angkaPrefix.value)
        {
            angkaPrefix.value.style.transition = 'none';
            angkaPrefix.value.style.width = angkaPrefix.value.firstChild.offsetWidth  + 1 + 'px';
        }

        if (angkaPostfix.value)
        {
            angkaPostfix.value.style.transition = 'none';
            angkaPostfix.value.style.width = angkaPostfix.value.firstChild.offsetWidth  + 1 + 'px';
        }

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