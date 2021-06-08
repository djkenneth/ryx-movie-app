<template>
  <div class="movie pages">
    <v-carousel
      v-if="getUpcomingMovies"
      height="600"
      cycle
      hide-delimiters
      interval="10000"
      show-arrows-on-hover
    >
      <v-carousel-item
        v-for="(item, i) in getUpcomingMovies.slice(0, 10)"
        :key="i"
        eager
        gradient="to bottom, rgba(0,0,0,.2), rgba(0,0,0,.9)"
        :src="imagePath(item.backdrop_path, 'original')"
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
                    @click="view(item)"
                    >VIEW MORE</v-btn
                  >
                  <template v-if="isLike(item.id)">
                    <v-btn
                      @click="removeStorage(item.id)"
                      icon
                      class="rounded-icon-bg-red"
                    >
                      <v-icon size="25">mdi-heart</v-icon>
                    </v-btn>
                  </template>
                  <template v-else>
                    <v-btn @click="addStorage(item)" icon class="rounded-icon">
                      <v-icon size="25">mdi-heart-outline</v-icon>
                    </v-btn>
                  </template>
                </div>
              </v-col>
            </v-row>
          </v-container>
        </v-carousel-reverse-transition>
      </v-carousel-item>
    </v-carousel>
    <v-container>
      <ShowCase
        v-if="getPopularMovies"
        class="my-13"
        type="movie"
        :results="getPopularMovies.slice(0, 15)"
        title="Popular"
      />
      <ShowCase
        v-if="getUpcomingMovies"
        class="my-13"
        type="movie"
        :results="getUpcomingMovies.slice(0, 15)"
        title="Upcoming"
      />
      <ShowCase
        v-if="getNowPlayingMovies"
        class="my-13"
        type="movie"
        :results="getNowPlayingMovies.slice(0, 15)"
        title="Now Playing"
      />
      <ShowCase
        v-if="getTopRatedMovies"
        class="my-13"
        type="movie"
        :results="getTopRatedMovies.slice(0, 15)"
        title="Top Rated"
      />
    </v-container>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapState, mapGetters } from "vuex";
import imagePath from "@/utils/imagePath";
const ShowCase = () => import("@/components/card/ShowCase.vue");
export default {
  components: { ShowCase },
  data: () => ({
    //
  }),

  computed: {
    ...mapState({
      liked: (state) => state.like.liked,
    }),

    ...mapGetters({
      getPopularMovies: "movie/getPopularMovies",
      getUpcomingMovies: "movie/getUpcomingMovies",
      getNowPlayingMovies: "movie/getNowPlayingMovies",
      getTopRatedMovies: "movie/getTopRatedMovies",
    }),
  },

  methods: {
    imagePath,

    isLike(id) {
      if (this.liked != null) {
        if (this.liked.find((item) => item.id === id)) {
          return true;
        }
        return false;
      } else {
        return false;
      }
    },

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

    view(item) {
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
