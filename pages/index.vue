<template>
    <div class="row">
        <Sidebar :user="user" :is-loading="!isMounted" @reset-game="resetGame"/>
        <main class="col-12 col-lg-8">
            <div class="mb-3 mb-md-4">
                <h1>Kuis</h1>
            </div>
            <div v-if="isMounted" class="row no-gutters">
                <div 
                    v-for="(quizCard, i) in quizCards" 
                    :key="quizCard.id" 
                    class="col-12 col-md-6 mb-3" 
                    :class="i % 2 === 0 ? 'pr-md-2' : 'pl-md-2'"
                >
                    <QuizCard 
                        :quiz-id="quizCard.id"
                        :title="quizCard.title" 
                        :question-total="quizCard.questionTotal"
                        :current-level="quizCard.currentLevel"
                        :is-completed="quizCard.isCompleted"                    
                    />
                </div>
            </div>
            <div v-else class="row no-gutters">
                <div 
                    v-for="index in 2" 
                    :key="index" 
                    class="col-12 col-md-6 mb-3" 
                    :class="index - 1 % 2 === 0 ? 'pr-md-2' : 'pl-md-2'"
                >
                    <QuizCard is-loading />
                </div>
            </div>
        </main>
    </div>
</template>

<script>
export default {
    data() {
        return {
            user: {},
            quizzes: {},
            quizCards: {},
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
    async mounted() {
        await this.getQuiz();

        if(Object.prototype.hasOwnProperty.call(localStorage, "userData")) {
            this.user = JSON.parse(localStorage.getItem("userData"));
        } else {
            this.createNewUser();
        }

        await this.getQuizCards();
        this.isMounted = true;
    },
    methods: {
        async getQuiz() {
            // load quizzes
            await this.$axios.get('api/quiz').then((res) => {
                this.quizzes = res.data;
            });
            // console.log(this.quizzes);
        },
        async getQuizCards() {
            // load quiz cards
            for(let i = 0; i < this.quizzes.length; i++) {
                const id = this.quizzes[i].quiz_id;
                const title = this.quizzes[i].title;
                const currentLevel = this.user.quizProgresses[id].currentLevel;
                const isCompleted = this.user.quizProgresses[id].isCompleted;

                this.quizCards[i] = {
                    id,
                    title,
                    currentLevel,
                    isCompleted
                }

                await this.$axios.get('api/quiz/' + id + '/' + currentLevel).then((res) => {
                    this.quizCards[i].questionTotal = res.data.length;
                });   
            }
            // console.log(this.quizCards);
        },
        updateQuizCards() {
            // load quiz cards
            for(let i = 0; i < this.quizzes.length; i++) {
                const id = this.quizzes[i].quiz_id;
                const currentLevel = this.user.quizProgresses[id].currentLevel;
                const isCompleted = this.user.quizProgresses[id].isCompleted;

                this.quizCards[i].currentLevel = currentLevel;
                this.quizCards[i].isCompleted = isCompleted;
            }
            // console.log(this.quizCards);
        },
        createNewUser() {
            this.user = {
                learnedWords: 0, 
                maxStreak: 0,
                quizProgresses: {},
            };

            for(let i = 0; i < this.quizzes.length; i++) {
                const id = this.quizzes[i].quiz_id;

                this.user.quizProgresses[id] = {
                    currentLevel: 1,
                    isCompleted: false
                };
            }
    
            localStorage.setItem("userData", JSON.stringify(this.user));
            // console.log(this.user);
        },
        resetGame() {
            this.createNewUser();
            this.updateQuizCards();
        }
    }
}
</script>

<style lang="scss">
    // empty style
</style>