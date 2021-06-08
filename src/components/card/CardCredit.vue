<template>
  <div>
    <h1 class="mb-5 heading-secondary grey--text text--lighten-2">Cast</h1>
    <v-row>
      <v-col v-for="(cast, i) in casts" :key="i">
        <v-card dark :width="width" rounded="xl" elevation="10">
          <v-img :src="imagePath(cast.profile_path, 'w200')"></v-img>
        </v-card>
        <div class="font-weight-bold font-heading name">{{ cast.name }}</div>
        <div class="font-weight-thin font-heading role">
          as {{ cast.known_for_department }}
        </div>
      </v-col>
    </v-row>
    <v-row justify="end">
      <v-col cols="4" align-self="center">
        <router-link class="view-all float-right" to=""
          ><span>View All Cast & Crew</span></router-link
        >
      </v-col>
    </v-row>
  </div>
</template>

<script>
import imagePath from "@/utils/imagePath";
export default {
  props: {
    width: Number,
    casts: Array,
  },
  methods: { imagePath },
};
</script>

<style lang="scss" scoped>
.name {
  font-size: 15px;
  padding-top: 10px;
}

.role {
  font-size: 12px;
  padding-top: 2px;
}
</style>