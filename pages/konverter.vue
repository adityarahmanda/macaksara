<template>
    <div class="row">
        <div class="col-12 col-lg-6 mb-3 mb-md-4">
            <div class="converter-input-header d-flex justify-content-between">
                <div class="converter-input-title h3">
                    <span v-if="latinToJavaMode">Aksara Latin</span>
                    <span v-else>Aksara Jawa</span>
                </div>
                <div class="btn swap-button" @click="swapConvertMode()">
                    <i class="fa fa-solid fa-arrow-right-arrow-left"></i>
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
                <label class="toggle d-none d-md-inline-block mr-2" @click="togglePepetTypeMode">
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
                <div class="h5">Tombol Karakter Spesial</div>
                <div 
                    v-for="char in specialCharacters" 
                    :key="char" 
                    class="btn special-character-button mb-2 mr-2" 
                    @click="insertInputTextarea(char)"
                >{{ char }}</div>
            </div>
        </div>

        <div class="col-12 col-lg-6 mb-3 mb-md-4">
            <div class="converter-output-title h3">
                <span v-if="latinToJavaMode" >Aksara Jawa</span>
                <span v-else>Aksara Latin</span>
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
                <h2 class="h3">Keterangan Penggunaan</h2>
            </div>
            <ul class="list-unstyled">
                <li>
                    <h3 class="h5">Mode Ketik Pepet</h3>
                    <p>Saat diaktifkan, tombol x pada keyboard akan digantikan fungsinya untuk mengetikkan huruf ê sebagai representasi Sandhangan Pepet (ꦼ) dalam aksara jawa.</p>
                    <p>Dalam bahasa Indonesia, karakter ê menghasilkan bunyi seperti huruf e pada kata "enam".</p>
                </li>
                <li>
                    <h3 class="h5">Abaikan Spasi</h3>
                    <p>Saat diaktifkan, proses konversi akan mengabaikan spasi dari kolom masukan. Sebaliknya jika dinonaktifkan, spasi akan dikonversikan menjadi <i>zero width space</i> alias spasi yang tidak terlihat.</p>                
                </li>
                <li>
                    <h3 class="h5">Murda</h3>
                    <p>Saat diaktifkan, aksara pertama dari aksara-aksara ꦤ, ꦏ, ꦠ, ꦱ, ꦥ, ꦘ, ꦒ, ꦧ akan diubah ke dalam bentuk aksara murda-nya ꦟ, ꦑ, ꦡ, ꦯ, ꦦ, ꦟ, ꦓ, ꦨ.</p>
                    <p>Dalam aksara jawa, aksara murda digunakan layaknya huruf kapital dalam bahasa Indonesia dan dipakai khusus untuk penulisan nama, gelar, atau tempat.</p>
                </li>
                <li>
                    <h3 class="h5">Diftong</h3>
                    <p>Saat diaktifkan, gugus vokal 'ai', 'au' dan vokal panjang 'aa', 'ii', 'uu' akan diubah menjadi karakter spesial aksara jawa, yakni ꦻ (Dirga Mure) untuk 'ai', ꦻꦴ (Dirga Mure Tarung) untuk 'au', ꦴ (Tarung) untuk 'aa', ꦷ (Dirga Melik) untuk 'ii', dan ꦹ (Dirga Mendhut) untuk 'uu'.</p>
                </li>
                <li>
                    <h3 class="h5">Tombol Karakter Spesial</h3>
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
                    <p><strong>PS:</strong> karakter spesial ñ dan ŋ sama dengan ny dan ng dalam bahasa indonesia</p>
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
        const siteName = 'Konverter Aksara';
        const title = `${siteName} — Alat Konversi Aksara Jawa-Latin`;
        const description = `${siteName} merupakan alat untuk melakukan konversi ataupun transliterasi aksara Jawa-Latin.`;
        const url = 'https://adityarahmanda.github.io/macaksara/konverter';
        const image = '#';

        return {
            title,
            meta: [
                { hid: 'title', name: 'title', content: title },
                { hid: 'description', name: 'description', content: description },
                { name:'keyword', content:'konverter, konversi, transliterasi, alat, aksara jawa, latin' },
                { property: 'og:locale', content: 'id_ID' },
                { property: 'og:type', content:'website' },
                { property: 'og:title', content: title },
                { property: 'og:description', content: description },
                { property: 'og:url', content: url },
                { property: 'og:site_name', content: siteName },
                { property: 'fb:admins', content: '100005745649451' },
                { property: 'og:image', content: image },
                { property: 'og:image:secure_url', content: image },
                { property: 'og:image:width', content: '768' },
                { property: 'og:image:height', content: '436' },
                { property: 'og:image:alt', content: siteName },
                { property: 'og:image:type', content: 'image/png' },
                { name: 'twitter:card', content:'summary_large_image' },
                { name: 'twitter:url', content: url },
                { name: 'twitter:title', content: title },
                { name: 'twitter:description', content: description },
                { name: 'twitter:image', content: image },
                { name: 'twitter:site', content: '@arahmanda21' },    
                { name: 'twitter:creator', content: '@arahmanda21' },
            ], 
            link: [
                { hid: 'canonical', rel: 'canonical', href: 'https://macaksara.adityarahmanda.com/konverter' },
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