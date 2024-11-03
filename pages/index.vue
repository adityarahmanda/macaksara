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

<script setup>
import { ref, onMounted } from 'vue'

const config = useRuntimeConfig()

const user = ref(undefined);
const isLoading = ref(true);
const quizzes = ref([]);
const quizCards = ref({});

const title = `Macaksara — Permainan Kuis Membaca Aksara Jawa`
const url = 'https://adityarahmanda.github.io/macaksara'

useHead({
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
})

const createNewUser = () => {
    user.value = {
        learnedWords: 0, 
        maxStreak: 0,
        quizProgresses: {},
    };

    // get quizzes
    for(let i = 0; i < quizzes.value.length; i++) {
        const slug = quizzes.value[i].slug;

        user.value.quizProgresses[slug] = {
            currentLevel: 1,
            isCompleted: false
        };
    }

    localStorage.setItem('userData', JSON.stringify(user.value));
}

const verifyUser = () => {
    user.value = JSON.parse(localStorage.getItem('userData'));
    // console.log(user);

    // verify user
    if(user.value) {
        const quizProgKeys = Object.keys(user.value.quizProgresses);

        let updateUser = false;
        if(user.value.learnedWords === undefined || user.value.learnedWords === null) {
            user.value.learnedWords = 0;
            updateUser = true;
        }

        if(user.value.maxStreak === undefined || user.value.maxStreak === null) {
            user.value.maxStreak = 0;
            updateUser = true;
        }

        if(quizProgKeys.length === quizzes.value.length) {
            for(let i = 0; i < quizzes.value.length; i++) {
                if(quizProgKeys[i] !== quizzes.value[i].slug || quizProgKeys[i] === "undefined") {
                    user.value.quizProgresses[quizProgKeys[i]] = {
                        currentLevel: 1,
                        isCompleted: false
                    }

                    updateUser = true;
                }
            }
        } else {
            user.value.quizProgresses ={};
            
            for(let i = 0; i < quizzes.value.length; i++) {
                const slug = quizzes.value[i].slug;

                user.value.quizProgresses[slug] = {
                    currentLevel: 1,
                    isCompleted: false
                };
            }
            createNewUser();
        }

        if(updateUser) {
            localStorage.setItem('userData', JSON.stringify(user.value));
        }
    } else {
        createNewUser();
    }
}

const initQuizCards = () => {
    // create quiz card
    for(let i = 0; i < quizzes.value.length; i++) {
        var quiz = quizzes.value[i];
        const slug = quiz.slug;
        const title = quiz.title;
        const titleTranslation = quiz.titleTranslation;
        const icon = quiz.icon;
        const currentLevel = user.value.quizProgresses[slug].currentLevel;
        const maxLevel = quiz.levels.length;
        const isCompleted = user.value.quizProgresses[slug].isCompleted;

        let questionTotal = 0;
        if(!isCompleted) {
            const levelKeys = Object.keys(quiz.levels);
            for(const key in levelKeys) {
                if(quiz.levels[key].value === currentLevel) {
                    questionTotal = quiz.levels[key].questions.length;
                    break;
                }
            }
            // console.log(questionTotal);
        }

        quizCards.value[i] = {
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
}

const resetGame = () => {
    isLoading.value = true;

    createNewUser();
    initQuizCards();

    isLoading.value = false;
}

onMounted(async () => {
    try {
        const response = await fetch(config.public.router_base + 'quizzes.json');
        quizzes.value = await response.json();
        verifyUser();
        initQuizCards();
    } catch (error) {
        console.error(error);
    } finally {
        isLoading.value = false;
    }
})
</script>