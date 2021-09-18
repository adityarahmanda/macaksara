<template>
    <div v-if="isMounted" class="position-relative" style="min-height: 100vh;">
        <div v-if="!quiz.completed" class="position-relative container d-flex flex-column justify-content-center align-items-center" style="min-height: 100vh;">
            <nuxt-link tag="div" to="/" class="position-absolute top-items icon-button close-icon"><fa icon="times"/></nuxt-link>
            <div class="position-absolute top-items icon-button sound-icon " @click="toggleAudio">
                <fa v-if="enableAudio" icon="volume-up" />
                <fa v-else icon="volume-mute" />
            </div>
            <div class="position-absolute top-items quiz-progress-bar col-6 col-md-8 d-flex align-items-center px-0">
                <ProgressBar :percentage="quiz.percentage"/>
            </div>
            <div class="quiz">
                <h2 class="heading text-center px-5 px-md-0 mb-5">Pilih bentuk latin dari aksara berikut</h2>
                <Question :question-answered="quiz.questionAnswered" :current-syllable="quiz.currSyllable" :syllables="quiz.syllables" />
                <MultipleChoices :choices="quiz.choices" @select-choices="selectChoices" />
            </div>
            <Notification :show="notification.show" :notification="notification.selected" />
        </div>
        <div v-if="quiz.completed" class="position-relative container d-flex flex-column justify-content-center align-items-center" style="min-height: 100vh;">
            <h2 class="heading text-center px-5 px-md-0">Selamat, kamu berhasil menyelesaikan kuis!</h2>
            <div style="font-size: 114px"><fa icon="trophy" /></div>
            <div v-if="quiz.learnedNewWords || quiz.hasNewStreak" class="text-center font-weight-bold mb-2">
                <p v-if="quiz.learnedNewWords" >+{{ quiz.questions.length }} kata baru telah dibaca!</p>
                <p v-if="quiz.hasNewStreak" >{{ quiz.maxStreakCount }} streak baru didapatkan!</p>
            </div>
            <nuxt-link tag="button" to="/" class="btn button px-4 py-2">Kembali ke Beranda</nuxt-link>
        </div>
    </div>
</template>

<script>
import data from '../../../static/data.json';

export default {
    layout: 'quiz',
    data() {
        return {
            user: {},
            quiz: {
                theme: "",
                data: {},
                progress: {},
                percentage: '0%',
                questionAnswered: false,
                currQuestion: 0,
                questions: [],
                currSyllable: 0,
                syllables: [],
                totalChoices: 4,
                choices: [],
                streakCount: 0,
                maxStreakCount: 0,
                learnedNewWords: false,
                hasNewStreak: false,
                completed: false
            },
            notification: {
                show: false,
                timeout: {},
                selected: {
                    icon: "",
                    color: "var(--dark-brown)",
                    message: "Message"
                },
                correct: {
                    icon: "check",
                    color: "var(--dark-brown)",
                    message: "Jawaban Benar!"
                },
                wrong: {
                    icon: "times",
                    color: "#b54242",
                    message: "Jawaban Salah!"
                },
                streak: {
                    icon: "fire",
                    color: "var(--dark-brown)",
                    message: "0x Streak!"
                }, 
                losestreak: {
                    icon: "sad-tear",
                    color: "#b54242",
                    message: "Kehilangan Streak!"
                }
            },
            enableAudio: true,
            isMounted: false
        }
    },
    head() {
        return {
            title: this.quiz.data !== undefined ? 'Kuis ' + this.quiz.theme + ' - Sinahu Aksara' : 'Kuis Tidak Ditemukan - Sinahu Aksara',
            meta: [
                {
                    hid: 'description',
                    name: 'description',
                    content: 'Konversi aksara jawa ke huruf latin maupun sebaliknya dengan mudah'
                }
            ]
        };
    },
    created() {
        this.quiz.data = data.quizzes.find(quiz => quiz.id === this.$route.params.id);        
        if(this.quiz.data === undefined) {
            this.$router.push('/');
            return;
        }
        this.quiz.theme = this.quiz.data.theme;

        if(process.client) {
            if(localStorage.getItem("userData") !== null) {
                this.user = JSON.parse(localStorage.getItem("userData"));
                for(const key in this.user.quizProgress)
                {
                    if(this.user.quizProgress[key].id === this.quiz.data.id) {
                        this.quiz.progress = this.user.quizProgress[key];
                    }
                }
            } else {
                this.$router.push('/');
            }

            if(localStorage.getItem("enableAudio") !== null) {
                this.enableAudio = JSON.parse(localStorage.getItem("enableAudio"));
            }
        }
    },
    mounted() {
        if(this.quiz.data === undefined) {
            return;
        }

        this.quiz.questions = this.quiz.data.level[this.quiz.progress.level].questions;
        this.quiz.syllables = this.toSyllables(this.quiz.questions[this.quiz.currQuestion]);
        this.quiz.choices = this.generateChoices(this.quiz.syllables[this.quiz.currSyllable]);

        this.isMounted = true;
    },
    methods: {
        generateChoices(syllable) {
            let choices = [syllable];
            
            for(let i = 1; i < this.quiz.totalChoices; i++) {
                let generatedSyllable;
                do { generatedSyllable = this.generateJavaneseSyllable(); } 
                while (generatedSyllable === syllable);
                choices = [...choices, generatedSyllable];
            }
            
            return this.shuffleArray(choices);
        },
        selectChoices(choice) {
            if(this.quiz.questionAnswered) {
                return;
            }

            // correct answer
            if(choice === this.quiz.syllables[this.quiz.currSyllable]) {
                // play correct sound
                if(this.enableAudio) {
                    this.$sounds.correct.play();
                }
                
                // calculate max streak
                this.quiz.streakCount++;
                if(this.quiz.streakCount > this.quiz.maxStreakCount) {
                    this.quiz.maxStreakCount = this.quiz.streakCount;
                }

                // correct or streak notification
                if(this.quiz.streakCount >= 2) {
                    this.notification.streak.message = this.quiz.streakCount + "x Streak";
                    this.setNotification(this.notification.streak);
                } else {
                    this.setNotification(this.notification.correct);
                }
                
                // set to next syllable
                if(this.quiz.currSyllable < this.quiz.syllables.length - 1) {
                    this.quiz.currSyllable++;
                    this.quiz.choices = this.generateChoices(this.quiz.syllables[this.quiz.currSyllable]);
                } else {
                    this.quiz.questionAnswered = true;
                    setTimeout(() => {
                        this.questionAnswered();
                    }, 1500);
                }

                return;
            }
            
            // wrong answer
            if(this.enableAudio) {
                this.$sounds.wrong.play();
            }

            if(this.quiz.streakCount !== 0) {
                // reset streak and send notification
                this.quiz.streakCount = 0;
                this.setNotification(this.notification.losestreak);
            } else {
                // send wrong notification
                this.setNotification(this.notification.wrong);
            }
        },
        questionAnswered() {
            this.quiz.currQuestion++;
            this.quiz.percentage = ((this.quiz.currQuestion / this.quiz.questions.length) * 100) + '%';

            if(this.quiz.currQuestion < this.quiz.questions.length) {
                // reset state
                this.quiz.currSyllable = 0;
                this.quiz.questionAnswered = false;
                
                // set next question
                this.quiz.syllables = this.toSyllables(this.quiz.questions[this.quiz.currQuestion]);
                this.quiz.choices = this.generateChoices(this.quiz.syllables[this.quiz.currSyllable]);
            } else {
                if(!this.quiz.progress.completed) {
                    if(this.quiz.progress.level + 1 === this.quiz.data.level.length) {  
                        this.quiz.progress.completed = true;
                    } else {                                        
                        this.quiz.progress.level++;
                    }
                    this.user.wordsLearned += this.quiz.questions.length;
                    this.quiz.learnedNewWords = true;
                }

                if(this.quiz.maxStreakCount > this.user.maxStreak) {
                    this.user.maxStreak = this.quiz.maxStreakCount;
                    this.quiz.hasNewStreak = true;
                }
                
                if(process.client) {
                    localStorage.setItem("userData", JSON.stringify(this.user));
                }

                this.quiz.completed = true;
            }
        },
        setNotification(notification) {
            this.notification.selected = notification;
            this.notification.show = true;
            clearTimeout(this.notification.timeout);
            this.notification.timeout = setTimeout(() => {
                this.notification.show = false;
            }, 1500);
        },
        toggleAudio() {
            this.enableAudio = !this.enableAudio;
            localStorage.setItem("enableAudio", this.enableAudio);
        }
    }
}
</script>

<style>
.icon-button {
    cursor: pointer;
    font-size: 36px;
    z-index: 9999;
}

.quiz-progress-bar {
    height: 56px;
}

.top-items {
    top: 36px;
}

.close-icon {
    left: 64px;
}

.sound-icon {
    right: 64px;
}

.heading {
    font-size: 24px;
}

@media (max-width: 768px) {
    .icon-button {
        font-size: 32px;
    }

    .quiz-progress-bar {
        height: 48px;
    }
    
    .top-items {
        top: 24px;
    }

    .close-icon {
        left: 21px;
    }

    .sound-icon {
        right: 21px;
    }

    .heading {
        font-size: 18px;
    }
}
</style>