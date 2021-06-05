<template>
  <div class="tv pages">
    <v-carousel
      height="600"
      cycle
      hide-delimiters
      interval="10000"
      show-arrows-on-hover
    >
      <v-carousel-item
        v-for="(item, i) in getPopularTvShows"
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
                    {{ item.name }}
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
        class="my-13"
        type="tv"
        :results="getPopularTvShows"
        title="Popular"
      />
      <ShowCase
        class="my-13"
        type="tv"
        :results="getAiringTodayTvShows"
        title="Airing Today"
      />
      <ShowCase
        class="my-13"
        type="tv"
        :results="getOnTheAirTvShows"
        title="On The Air"
      />
      <ShowCase
        class="my-13"
        type="tv"
        :results="getTopRatedTvShows"
        title="Top Rated"
      />
    </v-container>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
const ShowCase = () => import("@/components/card/ShowCase.vue");
export default {
  components: { ShowCase },
  data: () => ({
    //
  }),

  // beforeRouteEnter(to, from, next) {
  //   next((vm) => {
  //     vm.$store.dispatch("tv/fetchCategory", "popular");
  //     vm.$store.dispatch("tv/fetchCategory", "airing_today");
  //     vm.$store.dispatch("tv/fetchCategory", "on_the_air");
  //     vm.$store.dispatch("tv/fetchCategory", "top_rated");
  //   });
  // },

  methods: {
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
        name: item.name,
        vote_average: item.vote_average,
        first_air_date: item.first_air_date.substring(0, 4),
        type: "tv",
      });
      this.$store.commit("like/GET_STORAGE");
    },

    removeStorage(id) {
      this.$store.dispatch("like/removeStorage", id);
      this.$store.commit("like/GET_STORAGE");
    },

    view(item) {
      this.$router.push({
        name: "view-tv",
        params: { name: item.name, id: item.id },
      });
    },
  },

  computed: {
    ...mapState({
      liked: (state) => state.like.liked,
    }),

    ...mapGetters({
      getPopularTvShows: "tv/getPopularTvShows",
      getAiringTodayTvShows: "tv/getAiringTodayTvShows",
      getOnTheAirTvShows: "tv/getOnTheAirTvShows",
      getTopRatedTvShows: "tv/getTopRatedTvShows",
    }),
  },

  beforeCreate() {
    this.$store.dispatch("tv/fetchCategory", "popular");
    this.$store.dispatch("tv/fetchCategory", "airing_today");
    this.$store.dispatch("tv/fetchCategory", "on_the_air");
    this.$store.dispatch("tv/fetchCategory", "top_rated");
  },
};
</script>

<style lang="scss" scoped>
</style>