<template>
    <div class="question container px-0 text-center">
        <div v-for="(syllable, index) in syllables" :key="index" class="syllable d-inline-block ml-4">
            <div :class="generateClass('aksara', index, 'mb-4')">{{ toJavaneseScript(syllable) }}</div>
            <div :class="generateClass('latin', index, 'mb-5')">{{ showAnswer(index, syllable) }}</div>
        </div>
        <MultipleChoices :choices="generateChoices(syllables[currentSyllable])" @select-choices="checkAnswer" />
    </div>
</template>

<script>
export default {
    props: {
        userMaxStreak: {
            type: Number,
            default: 0
        },
        syllables: {
            type: Array,
            default() {
                return [];
            }
        }
    },
    data() {
        return {
            currentSyllable: 0,
            totalChoices: 5,
            streakCount: 0,
            correctNotification: {
                icon: "check",
                color: "var(--dark-brown)",
                message: "Jawaban Benar!"
            },
            wrongNotification: {
                icon: "times",
                color: "#b54242",
                message: "Jawaban Salah!"
            },
            streakNotification: {
                icon: "fire",
                color: "var(--dark-brown)",
                message: "0x Streak!"
            },
            loseStreakNotification: {
                icon: "sad-tear",
                color: "#b54242",
                message: "Kehilangan Streak!"
            },
            audio: null
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
        showAnswer(index, syllable) {
            if(index < this.currentSyllable) {
                return syllable;
            }
            return '...';
        },
        generateChoices(syllable) {
            let choices = [syllable];
            
            for(let i = 1; i < this.totalChoices; i++) {
                choices = [...choices, this.generateJavaneseSyllable()];
            }
            
            return this.shuffleArray(choices);
        },
        checkAnswer(choice) {
            // correct answer
            if(choice === this.syllables[this.currentSyllable]) {
                // play correct sound
                this.$sounds.correct.play();

                // set to next syllable
                if(this.currentSyllable !== this.syllables.length - 1)
                {
                    this.currentSyllable++;
                } else {
                    this.$emit('question-answered');
                    this.currentSyllable = 0;
                }
                
                // set streak
                this.streakCount++;

                // new streak
                if(this.streakCount > this.userMaxStreak) {
                    this.$emit('new-streak');
                }

                // correct or streak notification
                if(this.streakCount >= 2) {
                    this.streakNotification.message = this.streakCount + "x Streak";
                    this.$emit('set-notification', this.streakNotification);
                } else {
                    this.$emit('set-notification', this.correctNotification);
                }

                return;
            }
            
            // wrong answer
            this.$sounds.wrong.play();
            if(this.streakCount !== 0) {
                // reset streak and send notification
                this.streakCount = 0;
                this.$emit('set-notification', this.loseStreakNotification);
            } else {
                // send wrong notification
                this.$emit('set-notification', this.wrongNotification);
            }
        }
    }
}
</script>

<style>
.question .syllable:first-child {
    margin-left: 0 !important;
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