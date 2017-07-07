<template>
  <div id="app">
    <header>
      <span>Movies App</span>
    </header>
    <main>
      <!--<img src="./assets/logo.png" alt="Vue.js PWA">-->
      <createMovie v-on:create-movie="addMovie"></createMovie>
      <movieslist v-bind:movieslist="movieslist"></movieslist>
    </main>
  </div>
</template>

<script>

  import axios from 'axios';
  import movieslist from './components/movieslist';
  import createMovie from './components/createMovie';

  export default {
      name: 'app',
      components: {
          movieslist,
          createMovie
      },

      data: function() {
          return {
//              title: 'Welcome to the Movies List',
              movieslist: []
//              createMovie
          }
      },

      mounted: function() {
          var _this = this;
          axios.get('http://movies-api.dev.com/api/movies').then(function(ready) {
              _this.movieslist = ready.data
          })
      },
      methods: {
          addMovie: function(movie) {
              console.log(movie);
              this.movieslist.push(movie);
          }
      }
  }
</script>

<style>
body {
  margin: 0;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

main {
  text-align: center;
  margin-top: 40px;
}

header {
  margin: 0;
  height: 56px;
  padding: 0 16px 0 24px;
  background-color: #4fc08d;
  color: #ffffff;
}

header span {
  display: block;
  position: relative;
  font-size: 20px;
  line-height: 1;
  letter-spacing: .02em;
  font-weight: 400;
  box-sizing: border-box;
  padding-top: 16px;
}
</style>
