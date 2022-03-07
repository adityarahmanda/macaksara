<template>
    <div class="quiz-wrapper">
        <div v-if="isQuizReady && isCompleted" class="container position-relative d-flex flex-column h-100">
            <div class="row align-content-center flex-grow-1">
                <div class="col-12 text-center mb-4">
                    <h3>Selamat, Kamu Telah Berhasil Menyelesaikan Kuis!</h3>
                </div>
                <div class="col-12 text-center mb-4">
                    <div class="trophy-icon">
                        <i class="fa-solid fa-trophy"></i>
                    </div>
                </div>
                <div v-if="learnedNewWords || hasNewStreak" class="col-12 text-center font-weight-bold mb-4">
                    <p v-if="learnedNewWords" >{{ quiz.length }} kata baru telah dibaca!</p>
                    <p v-if="hasNewStreak" >{{ maxStreakCount }} streak baru didapatkan!</p>
                </div>
                <div class="col-12 text-center">
                    <nuxt-link to="/" class="btn">
                        Kembali ke Beranda
                    </nuxt-link>
                </div>
            </div>
        </div>

        <div v-if="isQuizReady && !isCompleted" class="container position-relative d-flex flex-column h-100">
            <div class="quiz-top-area-wrapper row align-items-center no-gutters px-4 px-md-0 py-4">
                <div class="col-2">
                    <nuxt-link tag="div" to="/" class="close-icon mr-auto">
                        <i class="fa-solid fa-times"></i>
                    </nuxt-link>
                </div>
                <div class="col-8">
                    <ProgressBar :percentage="questionPercentage"/>
                </div>
                <div class="col-2">
                    <div class="sound-icon ml-auto" @click="toggleAudio">
                        <i v-if="enableAudio" class="fa-solid fa-volume-up"></i>
                        <i v-else class="fa-solid fa-volume-mute"></i>
                    </div>
                </div>
            </div>

            <div class="row align-content-center flex-grow-1">
                <div class="col-12 text-center mb-4">
                    <h3 v-if="questionAnswered" class="quiz-instruction">Satu Kata Telah Terbaca Dengan Benar!</h3>
                    <h3 v-else class="quiz-instruction">Pilih Cara Baca Yang Benar Dari Aksara Jawa Berikut!</h3>
                </div>

                <Question 
                    :question-answered="questionAnswered"
                    :current-syllable="currSyllable" 
                    :syllables="syllables"
                    class="col-12 text-center"
                />
                
                <div v-if="!questionAnswered" class="col-12 text-center mt-5" >
                    <MultipleChoices :choices="choices" @select-choices="selectChoices"/>
                </div>
                
                <div class="quiz-translation col-12 text-center" :class="questionAnswered ? 'visible  mb-5' : 'invisible'">
                    <b v-if="questionAnswered">{{ quiz[currQuestion].translation }}</b>
                </div>

                <div class="quiz-next-button-area col-12 text-center" :class="questionAnswered ? 'visible' : 'invisible'">
                    <button v-if="questionAnswered" class="btn next-question-button" @click="setNextQuestion">Lanjut</button>
                </div>
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
export default {
    layout: 'quiz',
    data() {
        return {
            user: {},
            id: '',
            level: 0,
            maxLevel: 0,
            title: '',
            quiz: {},
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
            isCompleted: false,
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
            enableAudio: true,
            isQuizReady: false
        }
    },
    head() {
        return {
            title: this.title !== undefined ? 'Kuis ' + this.title + ' - Sinahu Aksara' : 'Kuis Tidak Ditemukan - Sinahu Aksara',
        };
    },
    async created() {
        this.id = this.$route.params.id;

        await this.getQuizTitle();

        if(process.client) {
            if(!Object.prototype.hasOwnProperty.call(localStorage, "userData")) {
                this.$router.push('/');
            }
            
            this.user = JSON.parse(localStorage.getItem("userData"));
            this.level = this.user.quizProgresses[this.id].currentLevel;

            if(Object.prototype.hasOwnProperty.call(localStorage, "enableAudio")) {
                this.enableAudio = JSON.parse(localStorage.getItem("enableAudio"));
            }
        }

        await this.getQuizMaxLevel();
        await this.getQuestions();

        this.isQuizReady = true;

        this.startNewQuestion()
    },
    methods: {
        async getQuizTitle() {
            await this.$axios.get('api/quiz/' + this.id).then((res) => {
                this.title = res.data[0].title;

                if(this.title === '' || this.title === undefined) {
                    this.$router.push('/');
                }
            });
        },
        async getQuizMaxLevel() {
            await this.$axios.get('api/quiz-level/' + this.id).then((res) => {
                this.maxLevel = res.data.length;

                if(this.maxLevel <= 0 || this.level > this.maxLevel) {
                    this.$router.push('/');
                }
            });
        },
        async getQuestions() {
            // load quizzes
            await this.$axios.get('api/quiz/' + this.id + '/' + this.level).then((res) => {
                this.quiz = this.shuffleArray(res.data);
                
                if(this.quiz.length <= 0) {
                    this.$router.push('/');
                }
            });
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
        selectChoices(choice) {
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
                    this.questionPercentage = ((this.currQuestion + 1) / this.quiz.length) * 100;
                    // console.log((this.currQuestion + 1) + '/' + this.quiz.length + '=' + this.questionPercentage);
                }

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

            if(this.currQuestion < this.quiz.length - 1) {
                // reset state
                this.currQuestion++;
                this.currSyllable = 0;
                this.questionAnswered = false;
                
                // set next question
                this.startNewQuestion();
            } else {
                const userQuizProgress = this.user.quizProgresses[this.id];

                if(!userQuizProgress.isCompleted) {
                    // console.log(this.level + '===' + this.maxLevel);

                    if(this.level === this.maxLevel) {  
                        userQuizProgress.isCompleted = true;
                    } else {                                        
                        userQuizProgress.currentLevel++;
                    }
                    
                    // console.log(userQuizProgress);
                    this.user.quizProgresses[this.id] = userQuizProgress;
                    this.user.learnedWords += this.quiz.length;
                    this.learnedNewWords = true;
                }

                if(this.maxStreakCount > this.user.maxStreak) {
                    this.user.maxStreak = this.maxStreakCount;
                    this.hasNewStreak = true;
                }
                
                localStorage.setItem("userData", JSON.stringify(this.user));
                // console.log(this.user);
                this.isCompleted = true;
            }
        },
        startNewQuestion() {
            this.syllables = this.toSyllables(this.quiz[this.currQuestion].question);
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