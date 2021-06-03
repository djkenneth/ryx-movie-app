<template>
  <div>
    <v-container>
      <h1 class="mb-5 heading-secondary grey--text text--lighten-2">Gallery</h1>
    </v-container>
    <v-row no-gutters>
      <v-col cols="3" v-for="(image, i) in images" :key="i">
        <v-img :src="`https://image.tmdb.org/t/p/original${image.file_path}`" />
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="6" align-self="center">
        <router-link class="view-all float-right" to=""
          ><span>View All Images</span></router-link
        >
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  props: {
    images: Array,
  },
};
</script>

<style lang="scss" scoped>
</style>