<template>
  <v-hover v-slot="{ hover }">
    <v-card
      dark
      width="200"
      rounded="xl"
      class="box-shadow"
      @click="viewMovie(item)"
    >
      <v-img
        :lazy-src="
          item.poster_path
            ? `https://image.tmdb.org/t/p/w200${item.poster_path}`
            : require('@/assets/no-image-available.jpg')
        "
        class="white--text align-end"
        gradient="to bottom, rgba(0,0,0,.2), rgba(0,0,0,.9)"
        height="310px"
        :src="
          item.poster_path
            ? `https://image.tmdb.org/t/p/w200${item.poster_path}`
            : require('@/assets/no-image-available.jpg')
        "
      >
        <template
          v-if="liked.find((like) => like.id === item.id) ? true : false"
        >
          <v-btn
            @click.stop="removeStorage(item.id)"
            icon
            absolute
            top
            right
            color="red"
          >
            <v-icon size="35">mdi-heart</v-icon>
          </v-btn>
        </template>
        <template v-else>
          <v-btn @click.stop="addStorage(item)" icon absolute top right>
            <v-icon size="35">mdi-heart-outline</v-icon>
          </v-btn>
        </template>
        <span class="card-vote" v-if="hover && item.vote_average">{{
          item.vote_average
        }}</span>
        <v-card-title :class="hover ? 'py-1' : 'py-4'">
          <h1 class="card-title">{{ item.title }}</h1>
        </v-card-title>
        <v-card-text v-if="hover && item.genre_ids" class="py-0 card-genre">
          <span v-for="(genre, i) in item.genre_ids" :key="i">
            {{ getGenreId(genre) }}
          </span>
        </v-card-text>
        <v-card-subtitle v-if="item.release_date" class="pt-0">{{
          item.release_date.substring(0, 4)
        }}</v-card-subtitle>
      </v-img>
    </v-card>
  </v-hover>
</template>

<script>
import { mapGetters, mapState } from "vuex";

export default {
  props: {
    item: Object,
  },

  computed: {
    ...mapState({
      liked: (state) => state.like.liked,
    }),
    ...mapGetters({
      getMovieGenres: "getMovieGenres",
    }),
  },

  methods: {
    getGenreId(id) {
      const genre = this.getMovieGenres.find((item) => {
        return item.id === id;
      });
      return genre.name;
    },

    addStorage(item) {
      this.$store.dispatch("like/addStorage", {
        id: item.id,
        genre_ids: item.genre_ids,
        poster_path: item.poster_path,
        title: item.title,
        vote_average: item.vote_average,
        release_date: item.release_date.substring(0, 4),
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
};
</script>

<style lang="scss" scoped>
</style>