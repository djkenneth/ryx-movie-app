<template>
  <v-hover v-slot="{ hover }">
    <v-card dark width="200" rounded="xl" class="box-shadow">
      <v-img
        :lazy-src="
          item.profile_path
            ? `https://image.tmdb.org/t/p/w200${item.profile_path}`
            : require('@/assets/no-image-available.jpg')
        "
        class="white--text align-end"
        gradient="to bottom, rgba(0,0,0,.2), rgba(0,0,0,.9)"
        height="310px"
        :src="
          item.profile_path
            ? `https://image.tmdb.org/t/p/w200${item.profile_path}`
            : require('@/assets/no-image-available.jpg')
        "
      >
        <v-card-title :class="hover ? 'py-1' : 'py-4'">
          <h1 class="card-title">{{ item.name }}</h1>
        </v-card-title>
        <v-card-text v-if="hover && item.known_for" class="pb-5 card-genre">
          <span v-for="(movie, i) in item.known_for" :key="i">
            {{ movie.title }}
          </span>
        </v-card-text>
      </v-img>
    </v-card>
  </v-hover>
</template>

<script>
export default {
  props: {
    item: Object,
  },
};
</script>

<style lang="scss" scoped>
</style>