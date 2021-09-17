<template>
    <div class="position-relative row">
        <div class="input position-relative col-12 col-lg-6 mb-5">
            <h3>Latin</h3>
            <textarea ref="textarea" v-model="text" type="text" class="input w-100 m-0 mb-2 px-2 py-2"></textarea>
            <div class="container mb-4 px-0">
                <label class="toggle" @click="toggleMurda"><div :class="murda ? 'slider checked' : 'slider'"></div> Murda</label>
                <label class="toggle ml-2" @click="toggleDiphthong"><div :class="diphthong ? 'slider checked' : 'slider'"></div> Diftong</label>
            </div>
            <div class="container special-character px-0">
                <h5>Karakter spesial</h5>
                <div class="container px-0">
                    <div class="d-inline-block button" @click="insertTextarea('ê')">ê</div>
                    <div class="d-inline-block button" @click="insertTextarea('ā')">ā</div>
                    <div class="d-inline-block button" @click="insertTextarea('ī')">ī</div>
                    <div class="d-inline-block button" @click="insertTextarea('ū')">ū</div>
                    <div class="d-inline-block button" @click="insertTextarea('ḍ')">ḍ</div>
                    <div class="d-inline-block button" @click="insertTextarea('ṣ')">ṣ</div>
                    <div class="d-inline-block button" @click="insertTextarea('ṭ')">ṭ</div>
                    <div class="d-inline-block button" @click="insertTextarea('ṭh')">ṭh</div>
                    <div class="d-inline-block button" @click="insertTextarea('ñ')">ñ</div>
                    <div class="d-inline-block button" @click="insertTextarea('ŋ')">ŋ</div>
                </div>
            </div>
        </div>
        <div class="output position-relative col-12 col-lg-6 mb-5">
            <h3>Aksara</h3>
            <div class="result w-100 m-0 px-2 py-2">{{ getResult() }}</div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            text: '',
            murda: false,
            diphthong: false,
            textarea: {}
        }
    },
    head() {
        return {
            title: 'Konverter Aksara - Konversi Aksara Jawa ke Latin dan Sebaliknya',
            meta: [
                {
                    hid: 'description',
                    name: 'description',
                    content: 'Konversi aksara jawa ke huruf latin maupun sebaliknya dengan mudah'
                }
            ]
        };
    },
    mounted(){
        this.textarea = this.$refs.textarea;
    },
    methods: {
        toggleMurda() {
            this.murda = !this.murda;
        },
        toggleDiphthong() {
            this.diphthong = !this.diphthong;
        },
        insertTextarea(text) {
            // insert character
            const nextCursorPos = this.textarea.selectionStart + text.length;
            this.text = this.text.substring(0, this.textarea.selectionStart) + text + this.text.substring(this.textarea.selectionEnd, this.text.length);
            
            // move cursor
            this.textarea.focus();
            setTimeout(() => {
                this.textarea.setSelectionRange(nextCursorPos, nextCursorPos);
            }, 10)
        },
        getResult() {
            return this.toJavaneseScript(this.text, this.murda, this.diphthong);
        }
    }
}
</script>

<style>
.input textarea {
    font-family: 'Noto-Sans-Javanese', 'Mulish', sans-serif;
    font-size: 24px;
    min-height: 160px;
    color: var(--dark-brown);
    border: 2px solid #ebe7e3;
    overflow: visible;
    line-height: 1.8;
}

.input textarea:focus {
    outline: none;
}

.special-character .button {
    font-size: 12px;
    padding: 4px 12px;
    border-radius: 10px;
    border: 2px solid #ebe7e3;
    -moz-box-shadow: none;
    -webkit-box-shadow: none;
    box-shadow: none;
}

.output .result {
    font-family: 'Noto-Sans-Javanese', 'Mulish', sans-serif;
    font-size: 32px;
    min-height: 160px;
    line-height: 64px;
    background-color: #ebe7e3;
}

.toggle {
    position: relative;
    display: inline-block;
    padding-left: 32px;
    line-height: 16px;
}

.toggle .slider {
    position: absolute;
    left: 0;
    height: 16px;
    width: 24px;
    border-radius: 24px;
    background-color: #ccc;
    -webkit-transition: .4s;
    transition: .4s;
}

.toggle .slider::before {
    content: "";
    position: absolute;
    left: 4px;
    top: 3px;
    height: 10px;
    width: 10px;
    border-radius: 24px;
    background-color: var(--dark-brown);
    -webkit-transition: .4s;
    transition: .4s;
}

.toggle .slider.checked {
    background-color: var(--dark-brown);
}

.toggle .slider.checked::before {
    background-color: #ccc;
    -webkit-transform: translateX(6px);
    -ms-transform: translateX(6px);
    transform: translateX(6px);
}
</style>