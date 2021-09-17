<template>
    <div class="sidebar position-relative pr-lg-5 mb-6 mb-lg-0">
        <div class="username mb-4">Hai, <span>{{user.name}}</span><fa class="ml-2" icon="edit"/></div>
        <div class="container position-relative px-0">
            <p class="mb-4">Uji kemampuan aksara jawamu dengan menjawab kuis-kuis berikut</p>
            <div class="container d-block d-sm-flex justify-content-center d-lg-block px-lg-0 mb-4">
                <div id="word-collected" class="d-flex mb-4 mb-sm-0 mb-lg-4 align-items-center">
                    <div class="number col-4 pl-0 pr-3 text-right">{{user.wordsLearned}}</div>
                    <div class="col-8 px-0 text-left">kata dipelajari</div>
                </div>
                <div id="max-streak" class="d-flex align-items-center">
                    <div class="number col-4 pl-0 pr-3 text-right">{{user.maxStreak}}</div>
                    <div class="col-8 px-0 text-left">streak tertinggi didapatkan</div>
                </div>
            </div>
            <button class="btn button w-100" @click="$emit('reset-game');">Atur Ulang Permainan</button>
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
        }
    }
}
</script>

<style>
.sidebar {
  width: 100%;
}

.username {
  font-size: 24px;
  font-weight: 900;
}

.username span {
  text-decoration: underline;
}

.number {
  font-size: 36px;
  font-weight: 900;
}

@media (min-width: 992px) {
  .sidebar {
    width: 290px;
  }
}
</style>