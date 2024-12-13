<template>
  <div class="home">
    <Header />
    <div class="content">
      <Post v-for="post in posts" :key="post.id" :post="post" />
    </div>
    <Footer />
  </div>
</template>

<script>
import Footer from '@/components/Footer.vue';
import Header from '@/components/Header.vue';
import Post from '@/components/Post.vue';
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'HomeView',
  components: {
    Header,
    Post,
    Footer,
  },
  computed: {
    ...mapGetters(['allPosts']),
    posts() {
      return this.allPosts;
    },
  },
  mounted() {
    this.fetchPosts();
  },
  methods: {
    ...mapActions(['fetchPosts']),
  },
};
</script>

<style scoped>
</style>
