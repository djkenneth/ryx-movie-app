<template>
  <div>
    <v-img
      :lazy-src="
        getMovieInfo.backdrop_path
          ? `https://image.tmdb.org/t/p/original${getMovieInfo.backdrop_path}`
          : ''
      "
      class="white--text align-center"
      gradient="to bottom, rgba(0,0,0,.2), rgba(0,0,0,.9)"
      style="height: 95vh"
    >
      <v-container class="mt-16">
        <v-row no-gutters>
          <v-col cols="3">
            <v-card dark width="230" rounded="xl" class="card-shadow">
              <v-img
                class="white--text align-end"
                :src="
                  getMovieInfo.poster_path
                    ? `https://image.tmdb.org/t/p/w200${getMovieInfo.poster_path}`
                    : require('@/assets/no-image-available.jpg')
                "
                height="400"
              >
              </v-img>
            </v-card>
          </v-col>
          <v-col cols="5" align-self="end">
            <h1 class="heading-primary view-title">
              {{ getMovieInfo.title }}
            </h1>
            <div class="pt-2">
              <p
                class="view-genre d-inline-flex"
                v-for="(genre, i) in getMovieInfo.genres"
                :key="i"
              >
                {{ genre.name }}
              </p>
            </div>
            <v-row no-gutters>
              <v-col cols="4">
                <h1 class="primary-color heading-primary heading-position">
                  {{ getMovieInfo.vote_average
                  }}<span class="small-rating">/ 10</span>
                </h1>
              </v-col>
              <v-col align-self="center">
                <div>
                  <v-icon size="30" color="red" class="mr-2">mdi-heart</v-icon
                  ><span>{{ getMovieInfo.vote_count }}</span>
                </div>
              </v-col>
            </v-row>
            <v-btn light color="cyan accent-2" rounded x-large class="px-7"
              >Watch trailer <v-icon size="30">mdi-menu-right</v-icon></v-btn
            >
            <v-btn
              v-if="
                liked.find((like) => like.id === getMovieInfo.id) ? true : false
              "
              @click="removeStorage(getMovieInfo.id)"
              icon
              class="rounded-icon-bg-red white--text"
            >
              <v-icon size="25">mdi-heart</v-icon>
            </v-btn>
            <v-btn
              v-else
              @click="addStorage(getMovieInfo)"
              icon
              class="rounded-icon white--text"
            >
              <v-icon size="25">mdi-heart-outline</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-img>
    <v-container>
      <v-row>
        <v-col cols="9">
          <div class="mb-10">
            <h1 class="mb-5 heading-secondary grey--text text--lighten-2">
              Plot
            </h1>
            <div
              class="paragraph-primary font-regular grey--text text--lighten-1"
            >
              {{ getMovieInfo.overview }}
            </div>
          </div>
          <Credit
            class="mb-10"
            :width="150"
            :casts="getMovieInfo.credits.cast.slice(0, 10)"
          />
        </v-col>
        <v-col cols="3">
          <MovieSideInfo />
        </v-col>
      </v-row>
    </v-container>
    <Gallery
      v-if="getMovieInfo.images.backdrops.length"
      :images="getMovieInfo.images.backdrops.slice(0, 8)"
    />
    <Review
      v-if="getMovieInfo.reviews.results.length"
      :reviews="getMovieInfo.reviews.results.slice(0, 2)"
    />
    <MovieCollection
      v-if="getMovieInfo.belongs_to_collection"
      :collection="getMovieInfo.belongs_to_collection"
    />
    <v-container>
      <ShowCase
        class="my-10"
        type="movie"
        :results="getMovieInfo.recommendations.results.slice(0, 10)"
        title="Related"
      />
    </v-container>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import store from "@/store/index.js";
const Credit = () => import("@/components/card/CardCredit.vue");
const Gallery = () => import("@/components/card/CardGallery.vue");
const Review = () => import("@/components/card/CardReview.vue");
const MovieSideInfo = () => import("@/components/movie/MovieSideInfo.vue");
const MovieCollection = () => import("@/components/movie/MovieCollection.vue");
const ShowCase = () => import("@/components/card/ShowCase.vue");
export default {
  components: {
    Credit,
    Gallery,
    Review,
    MovieSideInfo,
    MovieCollection,
    ShowCase,
  },
  data: () => ({
    //
  }),

  beforeRouteEnter(to, from, next) {
    store.dispatch("movie/fetchMovie", to.params.id);
    setTimeout(() => {
      next();
    }, 1000);
  },

  beforeRouteUpdate(to, from, next) {
    this.$store.dispatch("movie/fetchMovie", to.params.id);
    setTimeout(() => {
      next();
    }, 500);
  },

  methods: {
    addStorage(item) {
      this.$store.dispatch("like/addStorage", {
        id: item.id,
        genre_ids: item.genres,
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
  },

  computed: {
    ...mapState({
      liked: (state) => state.like.liked,
    }),
    ...mapGetters({
      getMovieInfo: "movie/getMovieInfo",
    }),
  },
};
</script>

<style lang="scss" scoped>
.card-shadow {
  box-shadow: 1px 1px 150px 1px #18ffff !important;
}

.view-genre {
  color: #18ffff;
  border: 2px solid #18ffff;
  padding: 4px 12px;
  font-family: "Open Sans", sans-serif;
  font-size: 17px;
  font-weight: bold;
  border-radius: 5px;
  margin-right: 10px;
}

.paragraph-primary {
  line-height: 1.6;
  font-weight: 400;
}

.view-title {
  line-height: 1.1;
  text-overflow: ellipsis;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2; /* number of lines to show */
  -webkit-box-orient: vertical;
}
</style>