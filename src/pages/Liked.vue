<template>
  <v-container class="custom-container pages">
    <div>
      <v-row class="mt-5">
        <h1 class="font-weight-bold heading-secondary">Movies you liked</h1>
      </v-row>
      <v-row v-if="getMovieLike.length > 0">
        <v-col v-for="(item, i) in getMovieLike" :key="i">
          <CardMovie :item="item" />
        </v-col>
      </v-row>
      <v-row class="mt-10" v-else>
        <h3 class="font-heading">No results found</h3>
      </v-row>
    </div>

    <div class="mt-10">
      <v-row class="mt-5">
        <h1 class="font-weight-bold heading-secondary">TV Shows you liked</h1>
      </v-row>
      <v-row v-if="getTvLike.length > 0">
        <v-col v-for="(item, i) in getTvLike" :key="i">
          <CardTv :item="item" />
        </v-col>
      </v-row>
      <v-row class="mt-10" v-else>
        <h3 class="font-heading">No results found</h3>
      </v-row>
    </div>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
const CardMovie = () => import("@/components/card/CardMovie.vue");
const CardTv = () => import("@/components/card/CardTv.vue");

export default {
  components: { CardMovie, CardTv },
  data: () => ({
    //
  }),

  computed: {
    ...mapGetters({
      getMovieLike: "like/getMovieLike",
      getTvLike: "like/getTvLike",
    }),
  },
};
</script>

<style lang="scss" scoped>
</style>