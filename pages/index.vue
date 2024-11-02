<template>
    <div class="row">
        <Sidebar :user="user" :is-loading="isLoading" @reset-game="resetGame"/>

        <main class="col-12 col-lg-8">
            <div class="mb-3 mb-md-4">
                <h2>Pilih Kuis</h2>
            </div>

            <div v-if="isLoading" class="row no-gutters">
                <div 
                    v-for="index in 5" 
                    :key="index" 
                    class="col-12 col-md-6 mb-3" 
                    :class="index % 2 === 0 ? 'pl-md-2' : 'pr-md-2'"
                >
                    <QuizCard is-loading />
                </div>
            </div>

            <div v-else class="row no-gutters">
                <div 
                    v-for="(card, i) in quizCards"   
                    :key="card.id" 
                    class="col-12 col-md-6 mb-3" 
                    :class="i % 2 === 0 ? 'pr-md-2' : 'pl-md-2'"
                >
                    <QuizCard 
                        :title="card.title" 
                        :title-translation="card.titleTranslation"
                        :slug="card.slug"
                        :icon="card.icon"
                        :question-total="card.questionTotal"
                        :current-level="card.currentLevel"
                        :max-level="card.maxLevel"
                        :is-completed="card.isCompleted"             
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
        const title = `Macaksara — Permainan Kuis Membaca Aksara Jawa`;
        const url = 'https://adityarahmanda.github.io/macaksara';

        return {
            title,
            meta: [
                { name: 'robots', content: 'follow, index, max-snippet:-1, max-video-preview:-1, max-image-preview:large' },
                { hid: 'title', name: 'title', content: title },
                { property: 'og:title', content: title },
                { property: 'og:url', content: url },
                { name: 'twitter:title', content: title },
                { name: 'twitter:url', content: url },
            ],
            link: [
                { rel: 'canonical', href: url },     
            ],
        };
    },
    async mounted() {
        try {
            this.quizzes = await this.$axios.$get('https://adityarahmanda.github.io/macaksara/quizzes.json');
            this.verifyUser();
            this.initQuizCards();
        } catch (error) {
            console.error(error);
        } finally {
            this.isLoading = false;
        }
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
                const titleTranslation = this.quizzes[i].titleTranslation;
                const icon = this.quizzes[i].icon;
                const currentLevel = this.user.quizProgresses[slug].currentLevel;
                const maxLevel = this.quizzes[i].levels.length;
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
                    titleTranslation,
                    icon,
                    currentLevel,
                    maxLevel,
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