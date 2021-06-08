<template>
  <div>
    <v-container>
      <h1 class="mb-5 heading-secondary grey--text text--lighten-2">Gallery</h1>
    </v-container>
    <v-row no-gutters style="height: 380px">
      <v-col cols="3" v-for="(image, i) in images" :key="i">
        <v-img :src="imagePath(image.file_path, 'original')" />
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
import imagePath from "@/utils/imagePath";
export default {
  props: {
    images: Array,
  },
  methods: { imagePath },
};
</script>

<style lang="scss" scoped>
</style>