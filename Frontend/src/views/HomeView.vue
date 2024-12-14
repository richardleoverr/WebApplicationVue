<template>
  <div class="home">
    <Header />
    <div class="content">
      <Post v-for="post in posts" :key="post.id" :post="post" />
    </div>
    <div class="addOrRemovePost">
      <button @click="addPost">Add Post</button>
      <button @click="deleteAllPosts">Delete all</button>
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
    addPost() {
      this.$router.push('/addpost'); 
      console.log('Navigated to Add Post page');
    },
    async deleteAllPosts() {
      try {
        const response = await fetch('http://localhost:3000/api/posts', {
          method: 'DELETE',
        });

        if (response.ok) {
          const result = await response.json();
          console.log(result.message);
          this.fetchPosts();
        } else {
          console.error('Failed to delete all posts');
        }
      } catch (err) {
        console.error('Error deleting all posts:', err);
      }
    },
  }
  };
</script>

<style scoped>
</style>
