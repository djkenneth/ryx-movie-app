import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import movie from "./modules/movie";
import tv from "./modules/tv";
import like from "./modules/like";
import person from "./modules/person";

export default new Vuex.Store({
  modules: {
    movie,
    tv,
    like,
    person
  },

  state: {
    progress_bar_value: 0,
    show_progress_bar: false,
    genre_movie: [],
    genre_tv: [],
    category: [
      { id: "movie", name: "Movies" },
      { id: "tv", name: "TV Shows" },
    ],
    sort_by_movie: [
      { id: "popularity.desc", name: "Popularity Desc" },
      { id: "popularity.asc", name: "Popularity Asc" },
      { id: "release_date.decs", name: "Release Date Desc" },
      { id: "release_date.asc", name: "Release Date Asc" },
      { id: "vote.desc", name: "Vote Desc" },
      { id: "vote.asc", name: "Vote Asc" },
      { id: "original_title.desc", name: "Title (Z-A)" },
      { id: "original_title.asc", name: "Title (A-Z)" },
    ],
    sort_by_tv: [
      { name: "Popularity Desc", id: "popularity.desc" },
      { name: "Popularity Asc", id: "popularity.asc" },
      { name: "First Air Date Desc", id: "first_air_date.desc" },
      { name: "First Air Date Asc", id: "first_air_date.asc" },
      { name: "Vote Average Desc", id: "vote_average.desc" },
      { name: "Vote Average Asc", id: "vote_average.asc" }
    ],
    listMovies: [],
    total_pages: null,
    total_results: null
  },
  mutations: {
    // SET_PROGRESS_BAR(state, { show, value }) {
    //   state.show_progress_bar = show
    //   state.progress_bar_value += value
    // },

    SET_GENRES(state, { genresList, genre }) {
      genresList.unshift({ id: -1, name: "All" })
      if (genre === 'movie') {
        state.genre_movie = genresList
      } else {
        state.genre_tv = genresList
      }
    },

    SET_DISCOVER(state, { page, results, total_pages, total_results }) {
      state.listMovies = results
      state.total_pages = total_pages
      state.total_results = total_results
    }
  },
  actions: {
    async getAllGenres({ commit }, genre) {
      try {
        const res = await axios.get(`https://api.themoviedb.org/3/genre/${genre}/list?api_key=${process.env.VUE_APP_TMDB_API_KEY}`)
        commit("SET_GENRES", { genresList: res.data.genres, genre })
      } catch (err) {
        console.log(err)
      }
    },

    async discoverMovie({ commit }, { type, page, year, sortBy, genre }) {
      try {
        const res = await axios.get(`https://api.themoviedb.org/3/discover/${type}?api_key=${process.env.VUE_APP_TMDB_API_KEY}&sort_by=${sortBy}&page=${page}&${type === 'movie' ? 'year=' : 'first_air_date_year='}${year}${genre != -1 ? '&with_genres=' + genre : ""}`)
        commit("SET_DISCOVER", res.data)
      } catch (err) {
        console.error(err)
      }
    },
  },

  getters: {
    getMovieGenres: state => {
      return state.genre_movie
    },

    getTvGenres: state => {
      return state.genre_tv
    },

    getListMovies: state => {
      return state.listMovies
    },

    getTotalPages: state => {
      return state.total_pages
    },

    getTotalResults: state => {
      return state.total_results
    }
  }
})
