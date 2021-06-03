<template>
  <div style="position: relative">
    <div class="d-flex align-center" style="height: 500px">
      <v-img
        class="my-16"
        max-height="350"
        style="filter: blur(3px)"
        gradient="to bottom, rgba(0,0,0,.2), rgba(0,0,0,.9)"
        :src="`https://image.tmdb.org/t/p/original${season.poster_path}`"
      >
      </v-img>
    </div>
    <v-row
      align="center"
      justify="center"
      style="width: 100%; height: 500px; position: absolute; top: 10px"
    >
      <v-col cols="3">
        <v-card class="mx-auto" width="250" rounded="xl">
          <v-img
            height="400"
            :src="`https://image.tmdb.org/t/p/original${season.poster_path}`"
          >
          </v-img>
        </v-card>
      </v-col>
      <v-col cols="7">
        <span class="font-heading grey--text text--lighten-2"
          >Currently at</span
        >
        <div class="font-weight-bold font-heading" style="font-size: 3rem">
          {{ season.name }}
        </div>
        <div class="headline">
          {{ season.air_date.substring(0, 4) }} |
          {{ season.episode_count }} Episodes
        </div>
        <div
          v-if="season.overview"
          style="font-size: 18px"
          class="grey--text text--lighten-2"
        >
          {{ season.overview }}
        </div>
        <v-btn
          large
          rounded
          color="cyan accent-2"
          class="px-10 font-weight-bold mt-3"
          >View All Season</v-btn
        >
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  props: {
    season: Object,
  },
};
</script>

<style lang="scss" scoped>
</style>