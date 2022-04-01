<template>
    <div class="quiz-wrapper">
        <div class="container position-relative d-flex flex-column h-100">
            <div class="quiz-top-area-wrapper row align-items-center no-gutters px-4 px-md-0 py-4">
                <div class="col-2">
                    <nuxt-link tag="div" to="/" class="close-icon mr-auto">
                        <i class="fa fa-solid fa-times"></i>
                    </nuxt-link>
                </div>
                <div class="col-8">
                    <ProgressBar :percentage="questionPercentage"/>
                </div>
                <div class="col-2">
                    <div class="sound-icon ml-auto" @click="toggleAudio">
                        <i v-if="enableAudio" class="fa fa-solid fa-volume-up"></i>
                        <i v-else class="fa fa-solid fa-volume-mute"></i>
                    </div>
                </div>
            </div>

            <div v-if="!isCompleted" class="row align-content-center flex-grow-1" :class="isLoading ? 'invisible' : 'visible'">
                <div class="col-12 text-center mb-4">
                    <h3 v-if="questionAnswered" class="quiz-instruction px-3 px-md-0">Satu Kata Telah Terbaca Dengan Benar!</h3>
                    <h3 v-else class="quiz-instruction">Pilih Cara Baca Yang Benar Dari Aksara Jawa Berikut!</h3>
                </div>

                <Question 
                    :question-answered="questionAnswered"
                    :current-syllable="currSyllable" 
                    :syllables="syllables"
                    :is-loading="isLoading"
                    class="col-12 text-center"
                />
                
                <div v-if="!questionAnswered" class="col-12 text-center mt-5" >
                    <MultipleChoices :choices="choices" @select-choices="selectChoices"/>
                </div>
                
                <div class="quiz-translation col-12 text-center" :class="questionAnswered ? 'visible  mb-5' : 'invisible'">
                    <b v-if="questionAnswered">{{ questions[currQuestion].translation }}</b>
                </div>

                <div class="quiz-next-button-area col-12 text-center" :class="questionAnswered ? 'visible' : 'invisible'">
                    <button v-if="questionAnswered" class="btn next-question-button" @click="setNextQuestion">Lanjut</button>
                </div>
            </div>

            <div v-if="isCompleted" class="row align-content-center flex-grow-1">
                <div class="col-12 text-center mb-4">
                    <h3>Selamat!</h3>
                    <p class="mb-0">Kamu telah berhasil menyelesaikan kuis.</p>
                </div>
                <div class="col-12 text-center" :class="learnedNewWords || hasNewStreak ? 'mb-4' : 'mb-5'">
                    <div class="thumbs-up-icon">
                        <i class="fa fa-solid fa-thumbs-up"></i>
                    </div>
                </div>
                <div v-if="learnedNewWords || hasNewStreak" class="col-12 text-center mb-4">
                    <h5 v-if="learnedNewWords" :class="hasNewStreak ? 'mb-3' : 'mb-0'">{{ questions.length }} kata baru telah dibaca!</h5>
                    <h5 v-if="hasNewStreak" >{{ maxStreakCount }} streak baru didapatkan!</h5>
                </div>
                <div class="col-12 text-center">
                    <nuxt-link to="/" class="btn btn-primary rounded-pill border-0 px-4">
                        Kembali ke Beranda
                    </nuxt-link>
                </div>
            </div>
        
            <Notification 
                v-if="!isCompleted"
                :visible="notification.visible" 
                :icon="notification.selected.icon"
                :variant="notification.selected.variant"
                :message="notification.selected.message"
            />
        </div>
    </div>
</template>

<script>
export default {
    layout: 'quiz',
    data() {
        return {
            isLoading: true,
            isCompleted: false,
            user: undefined,
            slug: '',
            title: '',
            currentLevel: 0,
            maxLevel: 0,
            questions: {},
            currQuestion: 0,
            syllables: [],
            currSyllable: 0,
            totalChoices: 4,
            choices: [],
            questionPercentage: 0,
            questionAnswered: false,
            streakCount: 0,
            maxStreakCount: 0,
            learnedNewWords: false,
            hasNewStreak: false,
            notification: {
                visible: false,
                timeout: {},
                selected: {},
                correct: {
                    icon: "check",
                    variant: "success",
                    message: "Jawaban Benar!"
                },
                wrong: {
                    icon: "times",
                    variant: "danger",
                    message: "Jawaban Salah!"
                },
                streak: {
                    icon: "fire",
                    variant: "success",
                    message: "Jawaban Benar! 0x Streak!"
                }, 
                losestreak: {
                    icon: "sad-tear",
                    variant: "danger",
                    message: "Salah! Kehilangan Streak!"
                }
            },
            enableAudio: true
        }
    },
    head() {
        return {
            title: this.title !== undefined ? 'Kuis ' + this.title + ' - Sinahu Aksara' : 'Kuis Tidak Ditemukan - Sinahu Aksara',
        };
    },
    async mounted() {
        this.slug = this.$route.params.slug;
        this.quiz = await this.$content("quizzes", this.slug).fetch() || null;

        this.verifyUser();
        this.startQuiz();

        this.isLoading = false;
    },
    methods: {
        verifyUser() {
            this.user = JSON.parse(localStorage.getItem('userData'));
            // console.log(this.user);
            
            if(!this.user) {
                this.$router.push('/');
                return;
            }

            if(this.user.learnedWords === undefined || this.user.learnedWords === null) {
                this.$router.push('/');
                return;
            }

            if(this.user.maxStreak === undefined || this.user.maxStreak === null) {
                this.$router.push('/');
            }
        },
        startQuiz() {
            this.currentLevel = this.user.quizProgresses[this.slug].currentLevel;
            this.maxLevel = this.quiz.levels.length;

            if(this.currentLevel > this.maxLevel) {
                this.$router.push('/');
                return;
            }

            const levelKeys = Object.keys(this.quiz.levels);
            for(const key in levelKeys) {
                if(this.quiz.levels[key].value === this.currentLevel) {
                    this.questions = this.quiz.levels[key].questions;
                    break;
                }
            }

            // shuffle questions
            this.shuffleArray(this.questions);

            // console.log(this.questions);

            this.startNewQuestion();
        },
        generateChoices(syllable) {
            let choices = [syllable];
            
            for(let i = 1; i < this.totalChoices; i++) {
                let generatedSyllable;
                do { generatedSyllable = this.generateJavaneseSyllable(); } 
                while (generatedSyllable === syllable);
                choices = [...choices, generatedSyllable];
            }
            
            return this.shuffleArray(choices);
        },
        selectChoices(choiceButton, choice) {
            if(this.questionAnswered) {
                return;
            }

            // correct answer
            if(choice === this.syllables[this.currSyllable]) {
                // play correct sound
                if(this.enableAudio) {
                    this.$sounds.correct.play();
                }
                
                // calculate max streak
                this.streakCount++;
                if(this.streakCount > this.maxStreakCount) {
                    this.maxStreakCount = this.streakCount;
                }

                // correct or streak notification
                if(this.streakCount >= 2) {
                    this.notification.streak.message = "Benar, " + this.streakCount + "x Streak";
                    this.setNotification(this.notification.streak);
                } else {
                    this.setNotification(this.notification.correct);
                }
                
                // set to next syllable
                if(this.currSyllable < this.syllables.length - 1) {
                    this.currSyllable++;
                    this.choices = this.generateChoices(this.syllables[this.currSyllable]);
                } else {
                    this.questionAnswered = true;
                    this.questionPercentage = ((this.currQuestion + 1) / this.questions.length) * 100;
                    // console.log((this.currQuestion + 1) + '/' + this.quiz.length + '=' + this.questionPercentage);
                }

                // blur button
                choiceButton.blur();
                return;
            }
            
            // wrong answer
            if(this.enableAudio) {
                this.$sounds.wrong.play();
            }

            if(this.streakCount !== 0) {
                // reset streak and send notification
                this.streakCount = 0;
                this.setNotification(this.notification.losestreak);
            } else {
                // send wrong notification
                this.setNotification(this.notification.wrong);
            }
        },
        setNextQuestion() {
            if(!this.questionAnswered) {
                return;
            }

            if(this.currQuestion < this.questions.length - 1) {
                // reset state
                this.currQuestion++;
                this.currSyllable = 0;
                
                // set next question
                this.startNewQuestion();
            } else {
                // play correct sound
                if(this.enableAtudio) {
                    this.$sounds.tada.play();
                }

                // save quiz progress
                const userQuizProgress = this.user.quizProgresses[this.slug];

                if(!userQuizProgress.isCompleted) {
                    // console.log(this.currentLevel + '===' + this.maxLevel);

                    if(this.currentLevel === this.maxLevel) {  
                        userQuizProgress.isCompleted = true;
                    } else {                                        
                        userQuizProgress.currentLevel++;
                    }
                    
                    // console.log(userQuizProgress);
                    this.user.quizProgresses[this.slug] = userQuizProgress;
                    this.user.learnedWords += this.questions.length;
                    this.learnedNewWords = true;
                }

                if(this.maxStreakCount > this.user.maxStreak) {
                    this.user.maxStreak = this.maxStreakCount;
                    this.hasNewStreak = true;
                }

                localStorage.setItem('userData', JSON.stringify(this.user));
                this.isCompleted = true;
            }
        },
        startNewQuestion() {
            this.questionAnswered = false;
            this.syllables = this.toSyllables(this.questions[this.currQuestion].value);
            this.choices = this.generateChoices(this.syllables[this.currSyllable]);
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