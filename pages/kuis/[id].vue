<template>
    <div class="quiz-wrapper">
        <div class="container position-relative d-flex flex-column h-100">
            <div class="quiz-top-area-wrapper row align-items-center no-gutters px-4 px-md-0 py-4">
                <div class="col-2">
                    <nuxt-link v-slot="{ navigate }" to="/" custom>
                        <div class="close-icon mr-auto" @click="navigate">
                            <i class="fa fa-solid fa-times"></i>
                        </div>
                    </nuxt-link>
                </div>
                <div class="col-8">
                    <ProgressBar :percentage="questionPercentage"/>
                </div>
                <div class="col-2">
                    <div class="sound-icon ml-auto" @click="toggleAudio">
                        <i v-if="enableAudio" class="fa fa-solid fa-volume-up"></i>
                        <i v-else class="fa fa-solid fa-volume-mute"></i>
                    </div>
                </div>
            </div>

            <div v-if="!isCompleted" class="row align-content-center flex-grow-1" :class="isLoading ? 'invisible' : 'visible'">
                <div class="col-12 text-center mb-4">
                    <h3 v-if="questionAnswered" class="quiz-instruction px-3 px-md-0">Satu Kata Telah Terbaca Dengan Benar!</h3>
                    <h3 v-else class="quiz-instruction">Pilih Cara Baca Yang Benar Dari Aksara Jawa Berikut!</h3>
                </div>

                <Question 
                    :question-answered="questionAnswered"
                    :current-syllable="currSyllable" 
                    :syllables="syllables"
                    :is-loading="isLoading"
                    class="col-12 text-center"
                />
                
                <div v-if="!questionAnswered" class="col-12 text-center mt-5" >
                    <MultipleChoices :choices="choices" @select-choices="selectChoices"/>
                </div>
                
                <div class="quiz-translation col-12 text-center" :class="questionAnswered ? 'visible  mb-5' : 'invisible'">
                    <b v-if="questionAnswered">{{ questions[currQuestion].translation }}</b>
                </div>

                <div class="quiz-next-button-area col-12 text-center" :class="questionAnswered ? 'visible' : 'invisible'">
                    <button v-if="questionAnswered" class="btn next-question-button" @click="setNextQuestion">Lanjut</button>
                </div>
            </div>

            <div v-if="isCompleted" class="row align-content-center flex-grow-1">
                <div class="col-12 text-center mb-4">
                    <h3>Selamat!</h3>
                    <p class="mb-0">Kamu telah berhasil menyelesaikan kuis.</p>
                </div>
                <div class="col-12 text-center" :class="learnedNewWords || hasNewStreak ? 'mb-4' : 'mb-5'">
                    <div class="thumbs-up-icon">
                        <i class="fa fa-solid fa-thumbs-up"></i>
                    </div>
                </div>
                <div v-if="learnedNewWords || hasNewStreak" class="col-12 text-center mb-4">
                    <h5 v-if="learnedNewWords" :class="hasNewStreak ? 'mb-3' : 'mb-0'">{{ questions.length }} kata baru telah dibaca!</h5>
                    <h5 v-if="hasNewStreak" >{{ maxStreakCount }} streak baru didapatkan!</h5>
                </div>
                <div class="col-12 text-center">
                    <nuxt-link to="/" class="btn btn-primary rounded-pill border-0 px-4">
                        Kembali ke Beranda
                    </nuxt-link>
                </div>
            </div>
        
            <Notification 
                v-if="!isCompleted"
                :visible="notification.visible" 
                :icon="notification.selected.icon"
                :variant="notification.selected.variant"
                :message="notification.selected.message"
            />
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const { $shuffleArray, $toSyllables, $generateJavaneseSyllable } = useNuxtApp()
const config = useRuntimeConfig()
const route = useRoute();
const router = useRouter();

const isLoading = ref(true)
const isCompleted = ref(false)
const user = ref(undefined)
const slug = ref('')
const title = ref('')
const quiz = ref(undefined)
const currentLevel = ref(0)
const maxLevel = ref(0)
const questions = ref({})
const currQuestion = ref(0)
const syllables = ref([])
const currSyllable = ref(0)
const choices = ref([])
const totalChoices = ref(4)
const questionPercentage = ref(0)
const questionAnswered = ref(false)
const streakCount = ref(0)
const maxStreakCount = ref(0)
const learnedNewWords = ref(false)
const hasNewStreak = ref(false)
const notification = ref({
    visible: false,
    timeout: {},
    selected: {},
    correct: {
        icon: "check",
        variant: "success",
        message: "Jawaban Benar!"
    },
    wrong: {
        icon: "times",
        variant: "danger",
        message: "Jawaban Salah!"
    },
    streak: {
        icon: "fire",
        variant: "success",
        message: "Jawaban Benar! 0x Streak!"
    }, 
    losestreak: {
        icon: "sad-tear",
        variant: "danger",
        message: "Salah! Kehilangan Streak!"
    }
})
const enableAudio = ref(true)
const audio = ref(null)

const HeadTitle = title.value !== undefined ? 'Kuis ' + title.value : 'Kuis Tidak Ditemukan';
const url = 'https://adityarahmanda.github.io/macaksara/' + route.params.id;

definePageMeta({
  layout: 'quiz'
})

useHead({
    title: `${HeadTitle} — Macaksara`,
    meta: [
        { name:'robots', content:'noindex, follow' },
        { hid: 'title', name: 'title', content: HeadTitle },
        { property: 'og:title', content: HeadTitle },
        { property: 'og:url', content: url },
        { name: 'twitter:title', content: HeadTitle },
        { name: 'twitter:url', content: url },
    ],
    link: [
        { rel: 'canonical', href: url },     
    ],
})

onMounted(async () => {
    slug.value = route.params.id;

    try {
        const response = await fetch(config.public.router_base + 'quizzes.json')
        const quizzes = await response.json()
        quiz.value = quizzes.find((item) => item.slug === slug.value);
        verifyUser();
        startQuiz();
    } catch (err) {
        console.log(err);
        router.push('/');
    } finally {
        isLoading.value = false; // Ensure loading state is updated regardless of success or failure
    }
})

const verifyUser = () => {
    user.value = JSON.parse(localStorage.getItem('userData'));
    
    if(!user.value) {
        router.push('/');
        return;
    }

    if(user.value.learnedWords === undefined || user.value.learnedWords === null) {
        router.push('/');
        return;
    }

    if(user.value.maxStreak === undefined || user.value.maxStreak === null) {
        router.push('/');
    }
}

const startQuiz = () => {
    title.value = quiz.value.title;
    currentLevel.value = user.value.quizProgresses[slug.value].currentLevel;
    maxLevel.value = quiz.value.levels.length;

    if(currentLevel.value > maxLevel.value) {
        router.push('/');
        return;
    }

    const levelKeys = Object.keys(quiz.value.levels);
    for(const key in levelKeys) {
        if(quiz.value.levels[key].value === currentLevel.value) {
            questions.value = quiz.value.levels[key].questions;
            break;
        }
    }

    // shuffle questions
    $shuffleArray(questions.value);
    startNewQuestion();
}

const generateChoices = (syllable) => {
    let choices = [syllable];
    
    for(let i = 1; i < totalChoices.value; i++) {
        let generatedSyllable;
        do { generatedSyllable = $generateJavaneseSyllable(); } 
        while (generatedSyllable === syllable);
        choices = [...choices, generatedSyllable];
    }
    
    return $shuffleArray(choices);
}

const selectChoices = (choiceButton, choice) => {
    if(questionAnswered.value) {
        return;
    }

    // correct answer
    if(choice === syllables.value[currSyllable.value]) {
        // play correct sound
        playSound('correct.mp3');
        
        // calculate max streak
        streakCount.value++;
        if(streakCount.value > maxStreakCount.value) {
            maxStreakCount.value = streakCount.value;
        }

        // correct or streak notification
        if(streakCount.value >= 2) {
            notification.value.streak.message = "Benar, " + streakCount.value + "x Streak";
            setNotification(notification.value.streak);
        } else {
            setNotification(notification.value.correct);
        }
        
        // set to next syllable
        if(currSyllable.value < syllables.value.length - 1) {
            currSyllable.value++;
            choices.value = generateChoices(syllables.value[currSyllable.value]);
        } else {
            questionAnswered.value = true;
            questionPercentage.value = ((currQuestion.value + 1) / questions.value.length) * 100;
            // console.log((currQuestion.value + 1) + '/' + quiz.value.length + '=' + questionPercentage.value);
        }

        // blur button
        choiceButton.blur();
        return;
    }
    
    // wrong answer
    playSound('wrong.mp3');

    if(streakCount.value !== 0) {
        // reset streak and send notification
        streakCount.value = 0;
        setNotification(notification.value.losestreak);
    } else {
        // send wrong notification
        setNotification(notification.value.wrong);
    }
}

const setNextQuestion = () => {
    if(!questionAnswered.value) {
        return;
    }

    if(currQuestion.value < questions.value.length - 1) {
        // reset state
        currQuestion.value++;
        currSyllable.value = 0;
        
        // set next question
        startNewQuestion();
    } else {
        // play correct sound
        playSound("tada.mp3");

        // save quiz progress
        const userQuizProgress = user.value.quizProgresses[slug.value];

        if(!userQuizProgress.isCompleted) {
            if(currentLevel.value === maxLevel.value) {  
                userQuizProgress.isCompleted = true;
            } else {                                        
                userQuizProgress.currentLevel++;
            }
            
            user.value.quizProgresses[slug.value] = userQuizProgress;
            user.value.learnedWords += questions.value.length;
            learnedNewWords.value = true;
        }

        if(maxStreakCount.value > user.value.maxStreak) {
            user.value.maxStreak = maxStreakCount.value;
            hasNewStreak.value = true;
        }

        localStorage.setItem('userData', JSON.stringify(user.value));
        isCompleted.value = true;
    }
}

const startNewQuestion = () => {
    questionAnswered.value = false;
    syllables.value = $toSyllables(questions.value[currQuestion.value].value);
    choices.value = generateChoices(syllables.value[currSyllable.value]);
}

const setNotification = (newNotification) => {
    notification.value.selected = newNotification;
    notification.value.visible = true;
    clearTimeout(notification.value.timeout);
    notification.value.timeout = setTimeout(() => {
        notification.value.visible = false;
    }, 1500);
}

const toggleAudio = () => {
    enableAudio.value = !enableAudio.value;
    localStorage.setItem("enableAudio", enableAudio.value);
}

const playSound = (fileName) => {
    if(enableAudio.value) {
        audio.value = null;
        audio.value = new Audio(config.public.router_base + 'sounds/' + fileName);
        audio.value.currentTime = 0;
        audio.value.play();
    }
}
</script>