<template>
  <v-container class="custom-container pages">
    <v-row>
      <v-col>
        <h1 class="font-weight-bold heading-secondary">Person</h1>
      </v-col>
    </v-row>
    <v-row class="mt-16">
      <v-pagination
        dark
        color="#18FFFF"
        v-model="page"
        :length="getPeople.total_pages"
        total-visible="8"
      ></v-pagination>
    </v-row>
    <v-row>
      <v-col xl="2" v-for="(item, i) in getPeople.results" :key="i">
        <CardPerson :item="item" />
      </v-col>
    </v-row>
    <v-row class="mt-10">
      <v-pagination
        dark
        color="#18FFFF"
        v-model="page"
        :length="getPeople.total_pages"
        total-visible="8"
      ></v-pagination>
    </v-row>
  </v-container>
</template>

<script>
import { mapState, mapGetters } from "vuex";
const CardPerson = () => import("@/components/card/CardPerson.vue");
export default {
  components: { CardPerson },
  data: () => ({
    page: 1,
  }),
  computed: {
    ...mapState({
      people: (state) => state.person.people,
    }),
    ...mapGetters({
      getPeople: "person/getPeople",
    }),
  },

  watch: {
    page(newValue) {
      if (newValue) {
        this.load();
      }
    },
  },

  methods: {
    load() {
      this.$store.dispatch("person/fetchPeople", this.page);
    },
  },
  created() {
    this.$store.dispatch("person/fetchPeople");
  },
};
</script>

<style lang="scss" scoped>
</style>
