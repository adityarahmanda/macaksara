# Macaksara

Macaksara merupakan website permainan kuis untuk menguji kemampuan membaca Aksara Jawa. 

## Demonstrasi

[https://macaksara.adityarahmanda.com/](https://macaksara.adityarahmanda.com/).

## Proses Generation Soal

Data soal didapatkan dengan melakukan fetch data dari file [quizzes.json](https://github.com/adityarahmanda/macaksara/blob/main/content/quizzes.json).

Selanjutnya dilakukan pemenggalan suku kata bahasa jawa pada data soal tersebut dengan menggunakan fungsi berikut.
```jsx
const toSyllables = (word) => {
    const regex = /[aeiouê](ng|r|h)?|[^aiueoê\s]+(?:[aiueoê](ng|r|h)(?=[^aiueoê]|$)|[aiueoê]?)/gi;
    return word.match(regex);
}
```

Masing-masing hasil pemenggalan data soal yang masih berupa huruf latin kemudian dikonversikan menjadi aksara Jawa dengan bantuan [Transliterator Aksara Jawa](https://github.com/adityarahmanda/macaksara/blob/main/plugins/macaksara-latintojava.js) untuk kemudian ditampilkan ke dalam website.

## Build Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```
