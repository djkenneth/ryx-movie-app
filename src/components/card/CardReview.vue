<template>
  <div>
    <v-container>
      <h1
        v-if="reviews"
        class="mb-5 heading-secondary grey--text text--lighten-2"
      >
        Reviews
      </h1>
    </v-container>
    <v-container>
      <v-row class="mb-10" v-for="(review, i) in reviews" :key="i">
        <v-card color="#141414" class="review-card white--text">
          <span :class="{ 'review-paragraph': show }">
            {{ review.content }}
          </span>
          <a class="cyan--text text--accent-2" @click="show = !show"
            ><span v-if="show">read more...</span
            ><span v-else>read less</span></a
          >
        </v-card>
      </v-row>
    </v-container>
    <v-row justify="center">
      <v-col cols="6" align-self="center">
        <router-link class="view-all float-right" to=""
          ><span>View All Reviews</span></router-link
        >
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  props: {
    reviews: Array,
  },

  data: () => ({
    show: true,
  }),
};
</script>

<style lang="scss" scoped>
.review-card {
  width: 70%;
  padding: 20px;
  box-shadow: 15px 10px 5px #000000, -15px -10px 5px #000000 !important;

  .review-paragraph {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3; /* number of lines to show */
    -webkit-box-orient: vertical;
  }
}
</style>