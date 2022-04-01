import Vue from 'vue';

const wyanjana = {
     b: "ꦧ",       // ba
     c: "ꦕ",       // ca
     d: "ꦢ",       // da
     dh: "ꦝ",       // dha
     ḍ: "ꦝ",       // dha
     ḍh: "ꦞ",       // dha mahaprana
     dz: "ꦢ꦳",     // dza rekan
     f: "ꦥ꦳",      // fa rekan
     g: "ꦒ",       // ga
     gh: "ꦒ꦳",     // gha rekan
     h: "ꦲ",       // ha
     j: "ꦗ",       // ja
     k: "ꦏ",       // ka
     kh: "ꦏ꦳",     // kha rekan
     l: "ꦭ",       // la
     m: "ꦩ",       // ma
     n: "ꦤ",       // na
     ng: "ꦔ",      // nga
     ŋ: "ꦔ",       // nga
     ny: "ꦚ",       // nya
     nc: "ꦚ꧀ꦕ",       // nca
     nj: "ꦚ꧀ꦗ",       // nja
     ñ: "ꦚ",       // nya
     ṇ: "ꦟ",       // na murda
     p: "ꦥ",       // pa
     p̣: "ꦦ",       // pa murda
     q: "ꦐ",       // ka sasak
     r: "ꦫ",       // ra
     s: "ꦱ",       // sa
     ś: "ꦯ",       // sa murda
     ṣ: "ꦰ",       // sa mahaprana
     t: "ꦠ",       // ta
     th: "ꦛ",       // ta
     ṭ: "ꦡ",       // ta murda
     ṭh: "ꦜ",      // tha mahaprana
     v: "ꦮ꦳",      // va rekan
     w: "ꦮ",       // wa
     x: "ꦏ꧀ꦱ",     // ks 
     y: "ꦪ",       // ya
     z: "ꦗ꦳",      // za rekan
}

const isWyanjana = (key) => { return Object.values(wyanjana).includes(key); }

const getWyanjana = (key) => { return wyanjana[key]; }

const isWyanjanaPasanganInRight = (wyanjana) => { 
    return wyanjana === 'ꦥ' || wyanjana === 'ꦥ꦳' || wyanjana === 'ꦲ' || wyanjana === "ꦏ꧀ꦱ" || wyanjana === "ꦰ" || wyanjana === "ꦱ" || wyanjana === "ꦦ"; 
}

const isWyanjanaPasanganInBelow = (wyanjana) => { 
    return isWyanjana(wyanjana) && !isWyanjanaPasanganInRight(wyanjana); 
}

const swara = {
    A: "ꦄ",       // aksara swara a
    I: "ꦆ",       // aksara swara i
    U: "ꦈ",       // aksara swara u
    E: "ꦌ",       // aksara swara e
    È: "ꦌ",       // aksara swara e
    É: "ꦌ",       // aksara swara e
    Ê: "ꦄꦼ",      // aksara swara ê
    Ě: "ꦄꦼ",      // aksara swara ê
    O: "ꦎ",       // aksara swara o
}

const getSwara = (key) => { return swara[key]; }

const murda = {
     n: "ꦟ",      // na murda
     k: "ꦑ",       // ka murda
     kh: "ꦑ꦳",       // kha murda
     t: "ꦡ",       // ta murda
     s: "ꦯ",      // sa murda
     p: "ꦦ",       // pa murda
     f: "ꦦ꦳",       // fa murda
     ny: "ꦘ",      // nya murda
     ñ: "ꦘ",       // nya murda
     g: "ꦓ",      // ga murda
     gh: "ꦓ꦳",      // gha murda
     b: "ꦨ",       // ba murda
}

const getMurda = (key) => { return murda[key]; }

const sandhanganWyanjana = {
     r: "ꦿ",   // cakra
     ṛ: "ꦽ",   // cakra keret
     y: "ꦾ",   // pengkal
}

const getSandhanganWyanjana = (key) => { return sandhanganWyanjana[key]; }

// const isSandhanganWyanjana = (key) => { return Object.values(sandhanganWyanjana).includes(key); }

const sandhanganPanyigeg = {
     r: "ꦂ",
     h: "ꦃ", 
     ng: "ꦁ",
}

const getSandhanganPanyigeg = (key) => { return sandhanganPanyigeg[key]; }

const isSandhanganPanyigeg = (key) => { return Object.values(sandhanganPanyigeg).includes(key); }

const sandhanganSwara = { 
     a: "",
     ô: "",
     aa: "ꦴ",
     ai: "ꦻ",
     au: "ꦻꦴ",
     ôô: "",
     ā: "ꦴ",
     i: "ꦶ",
     ii: "ꦷ",
     ī: "ꦷ",
     u: "ꦸ",
     uu: "ꦹ",
     ū: "ꦹ",
     e: "ꦺ",
     è: "ꦺ",
     é: "ꦺ",
     ê: "ꦼ",
     ě: "ꦼ",
     o: "ꦺꦴ",
}

const getSandhanganSwara = (key) => { return sandhanganSwara[key]; }

const pada = {
     ' ' : "​",
     '.' : "꧉",
     ',' : "꧈",
     '-' : "",
}

const getPada = (key) => { return pada[key]; }

const latinToJava = (str, murda = false, diphthong = false, withoutSpace = false) => {
    let length = str.length;
    const output = [];
    let isMurdaAlreadyIncluded = false;
    let isAlreadyStacked = false;

    for (let i = 0; i < length; i++)
    {
        let c = str[i];

        if(i + 1 < length) {
            const c2 = str[i + 1];
            let c12 = c + c2;
            
            if(isConsonants(c12) || isConsonants(c12.toLowerCase())) {
                i++;
                
                if(c12 === c12.toUpperCase()) {
                    c12 = c12.toLowerCase();
                }

                if(isConsonantsSandhanganPanyigeg(c12)) {
                    isAlreadyStacked = false;
                    
                    if(i - 2 >= 0 && i + 1 < length) {
                        const cBefore = str[i - 2];
                        const cAfter = str[i + 1];

                        if(isVowels(cBefore) && !isVowels(cAfter)) {
                            output.push(getSandhanganPanyigeg(c12));
                            continue;
                        }
                    }

                    if(i - 2 >= 0 && i === length - 1) {
                        const cBefore = str[i - 2];

                        if(isVowels(cBefore)) {
                            output.push(getSandhanganPanyigeg(c12));
                            continue;
                        }
                    }
                }

                // prevent "tumpuk telu" by adding zero width space
                if(output.length - 2 >= 0) {
                    const lastOutput = output[output.length - 1];
                    const lastOutput2 = output[output.length - 2];
                    
                    if(isPangkon(lastOutput) && isWyanjanaPasanganInBelow(lastOutput2)) { 
                        if(isAlreadyStacked) {
                            // pop last two output
                            output.pop();
                            output.pop();

                            output.push("​"); // push zero width space

                            // push again last two output
                            output.push(lastOutput2);
                            output.push(lastOutput);
                            isAlreadyStacked = false;
                        } else {
                            isAlreadyStacked = true;
                        }
                    }
                }

                if(murda && !isMurdaAlreadyIncluded && isConsonantsMurda(c12)) {
                    output.push(getMurda(c12));
                    isMurdaAlreadyIncluded = true;
                } else {
                    output.push(getWyanjana(c12));
                }
                
                output.push("꧀");
                continue;
            }
        }

        if(isConsonantsSandhanganPanyigeg(c)) {
            isAlreadyStacked = false;
            let isSandhanganPanyigeg = false;

            if(i - 1 >= 0 && i + 1 < length) {
                const cBefore = str[i - 1];
                const cAfter = str[i + 1];

                if(isVowels(cBefore) && !isVowels(cAfter)) {
                    isSandhanganPanyigeg = true;
                }
            }

            if(i - 1 >= 0 && i === length - 1) {
                const cBefore = str[i - 1];

                if(isVowels(cBefore)) {
                    isSandhanganPanyigeg = true;
                }
            }

            if(isSandhanganPanyigeg) {
                // remove pangkon if exist
                if(output.length - 1 >= 0) {
                    const lastOutput = output[output.length - 1];   

                    if(isPangkon(lastOutput)) {
                        output.pop();
                    }
                }

                output.push(getSandhanganPanyigeg(c));
                continue;
            }
        }
        
        if(isConsonantsSandhanganWyanjana(c)) {
            isAlreadyStacked = false;
            let isSandhanganWyanjana = false;

            if(i - 2 >= 0) {
                const cBefore = str[i - 2] + str[i - 1];

                if(isConsonants(cBefore) && !isSandhanganPanyigeg(output[output.length - 1])) {
                    isSandhanganWyanjana = true;
                }
            }

            if(i - 1 >= 0) {
                const cBefore = str[i - 1];

                if(isConsonants(cBefore) && !isSandhanganPanyigeg(output[output.length - 1])) {
                    isSandhanganWyanjana = true;
                }
            }

            if(isSandhanganWyanjana) {
                // remove pangkon if exist
                if(output.length - 1 >= 0) {
                    const lastOutput = output[output.length - 1];   

                    if(isPangkon(lastOutput)) {
                        output.pop();
                    }
                }

                output.push(getSandhanganWyanjana(c));
                continue;
            }
        }
        
        if(isConsonants(c) || isConsonants(c.toLowerCase())) {
            if(c === c.toUpperCase()) {
                c = c.toLowerCase();
            }

            // prevent "tumpuk telu" by adding zero width space
            if(output.length - 2 >= 0) {
                const lastOutput = output[output.length - 1];
                const lastOutput2 = output[output.length - 2];
                
                if(isPangkon(lastOutput) && isWyanjanaPasanganInBelow(lastOutput2)) { 
                    if(isAlreadyStacked) {
                        output.pop();
                        output.pop();

                        output.push("​"); // push zero width space
                        output.push(lastOutput2);
                        output.push(lastOutput);
                        isAlreadyStacked = false;
                    } else {
                        isAlreadyStacked = true;
                    }
                }
            }

            if(murda && !isMurdaAlreadyIncluded && isConsonantsMurda(c)) {
                output.push(getMurda(c));
                isMurdaAlreadyIncluded = true;
            } else {
                output.push(getWyanjana(c));
            }

            output.push("꧀");
            continue;
        }

        if(isVowelsSwara(c)) {
            isAlreadyStacked = false;

            output.push(getSwara(c));
            continue;
        }
        
        if(isVowels(c)) {
            isAlreadyStacked = false;

            if(i + 1 < length) {
                const c2 = str[i + 1];

                // change ia, iu, ie, iê, io to iya, iyu, iye, iyê, iyo
                if(isVowelsWulu(c) && isVowels(c2) && !isVowelsWulu(c2)) {
                    str = str.substring(0, i + 1) + "y" + str.substring(i + 1, str.length);
                    length = str.length;
                }

                // change ua, ui, ue, uê, uo to uwa, uwi, uwe, uwê, uwo
                if(isVowelsSuku(c) && isVowels(c2) && !isVowelsSuku(c2)) {
                    str = str.substring(0, i + 1) + "w" + str.substring(i + 1, str.length);
                    length = str.length;
                }

                // change ea to eya
                if(isVowelsTaling(c) && isVowelsA(c2)) {
                    str = str.substring(0, i + 1) + "y" + str.substring(i + 1, str.length);
                    length = str.length;
                }

                // change eo to eyo
                if(isVowelsTaling(c) && isVowelsTalingTarung(c2)) {
                    str = str.substring(0, i + 1) + "y" + str.substring(i + 1, str.length);
                    length = str.length;
                }
                
                // change oa to owa
                if(isVowelsTalingTarung(c) && isVowelsA(c2)) {
                    str = str.substring(0, i + 1) + "w" + str.substring(i + 1, str.length);
                    length = str.length;
                }
                
                // change oe to owe
                if(isVowelsTalingTarung(c) && isVowelsTaling(c2)) {
                    str = str.substring(0, i + 1) + "w" + str.substring(i + 1, str.length);
                    length = str.length;
                }
            }
            
            if(isVowelsPepet(c)) {
                // check cakra keret
                if(output.length - 1 >= 0) {
                    const lastOutputChar = output[output.length - 1];
                    
                    if(isCakra(lastOutputChar)) {
                        output.pop();
                        output.push("ꦽ");
                        continue;
                    }

                     // check nga lelet
                    if(i - 1 >= 0) {
                        const cBefore = str[i - 1];
                        
                        if(cBefore === "l" && !isPangkon(lastOutputChar)) {
                            output.pop(); // pop pangkon
                            output.pop(); // pop aksara la
                            output.push("ꦊ");
                            continue;
                        }
                    }
                }

                if(i - 1 >= 0) {
                    const cBefore = str[i - 1];
                    
                    // check pa ceret
                    if(cBefore === "r") {
                        output.pop(); // pop pangkon
                        output.pop(); // pop aksara ra
                        output.push("ꦉ");
                        continue;
                    }
                }
            }            
            
            if(i - 1 >= 0 && isConsonants(str[i - 1])) {
                // check pangkon
                if(output.length - 1 >= 0) {
                    const lastOutputChar = output[output.length - 1];
                    
                    if(isPangkon(lastOutputChar)) {
                        output.pop();
                    }
                }

                output.push(getSandhanganSwara(c));
            } else {
                output.push(getWyanjana("h"));
                output.push(getSandhanganSwara(c));
            }

            // Diphthong
            if(diphthong && i + 1 < length && isVowels(str[i + 1])) {
                const c2 = str[i + 1];

                if(isVowelsA(c) && isVowelsA(c2)) {
                    output.push(getSandhanganSwara("aa"));
                    i++;
                    continue;
                }

                if(isVowelsA(c) && isVowelsWulu(c2)) {
                    output.push(getSandhanganSwara("ai"));
                    i++;
                    continue;
                }

                if(isVowelsA(c) && isVowelsSuku(c2)) {
                    output.push(getSandhanganSwara("au"));
                    i++;
                    continue;
                }

                if(isVowelsWulu(c) && isVowelsWulu(c2)) {
                    output.pop();
                    output.push(getSandhanganSwara("ii"));
                    i++;
                    continue;
                }
                
                if (isVowelsSuku(c) && isVowelsSuku(c2)) {
                    output.pop();
                    output.push(getSandhanganSwara("uu"));
                    i++;
                    continue;
                }
            }

            continue;
        }
        
        if(isCharactersPada(c)) {
            isAlreadyStacked = false;

            if(withoutSpace && c === " ") {
                continue;
            }

            output.push(getPada(c));
            continue;
        }
        
        output.push(c);
    }

    return output.join("");
}

const isConsonants = (s) => { 
    return Object.prototype.hasOwnProperty.call(wyanjana, s.toLowerCase()); 
}

const isConsonantsMurda = (s) => {
    return Object.prototype.hasOwnProperty.call(murda, s.toLowerCase()); 
}

const isConsonantsSandhanganPanyigeg = (s) => {
    return Object.prototype.hasOwnProperty.call(sandhanganPanyigeg, s.toLowerCase());
}

const isConsonantsSandhanganWyanjana = (s) => {
    return Object.prototype.hasOwnProperty.call(sandhanganWyanjana, s.toLowerCase());
}

const isVowels = (s) => { 
    return Object.prototype.hasOwnProperty.call(sandhanganSwara, s); 
}

const isVowelsSwara = (s) => { 
    return Object.prototype.hasOwnProperty.call(swara, s); 
}

const isCharactersPada = (s) => {
    return Object.prototype.hasOwnProperty.call(pada, s);
}

const isVowelsA = (s) => {
    return s === "a" || s === "ô";
}

const isVowelsPepet = (s) => {
    return s === "ê" || s === "ě";
}

const isVowelsWulu = (s) => {
    return s === "i";
}

const isVowelsSuku = (s) => {
    return s === "u";
}

const isVowelsTaling = (s) => {
    return s === "e" || s === "é" || s === "è";
}

const isVowelsTalingTarung= (s) => {
    return s === "o";
}

const isPangkon = (s) => {
    return s === "꧀";
}

const isCakra = (s) => {
    return s === "ꦿ";
}

Vue.mixin({
    methods:{
        latinToJava
    }
});