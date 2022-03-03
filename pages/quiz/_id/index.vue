<template>
    <div class="quiz-wrapper">
        <div v-if="quiz.completed && isMounted" class="container d-flex flex-column h-100">
            <h2 class="text-center">Selamat, kamu berhasil menyelesaikan kuis!</h2>
            <div class="trophy-icon">
                <i class="fa-solid fa-trophy"></i>
            </div>
            <div v-if="quiz.learnedNewWords || quiz.hasNewStreak" class="text-center font-weight-bold mb-2">
                <p v-if="quiz.learnedNewWords" >+{{ quiz.questions.length }} kata baru telah dibaca!</p>
                <p v-if="quiz.hasNewStreak" >{{ quiz.maxStreakCount }} streak baru didapatkan!</p>
            </div>
            <nuxt-link tag="button" to="/" class="btn button px-4 py-2">
                Kembali ke Beranda
            </nuxt-link>
        </div>

        <div v-if="!quiz.completed && isMounted" class="container position-relative d-flex flex-column h-100">
            <div class="quiz-top-area-wrapper row align-items-center no-gutters px-4 px-md-0 py-4">
                <div class="col-2">
                    <nuxt-link tag="div" to="/" class="close-icon mr-auto">
                        <i class="fa-solid fa-times"></i>
                    </nuxt-link>
                </div>
                <div class="col-8">
                    <ProgressBar :percentage="quiz.percentage"/>
                </div>
                <div class="col-2">
                    <div class="sound-icon ml-auto" @click="toggleAudio">
                        <i v-if="enableAudio" class="fa-solid fa-volume-up"></i>
                        <i v-else class="fa-solid fa-volume-mute"></i>
                    </div>
                </div>
            </div>

            <div class="row align-content-center flex-grow-1">
                <div class="col-12 text-center mb-5">
                    <h3 class="quiz-instruction">Pilih Cara Baca yang Benar dari Aksara Jawa Berikut</h3>
                </div>
                <Question 
                    :question-answered="quiz.questionAnswered" 
                    :current-syllable="quiz.currSyllable" 
                    :syllables="quiz.syllables"
                    class="col-12 text-center mb-4"
                />
                <MultipleChoices 
                    :choices="quiz.choices"
                    class="col-12 text-center mb-4" 
                    @select-choices="selectChoices"
                />
            </div>
        
            <Notification 
                :visible="notification.visible" 
                :icon="notification.selected.icon"
                :variant="notification.selected.variant"
                :message="notification.selected.message"
            />
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
                percentage: 0,
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
                visible: false,
                timeout: {},
                selected: {},
                correct: {
                    icon: "check",
                    variant: "primary",
                    message: "Jawaban Benar!"
                },
                wrong: {
                    icon: "times",
                    variant: "danger",
                    message: "Jawaban Salah!"
                },
                streak: {
                    icon: "fire",
                    variant: "primary",
                    message: "0x Streak!"
                }, 
                losestreak: {
                    icon: "sad-tear",
                    variant: "danger",
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
            this.quiz.percentage = (this.quiz.currQuestion / this.quiz.questions.length) * 100;

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
            this.notification.visible = true;
            clearTimeout(this.notification.timeout);
            this.notification.timeout = setTimeout(() => {
                this.notification.visible = false;
            }, 1500);
        },
        toggleAudio() {
            this.enableAudio = !this.enableAudio;
            localStorage.setItem("enableAudio", this.enableAudio);
        }
    }
}
</script>