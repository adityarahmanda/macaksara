<template>
    <div class="d-lg-flex mb-6">
        <Sidebar :user="user" @reset-game="startNewGame" />
        <main class="position-relative flex-grow-1">
            <MessageCard message="Masih awam dengan aksara jawa?" button-text="Pelajari di sini" to="/aksara-jawa" />
            <div v-if="isMounted" class="themes position-relative d-flex flex-row flex-wrap px-0">
                <h1 class="mb-4 col-12 px-0">Kuis</h1>
                <QuizCard v-for="(quiz, index) in quizzes" :key="index" :quiz="quiz" :quiz-progress="user.quizProgress[index]" />
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
                name: 'Bambang',
                wordsLearned: 0, 
                maxStreak: 0,
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
                this.user = JSON.parse(localStorage.getItem("userData"));
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
                name: 'Bambang',
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
            this.saveGame();
        },
        saveGame() {
            localStorage.setItem("userData", JSON.stringify(this.user));
        }
    }
}
</script>

<style> 
.themes .quiz-card:last-child {
    margin-bottom: 0 !important;
}

@media (min-width: 768px) {
    .themes .quiz-card {
        max-width: calc(50% - 0.5rem);
        margin-bottom: 1rem !important;
    }

    .themes .quiz-card:nth-child(odd) {
        margin-left: 0.5rem !important;
    }

    .themes .quiz-card:nth-child(even) {
        margin-right: 0.5rem !important;
    }

    .themes .quiz-card:nth-last-child(2) {
        margin-bottom: 0 !important;
    }
}
</style>
