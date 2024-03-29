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
        const siteName = 'Macaksara';
        const title = `${siteName} — Permainan Kuis Membaca Aksara Jawa`;
        const description = `${siteName} merupakan website permainan kuis untuk menguji kemampuan membaca aksara Jawa yang didesain secara interaktif dan menyenangkan.`;
        const url = 'https://adityarahmanda.github.io/macaksara';
        const image = 'https://adityarahmanda.github.io/img/macaksara-summary.png';

        return {
            title,
            meta: [
                { hid: 'title', name: 'title', content: title },
                { hid: 'description', name: 'description', content: description },
                { name:'keyword', content:'macaksara, aksara, jawa, kuis, membaca, latihan, interaktif' },
                { property: 'og:locale', content: 'id_ID' },
                { property: 'og:type', content:'website' },
                { property: 'og:title', content: title },
                { property: 'og:description', content: description },
                { property: 'og:url', content: url },
                { property: 'og:site_name', content: siteName },
                { property: 'fb:admins', content: '100005745649451' },
                { property: 'og:image', content: image },
                { property: 'og:image:secure_url', content: image },
                { property: 'og:image:width', content: '768' },
                { property: 'og:image:height', content: '436' },
                { property: 'og:image:alt', content: siteName },
                { property: 'og:image:type', content: 'image/png' },
                { name: 'twitter:card', content:'summary_large_image' },
                { name: 'twitter:url', content: url },
                { name: 'twitter:title', content: title },
                { name: 'twitter:description', content: description },
                { name: 'twitter:image', content: image },
                { name: 'twitter:site', content: '@arahmanda21' },    
                { name: 'twitter:creator', content: '@arahmanda21' },
                { name: 'google-site-verification', content: 'xxxx' },
                { name: 'yandex-verification', content: 'xxxx' },
                { name: 'p:domain_verify', content: 'xxxx' },
                { name: 'norton-safeweb-site-verification', content: 'xxxx' }
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

<style lang="scss">
    // empty style
</style>