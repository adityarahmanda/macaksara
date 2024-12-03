// fungsi untuk melakukan pemenggalan suku kata bahasa jawa
const toSyllables = (word:string) => {
    const regex = /[^aiueoê\s]+[aiueoê]?(ng|r|h)?(?![aiueoê])|[^aiueoê\s]+[aiueoê]|[aiueoê](ng|r|h)?(?![aiueoê])/gi;
    return word.match(regex);
}

// array karakter bahasa jawa dan peluang kemunculannya
const wyanjana = [['h', 4],['n', 7],['c', 1],['r', 9],['k', 11],
                  ['d', 2],['t', 9],['s', 9],['w', 5],['l', 6],
                  ['p', 9],['dh', 3],['j', 3],['y', 3],['ny', 1],
                  ['m', 7],['g', 14],['b', 5],['th', 1],['ng', 3]];
const wyanjanaMati = [['h', 0],['n', 3],['c', 0],['r', 0],['k', 1],
                  ['d', 1],['t', 1],['s', 3],['w', 0],['l', 1],
                  ['p', 0],['dh', 0],['j', 0],['y', 0],['ny', 0],
                  ['m', 3],['g', 0],['b', 0],['th', 0],['ng', 0]];
const sandanganSwara = [['a', 48],['i', 19],['u', 14],['ê', 7],['o', 7],['e', 10]];
const panyigeg = [['h', 9],['n', 31],['c', 0],['r', 4],['k', 4],
                  ['d', 1],['t', 4],['s', 5],['w', 0],['l', 3],
                  ['p', 2],['dh', 0],['j', 0],['y', 0],['ny', 0],
                  ['m', 2],['g', 2],['b', 1],['th', 0],['ng', 39]];
const sandangan = [['y', 1],['r', 1],['l', 1],['w', 0]];
const rekan = [['kh', 1],['q', 0],['dz', 1],['f', 1],['v', 0],['gh', 1]];

// fungsi untuk melakukan generation suku kata bahasa jawa
const generateJavaneseSyllable = (weightOptions:any) => {
    // array struktur suku kata bahasa jawa dan peluang kemunculannya
    let structure;
    if (weightOptions.isLearningNglegena)
    {
        const sandhanganSwaraOverride = [['a', 1]];

        const structures = [
            [[ sandhanganSwaraOverride ], weightOptions.sandanganSwaraWeight], 
            [[ panyigeg ], weightOptions.panyigegWeight], 
            [[ wyanjana, sandhanganSwaraOverride ], weightOptions.wyanjanaSwaraWeight], 
            [[ wyanjanaMati, wyanjana, sandhanganSwaraOverride ], 10], 
            [[ rekan, sandhanganSwaraOverride ], weightOptions.rekanSwaraWeight], 
            [[ wyanjana, sandhanganSwaraOverride, panyigeg ], weightOptions.wyanjanaSwaraPanyigegWeight],
            [[ wyanjana, sandangan, sandhanganSwaraOverride ], weightOptions.wyanjanaSandanganSwaraWeight]
        ];

        structure = randomWithWeight(structures);
    }
    else if (weightOptions.isLearningSwara)
    {
        const swara = [['A', 1],['I', 1],['U', 1],['Ê', 1],['O', 1],['E', 1], ['lê', 1], ['rê', 1]];
        const structures = [
            [[ swara ], weightOptions.swaraWeight]
        ];

        structure = randomWithWeight(structures);
    }
    else
    {
        const structures = [
            [[ sandanganSwara ], weightOptions.sandanganSwaraWeight], 
            [[ panyigeg ], weightOptions.panyigegWeight], 
            [[ wyanjana, sandanganSwara ], weightOptions.wyanjanaSwaraWeight], 
            [[ wyanjanaMati, wyanjana, sandanganSwara ], weightOptions.wyanjanaWyanjanaSwaraWeight], 
            [[ rekan, sandanganSwara ], weightOptions.rekanSwaraWeight], 
            [[ wyanjana, sandanganSwara, panyigeg ], weightOptions.wyanjanaSwaraPanyigegWeight],
            [[ wyanjana, sandangan, sandanganSwara ], weightOptions.wyanjanaSandanganSwaraWeight]
        ];

        structure = randomWithWeight(structures);
    }
    
    let syllable = '';
    for(let i = 0; i < structure.length; i++) {
        syllable = syllable + randomWithWeight(structure[i]);
    }
    
    return syllable;
}

// fungsi untuk mendapatkan data acak dari array dengan peluang tertentu
const randomWithWeight = (array:Array<any>) => {
    let total = 0;
    
    for (let i = 0; i < array.length; ++i) {
        total += array[i][1];
    }
    
    const threshold = Math.random() * total;
    
    total = 0;
    for (let i = 0; i < array.length - 1; ++i) {
        total += array[i][1];
    
        if (total >= threshold) {
            return array[i][0];
        }
    }
    
    return array[array.length - 1][0];
}

// fungsi untuk mengacak array
const shuffleArray = (array:Array<any>) => {
    for(let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

export default defineNuxtPlugin((nuxtApp) => {
    return {
        provide: {
            shuffleArray,
            toSyllables,
            generateJavaneseSyllable
        }
    }
})