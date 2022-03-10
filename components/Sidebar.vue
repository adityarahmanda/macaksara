<template>
    <div class="col-12 col-lg-4 pr-lg-5 mb-3 mb-md-4">
        <p class="mb-4">Macaksara merupakan website permainan kuis untuk menguji kemampuan membaca Aksara Jawa.</p>
        
        <div class="user-progress">
            <div class="user-progress-header">
                <h4>Perkembangan Permainan :</h4>
            </div>
            <div class="user-progress-info mb-4">
                <div id="word-collected" class="d-flex mb-sm-0 align-items-center">
                    <div class="counter col-4 pl-0 pr-3 text-right">
                        <span v-if="!isLoading">{{ user.learnedWords }}</span>
                        <span v-else>0</span>
                    </div>
                    <div class="col-8 px-0 text-left">kata dibaca</div>
                </div>
                <div id="max-streak" class="d-flex align-items-center">
                    <div class="counter col-4 pl-0 pr-3 text-right">
                        <span v-if="!isLoading">{{ user.maxStreak }}</span>
                        <span v-else>0</span>
                    </div>
                    <div class="col-8 px-0 text-left">streak tertinggi didapatkan</div>
                </div>
            </div>
            <button class="reset-button pushable w-100 mb-3 mb-md-4" @click="$emit('reset-game')" >
                <span class="front">
                    Atur Ulang Permainan
                </span>
            </button>
            <p class="small">*Data permainan tersimpan secara otomatis pada perangkat yang digunakan.</p>
        </div>
    </div>
</template>

<script>
export default {
    props: {
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
    },
    data() {
        return {
            isEditName: false,
        }
    },
    methods: {
        editName() {
            this.isEditName = true;
        }
    }
}
</script>