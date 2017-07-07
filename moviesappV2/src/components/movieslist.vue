<template>
    <div>
        <movies v-for="movies in movieslist" :key="movies.id" :movies="movies"></movies>
    </div>

</template>
<script>

    import axios from 'axios';
    import movies from './movies.vue';

    export default {

        name: 'movieslist',

        props: ['movieslist'],

        components: {
            movies
        },

    }
</script>
<style scoped>
    h1, h2 {
        font-weight: normal;
    }

    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        display: inline-block;
        margin: 0 10px;
    }

    a {
        color: #42b983;
    }
</style>
