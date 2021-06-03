export default {
    namespaced: true,
    state: {
        popular: {},
        upcoming: {},
        now_playing: {},
        top_rated: {},
        movie_info: {},
    },
    mutations: {
        SET_CATEGORY(state, { movies, category }) {
            state[category] = movies
        },

        SET_MOVIE_INFO(state, payload) {
            state.movie_info = payload
        },
    },

    actions: {
        async fetchCategory({ commit }, category) {
            try {
                const res = await axios.get(`https://api.themoviedb.org/3/movie/${category}?api_key=${process.env.VUE_APP_TMDB_API_KEY}`)
                commit("SET_CATEGORY", { movies: res.data, category })
            } catch (err) {
                console.error(err)
            }
        },

        async fetchMovie({ commit, state }, movie_id) {
            try {
                if (state.movie_info != null && state.movie_info.id == movie_id) {
                    await commit("SET_MOVIE_INFO", state.movie_info)
                } else {
                    const tmdb = await axios.get(`https://api.themoviedb.org/3/movie/${movie_id}?api_key=${process.env.VUE_APP_TMDB_API_KEY}&append_to_response=videos,images,credits,reviews,similar,recommendations,keywords,external_ids`)

                    const imdb = await axios.get(`http://www.omdbapi.com/?i=${tmdb.data.imdb_id}&apikey=${process.env.VUE_APP_OMBD_API_KEY}`)

                    const { Metascore, imdbVotes, imdbRating, Rated, Ratings } = await imdb.data;

                    tmdb.data.meta_score = Metascore;
                    tmdb.data.imdb_rating = imdbRating;
                    tmdb.data.imdb_votes = imdbVotes;
                    tmdb.data.rated = Rated;
                    tmdb.data.other_rate = Ratings;

                    commit("SET_MOVIE_INFO", await tmdb.data)
                }
            } catch (err) {
                console.error(err)
            }
        },

    },
    getters: {
        getYears: () => {
            let years = ["All"];
            for (let i = new Date().getFullYear(); i > 1880; i--) {
                years.push(i);
            }
            return years;
        },

        getUpcomingMovies: state => {
            return state.upcoming.results
        },

        getPopularMovies: state => {
            return state.popular.results
        },

        getNowPlayingMovies: state => {
            return state.now_playing.results
        },

        getTopRatedMovies: state => {
            return state.top_rated.results
        },

        getMovieInfo: state => {
            return state.movie_info
        },
    }
}