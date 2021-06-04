<template>
  <div class="movie pages">
    <v-carousel
      height="600"
      cycle
      hide-delimiters
      interval="10000"
      show-arrows-on-hover
    >
      <v-carousel-item
        v-for="(item, i) in getUpcomingMovies"
        :key="i"
        eager
        gradient="to bottom, rgba(0,0,0,.2), rgba(0,0,0,.9)"
        :src="`https://image.tmdb.org/t/p/original${item.backdrop_path}`"
      >
        <v-carousel-reverse-transition mode="out-in">
          <v-container style="height: 80%">
            <v-row style="height: 100%" align="end">
              <v-col>
                <div class="slider-container">
                  <h1 class="heading-primary carousel-title">
                    {{ item.title }}
                  </h1>
                  <h1 class="primary-color heading-primary heading-position">
                    {{ item.vote_average
                    }}<span class="small-rating">/ 10</span>
                  </h1>
                  <p class="carousel-overview">
                    {{ item.overview }}
                  </p>
                  <v-btn
                    light
                    color="cyan accent-2"
                    rounded
                    x-large
                    class="px-13"
                    @click="viewMovie(item)"
                    >VIEW MORE</v-btn
                  >
                  <!-- <v-btn
                    v-if="
                      liked.find((like) => like.id === item.id) ? true : false
                    "
                    @click="removeStorage(item.id)"
                    icon
                    class="rounded-icon-bg-red"
                  >
                    <v-icon size="25">mdi-heart</v-icon>
                  </v-btn>
                  <v-btn
                    v-else
                    @click="addStorage(item)"
                    icon
                    class="rounded-icon"
                  >
                    <v-icon size="25">mdi-heart-outline</v-icon>
                  </v-btn> -->
                </div>
              </v-col>
            </v-row>
          </v-container>
        </v-carousel-reverse-transition>
      </v-carousel-item>
    </v-carousel>
    <v-container>
      <ShowCase
        class="my-13"
        type="movie"
        :results="getPopularMovies"
        title="Popular"
      />
      <ShowCase
        class="my-13"
        type="movie"
        :results="getUpcomingMovies"
        title="Upcoming"
      />
      <ShowCase
        class="my-13"
        type="movie"
        :results="getNowPlayingMovies"
        title="Now Playing"
      />
      <ShowCase
        class="my-13"
        type="movie"
        :results="getTopRatedMovies"
        title="Top Rated"
      />
    </v-container>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapState, mapGetters } from "vuex";
const ShowCase = () => import("@/components/card/ShowCase.vue");
export default {
  components: { ShowCase },
  data: () => ({
    //
  }),

  computed: {
    ...mapState({
      liked: (state) => state.like.liked,
      popular: (state) => state.movie.popular,
      upcoming: (state) => state.movie.upcoming,
      now_playing: (state) => state.movie.now_playing,
      top_rated: (state) => state.movie.top_rated,
    }),

    ...mapGetters({
      getPopularMovies: "movie/getPopularMovies",
      getUpcomingMovies: "movie/getUpcomingMovies",
      getNowPlayingMovies: "movie/getNowPlayingMovies",
      getTopRatedMovies: "movie/getTopRatedMovies",
    }),
  },

  methods: {
    addStorage(item) {
      this.$store.dispatch("like/addStorage", {
        id: item.id,
        genre_ids: item.genre_ids,
        poster_path: item.poster_path,
        title: item.title,
        vote_average: item.vote_average,
        type: "movie",
      });
      this.$store.commit("like/GET_STORAGE");
    },

    removeStorage(id) {
      this.$store.dispatch("like/removeStorage", id);
      this.$store.commit("like/GET_STORAGE");
    },

    viewMovie(item) {
      this.$router.push({
        name: "view-movie",
        params: { title: item.title, id: item.id },
      });
    },
  },

  beforeCreate() {
    this.$store.dispatch("movie/fetchCategory", "popular");
    this.$store.dispatch("movie/fetchCategory", "upcoming");
    this.$store.dispatch("movie/fetchCategory", "now_playing");
    this.$store.dispatch("movie/fetchCategory", "top_rated");
  },
};
</script>

<style lang="scss" scoped>
</style>
