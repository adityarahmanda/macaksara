<template>
    <div class="row">
        <div class="col-12 col-lg-6 mb-3 mb-md-4">
            <div class="converter-input-header d-flex justify-content-between">
                <div class="converter-input-title">
                    <h3 v-if="latinToJavaMode">Aksara Latin</h3>
                    <h3 v-else>Aksara Jawa</h3>
                </div>
                <div class="btn swap-button" @click="swapConvertMode()">
                    <i class="fa-solid fa-arrow-right-arrow-left"></i>
                </div>
            </div>

            <div class="converter-input-content mb-3">
                <textarea 
                    ref="inputTextarea"
                    v-model="inputTextareaValue"
                    type="text" 
                    class="converter-input"
                    :style=" { 
                        fontSize: latinToJavaMode ? '1.2rem' : '1.4rem',
                        lineHeight: latinToJavaMode ? null : '1.8'
                    }"
                    @input="onInputTextarea"
                    @keydown="onKeyDownInputTextarea"
                ></textarea>
            </div>
            
            <div v-if="latinToJavaMode" class="converter-input-togglers mb-3">
                <label class="toggle mr-2" @click="togglePepetTypeMode">
                    <div class="slider" :class="{ 'checked' : pepetTypeMode }"></div> Mode Ketik Pepet
                </label>
                <label class="toggle mr-2" @click="toggleWithoutSpace">
                    <div class="slider" :class="{ 'checked' : ignoreSpace }"></div> Abaikan Spasi
                </label>
                <label class="toggle mr-2" @click="toggleMurda">
                    <div class="slider" :class="{ 'checked' : murda }"></div>Murda
                </label>
                <label class="toggle mr-2" @click="toggleDiphthong">
                    <div class="slider" :class="{ 'checked' : diphthong }"></div> Diftong
                </label>
            </div>
            
            <div v-if="latinToJavaMode" class="converter-input-character-special-buttons">
                <h5>Tombol Karakter Spesial</h5>
                <div 
                    v-for="char in specialCharacters" 
                    :key="char" 
                    class="btn special-character-button mb-2 mr-2" 
                    @click="insertInputTextarea(char)"
                >{{ char }}</div>
            </div>
        </div>

        <div class="col-12 col-lg-6 mb-3 mb-md-4">
            <div class="converter-output-title">
                <h3 v-if="latinToJavaMode">Aksara Jawa</h3>
                <h3 v-else>Aksara Latin</h3>
            </div>
            
            <div class="converter-output mb-2">
                <div 
                    ref="resultText" 
                    class="result-text"    
                    :style=" { 
                        fontSize: latinToJavaMode ? '1.4rem' : '1.2rem',
                        lineHeight: latinToJavaMode ? '1.8' : null
                    }"
                >{{ outputText }}</div>
                <div v-if="showActionButtonArea()" class="action-button-area">
                    <button 
                        id="copy-button"
                        class="btn copy-button pl-2"
                        @click="copyToClipboard($refs.resultText.innerText)"
                    >
                        <i class="fas fa-copy"></i>
                    </button>
                    <b-tooltip
                        target="copy-button"
                        placement="left"
                        triggers="hover blur"
                        boundary="document"
                        :variant="copyTooltipProperty.variant"
                        :title="copyTooltipProperty.title"
                        @hide="onHideCopyTooltip()"
                    ></b-tooltip>
                </div>
            </div>
        </div>

        <div class="usage-description col-12" :class="{ 'd-none' : !latinToJavaMode }" >
            <div class="mb-3 mb-md-4">
                <h3>Keterangan Penggunaan</h3>
            </div>
            <ul class="list-unstyled">
                <li>
                    <h5>Mode Ketik Pepet</h5>
                    <p>Saat diaktifkan, tombol x pada keyboard akan digantikan fungsinya untuk mengetikkan huruf ê sebagai representasi Sandhangan Pepet (ꦼ) dalam aksara jawa.</p>
                    <p>Dalam bahasa Indonesia, karakter ê menghasilkan bunyi seperti huruf e pada kata "enam".</p>
                </li>
                <li>
                    <h5>Abaikan Spasi</h5>
                    <p>Saat diaktifkan, proses konversi akan mengabaikan spasi dari kolom masukan. Sebaliknya jika dinonaktifkan, spasi akan dikonversikan menjadi <i>zero width space</i> alias spasi yang tidak terlihat.</p>                
                </li>
                <li>
                    <h5>Murda</h5>
                    <p>Saat diaktifkan, aksara pertama dari aksara-aksara ꦤ, ꦏ, ꦠ, ꦱ, ꦥ, ꦘ, ꦒ, ꦧ akan diubah ke dalam bentuk aksara murda-nya ꦟ, ꦑ, ꦡ, ꦯ, ꦦ, ꦟ, ꦓ, ꦨ.</p>
                    <p>Dalam aksara jawa, aksara murda digunakan layaknya huruf kapital dalam bahasa Indonesia dan dipakai khusus untuk penulisan nama, gelar, atau tempat.</p>
                </li>
                <li>
                    <h5>Diftong</h5>
                    <p>Saat diaktifkan, gugus vokal 'ai', 'au' dan vokal panjang 'aa', 'ii', 'uu' akan diubah menjadi karakter spesial aksara jawa, yakni ꦻ (Dirga Mure) untuk 'ai', ꦻꦴ (Dirga Mure Tarung) untuk 'au', ꦴ (Tarung) untuk 'aa', ꦷ (Dirga Melik) untuk 'ii', dan ꦹ (Dirga Mendhut) untuk 'uu'.</p>
                </li>
                <li>
                    <h5>Tombol Karakter Spesial</h5>
                    <p>Berisikan tombol-tombol untuk mengetikkan karakter-karakter spesial yang digunakan untuk merepresentasikan huruf-huruf aksara jawa yang tidak dapat diwakili oleh alfabet A-Z.</p>
                    <p>Berikut karakter-karakter spesial yang digunakan dalam konverter ini beserta hasil konversinya :</p>
                    <ul style="margin-bottom: 1rem">
                        <li>Ê menghasilkan ꦄꦼ (Swara Ê)</li>  
                        <li>ê menghasilkan  ꦼ (Pepet)</li>
                        <li>ā menghasilkan ꦴ (Tarung)</li>  
                        <li>ī menghasilkan ꦷ (Dirga Melik)</li>  
                        <li>ū menghasilkan ꦹ (Dirga Mendhut)</li>
                        <li>ḍ menghasilkan ꦝ (Dha)</li>  
                        <li>ḍh menghasilkan ꦞ (Dha Mahaprana)</li> 
                        <li>ṣ menghasilkan ꦰ (Sa Mahaprana)</li>
                        <li>ś menghasilkan ꦯ (Sa Murda)</li>
                        <li>ṭ menghasilkan ꦡ (Ta Murda)</li> 
                        <li>ṭh menghasilkan ꦜ (Tha Mahaprana)</li> 
                        <li>ṇ menghasilkan ꦟ (Na Murda)</li> 
                        <li>ñ menghasilkan ꦚ (Nya)</li>
                        <li>ŋ menghasilkan ꦔ (Nga)</li> 
                    </ul>
                    <p>PS: karakter spesial ñ dan ŋ sama dengan ny dan ng dalam bahasa indonesia</p>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    layout: 'converter',
    data() {
        return {
            latinToJavaMode: true,
            inputTextareaValue: '',
            murda: false,
            diphthong: false,
            pepetTypeMode: true,
            ignoreSpace: true,
            specialCharacters: ['Ê', 'ê', 'ā', 'ī', 'ū', 'ḍ', 'ḍh', 'ṣ', 'ś', 'ṭ', 'ṭh', 'ṇ', 'ñ', 'ŋ'],
            copyTooltipProperty: {
                title: "Salin hasil konversi",
                variant: "primary",
            }
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
    computed: {
        outputText() {
            if(this.latinToJavaMode) {
                return this.latinToJava(this.inputTextareaValue, this.murda, this.diphthong, this.ignoreSpace)
            } else {
                return this.javaToLatin(this.inputTextareaValue);
            }
        }
    },
    methods: {
        togglePepetTypeMode() {
            this.pepetTypeMode = !this.pepetTypeMode;
        },
        toggleMurda() {
            this.murda = !this.murda;
        },
        toggleDiphthong() {
            this.diphthong = !this.diphthong;
        },
        toggleWithoutSpace() {
            this.ignoreSpace = !this.ignoreSpace;
        },
        insertInputTextarea(str) {
            const inputTextarea = this.$refs.inputTextarea;

            // insert character
            const nextCursorPos = inputTextarea.selectionStart + str.length;
            this.inputTextareaValue = this.inputTextareaValue.substring(0, inputTextarea.selectionStart) + str + this.inputTextareaValue.substring(inputTextarea.selectionEnd, this.inputTextareaValue.length);
            
            // move cursor
            inputTextarea.focus();
            setTimeout(() => {
                inputTextarea.setSelectionRange(nextCursorPos, nextCursorPos);
            }, 10);
        },
        onKeyDownInputTextarea($event) {
            if(!this.pepetTypeMode) return;

            if($event.shiftKey && $event.key === "X") {
                this.insertInputTextarea("Ê");
                $event.preventDefault();
                $event.stopPropagation();
                return;
            }

            if($event.key === "x") {
                this.insertInputTextarea("ê");
                $event.preventDefault();
                $event.stopPropagation();
            }
        },
        onInputTextarea($event) {
            const inputTextarea = this.$refs.inputTextarea;

            inputTextarea.style.height = 'auto';
            inputTextarea.style.height = inputTextarea.scrollHeight + 'px';
        },
        swapConvertMode() {
            this.latinToJavaMode = !this.latinToJavaMode;
            this.inputTextareaValue = this.$refs.resultText.innerText;
        },
        async copyToClipboard(text) {
            try {
                await navigator.clipboard.writeText(text);
                this.copyTooltipProperty.variant = "info";
                this.copyTooltipProperty.title = "Berhasil disalin";
            } catch(err) {
                this.copyTooltipProperty.variant = "danger";
                this.copyTooltipProperty.title = "Gagal disalin";
            }
        },
        onHideCopyTooltip() {
            // reset tooltip title
            this.copyTooltipProperty.variant = "primary";
            this.copyTooltipProperty.title = "Salin hasil konversi";
        },
        showActionButtonArea() {
            return this.outputText.length !== 0;
        }
    }
}
</script>

<style lang="scss">
.converter-input, 
.converter-output {
    position: relative;
    padding: $converter-padding-x $converter-padding-y;
    -webkit-border-radius: $border-radius;
    border-radius: $border-radius;
    width: 100%;
    min-height: 180px;
}

.converter-input {
    border: 2px solid $gray-200;
    overflow: hidden;
    -webkit-border-radius: $border-radius;
    border-radius: $border-radius;

    &:focus {
        outline: none;
    }
}

.converter-output {
    display: flex;
    flex-direction: column;
    background-color: $gray-200;

    .result-text {
        flex-grow: 1;
        line-height: 1.667;
        overflow-wrap: break-word;
    }

    .action-button-area {
        display: flex;
        justify-content: flex-end;
        margin-top: auto;

        .btn {
            position: relative;
            display: inline-flex;
            font-size: 1.4rem;
            padding: 0;

            &:focus, &:not(:focus) {
                outline: none;
                border: 0;
                -webkit-box-shadow: none;
                box-shadow: none;
            }

            i {
                padding: .4rem .4rem;
                border-radius: 50%;
                -webkit-transition: background-color .3s ease-out;
                transition: background-color .3s ease-out;
            }

            &:hover i {
                background-color: rgba($dark, 0.2);
            }

            &:active i {
                background-color: rgba($dark, 0.4);
            }
        }
    }
}

.swap-button {
    padding: 0;
}

.toggle {
    position: relative;
    display: inline-block;
    padding-left: 32px;
    line-height: 16px;
    cursor: pointer;
    
    .slider {
        position: absolute;
        left: 0;
        height: 16px;
        width: 24px;
        border-radius: $rounded-pill;
        background-color: $gray-200;
        -webkit-transition: .4s;
        transition: .4s;

        &::before {
            content: "";
            position: absolute;
            left: 4px;
            top: 3px;
            height: 10px;
            width: 10px;
            border-radius: $rounded-pill;
            background-color: $dark-brown;
            -webkit-transition: .4s;
            transition: .4s;
        }

        &.checked {
            background-color: $dark-brown;
        
            &::before {
                background-color: $gray-200;
                -webkit-transform: translateX(6px);
                -ms-transform: translateX(6px);
                transform: translateX(6px);
            }
        }
    }
}

.special-character-button {
    font-weight: $font-weight-normal;
    border: 2px solid $gray-200;
}
</style>