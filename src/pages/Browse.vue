<template>
  <v-container class="custom-container pages">
    <v-row align="center">
      <v-col lg="3" class="d-inline-flex">
        <h1 class="font-weight-bold heading-secondary">Browse</h1>
      </v-col>
      <v-col lg="2">
        <v-select
          dark
          color="#18FFFF"
          eager
          v-model="categorySelect"
          :items="category"
          return-object
          item-text="name"
          item-value="id"
          label="Category"
        ></v-select>
      </v-col>
      <v-col lg="2">
        <v-select
          dark
          color="#18FFFF"
          eager
          v-model="yearSelect"
          :items="yearItems"
          label="Year"
        ></v-select>
      </v-col>
      <v-col lg="3">
        <v-select
          dark
          color="#18FFFF"
          eager
          v-model="sortBySelect"
          :items="categorySelect.id === 'movie' ? sort_by_movie : sort_by_tv"
          return-object
          item-text="name"
          item-value="id"
          label="Sort By"
        ></v-select>
      </v-col>
      <v-col lg="2">
        <v-select
          dark
          color="#18FFFF"
          eager
          v-model="genreSelect"
          :items="categorySelect.id === 'movie' ? getMovieGenres : getTvGenres"
          return-object
          item-text="name"
          item-value="id"
          label="Genre"
        ></v-select>
      </v-col>
    </v-row>
    <!-- <v-row v-if="getTotalResults > 0">
      <v-col cols="12">
        <v-pagination
          class="float-left"
          dark
          color="#18FFFF"
          v-model="page"
          :length="getTotalPages"
          total-visible="8"
        ></v-pagination>
      </v-col>
      <v-col cols="12">
        <ShowCase
          class="my-7"
          :type="categorySelect.id"
          :results="getListMovies"
        />
      </v-col>
      <v-col cols="12">
        <v-pagination
          class="float-left"
          dark
          color="#18FFFF"
          v-model="page"
          :length="getTotalPages"
          total-visible="8"
        ></v-pagination>
      </v-col>
    </v-row> -->
    <!-- <v-row v-else class="mt-10">
      <v-col>
        <h3 class="font-heading">No results found</h3>
      </v-col>
    </v-row> -->
    <v-row>
      <v-col cols="12">
        <v-pagination
          class="float-left"
          dark
          color="#18FFFF"
          v-model="page"
          :length="getTotalPages"
          total-visible="8"
        ></v-pagination>
      </v-col>
    </v-row>
    <v-row>
      <v-col xl="2" v-for="(item, i) in getListMovies" :key="i">
        <CardMovie v-if="categorySelect.id === 'movie'" :item="item" />
        <CardTv v-else-if="categorySelect.id === 'tv'" :item="item" />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-pagination
          class="float-left"
          dark
          color="#18FFFF"
          v-model="page"
          :length="getTotalPages"
          total-visible="8"
        ></v-pagination>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState, mapGetters } from "vuex";
const CardMovie = () => import("@/components/card/CardMovie.vue");
const CardTv = () => import("@/components/card/CardTv.vue");

export default {
  name: "browse",
  components: { CardMovie, CardTv },
  data: () => ({
    page: 1,
    categorySelect: { id: "movie", name: "Movies" },
    yearSelect: "All",
    sortBySelect: { id: "popularity.desc", name: "Popularity Desc" },
    genreSelect: { id: -1, name: "All" },
  }),
  computed: {
    ...mapState({
      category: (state) => state.category,
      sort_by_movie: (state) => state.sort_by_movie,
      sort_by_tv: (state) => state.sort_by_tv,
      movie_genres: (state) => state.movie.movie_genres,
      tv_genres: (state) => state.tv.tv_genres,
    }),
    ...mapGetters({
      yearItems: "movie/getYears",
      getListMovies: "getListMovies",
      getTotalPages: "getTotalPages",
      getTotalResults: "getTotalResults",
      getMovieGenres: "getMovieGenres",
      getTvGenres: "getTvGenres",
    }),
  },

  watch: {
    categorySelect(newValue) {
      if (newValue) {
        this.load();
      }
    },

    page(newValue) {
      if (newValue) {
        this.load();
      }
    },

    yearSelect(newValue) {
      if (newValue) {
        this.load();
      }
    },

    sortBySelect(newValue) {
      if (newValue) {
        this.load();
      }
    },

    genreSelect(newValue) {
      if (newValue) {
        this.load();
      }
    },
  },

  methods: {
    load() {
      this.$store.dispatch("discoverMovie", {
        type: this.categorySelect.id,
        page: this.page,
        year: this.yearSelect,
        sortBy: this.sortBySelect.id,
        genre: this.genreSelect.id,
      });
    },
  },

  created() {
    this.load();
  },
};
</script>

<style lang="scss" scoped>
</style>
