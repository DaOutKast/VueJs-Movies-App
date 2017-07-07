apiURL = "http://movies-api.dev.com/api/movies"

new Vue ({
    el: '#app',

    data: {
        title: 'Movie DB',
        names: [
            {firstname: 'John', lastname: 'Doe'},
            {firstname: 'Jessica', lastname: 'Jones'},
            {firstname: 'Someone', lastname: 'Human'}
        ]
    },

    ready: function() {
        this.getMovies();
    },

    methods: {
        getMovies: function() {
            this.$http.get(apiURL, function(movies) {
                this.$set('movies', movies);
                console.log(movies);
            })
        }
    }

})