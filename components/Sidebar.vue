<template>
    <div class="sidebar col-12 col-4-lg pr-lg-5" style="margin-bottom: 1em">
        <p>Macaksara merupakan website permainan kuis untuk menguji kemampuan membaca Aksara Jawa.</p>
        
        <div class="user-progress">
            <h4>Perkembangan Permainan</h4>
            <div class="is-horizontal-align" style="margin-bottom: 1em">
                <div id="word-collected" class="is-center">
                    <div class="counter col-4-md col-6 text-right">
                        <span v-if="!isLoading" class="pr-3">{{ user.learnedWords }}</span>
                        <span v-else class="pr-3">0</span>
                    </div>
                    <div class="col-8-md col-6">kata dibaca</div>
                </div>
                <div id="max-streak" class="is-center">
                    <div class="counter col-4 text-right">
                        <span v-if="!isLoading" class="pr-3">{{ user.maxStreak }}</span>
                        <span v-else  class="pr-3">0</span>
                    </div>
                    <div class="col-8">streak tertinggi</div>
                </div>
            </div>
            <button class="button pushable is-full-width" style="margin-bottom: .5em" @click="showModal" >
                <span class="front">
                    Atur Ulang Permainan
                </span>
            </button>
            <p class="small">*Data permainan tersimpan secara otomatis pada perangkat yang digunakan.</p>
        </div>

        <div v-if="isShowModal" class="is-center" style="position: fixed; width: 100%; height: 100%; top: 0; left: 0; z-index: 1040; background-color: rgba(0, 0, 0, .5)">
            <div class="card" style="margin: 1em; border: 2px solid var(--color-primary); border-radius: 1.4rem; box-shadow: none; min-width: 400px;">
                <div class="text-center" style="font-weight: 900; border-radius: 50rem; margin-bottom: .5em;">
                    Yakin atur ulang permainan?
                </div>
                <footer class="row">
                    <button class="button primary col-12 col-6-md" style="font-weight: 900; border-radius: 50rem;" @click="hideModal">Batalin</button>
                    <button class="button error col-12 col-6-md" style="font-weight: 900; border-radius: 50rem;" @click="resetGameAndHideModal">Atur Ulang</button>
                </footer>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const emit = defineEmits(['reset-game'])

const props = defineProps({
    user: {
        type: Object,
        default() {
            return {};
        }
    },
    isLoading: {
        type: Boolean,
        default: false
    }
})

const isShowModal = ref(false)

const showModal = () => {
    isShowModal.value = true;
}

const hideModal = () => {
    isShowModal.value = false;
}

const resetGameAndHideModal = () => {
    emit('reset-game')
    hideModal()
}
</script>