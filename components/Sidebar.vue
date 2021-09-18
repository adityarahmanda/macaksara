<template>
    <div class="col-12 col-lg-4 pr-lg-5 mb-5">
        <p>Terdapat beberapa kata aksara jawa dalam berbagai tema pada kuis-kuis berikut.</p> 
        <p>Mampukah kamu membaca kata-kata tersebut dan menyelesaikan semua kuisnya?</p>
        <div class="d-block d-sm-flex justify-content-center d-lg-block px-lg-0 mb-4">
            <div id="word-collected" class="d-flex mb-sm-0 align-items-center">
                <div class="number col-4 pl-0 pr-3 text-right">{{user.wordsLearned}}</div>
                <div class="col-8 px-0 text-left">kata dibaca</div>
            </div>
            <div id="max-streak" class="d-flex align-items-center">
                <div class="number col-4 pl-0 pr-3 text-right">{{user.maxStreak}}</div>
                <div class="col-8 px-0 text-left">streak tertinggi didapatkan</div>
            </div>
        </div>
        <button class="btn button w-100 mb-4" @click="$emit('reset-game');">Atur Ulang Permainan</button>
        <p>*data tersimpan secara otomatis pada perangkat yang digunakan.</p>
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

<style>
.number {
  font-size: 36px;
  font-weight: 900;
}
</style>