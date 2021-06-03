<template>
  <div style="background-color: #101010" class="pa-5">
    <div class="mb-5">
      <p class="font-weight-bold">Creator</p>
      <div
        class="d-flex align-center"
        v-for="(creator, i) in getTVShowInfo.created_by.slice(0, 1)"
        :key="i"
      >
        <v-avatar size="56">
          <img
            alt="user"
            contain
            :src="
              creator.profile_path
                ? `https://image.tmdb.org/t/p/w300${creator.profile_path}`
                : require('@/assets/no-image-available.jpg')
            "
          />
        </v-avatar>
        <span class="ml-3 grey--text text--lighten-1">
          {{ creator.name }}
        </span>
      </div>
    </div>
    <div class="mb-5">
      <p class="font-weight-bold">Network</p>
      <div class="d-flex align-center">
        <div
          class="mr-3"
          v-for="(network, i) in getTVShowInfo.networks"
          :key="i"
        >
          <v-img
            max-width="80"
            :src="`https://image.tmdb.org/t/p/w300${network.logo_path}`"
          />
        </div>
      </div>
    </div>
    <div class="mb-5">
      <p class="font-weight-bold">Status</p>
      <span class="grey--text text--lighten-1">
        {{ getTVShowInfo.status }}
      </span>
    </div>
    <div class="mb-5">
      <p class="font-weight-bold">First Aired Date</p>
      <span class="grey--text text--lighten-1">
        {{ getTVShowInfo.first_air_date }}
      </span>
    </div>
    <div class="mb-5">
      <p class="font-weight-bold">Last Aired Date</p>
      <span class="grey--text text--lighten-1">
        {{ getTVShowInfo.last_air_date }}
      </span>
    </div>
    <div class="mb-5">
      <p class="font-weight-bold">Production Companies</p>
      <span
        class="grey--text text--lighten-1"
        v-for="(company, i) in getTVShowInfo.production_companies"
        :key="i"
      >
        {{ company.name }}
      </span>
    </div>
    <div class="mb-5">
      <p class="font-weight-bold">Production Countries</p>
      <span
        class="grey--text text--lighten-1"
        v-for="(country, i) in getTVShowInfo.production_countries"
        :key="i"
      >
        {{ country.name }}
      </span>
    </div>
    <div class="mb-5">
      <p class="font-weight-bold">Type</p>
      <span class="grey--text text--lighten-1">
        {{ getTVShowInfo.type }}
      </span>
    </div>
    <div class="mb-5">
      <p class="font-weight-bold">Number of Season</p>
      <span class="grey--text text--lighten-1">{{
        getTVShowInfo.number_of_seasons
      }}</span>
    </div>
    <div class="mb-5">
      <p class="font-weight-bold">Number of Episodes</p>
      <span class="grey--text text--lighten-1">{{
        getTVShowInfo.number_of_episodes
      }}</span>
    </div>
    <div class="mb-5">
      <p class="font-weight-bold">Links</p>
      <v-btn
        v-if="getTVShowInfo.homepage"
        class="mr-2"
        icon
        color="grey lighten-1"
        :href="getTVShowInfo.homepage"
        target="_blank"
      >
        <v-icon size="30">mdi-web</v-icon>
      </v-btn>
      <v-btn
        v-if="getTVShowInfo.external_ids.facebook_id"
        class="mr-2"
        icon
        color="grey lighten-1"
        :href="`https://www.facebook.com/${getTVShowInfo.external_ids.facebook_id}`"
        target="_blank"
      >
        <v-icon size="30">mdi-facebook</v-icon>
      </v-btn>
      <v-btn
        v-if="getTVShowInfo.external_ids.instagram_id"
        class="mr-2"
        icon
        color="grey lighten-1"
        :href="`https://www.instagram.com/${getTVShowInfo.external_ids.instagram_id}`"
        target="_blank"
      >
        <v-icon size="30">mdi-instagram</v-icon>
      </v-btn>
      <v-btn
        v-if="getTVShowInfo.external_ids.twitter_id"
        class="mr-2"
        icon
        color="grey lighten-1"
        :href="`https://twitter.com/${getTVShowInfo.external_ids.twitter_id}`"
        target="_blank"
      >
        <v-icon size="30">mdi-twitter</v-icon>
      </v-btn>
      <v-btn
        v-if="getTVShowInfo.external_ids.imdb_id"
        class="mr-2"
        icon
        color="grey lighten-1"
        :href="`https://www.imdb.com/title/${getTVShowInfo.external_ids.imdb_id}`"
        target="_blank"
      >
        <v-icon size="30">mdi-movie-open</v-icon>
      </v-btn>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters({
      getTVShowInfo: "tv/getTVShowInfo",
    }),
  },
};
</script>

<style lang="scss" scoped>
</style>