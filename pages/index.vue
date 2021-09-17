<template>
    <div class="row">
        <Sidebar :user="user" @reset-game="startNewGame" @change-name="changeName"/>
        <main class="col-12 col-lg-8">
            <MessageCard message="Masih awam dengan aksara jawa?" button-text="Pelajari di sini" to="/aksara-jawa" />
            <h1 class="mb-4 col-12 px-0">Kuis</h1>
            <div v-if="isMounted" class="row mx-0">
                <div v-for="(quiz, index) in quizzes" :key="index" :class="index % 2 === 0 ? 'col-12 col-md-6 px-0 pl-md-0 pr-md-2 pb-3' : 'col-12 col-md-6 px-0 pl-md-2 pr-md-0 pb-3'">
                    <QuizCard :quiz="quiz" :quiz-progress="user.quizProgress[index]" />
                </div>
            </div>
        </main>
    </div>
</template>

<script>
import data from '../static/data.json';

export default {
    data() {
        return {
            user: {
                wordsLearned: 0, 
                maxStreak: 0,
                quizProgress: {},
            },
            quizzes: data.quizzes,
            isMounted: false
        };
    },
    head() {
        return {
            title: 'Sinahu Aksara - Belajar Aksara Jawa Sambil Bermain',
            meta: [
                {
                    hid: 'description',
                    name: 'description',
                    content: 'Tempat untuk belajar aksara jawa dengan mudah dengan menyelesaikan kuis-kuis yang menyenangkan'
                }
            ]
        };
    },
    created() {
        if(process.client) {
            if(localStorage.getItem("userData") !== null) {
                const userData = JSON.parse(localStorage.getItem("userData"));
                if(Object.keys(userData.quizProgress).length !== this.quizzes.length) {
                    this.startNewGame();
                } else {
                    this.user = userData;
                }
            } else {
                this.startNewGame();
            }
        }
    },
    mounted() {
        this.isMounted = true;
    },
    methods: {
        startNewGame() {
            const newUser = {
                wordsLearned: 0, 
                maxStreak: 0,
                quizProgress: {},
            };

            for(let i = 0; i < this.quizzes.length; i++) {
                newUser.quizProgress[i] = { 
                    id: this.quizzes[i].id,
                    level: 0,
                    completed: false
                };
            }

            this.user = newUser;
    
            if(process.client) {
                localStorage.setItem("userData", JSON.stringify(this.user));
            }
        },
        changeName(name) {
            this.user.name = name;
            if(process.client) {
                localStorage.setItem("userData", JSON.stringify(this.user));
            }
        }
    }
}
</script>