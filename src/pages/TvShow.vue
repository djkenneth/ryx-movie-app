<template>
  <div class="tv pages">
    <v-carousel
      v-if="getPopularTvShows"
      height="600"
      cycle
      hide-delimiters
      interval="10000"
      show-arrows-on-hover
    >
      <v-carousel-item
        v-for="(item, i) in getPopularTvShows.slice(0, 10)"
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
        v-if="getPopularTvShows"
        class="my-13"
        type="tv"
        :results="getPopularTvShows.slice(0, 15)"
        title="Popular"
      />
      <ShowCase
        v-if="getAiringTodayTvShows"
        class="my-13"
        type="tv"
        :results="getAiringTodayTvShows.slice(0, 15)"
        title="Airing Today"
      />
      <ShowCase
        v-if="getOnTheAirTvShows"
        class="my-13"
        type="tv"
        :results="getOnTheAirTvShows.slice(0, 15)"
        title="On The Air"
      />
      <ShowCase
        v-if="getTopRatedTvShows"
        class="my-13"
        type="tv"
        :results="getTopRatedTvShows.slice(0, 15)"
        title="Top Rated"
      />
    </v-container>
  </div>
</template>

<script>
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
      getPopularTvShows: "tv/getPopularTvShows",
      getAiringTodayTvShows: "tv/getAiringTodayTvShows",
      getOnTheAirTvShows: "tv/getOnTheAirTvShows",
      getTopRatedTvShows: "tv/getTopRatedTvShows",
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