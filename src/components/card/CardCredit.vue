<template>
  <div>
    <h1 class="mb-5 heading-secondary grey--text text--lighten-2">Cast</h1>
    <v-row>
      <v-col v-for="(cast, i) in casts" :key="i">
        <v-card dark :width="width" rounded="xl" elevation="10">
          <v-img
            :src="
              cast.profile_path
                ? `https://image.tmdb.org/t/p/w200${cast.profile_path}`
                : require('@/assets/no-image-available.jpg')
            "
          ></v-img>
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
export default {
  props: {
    width: Number,
    casts: Array,
  },
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