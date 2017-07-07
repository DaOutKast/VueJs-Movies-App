<template>
    <div class="movies">

        <h2>{{ movies.title[0].value }}</h2>

        <h4>{{ movies.body[0].value }}</h4>

        <div class="">
            <img :src="movies.field_movie_poster[0].url" :alt="movies.field_movie_poster[0].alt">
        </div>

        <div class="">
            <p>
                <strong>Director:</strong> {{ movies.field_director[0].value }}
            </p>

            <div class="row">
                <div class="">
                    <strong>Actors:</strong><br>
                    <span v-for="actor in movies.field_actors">
                    {{ actor.value }}<br>
                </span>
                </div>

                <div class="">
                    <strong>Genre:</strong><br>
                    <span v-for="genre in movies.field_genre">
                    {{ genre.value }}<br>
                </span>
                </div>
            </div>

        </div>

        <hr>

    </div>
</template>

<script>

    export default {
        name: 'movies',
        props: ['movies']
    }

</script>

<style>

</style>