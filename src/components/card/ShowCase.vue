<template>
  <div>
    <h1 v-if="title" class="heading-secondary main-title">
      {{ title }}
    </h1>
    <v-row>
      <v-col xl="2" v-for="(item, i) in results" :key="i">
        <CardMovie v-if="type === 'movie'" :item="item" />
        <CardTv v-else-if="type === 'tv'" :item="item" />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import CardMovie from "@/components/card/CardMovie.vue";
import CardTv from "@/components/card/CardTv.vue";

export default {
  components: { CardMovie, CardTv },
  props: {
    type: String,
    results: Array,
    title: String,
  },

  data: () => ({
    //
  }),

  methods: {
    //
  },

  computed: {
    //
  },

  mounted() {
    //
  },
};
</script>

<style lang="scss" scoped>
.main-title {
  margin-bottom: 30px;
}
</style>
