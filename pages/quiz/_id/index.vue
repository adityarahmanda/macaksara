<template>
    <div class="position-relative" style="min-height: 100vh;">
        <nuxt-link tag="div" to="/" class="close-icon position-absolute"><fa icon="times"/></nuxt-link>
        <div v-if="isMounted" class="position-relative container d-flex flex-column justify-content-center align-items-center" style="min-height: 100vh;">
            <div class="position-absolute bar-container col-6 col-md-8 px-0">
                <ProgressBar :percentage="quiz.percentage"/>
            </div>
            <div class="quiz">
                <h2 class="instruction text-center mb-6">Pilih bentuk latin dari aksara berikut</h2>
                <Question :question-answered="quiz.questionAnswered" :current-syllable="quiz.currSyllable" :syllables="quiz.syllables" />
                <MultipleChoices :choices="quiz.choices" @select-choices="selectChoices" />
            </div>
            <Notification :show="notification.show" :notification="notification.selected" />
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
                totalChoices: 5,
                choices: [],
                streakCount: 0,
                maxStreakCount: 0,
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
        if(this.quiz.data  === undefined) {
            this.$router.push('/');
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
        }
    },
    mounted() {
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
                this.$sounds.correct.play();
                
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
                    }, 3000);
                }

                return;
            }
            
            // wrong answer
            this.$sounds.wrong.play();
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
                    if(this.quiz.progress.level + 1 === this.quiz.level.length) {  
                        this.quiz.progress.completed = true;
                    } else {                                        
                        this.quiz.progress.level++;
                        this.user.wordsLearned += this.quiz.questions.length;
                    }
                }

                if(this.quiz.maxStreakCount > this.user.maxStreak) {
                    this.newStreak(this.quiz.maxStreakCount);
                }
                
                localStorage.setItem("userData", JSON.stringify(this.user));
                this.$router.push('/');
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
        newStreak(maxStreakCount) {
            this.user.maxStreak = maxStreakCount;
        }
    }
}
</script>

<style>
.close-icon {
    cursor: pointer;
    top: 24px;
    left: 24px;
    font-size: 42px;
    z-index: 9999;
}

.bar-container {
    top: 48px;
}

.instruction {
    font-size: 24px;
}
</style>