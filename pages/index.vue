<template>
    <div class="row">
        <Sidebar :user="user" :is-loading="isLoading" @reset-game="resetGame"/>

        <main class="col-12 col-lg-8">
            <div class="mb-3 mb-md-4">
                <h2>Pilih Kuis</h2>
            </div>

            <div v-if="isLoading" class="row no-gutters">
                <div 
                    v-for="index in 2" 
                    :key="index" 
                    class="col-12 col-md-6 mb-3" 
                    :class="index - 1 % 2 === 0 ? 'pr-md-2' : 'pl-md-2'"
                >
                    <QuizCard is-loading />
                </div>
            </div>

            <div v-else class="row no-gutters">
                <div 
                    v-for="(quizCard, i) in quizCards" 
                    :key="quizCard.id" 
                    class="col-12 col-md-6 mb-3" 
                    :class="i % 2 === 0 ? 'pr-md-2' : 'pl-md-2'"
                >
                    <QuizCard 
                        :quiz-id="quizCard.slug"
                        :title="quizCard.title" 
                        :question-total="quizCard.questionTotal"
                        :current-level="quizCard.currentLevel"
                        :is-completed="quizCard.isCompleted"                    
                    />
                </div>
            </div>
        </main>
    </div>
</template>

<script>
export default {
    data() {
        return {
            user: undefined,
            isLoading: true,
            quizzes: [],
            quizCards: {}
        }
    },
    head() {
        return {
            title: 'Macaksara - Belajar Aksara Jawa Sambil Bermain',
            meta: [
                { hid: 'description', name: 'description', content: 'Macaksara merupakan website permainan kuis untuk menguji kemampuan membaca Aksara Jawa kamu.' },
                { hid: 'title', name: 'title', content: 'Macaksara - Permainan Kuis Membaca Aksara Jawa' }
            ]
        };
    },
    async mounted() {
        this.quizzes = await this.$content("quizzes").fetch() || null;

        this.verifyUser();
        this.initQuizCards();
        
        this.isLoading = false;
    },
    methods: {
        createNewUser() {
            this.user = {
                learnedWords: 0, 
                maxStreak: 0,
                quizProgresses: {},
            };

            // get quizzes
            for(let i = 0; i < this.quizzes.length; i++) {
                const slug = this.quizzes[i].slug;

                this.user.quizProgresses[slug] = {
                    currentLevel: 1,
                    isCompleted: false
                };
            }

            localStorage.setItem('userData', JSON.stringify(this.user));
        },
        verifyUser() {
            this.user = JSON.parse(localStorage.getItem('userData'));
            // console.log(this.user);

            // verify user
            if(this.user) {
                const quizProgKeys = Object.keys(this.user.quizProgresses);

                let updateUser = false;
                if(this.user.learnedWords === undefined || this.user.learnedWords === null) {
                    this.user.learnedWords = 0;
                    updateUser = true;
                }

                if(this.user.maxStreak === undefined || this.user.maxStreak === null) {
                    this.user.maxStreak = 0;
                    updateUser = true;
                }

                if(quizProgKeys.length === this.quizzes.length) {
                    for(let i = 0; i < this.quizzes.length; i++) {
                        if(quizProgKeys[i] !== this.quizzes[i].slug || quizProgKeys[i] === "undefined") {
                            this.user.quizProgresses[quizProgKeys[i]] = {
                                currentLevel: 1,
                                isCompleted: false
                            }

                            updateUser = true;
                        }
                    }
                } else {
                    this.user.quizProgresses ={};
                    
                    for(let i = 0; i < this.quizzes.length; i++) {
                        const slug = this.quizzes[i].slug;

                        this.user.quizProgresses[slug] = {
                            currentLevel: 1,
                            isCompleted: false
                        };
                    }
                    this.createNewUser();
                }

                if(updateUser) {
                    localStorage.setItem('userData', JSON.stringify(this.user));
                }
            } else {
                this.createNewUser();
            }
        },
        initQuizCards() {
            // create quiz card
            for(let i = 0; i < this.quizzes.length; i++) {
                const slug = this.quizzes[i].slug;
                const title = this.quizzes[i].title;
                const currentLevel = this.user.quizProgresses[slug].currentLevel;
                const isCompleted = this.user.quizProgresses[slug].isCompleted;

                let questionTotal = 0;
                if(!isCompleted) {
                    const levelKeys = Object.keys(this.quizzes[i].levels);
                    for(const key in levelKeys) {
                        if(this.quizzes[i].levels[key].value === currentLevel) {
                            questionTotal = this.quizzes[i].levels[key].questions.length;
                            break;
                        }
                    }
                    // console.log(questionTotal);
                }

                this.quizCards[i] = {
                    slug,
                    title,
                    currentLevel,
                    questionTotal,
                    isCompleted
                }
            }
        },
        resetGame() {
            this.isLoading = true;

            this.createNewUser();
            this.initQuizCards();

            this.isLoading = false;
        }
    }
}
</script>

<style lang="scss">
    // empty style
</style>