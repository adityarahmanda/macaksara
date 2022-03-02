import Vue from 'vue';

const wyanjana = {
    'ꦲ':'h',      // ha 
    'ꦤ':'n',      // na
    'ꦕ':'c',      // ca
    'ꦫ':'r',      // ra
    'ꦏ':'k',      // ka
    'ꦢ':'d',      // da
    'ꦠ':'t',      // ta
    'ꦱ':'s',      // sa
    'ꦮ':'w',      // wa
    'ꦭ':'l',      // la
    'ꦥ':'p',      // pa
    'ꦝ':'dh',      // dha
    'ꦗ':'j',      // ja
    'ꦪ':'y',      // ya
    'ꦚ':'ny',     // nya
    'ꦩ':'m',      // sa
    'ꦒ':'g',      // ga
    'ꦧ':'b',      // ba
    'ꦛ':'t',      // tha
    'ꦔ':'ng',     // nga
    'ꦟ':'n',       // na murda
    'ꦑ':'k',       // ka murda
    'ꦡ':'t',       // ta murda
    'ꦯ':'s',       // sa murda
    'ꦦ':'p',       // pa murda
    'ꦘ':'ny',      // nya murda
    'ꦓ':'g',       // ga murda
    'ꦨ':'b',       // ba murda
    'ꦰ':'s',       // sa mahaprana
    'ꦖ':'ch',      // cha mahaprana
    'ꦣ':'d',        // da mahaprana
    'ꦞ':'dh',      // dha mahaprana
    'ꦜ':'th',      // tha mahaprana
    'å':'jh',      // ja jera
    'ꦐ':'q',       // ka sasak
    'ꦬ':'r',       // ra agung
}

const isWyanjana = (key) => { return Object.prototype.hasOwnProperty.call(wyanjana, key); }

const rekan = {
    'ꦢ':'dz',      // ga
    'ꦒ':'gh',      // gh
    'ꦗ':'z',      // za
    'ꦥ':'f',      // fa
    'ꦮ':'v',      // ga
}

const isRekan = (key) => { return Object.prototype.hasOwnProperty.call(rekan, key); }

const swara = {
    'ꦄ':'A',        // a 
    'ꦆ':'I',        // i 
    'ꦅ':'I',        // i kawi
    'ꦈ':'U',        // u 
    'ꦌ':'E',        // e 
    'ꦎ':'O',        // o
}

const isSwara = (key) => { return Object.prototype.hasOwnProperty.call(swara, key); }

// diacritics swara
const sandhanganSwara = {
    'ꦶ':'i',        // i
    'ꦸ':'u',        // u
    'ꦼ':'ê',        // ê
    'ꦺ':'e',        // e
    'ꦺꦴ':'o',        // o
    'ꦻ':'ai',        // e
    'ꦻꦴ':'au',        // e
    'ꦷ':'ī',       // dirga melik, long i
    'ꦹ':'ū',       // dirga mendut, long u
}

const isSandhanganSwara = (key) => { return Object.prototype.hasOwnProperty.call(sandhanganSwara, key); }

// diacritics swara
const sandhanganWyanjana = {
    'ꦿ':'r',       // cakra
    'ꦽ':'r',       // cakra kêrêt
    'ꦾ':'y',       // pengkal
}

const isSandhanganWyanjana = (key) => { return Object.prototype.hasOwnProperty.call(sandhanganWyanjana, key); }

const sandhanganPanyigeg = {
    'ꦂ':'r',        // layar (r)
    'ꦁ':'ng',       // cecak (ng)
    'ꦃ':'h',        // wigyan (h)
    'ꦀ':'ṁ'          // panyangga (ṁ)
}

const isSandhanganPanyigeg = (key) => { return Object.prototype.hasOwnProperty.call(sandhanganPanyigeg, key); }

// punctuations
const pada = {
    '​':' ',          // zero width non joiner
    '꧊':'',         // adeg
    '꧋':'',         // adeg-adeg
    'ꧏ':'',        // pangkrangkep
    '꧞':'',        // tirta tumetes
    '꧟':'',        // isen-isen
    '꧌':'(',        // pada piseleh
    '꧍':')',        // turned pada piseleh
    '꧁':'',        // left rerenggan
    '꧂':'',        // right rerenggan
    '꧈':',',        // pada lingsa
    '꧉':'.',        // pada lungsi
    '꧆':'',        // pada windu
    '꧃':'',         // pada andhap
    '꧄':'',         // pada madya
    '꧅':'',         // pada luhur
    '꧑':'1',        // angka 1
    '꧒':'2',        // angka 2
    '꧓':'3',        // angka 3
    '꧔':'4',        // angka 4
    '꧕':'5',        // angka 5
    '꧖':'6',        // angka 6
    '꧗':'7',        // angka 7
    '꧘':'8',        // angka 8
    '꧙':'9',        // angka 9
    '꧐':'0',        // angka 0
}

const isPada = (key) => { return Object.prototype.hasOwnProperty.call(pada, key); }

const javaToLatin = (str) => {
    const length = str.length;
    const output = [];

    for (let i = 0; i < length; i++) {
        const c = str[i];

        if(isPangkon(c)) {
            if(output.length - 1 >= 0 && output[output.length - 1] === 'a') {
                output.pop();
                continue;
            }
        }

        if(isCecakTelu(c)) {
            if(i - 1 >= 0 && isRekan(str[i - 1])) {
                if(output.length - 1 >= 0 && output[output.length - 1] === 'a') {
                    output.pop();
                }
                output.pop();
                output.push(getConsonantsRekan(str[i - 1]));
                output.push('a');
                continue;
            }
        }

        if(isSandhanganWyanjana(c)) {
            if(output.length - 1 >= 0 && output[output.length - 1] === 'a') {
                output.pop();
            }
            output.push(getConsonantsSandhanganWyanjana(c)); 
            if(isCakraKeret(c)) {
                output.push('ê');
            } else {
                output.push('a');
            }
            continue;
        } 
        
        if(isSandhanganSwara(c)) {
            if(i - 1 >= 0) {
                if(isWyanjana(str[i - 1]) || (isSandhanganWyanjana(str[i - 1]) && !isCakraKeret(str[i - 1]))) {
                    if(output.length - 1 >= 0 && output[output.length - 1] === 'a') {
                        output.pop();
                    }

                    output.push(getVowelsSandhanganSwara(c));
                    continue;
                }

                if(isCecakTelu(str[i - 1])) {
                    if(i - 2 >= 0) {
                        if(isWyanjana(str[i - 2]) || (isSandhanganWyanjana(str[i - 2]) && !isCakraKeret(str[i - 2]))) {
                            if(output.length - 1 >= 0 && output[output.length - 1] === 'a') {
                                output.pop();
                            }
        
                            output.push(getVowelsSandhanganSwara(c));
                            continue;
                        }
                    }
                }
            }
        }

        if(isTarung(c)) {
            if(output.length - 1 >= 0) {
                const lastOutput = output[output.length - 1];

                if(lastOutput === 'a') {
                    output.pop();
                    output.push('ā');
                    continue;
                }

                if(lastOutput === 'ê') {
                    output.pop();
                    output.push('êu');
                    continue;
                }

                if(lastOutput === 'e') {
                    output.pop();
                    output.push('o');
                    continue;
                }

                if(lastOutput === 'ai') {
                    output.pop();
                    output.push('au');
                    continue;
                }

                if(lastOutput === 'Ê') {
                    output.push('u');
                    continue;
                }
            }
        }
        
        if(isSandhanganPanyigeg(c)) {
            output.push(getConsonantsSandhanganPanyigeg(c));
            continue;
        }

        if(isPaCeret(c)) {
            output.push('r');
            output.push('ê');
            continue;
        }

        if(isNgaLelet(c)) {
            output.push('l');
            output.push('ê');
            continue;
        }

        if(isNgaLeletRaswadi(c)) {
            output.push('l');
            output.push('êu');
            continue;
        }

        if(isSwara(c)) {
            output.push(getConsonantsSwara(c));
            continue;
        }
        
        if(isWyanjana(c)) {
            output.push(getConsonantsWyanjana(c));
            output.push('a');
            continue;
        }
        
        if(isPada(c)) {
            output.push(getPunctuations(c));
            continue;
        }
            
        output.push(c);
        // Debug.Log(output);
    }
    return output.join("");
}

const isPaCeret = (s) => { return s === "ꦉ"; }

const isNgaLelet = (s) => { return s === "ꦊ"; }

const isNgaLeletRaswadi = (s) => { return s === "ꦋ"; }

const isPangkon = (s) => { return s === "꧀"; }

const isCakraKeret = (s) => { return s === "ꦽ" }

const isTarung = (s) => { return s === "ꦴ"; }

const isCecakTelu = (s) => { return s === "꦳"; }

const getConsonantsWyanjana = (s) => { return wyanjana[s]; }

const getConsonantsRekan = (s) => { return rekan[s]; }

const getConsonantsSwara = (s) => { return swara[s]; }

const getConsonantsSandhanganWyanjana = (s) => { return sandhanganWyanjana[s]; }

const getConsonantsSandhanganPanyigeg = (s) => { return sandhanganPanyigeg[s]; }

const getVowelsSandhanganSwara = (s) => { return sandhanganSwara[s]; }

const getPunctuations = (s) => { return pada[s]; }

Vue.mixin({
    methods:{
        javaToLatin
    }
});