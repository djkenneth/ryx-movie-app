<template>
  <v-row class="my-16">
    <!-- 
        collection.backdrop_path
          ? `https://image.tmdb.org/t/p/original${collection.backdrop_path}`
          : ''
      -->
    <v-img
      max-height="400"
      :src="imagePath(collection.backdrop_path, 'original')"
    >
      <v-container>
        <v-row align="center" style="height: 400px">
          <v-col>
            <h1 class="font-weight-bold white--text">
              Part of the {{ collection.name }}
            </h1>
            <v-btn color="#18ffff" class="mt-5 font-weight-bold py-6 px-10"
              >view {{ collection.name }}'s</v-btn
            >
          </v-col>
        </v-row>
      </v-container>
    </v-img>
  </v-row>
</template>

<script>
import imagePath from "@/utils/imagePath";
export default {
  props: {
    collection: Object,
  },
  methods: { imagePath },
};
</script>

<style lang="scss" scoped>
</style>