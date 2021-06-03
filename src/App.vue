<template>
  <!-- style="background-color: #141414; color: #fff" -->
  <v-app style="background-color: #141414; color: #fff">
    <v-progress-linear
      v-model="$store.state.progress_bar_value"
      :active="$store.state.show_progress_bar"
      color="#18FFFF"
    ></v-progress-linear>
    <v-app-bar
      app
      absolute
      flat
      dark
      color="transparent"
      class="px-16"
      height="70"
    >
      <v-img
        alt="ryx Logo"
        class="shrink"
        contain
        src="./assets/ryx-logo.png"
        transition="scale-transition"
      />

      <v-spacer></v-spacer>

      <div>
        <router-link
          v-for="link in links"
          :key="link.name"
          :to="link.route"
          exact
          class="link-list"
          active-class="active-link"
          >{{ link.name }}</router-link
        >
      </div>

      <v-spacer></v-spacer>

      <div class="d-flex align-center">
        <v-text-field
          solo
          flat
          color="#1DF7F7"
          rounded
          hide-details
          append-icon="mdi-magnify"
          placeholder="Seach movie & tv shows"
          style="width: 300px"
        ></v-text-field>
      </div>
    </v-app-bar>
    <v-main style="padding-top: 0">
      <v-btn
        v-scroll="onScroll"
        v-show="fab"
        fab
        fixed
        bottom
        right
        color="#18FFFF"
        class="mr-10 mb-8"
        @click="toTop"
      >
        <v-icon x-large>mdi-chevron-up</v-icon>
      </v-btn>
      <v-fade-transition name="fade" mode="out-in">
        <router-view :key="$route.fullPath"></router-view>
      </v-fade-transition>
    </v-main>
    <v-footer
      app
      absolute
      padless
      class="py-5"
      style="background-color: #000000; color: #fff"
    >
      <v-container>
        <v-row>
          <v-col cols="12">
            <div class="font-regular">
              Made with
              <span class="font-weight-bold">VueJS+Vuetify</span> and
              <span class="font-weight-bold">LOVE</span> by
              <span class="font-weight-bold" style="color: #18ffff"
                >Kenneth Pineda</span
              >
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    fab: false,
    links: [
      {
        name: "Movie",
        route: { name: "movie" },
        active: true,
      },
      {
        name: "Tv Shows",
        route: { name: "tv" },
        active: false,
      },
      {
        name: "Browse",
        route: { name: "browse" },
        active: false,
      },
      {
        name: "Person",
        route: { name: "person" },
        active: false,
      },
      {
        name: "Liked",
        route: { name: "liked" },
        active: false,
      },
    ],
  }),

  methods: {
    onScroll(e) {
      if (typeof window === "undefined") return;
      const top = window.pageYOffset || e.target.scrollTop || 0;
      this.fab = top > 20;
    },
    toTop() {
      this.$vuetify.goTo(0);
    },
  },

  beforeCreate() {
    this.$store.dispatch("getAllGenres", "movie");
    this.$store.dispatch("getAllGenres", "tv");
    this.$store.commit("like/GET_STORAGE");
  },
};
</script>

<style lang="scss">
.link-list {
  text-decoration: none;
  color: white !important;
  padding: 15px;
  margin-right: 10px;
  font-family: "Open Sans", sans-serif;
  font-size: 18px;
  font-weight: bold;
}

.link-list:hover {
  color: #00b8d4 !important;
}

.active-link {
  color: #1df7f7 !important;
  border-bottom: 3px solid #1df7f7;
}
</style>
