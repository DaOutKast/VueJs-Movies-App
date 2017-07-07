<template xmlns:v-on="http://www.w3.org/1999/xhtml">
    <div class="createMovie">
        <button v-on:click="openForm" v-show="!creating">Add Movie</button>
        <div class="createMovie" v-show="creating">
            <input type="text" placeholder="Title" ref="title" v-model="movieTitle">
            <textarea name="description" id="desc" placeholder="Description" ref="description" v-model="movieDesc"></textarea>
            <img src="" alt="" v-model="moviePoster">
            <input type="text" placeholder="Director" ref="director" v-model="movieDir">
            <input type="text" placeholder="Actors" ref="actors" v-model="movieActors">
            <input type="text" placeholder="Genre" ref="genre" v-model="movieGenre">
            <button v-on:click="sendForm">Add</button>
            <button v-on:click="closeForm">Cancel</button>
        </div>
    </div>
</template>

<script>

    export default {
        name: 'createMovie',
//        props: ['createMovie'],
        data: function() {
            return {
                creating: false,
                movieTitle: '',
                movieDesc: '',
                moviePoster: '',
                movieDir: '',
                movieActors: '',
                movieGenre: ''

            }
        },
        methods: {
            openForm: function() {
                this.creating = true;
            },
            closeForm: function() {
                this.creating = false;
            },
            sendForm: function() {
                const title = this.movieTitle,
                    desc = this.movieDesc,
                    poster = this.moviePoster,
                    director = this.movieDir,
                    actors = this.movieActors,
                    genre = this.movieGenre;

                this.$emit('create-movie', {
                    title,
                    desc,
                    poster,
                    director,
                    actors,
                    genre,
                    status: 0
                });

                this.creating = false;
            }
        }
    }

</script>

<style>
    .createMovie {
        margin: 20px 0 !important;
    }
</style>