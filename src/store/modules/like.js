export default {
    namespaced: true,
    state: {
        liked: []
    },
    mutations: {
        GET_STORAGE(state) {
            state.liked = JSON.parse(localStorage.getItem('ryz-movie'));
        }
    },
    actions: {
        addStorage({ commit }, item) {
            // if there is nothing saved at the start then save an new data
            if (localStorage.getItem('ryz-movie') == null) {
                localStorage.setItem("ryz-movie", '[]');
            }

            // get old data and push it to the new data
            let oldData = JSON.parse(localStorage.getItem('ryz-movie'));
            oldData.push(item)

            // save the old + new data to local storage
            localStorage.setItem("ryz-movie", JSON.stringify(oldData));
        },

        removeStorage({ commit }, id) {
            // if there is data get the data else empty array
            let storageData = localStorage.getItem("ryz-movie") ? JSON.parse(localStorage.getItem("ryz-movie")) : [];

            //  check if null then return nothing
            if (storageData == null) {
                return;
            }

            // find the equal the id then return the index
            let removeData = storageData.findIndex((item) => item.id === id);
            // remove the data from the array
            storageData.splice(removeData, 1);
            // save the update data
            localStorage.setItem("ryz-movie", JSON.stringify(storageData));
        },
    },
    getters: {
        getMovieLike: state => {
            return state.liked.filter(item => item.type === 'movie')
        },

        getTvLike: state => {
            return state.liked.filter(item => item.type === 'tv')
        }
    }
}