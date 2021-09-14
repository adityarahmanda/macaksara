import Vue from 'vue';

const vowels = "aiueoêāīūîûô";
const consonants = "bcdfghjklmnpqrstvwxyzḍṣṭțñŋḱǵḋ";

// error aksara swara
Vue.mixin({
    methods:{
        toJavaneseScript(text, murda = false, diphthong = false) {        
            // converting characters
            text = text.replace(/ṭh/gi, "ț").replace(/ny/gi, "ñ").replace(/dh/gi, "ḍ").replace(/th/gi, "ṭ").replace(/ng/gi, "ŋ").replace(/nj/gi, "ñj").replace(/nc/gi, "ñc");
        
            // converting rekan characters
            text = text.replace(/kh/gi, "ḱ").replace(/dz/gi, "ḋ").replace(/f/gi, "f").replace(/v/gi, "w").replace(/z/gi, "z").replace(/gh/gi, "ǵ");
        
            // converting diphthong characters
            text = text.replace(/ua/g, "uwa").replace(/ui/g, "uwi").replace(/ue/g, "uwe").replace(/uê/g, "uwê").replace(/uo/g, "uwo").replace(/ia/g, "iya").replace(/iu/g, "iyu").replace(/ie/g, "iye").replace(/iê/g, "iyê").replace(/io/g, "iyo");            
        
            if(diphthong) {
                text = text.replace(/A(I|i)/g, "Î").replace(/A(U|u)/g, "Û").replace(/Ê(U|u)/g, "Ô");
                text = text.replace(/ai/g, "î").replace(/au/g, "û").replace(/êu/g, "ô");
                text = text.replace(/aa/g, match => "ā").replace(/ii/g, match => "ī").replace(/uu/g, match => "ū");
            }
        
            // add h in front of dependent vowels
            text = text.replace(new RegExp(`(?<![${consonants}])[${vowels}]`, 'gi'), match => "h" + match);
        
            // replacing sandhangan panyigeg
            text = text.replace(new RegExp(`r(?=[${consonants}\\s])|r$`, 'gi'), "ꦂ").replace(new RegExp(`ŋ(?=[${consonants}\\s])|ŋ$`, 'gi'), "ꦁ").replace(new RegExp(`h(?=[${consonants}\\s])|h$`, 'gi'), "ꦃ");
        
            // replacing sandhangan pengkal and cakra
            if(this.diphthong) {
                text = text.replace(new RegExp(`(?<=[${consonants}])rô`, 'gi'), "ꦽꦴ");
            }
            text = text.replace(new RegExp(`(?<=[${consonants}])y`, 'gi'), "ꦾ").replace(new RegExp(`(?<=[${consonants}])rê`, 'gi'), "ꦽ").replace(new RegExp(`(?<=[${consonants}])ru`, 'gi'), "ꦿꦸ").replace(new RegExp(`(?<=[${consonants}])r`, 'gi'), "ꦿ");
        
            // Adding pangkon
            text = text.replace(new RegExp(`(?<=[${consonants}])[${consonants}\\s]`, 'gi'), match => "꧀" + match).replace(new RegExp(`[${consonants}]$`, 'gi'), match => match + "꧀");
        
            // Replace whitespace with zero width joiner
            text = text.replace(/(?<![,.])\s+/gi, "​");
        
            // replacing aksara mahaprana
            text = text.replace(/ṣ/gi, "ꦰ").replace(/ț/gi, "ꦜ");
        
            // replace aksara carakan
            text = text.replace(/h/gi, "ꦲ").replace(/n/gi, "ꦤ").replace(/c/gi, "ꦕ").replace(/r/gi, "ꦫ").replace(/k/gi, "ꦏ").replace(/d/gi, "ꦢ").replace(/t/gi, "ꦠ").replace(/s/gi, "ꦱ").replace(/w/gi, "ꦮ").replace(/l/gi, "ꦭ").replace(/p/gi, "ꦥ").replace(/ḍ/gi, "ꦝ").replace(/j/gi, "ꦗ").replace(/y/gi, "ꦪ").replace(/ñ/gi, "ꦚ").replace(/m/gi, "ꦩ").replace(/g/gi, "ꦒ").replace(/b/gi, "ꦧ").replace(/ṭ/gi, "ꦛ").replace(/ŋ/gi, "ꦔ");
        
            // replace aksara rekan
            text = text.replace(/ḱ/gi, "ꦏ꦳").replace(/ǵ/gi, "ꦒ꦳").replace(/ḋ/gi, "ꦢ꦳").replace(/z/gi, "ꦗ꦳").replace(/f/gi, "ꦥ꦳").replace(/w/gi, "ꦮ꦳");
        
            // replacing aksara swara
            if(diphthong) {    
                text = text.replace(/Î/g, "ꦍ").replace(/Û/g, "ꦎꦴ").replace(/Ô/g, "ꦄꦼꦴ");
            }
            text = text.replace(/A/g, "ꦄ").replace(/E/g, "ꦌ").replace(/I/g,  "ꦆ").replace(/U/g, "ꦈ").replace(/O/g, "ꦎ").replace(/Ā/g, "ꦄꦴ").replace(/Ī/g, "ꦇ").replace(/Ū/g, "ꦈꦴ").replace(/Ê/g, "ꦄꦼ");
        
            // replacing sandhangan swara
            if(diphthong) {
                text = text.replace(/î/g, "ꦻ").replace(/û/g, "ꦻꦴ").replace(/ô/g, "ꦼꦴ");
            }
            text = text.replace(/ā/g, "ꦴ").replace(/ī/g, "ꦷ").replace(/ū/g, "ꦹ").replace(/a/g, "").replace(/e/g, "ꦺ").replace(/i/g,  "ꦶ").replace(/u/g, "ꦸ").replace(/o/g, "ꦺꦴ").replace(/ê/g, "ꦼ");
        
            // replace special characters
            text = text.replace(/\(/g, "꧌").replace(/\)/g, "꧍").replace(/:/g, "꧇").replace(/\|/g, "꧋").replace(/,/g, "꧈").replace(/\./g, "꧉");
            
            // replace angka
            text = text.replace(/[0-9]/gi, function (c) { return String.fromCodePoint(c.charCodeAt(0) + 43424);});
        
            if(murda) {
                text = this.toJavaneseMurda(text);
            }
            
            return text;
        },
        toJavaneseMurda(text) {
            const aksara2murda = [['ꦤ', 'ꦟ'], ['ꦏ', 'ꦑ'], ['ꦠ', 'ꦡ'], ['ꦱ', 'ꦯ'], ['ꦥ', 'ꦦ'], ['ꦚ', 'ꦘ'], ['ꦒ', 'ꦓ'], ['ꦧ', 'ꦨ']];
        
            let matches = [];
            for(let i = 0; i < aksara2murda.length; i++) {
                const charIndex = text.indexOf(aksara2murda[i][0]);
                if(charIndex !== -1) {
                    matches = [...matches, 
                        {
                            index : text.indexOf(aksara2murda[i][0]), 
                            aksara: aksara2murda[i][0],
                            murda: aksara2murda[i][1]
                        }
                    ];
                }
            }
        
            if(matches.length === 0) {
                return text;
            } else {
                let match = matches[0]; 
                for(let i = 1; i < matches.length; i++) {
                    if(matches[i].index < match.index) {
                        match = matches[i];
                    }
                }
                
                return text.replace(match.aksara, match.murda);
            }
        }
    }
})