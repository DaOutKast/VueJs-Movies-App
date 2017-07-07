import Vue from 'vue'
import Router from 'vue-router'
// import Hello from '@/components/Hello'
import movieslist from '@/components/movieslist'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/movies-list',
            name: 'Movie List',
            component: movieslist
        }
    ]
})
