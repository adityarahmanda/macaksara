<template>
    <div>
        <div class="row">
            <div class="col-12 mb-5">
                <div 
                    v-for="(syllable, i) in syllables"
                    :key="i" 
                    ref="aksaraSyllables"
                    class="aksara-syllable d-inline-block" 
                    :class="{ 
                        'current' : i === currentSyllable,
                        'answered' : i < currentSyllable
                    }"
                >
                    <span>{{ latinToJava(syllable) }}</span>
                </div>
            </div>
            <div class="col-12">
                <div
                    v-for="(syllable, i) in syllables" 
                    :key="i"
                    ref="latinSyllables"
                    class="latin-syllable d-inline-block" 
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
        },
        isLoading: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            spacer: 10,
            mobileBreakpoint: 768,
            mobileSpacer: 5
        }
    },
    watch: {
        questionAnswered() {
            this.$nextTick(() => { this.adjustStyle(); });
        },
        isLoading() {
            if(!this.isLoading) {
                this.$nextTick(() => { this.adjustStyle(); });
            }
        }
    },
    mounted() {
        if(this.isMobile()) {
            this.spacer = this.mobileSpacer
        }
    },
    methods: {
        isMobile() {
            if(screen.width <= this.mobileBreakpoint) 
                return true;
            else 
                return false;
        },
        adjustStyle() {
            if(this.questionAnswered) {
                for(let i = 0; i < this.syllables.length; i++) {
                    this.$refs.latinSyllables[i].style.transition = 'all .4s ease-out';
                    this.$refs.aksaraSyllables[i].style.width = this.$refs.aksaraSyllables[i].firstChild.offsetWidth  + 1 + 'px';

                    this.$refs.aksaraSyllables[i].style.transition = 'all .4s ease-out';
                    this.$refs.latinSyllables[i].style.width = this.$refs.latinSyllables[i].firstChild.offsetWidth + 1 + 'px';
                }
            }

            if(!this.questionAnswered) {
                for(let i = 0; i < this.syllables.length; i++) {
                    this.$refs.aksaraSyllables[i].style.transition = 'none';
                    this.$refs.aksaraSyllables[i].style.width = (this.$refs.aksaraSyllables[i].firstChild.offsetWidth + 1 + this.spacer) + 'px';

                    this.$refs.latinSyllables[i].style.transition = 'none';
                    this.$refs.latinSyllables[i].style.width = this.$refs.aksaraSyllables[i].offsetWidth + 1 + 'px';
                }
            }
        }
    }
}
</script>