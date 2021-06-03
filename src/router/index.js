import Vue from 'vue'
import VueRouter from 'vue-router'
import goTo from "vuetify/es5/services/goto";
import store from "../store/index"

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'movie',
    component: () => import(/* webpackChunkName: "watch" */ '../pages/Movie.vue')
  },
  {
    path: '/tv',
    name: 'tv',
    component: () => import(/* webpackChunkName: "watch" */ '../pages/TvShow.vue')
  },
  {
    path: '/browse',
    name: 'browse',
    component: () => import(/* webpackChunkName: "wacth" */ '../pages/Browse.vue')
    // component: browse
  },
  {
    path: '/person',
    name: 'person',
    component: () => import(/* webpackChunkName: "person" */ '../pages/Person.vue')
    // component: person
  },
  {
    path: '/liked',
    name: 'liked',
    component: () => import(/* webpackChunkName: "liked" */ '../pages/Liked.vue')
  },
  {
    path: '/view',
    name: "view",
    component: { render: (c) => c('router-view') },
    children: [
      {
        path: 'movie/:title/:id',
        name: 'view-movie',
        component: () => import(/* webpackChunkName: "view-movie" */ '../pages/view/Movie.vue')
      },
      {
        path: 'tv/:name/:id',
        name: 'view-tv',
        component: () => import(/* webpackChunkName: "view-tv" */ '../pages/view/TvShow.vue')
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior: (to, from, savedPosition) => {
    let scrollTo = 0;
    if (to.hash) {
      scrollTo = to.hash;
    } else if (savedPosition) {
      console.log(savedPosition)
      scrollTo = savedPosition.y;
    }

    return goTo(scrollTo);
  },
  routes
})

// router.beforeEach((to, from, next) => {
//   if (to.name === 'movie') {
//     store.dispatch("movie/fetchCategory", "popular");
//     store.dispatch("movie/fetchCategory", "upcoming");
//     store.dispatch("movie/fetchCategory", "now_playing");
//     store.dispatch("movie/fetchCategory", "top_rated");

//     setTimeout(() => {
//       // store.state.show_progress_bar = true
//       store.commit('SET_PROGRESS_BAR', {
//         show: true,
//         value: 0
//       })
//       let interval = setInterval(() => {
//         if (store.state.progress_bar_value === 100) {
//           // clearInterval(interval)
//           // store.state.show_progress_bar = false
//           store.commit('SET_PROGRESS_BAR', {
//             show: false
//           })
//           next()
//         }
//         store.commit('SET_PROGRESS_BAR', {
//           value: 25
//         })
//         // store.state.progress_bar_value += 25

//       }, 1000)
//     }, 2500)

//   } else if (to.name === 'tv') {
//     store.dispatch("tv/fetchCategory", "popular");
//     store.dispatch("tv/fetchCategory", "airing_today");
//     store.dispatch("tv/fetchCategory", "on_the_air");
//     store.dispatch("tv/fetchCategory", "top_rated");
//   } else if (to.name === 'browse') {
//     next()
//   } else if (to.name === 'person') {
//     store.dispatch("person/fetchPeople");
//     next()
//   } else if (to.name === 'liked') {
//     next()
//   }
// });

export default router
