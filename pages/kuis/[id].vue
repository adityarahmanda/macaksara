<template>
    <div class="quiz-wrapper">
        <div class="container is-full-screen" style="position: relative; display: flex; flex-direction: column;">
            <div class="quiz-top-area-wrapper row is-center" style="padding: 1.5em;">
                <div class="col-2-important">
                    <nuxt-link v-slot="{ navigate }" to="/" custom>
                        <div class="text-left" style="font-size: 2em; cursor: pointer;" @click="navigate">
                            <fa icon="times" />
                        </div>
                    </nuxt-link>
                </div>
                <div class="col-8-important">
                    <ProgressBar :percentage="questionPercentage"/>
                </div>
                <div class="col-2-important">
                    <div class="text-right" style="font-size: 2em; cursor: pointer;" @click="toggleAudio">
                        <fa v-if="enableAudio" icon="volume-up" />
                        <fa v-else icon="volume-mute" />
                    </div>
                </div>
            </div>

            <div v-if="!isCompleted" class="row is-center" :class="isLoading ? 'invisible' : 'visible'" style="flex-grow: 1; flex-direction: column; flex-wrap: wrap;">
                <div class="col-12 text-center">
                    <h4 v-if="questionAnswered" class="quiz-instruction px-3 px-md-0">Satu Kata Berhasil Dibaca!</h4>
                    <h4 v-else class="quiz-instruction">Pilih Cara Baca Yang Benar</h4>
                </div>

                <Question 
                    :question-answered="questionAnswered"
                    :current-syllable="currSyllable" 
                    :syllables="syllables"
                    :is-loading="isLoading"
                    :is-murda="choiceOptions.isMurda"
                    :is-dipthong="choiceOptions.isDipthong"
                    :is-learning-angka="choiceOptions.isLearningAngka"
                    class="col-12 text-center"
                    style="margin-bottom: 0;"
                />
                
                <div v-if="!questionAnswered" class="col-12 text-center" style="margin-top: 2em;">
                    <MultipleChoices :choices="choices" @select-choices="selectChoices"/>
                </div>
                
                <div class="quiz-translation col-12 text-center" :class="questionAnswered ? 'visible' : 'invisible'">
                    <span v-if="questionAnswered && questions[currQuestion].translation">terjemahan: {{ questions[currQuestion].translation }}</span>
                </div>

                <div class="quiz-translation col-12 text-center" :class="questionAnswered ? 'visible' : 'invisible'">
                    <span v-if="questionAnswered && questions[currQuestion].description">keterangan: {{ questions[currQuestion].description }}</span>
                </div>

                <div class="quiz-next-button-area col-12 text-center" :class="questionAnswered ? 'visible' : 'invisible'" style="margin-top: 1em;">
                    <button v-if="questionAnswered" class="button primary" style="font-weight: 900; border-radius: 50rem; padding-left: 4em; padding-right: 4em;" @click="setNextQuestion">Lanjut</button>
                </div>
            </div>

            <div v-if="isCompleted" class="row is-center" style="flex-grow: 1; flex-direction: column; flex-wrap: wrap;">
                <div class="col-12 text-center">
                    <h3>{{completeQuizMessage}}</h3>
                </div>
                <div class="col-12 text-center" style="margin-bottom: 2em;">
                    <div class="thumbs-up-icon">
                        <fa icon="thumbs-up" />
                    </div>
                </div>
                <div v-if="learnedNewWords || hasNewStreak" class="col-12 text-center">
                    <h5 v-if="learnedNewWords" :style="hasNewStreak ? 'margin-bottom: 0em' : ''">{{ questions.length }} kata baru berhasil dibaca!</h5>
                    <h5 v-if="hasNewStreak" >{{ maxStreakCount }} streak baru didapatkan!</h5>
                </div>
                <div class="col-12 text-center">
                    <nuxt-link to="/" class="button primary" style="font-weight: 900; border-radius: 50rem; padding-left: 4em; padding-right: 4em;">
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
const choiceOptions = ref({})
const questionPercentage = ref(0)
const questionAnswered = ref(false)
const streakCount = ref(0)
const maxStreakCount = ref(0)
const learnedNewWords = ref(false)
const hasNewStreak = ref(false)
const notification = ref({
    visible: false,
    timeout: {},
    selected: {}
})
const enableAudio = ref(true)
const audio = ref(null)
const completeQuizMessage = ref("")

const notificationVariant = {
    correct: {
        icon: "check",
        variant: "success",
        message: "Benar"
    },
    wrong: {
        icon: "sad-tear",
        variant: "danger",
        message: "Salah"
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
}

const correctMessages = [
  'Mantap Betul!',
  'Kerja Bagus!',
  'Mainnya Hebat!',
  'Mantul Dah!',
];

const wrongMessages = [
  'Kurang Tepat Nih, Kamu Pasti Bisa Kok!',
  'Kurang Tepat Nih, Jangan Patah Semangat!',
  'Kurang Tepat Nih, Yuk Bisa Yuk!',
];

const loseStreakMessages = [
  'Streaknya Hilang. Coba Lagi Yuk!',
  'Streaknya Hilang. Pantang Mundur Yuk!',
  'Streaknya Hilang. Yuk Bisa Yuk!',
];

const completeQuizMessages = [
  'Selamat, kamu berhasil menyelesaikan kuis!',
  'Kuisnya berhasil diselesaikan dengan apik!',
  'Kuisnya berhasil diselesaikan, hore!',
];

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
        const response = await fetch(config.public.router_base + 'quiz-database.json')
        const database = await response.json()
        for(let i = 0; i < database.length; i++) {
            const data = database[i];
            for(let j = 0; j < data.quizzes.length; j++) {
                const quizData = data.quizzes[j];
                if (quizData.slug == slug.value)
                {
                   quiz.value = quizData;
                   break; 
                }
            }
        }
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
        let newChoice;
        do 
        { 
            newChoice = $generateJavaneseSyllable(choiceOptions.value);
        } 
        while (choices.includes(newChoice));
        choices = [...choices, newChoice];
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
        const goodJobMessage = getRandomMessages(correctMessages);
        if(streakCount.value >= 2) {
            setNotification(notificationVariant.streak);
            notification.value.selected.message = goodJobMessage + " " + streakCount.value + "x Streak";
        } else {
            setNotification(notificationVariant.correct);
            notification.value.selected.message = goodJobMessage;
        }
        
        // set to next syllable
        if(currSyllable.value < syllables.value.length - 1) {
            currSyllable.value++;
            populateChoices();
        } else {
            questionAnswered.value = true;
            questionPercentage.value = ((currQuestion.value + 1) / questions.value.length) * 100;
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
        setNotification(notificationVariant.losestreak);
        const loseStreakMessage = getRandomMessages(loseStreakMessages);
        notification.value.selected.message = loseStreakMessage;
    } else {
        // send wrong notification
        setNotification(notificationVariant.wrong);
        const wrongMessage = getRandomMessages(wrongMessages);
        notification.value.selected.message = wrongMessage;
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
        completeQuizMessage.value = getRandomMessages(completeQuizMessages)

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
    const question = questions.value[currQuestion.value];
    syllables.value = $toSyllables(question.value);
    populateChoices()
}

const populateChoices = () => {
    const question = questions.value[currQuestion.value];

    choiceOptions.value = {
        isLearningNglegena: question.isLearningNglegena,
        isLearningSwara: question.isLearningSwara,
        isLearningSandhangan: question.isLearningSandhangan,
        isLearningAngka: question.isLearningAngka,
        isLearningLampau: question.isLearningLampau,
        isMurda: question.isMurda,
        isDipthong: question.isDipthong
    }

    choices.value = generateChoices(syllables.value[currSyllable.value], choiceOptions);
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

const getRandomMessages = (messages) => {
    const randomIndex = Math.floor(Math.random() * messages.length);
    return messages[randomIndex];
}
</script>