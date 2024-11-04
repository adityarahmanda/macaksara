<template>
    <div class="sidebar col-12 col-lg-4 pr-lg-5 mb-3 mb-md-4">
        <p class="mb-4">Macaksara merupakan website permainan kuis untuk menguji kemampuan membaca Aksara Jawa.</p>
        
        <div class="user-progress">
            <div class="user-progress-header">
                <h2 class="h4">Perkembangan Permainan :</h2>
            </div>
            <div class="user-progress-info mb-md-4 mb-3">
                <div id="word-collected" class="row no-gutters align-items-center">
                    <div class="counter col-md-4 col-6 text-right">
                        <span v-if="!isLoading" class="pr-3">{{ user.learnedWords }}</span>
                        <span v-else class="pr-3">0</span>
                    </div>
                    <div class="col-md-8 col-6">kata dibaca</div>
                </div>
                <div id="max-streak" class="row no-gutters align-items-center">
                    <div class="counter col-4 text-right">
                        <span v-if="!isLoading" class="pr-3">{{ user.maxStreak }}</span>
                        <span v-else  class="pr-3">0</span>
                    </div>
                    <div class="col-8">streak tertinggi</div>
                </div>
            </div>
            <button class="reset-button pushable w-100 mb-3 mb-md-4" @click="showModal" >
                <span class="front">
                    Atur Ulang Permainan
                </span>
            </button>
            <p class="small">*Data permainan tersimpan secara otomatis pada perangkat yang digunakan.</p>
        </div>

        <div v-if="isShowModal" id="_modal_outer_" style="position: absolute; z-index: 1040;">
            <div id="reset-progress-modal" role="dialog" aria-describedby="_modal_body_" class="modal fade show" aria-modal="true" style="display: block;">
                <div class="modal-dialog modal-md modal-dialog-centered">
                    <span tabindex="0"></span>
                    <div id="_modal_content_" tabindex="-1" class="modal-content">
                        <div id="_modal_body_" class="modal-body text-center">
                            Apakah kamu yakin untuk mengatur ulang permainan dan kehilangan semua perkembangan permainan?
                        </div>
                        <footer id="_modal_footer_" class="modal-footer">
                            <div class="row w-100 no-gutters">
                                <div class="col-12 col-md-6 pr-0 pr-md-1 mb-2 mb-md-0">
                                    <button class="btn btn-primary text-white rounded-pill w-100" @click="hideModal">Batalkan</button>
                                </div> 
                                <div class="col-12 col-md-6 pl-0 pl-md-1">
                                    <button class="btn btn-danger text-white rounded-pill w-100" @click="resetGameAndHideModal">Atur Ulang</button>
                                </div>
                            </div>
                        </footer>
                    </div>
                    <span tabindex="0"></span>
                </div>
            </div>
            <div id="_modal_backdrop_" class="modal-backdrop"></div>
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