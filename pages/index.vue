<template>
    <div class="row">
        <Sidebar :user="user" :is-loading="isLoading" @reset-game="resetGame"/>

        <main class="col-12 col-8-lg">
            <div v-if="isLoading" class="row">
                <div 
                    v-for="index in 5" 
                    :key="index" 
                    class="col-12 col-6-md"
                    :style="index % 2 === 0 ? 'margin-left: 0' : ''"
                    style="margin-bottom: 1em"
                >
                    <QuizCard is-loading />
                </div>
            </div>

            <div v-for="(card, i) in quizCardDataList" :key="card.id">
                <h2 style="margin-top: 0">{{ card.category }}</h2>
                <div class="row">
                    <div 
                        v-for="(quizData, i) in card.quizDataList"  
                        :key="quizData.id" 
                        class="col-12 col-6-md"
                        :style="index % 2 === 0 ? 'margin-left: 0' : ''"
                        style="margin-bottom: 1em"
                    >
                        <QuizCard 
                            :title="quizData.title" 
                            :description="quizData.description"
                            :slug="quizData.slug"
                            :icon="quizData.icon"
                            :question-total="quizData.questionTotal"
                            :current-level="quizData.currentLevel"
                            :max-level="quizData.maxLevel"
                            :is-completed="quizData.isCompleted"             
                        />
                    </div>
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
const database = ref([]);
const quizCardDataList = ref({});

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

    // get database
    for(let i = 0; i < database.value.length; i++) {
        const data = database.value[i];
        for(let j = 0; j < data.quizzes.length; j++) {
            const slug = data.quizzes[j].slug;
            user.value.quizProgresses[slug] = {
                currentLevel: 1,
                isCompleted: false
            };
        }
    }

    localStorage.setItem('userData', JSON.stringify(user.value));
}

const verifyUser = () => {
    user.value = JSON.parse(localStorage.getItem('userData'));
    // console.log(user);

    // verify user
    if(user.value) {
        const quizProgKeys = Object.keys(user.value.quizProgresses);
        let quizzesLength = 0;
        database.value.forEach(data => quizzesLength += data.quizzes.length)

        let updateUser = false;
        if(user.value.learnedWords === undefined || user.value.learnedWords === null) {
            user.value.learnedWords = 0;
            updateUser = true;
        }

        if(user.value.maxStreak === undefined || user.value.maxStreak === null) {
            user.value.maxStreak = 0;
            updateUser = true;
        }

        if(quizProgKeys.length === quizzesLength) {
            database.value.forEach(data => {
                data.quizzes.forEach(quizData => {
                    const progressExist = quizProgKeys.indexOf(quizData.slug) !== -1;
                    if(!progressExist) {
                        user.value.quizProgresses[quizData.slug] = {
                            currentLevel: 1,
                            isCompleted: false
                        }

                        updateUser = true;
                    }
                });
            });
        } else {
            user.value.quizProgresses = {};
            database.value.forEach(data => {
                data.quizzes.forEach(quizData => {
                    user.value.quizProgresses[quizData.slug] = {
                        currentLevel: 1,
                        isCompleted: false
                    };
                })
            });
            createNewUser();
        }

        if(updateUser) {
            localStorage.setItem('userData', JSON.stringify(user.value));
        }
    } else {
        createNewUser();
    }
}

const initQuizCardDataList = () => {
    // create quiz card
    console.log(database.value);
    for(let i = 0; i < database.value.length; i++) {
        const data = database.value[i];
        const category = data.category;

        const quizDataList = new Array;
        for(let j = 0; j < data.quizzes.length; j++) {
            const quiz = data.quizzes[j];
            const slug = quiz.slug;
            const title = quiz.title;
            const description = quiz.description;
            const icon = quiz.icon;
            const maxLevel = quiz.levels.length;

            let quizData = {
                
            }

            const quizProgress = user.value.quizProgresses[slug];
           
                const currentLevel = quizProgress.currentLevel;
                const isCompleted = quizProgress.isCompleted;
                let questionTotal = 0;
                if(!isCompleted) {
                    const levelKeys = Object.keys(quiz.levels);
                    for(const key in levelKeys) {
                        if(quiz.levels[key].value === currentLevel) {
                            questionTotal = quiz.levels[key].questions.length;
                            break;
                        }
                    }
                }

                quizData = {
                    slug,
                    title,
                    description,
                    icon,
                    maxLevel,
                    currentLevel,
                    questionTotal,
                    isCompleted,
                }

            quizDataList[j] = quizData;
        }
        
        quizCardDataList.value[i] = {
            category,
            quizDataList
        }
    }
    console.log(quizCardDataList.value)
}

const resetGame = () => {
    isLoading.value = true;

    createNewUser();
    initQuizCardDataList();

    isLoading.value = false;
}

onMounted(async () => {
    try {
        const response = await fetch(config.public.router_base + 'quiz-database.json');
        database.value = await response.json();
        verifyUser();
        initQuizCardDataList();
    } catch (error) {
        console.error(error);
    } finally {
        isLoading.value = false;
    }
})
</script>