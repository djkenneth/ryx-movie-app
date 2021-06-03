<template>
  <div style="background-color: #101010" class="pa-5">
    <div class="mb-5">
      <p class="font-weight-bold">Rated</p>
      <span class="pa-2 red font-weight-bold" style="border-radius: 5px">{{
        getMovieInfo.rated
      }}</span>
    </div>
    <div class="mb-5">
      <p class="font-weight-bold">Status</p>
      <span class="grey--text text--lighten-1">
        {{ getMovieInfo.status }}
      </span>
    </div>
    <div class="mb-5">
      <p class="font-weight-bold">Release Date</p>
      <span class="grey--text text--lighten-1">
        {{ getMovieInfo.release_date }}
      </span>
    </div>
    <div class="mb-5">
      <p class="font-weight-bold">Production Companies</p>
      <span
        class="grey--text text--lighten-1"
        v-for="(company, i) in getMovieInfo.production_companies"
        :key="i"
      >
        {{ company.name }}
      </span>
    </div>
    <div class="mb-5">
      <p class="font-weight-bold">Production Countries</p>
      <span
        class="grey--text text--lighten-1"
        v-for="(country, i) in getMovieInfo.production_countries"
        :key="i"
      >
        {{ country.name }}
      </span>
    </div>
    <div class="mb-5">
      <p class="font-weight-bold">Spoken Language</p>
      <span
        class="grey--text text--lighten-1"
        v-for="(language, i) in getMovieInfo.spoken_languages"
        :key="i"
      >
        {{ language.english_name }}
      </span>
    </div>
    <div class="mb-5">
      <p class="font-weight-bold">Budget</p>
      <span class="grey--text text--lighten-1">{{
        budget(getMovieInfo.budget)
      }}</span>
    </div>
    <div class="mb-5">
      <p class="font-weight-bold">Revenue</p>
      <span class="grey--text text--lighten-1">{{
        revenue(getMovieInfo.revenue)
      }}</span>
    </div>
    <div class="mb-5">
      <p class="font-weight-bold">Runtime</p>
      <span class="grey--text text--lighten-1"
        >{{ runTime(getMovieInfo.runtime) }} hrs</span
      >
    </div>
    <div class="mb-5">
      <p class="font-weight-bold">Links</p>
      <v-btn
        v-if="getMovieInfo.homepage"
        class="mr-2"
        icon
        color="grey lighten-1"
        :href="getMovieInfo.homepage"
        target="_blank"
      >
        <v-icon size="30">mdi-web</v-icon>
      </v-btn>
      <v-btn
        v-if="getMovieInfo.external_ids.facebook_id"
        class="mr-2"
        icon
        color="grey lighten-1"
        :href="`https://www.facebook.com/${getMovieInfo.external_ids.facebook_id}`"
        target="_blank"
      >
        <v-icon size="30">mdi-facebook</v-icon>
      </v-btn>
      <v-btn
        v-if="getMovieInfo.external_ids.instagram_id"
        class="mr-2"
        icon
        color="grey lighten-1"
        :href="`https://www.instagram.com/${getMovieInfo.external_ids.instagram_id}`"
        target="_blank"
      >
        <v-icon size="30">mdi-instagram</v-icon>
      </v-btn>
      <v-btn
        v-if="getMovieInfo.external_ids.twitter_id"
        class="mr-2"
        icon
        color="grey lighten-1"
        :href="`https://twitter.com/${getMovieInfo.external_ids.twitter_id}`"
        target="_blank"
      >
        <v-icon size="30">mdi-twitter</v-icon>
      </v-btn>
      <v-btn
        v-if="getMovieInfo.external_ids.imdb_id"
        class="mr-2"
        icon
        color="grey lighten-1"
        :href="`https://www.imdb.com/title/${getMovieInfo.external_ids.imdb_id}`"
        target="_blank"
      >
        <v-icon size="30">mdi-movie-open</v-icon>
      </v-btn>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
export default {
  methods: {
    budget(amount) {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2,
      }).format(amount);
    },

    revenue(amount) {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2,
      }).format(amount);
    },

    runTime(time) {
      let result = time / 60;
      return result.toFixed(2);
    },
  },

  computed: {
    ...mapGetters({
      getMovieInfo: "movie/getMovieInfo",
    }),
  },
};
</script>

<style lang="scss" scoped>
</style>