<template>
    <div class="position-relative" style="min-height: 100vh;">
        <nuxt-link tag="div" to="/" class="close-icon position-absolute"><fa icon="times"/></nuxt-link>
        <div v-if="isMounted" class="position-relative container d-flex flex-column justify-content-center align-items-center" style="min-height: 100vh;">
            <div class="position-absolute bar-container col-6 col-md-8 px-0">
                <ProgressBar :percentage="progressPercentage"/>
            </div>
            <div class="quiz" >
                <h2 class="instruction text-center mb-6">Pilih bentuk latin dari aksara berikut</h2>
                <Question :user-max-streak="user.maxStreak" :syllables="syllables" @new-streak="newStreak" @set-notification="setNotification" @question-answered="questionAnswered" />
            </div>
            <Notification :show="showNotification" :icon="notificationIcon" :color="notificationColor" :message="notificationMessage" />
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
            currProgress: {},
            progressPercentage: '0%',
            quiz: {},
            questions: {},
            currQuestion: 0,
            syllables: {},
            showNotification: false,
            notificationIcon: "",
            notificationColor: "",
            notificationMessage: "",
            notificationTimeout: {},
            isMounted: false
        }
    },
    head() {
        return {
            title: this.quiz !== undefined ? 'Kuis ' + this.quiz.theme + ' - Sinahu Aksara' : 'Kuis Tidak Ditemukan - Sinahu Aksara',
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
        this.quiz = data.quizzes.find(quiz => quiz.id === this.$route.params.id);

        if(this.quiz === undefined) {
            this.$router.push('/');
        }

        if(process.client) {
            if(localStorage.getItem("userData") !== null) {
                this.user = JSON.parse(localStorage.getItem("userData"));
                for(const key in this.user.quizProgress)
                {
                    if(this.user.quizProgress[key].id === this.quiz.id) {
                        this.currProgress = this.user.quizProgress[key];
                    }
                }
            } else {
                this.$router.push('/');
            }
        }
    },
    mounted() {
        this.questions = this.quiz.level[this.currProgress.level].questions;
        this.questions = this.shuffleArray(this.questions);
        this.syllables = this.toSyllables(this.questions[this.currQuestion]);
        this.isMounted = true;
    },
    methods: {
        questionAnswered() {    
            this.currQuestion++;
            this.progressPercentage = ((this.currQuestion / this.questions.length) * 100) + '%';
            if(this.currQuestion !== this.questions.length) {
                this.syllables = this.toSyllables(this.questions[this.currQuestion]);               
            } else {
                if(!this.currProgress.completed) {
                    if(this.currProgress.level + 1 === this.quiz.level.length) {  
                        this.currProgress.completed = true;
                    } else {                                        
                        this.currProgress.level++;
                        this.user.wordsLearned += this.questions.length;
                    }
                }
                localStorage.setItem("userData", JSON.stringify(this.user));
                this.$router.push('/');
            }
        },
        setNotification(notification) {
            this.notificationIcon = notification.icon;
            this.notificationColor = notification.color;
            this.notificationMessage = notification.message;
            this.showNotification = true;
            clearTimeout(this.notificationTimeout);
            this.notificationTimeout = setTimeout(() => {
                this.showNotification = false;
            }, 1500);
        },
        newStreak(streakCount) {
            this.user.maxStreak = streakCount;
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