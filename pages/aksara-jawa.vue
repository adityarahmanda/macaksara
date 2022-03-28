<template>
    <article v-if="article" class="article-container">
        <div class="article-header">
            <div class="article-title">
                <!-- eslint-disable-next-line vue/no-v-html -->
                <h2 v-html="article.title.rendered"></h2>
            </div>
            <div class="article-meta-info">
                <span class="article-author"><a :href="author.link" :alt="author.name">{{ author.name }}</a></span> - 
                <span class="article-date-modified">{{ formatDate(article.date) }}</span>
            </div>
        </div>
        <div class="article-content">
            <!-- eslint-disable-next-line vue/no-v-html -->
            <div v-html='article.content.rendered'></div>
        </div>
    </article>
</template>

<script>
import format from 'date-fns/format'
import parseISO from 'date-fns/parseISO'
import { id } from 'date-fns/locale';


export default {
    data() {
        return {
            article: null
        }
    },
    async fetch(){
        this.article = (await this.$axios.$get('https://adityarahmanda.com/wp-json/wp/v2/pages?slug=belajar-aksara-jawa&_embed'))[0] || null;
    },
    head() {
        return {
            title: this.article !== null ? this.article.title.rendered + ' - Macaksara' : 'Aksara Jawa - Macaksara',
            meta: [
                { hid: 'description', name: 'description', content: '?' },
                { hid: 'title', name: 'title', content: 'Belajar Aksara Jawa Lengkap Beserta Contohnya - Macaksara' }
            ]
        };
    },
    computed: {
        author() {
            return this.article._embedded.author[0];
        }
    },
    methods: {
        formatDate (date) {
            return format(parseISO(date), 'dd MMMM yyyy', { locale: id })
        }
    }
}
</script>