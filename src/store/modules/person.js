
export default {
    namespaced: true,
    state: {
        people: []
    },
    mutations: {
        SET_PEOPLE(state, payload) {
            state.people = payload
        }
    },
    actions: {
        async fetchPeople({ commit }, page) {
            try {
                const res = await axios.get(`https://api.themoviedb.org/3/person/popular?api_key=${process.env.VUE_APP_TMDB_API_KEY}&language=en-US&page=${page ? page : 1}`)
                commit("SET_PEOPLE", res.data)
            } catch (err) {
                console.error(err)
            }
        }
    },
    getters: {
        getPeople: state => {
            return state.people
        }
    }
}