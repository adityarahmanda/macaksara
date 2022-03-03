import Vue from 'vue';

// javanese characters array with its weight
const wyanjana = [['h', 4],['n', 7],['c', 1],['r', 9],['k', 11],
                  ['d', 2],['t', 9],['s', 9],['w', 5],['l', 6],
                  ['p', 9],['dh', 3],['j', 3],['y', 3],['ny', 1],
                  ['m', 7],['g', 14],['b', 5],['th', 1],['ng', 3]];
const swara = [['a', 48],['i', 19],['u', 14],['ê', 7],['o', 7],['e', 10]];
const panyigeg = [['h', 9],['n', 31],['c', 0],['r', 4],['k', 4],
                  ['d', 1],['t', 4],['s', 5],['w', 0],['l', 3],
                  ['p', 2],['dh', 0],['j', 0],['y', 0],['ny', 0],
                  ['m', 2],['g', 2],['b', 1],['th', 0],['ng', 39]];
const sandangan = [['y', 1],['r', 1],['l', 1],['w', 0]];
const rekan = [['kh', 1],['q', 0],['dz', 1],['f', 1],['v', 0],['gh', 1]];

// javanese syllable structure with its random weight
const structures = [
        [[ swara ], 1], 
        [[ panyigeg ], 1], 
        [[ wyanjana, swara ], 20], 
        [[ rekan, swara ], 1], 
        [[ wyanjana, swara, panyigeg ], 0],
        [[ wyanjana, sandangan, swara ], 0]
];

const toSyllables = (word) => {
    const regex = /[aeiouê](ng|r|h)?|[^aiueoê\s]+(?:[aiueoê](ng|r|h)(?=[^aiueoê]|$)|[aiueoê]?)/gi;
    return word.match(regex);
}

const generateJavaneseSyllable = () => {
    const structure = randomWithWeight(structures);
    
    let syllable = '';
    for(let i = 0; i < structure.length; i++) {
        syllable = syllable + randomWithWeight(structure[i]);
    }
    
    return syllable;
}

const shuffleArray = (array) => {
    for(let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

const randomWithWeight = (array) => {
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

Vue.mixin({
    methods:{
        toSyllables,
        generateJavaneseSyllable,
        shuffleArray
    },
})