export default {
    namespaced: true,
    state: {
        popular: [],
        airing_today: [],
        on_the_air: [],
        top_rated: [],
        tv_info: null
    },
    mutations: {
        SET_CATEGORY(state, { movies, category }) {
            state[category] = movies
        },

        SET_TV_SHOW_INFO(state, payload) {
            state.tv_info = payload
        }
    },
    actions: {
        async fetchCategory({ commit }, category) {
            try {
                const res = await axios.get(`https://api.themoviedb.org/3/tv/${category}?api_key=${process.env.VUE_APP_TMDB_API_KEY}`)
                commit("SET_CATEGORY", { movies: res.data, category });
            } catch (err) {
                console.error(err)
            }
        },

        async fetchTVShow({ commit, state }, tv_id) {
            try {
                if (state.tv_info != null && state.tv_info.id == tv_id) {
                    await commit('SET_TV_SHOW_INFO', state.tv_info)
                } else {
                    const tmdb = await axios.get(`https://api.themoviedb.org/3/tv/${tv_id}?api_key=${process.env.VUE_APP_TMDB_API_KEY}&append_to_response=videos,images,credits,reviews,similar,recommendations,keywords,external_ids`)

                    commit('SET_TV_SHOW_INFO', await tmdb.data)
                }
            } catch (err) {
                console.error(err)
            }
        }
    },

    getters: {
        getPopularTvShows: state => {
            return state.popular.results
        },

        getAiringTodayTvShows: state => {
            return state.airing_today.results
        },

        getOnTheAirTvShows: state => {
            return state.on_the_air.results
        },

        getTopRatedTvShows: state => {
            return state.top_rated.results
        },

        getTVShowInfo: state => {
            return state.tv_info
        }
    }
}